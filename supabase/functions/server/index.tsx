import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono().basePath("/make-server-78b4cf15");

// ==================== SECURITY HELPERS ====================

const PBKDF2_ITERATIONS = 600_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = "sha256";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");

  const hash = pbkdf2Sync(
    password,
    salt,
    PBKDF2_ITERATIONS,
    PBKDF2_KEYLEN,
    PBKDF2_DIGEST,
  ).toString("hex");

  return `pbkdf2$${PBKDF2_DIGEST}$${PBKDF2_ITERATIONS}$${salt}$${hash}`;
}

function verifyPassword(password: string, storedValue: string): boolean {
  const parts = storedValue.split("$");

  if (parts.length !== 5 || parts[0] !== "pbkdf2") {
    return false;
  }

  const [, digest, iterationsRaw, salt, storedHashHex] = parts;
  const iterations = Number(iterationsRaw);

  if (!iterations || !salt || !storedHashHex) {
    return false;
  }

  const storedHash = Uint8Array.from(
    storedHashHex.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || [],
  );

  const derivedHash = pbkdf2Sync(
    password,
    salt,
    iterations,
    storedHash.length,
    digest,
  );

  if (derivedHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(derivedHash, storedHash);
}

function verifyStoredAdminPassword(password: string, credentials: any): boolean {
  if (typeof credentials?.passwordHash === "string") {
    return verifyPassword(password, credentials.passwordHash);
  }

  // Übergang: alte Klartext-Datensätze noch akzeptieren
  if (typeof credentials?.password === "string") {
    return credentials.password === password;
  }

  return false;
}

function usesLegacyPlaintextPassword(credentials: any): boolean {
  return typeof credentials?.password === "string" &&
    typeof credentials?.passwordHash !== "string";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMultilineHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

// ==================== MIDDLEWARE ====================

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ==================== HEALTH ====================

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== IMMOBILIEN ROUTES ====================

app.get("/properties", async (c) => {
  try {
    const properties = await kv.getByPrefix("property_");

    const sortedProperties = properties.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ success: true, data: sortedProperties });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/properties/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const property = await kv.get(`property_${id}`);

    if (!property) {
      return c.json({ success: false, error: "Property not found" }, 404);
    }

    return c.json({ success: true, data: property });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/properties", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    const property = {
      id,
      title: body.title,
      type: body.type,
      location: body.location,
      price: body.price,
      size: body.size,
      rooms: body.rooms,
      description: body.description,
      features: body.features || [],
      imageUrl: body.imageUrl || "",
      status: body.status || "available",
      createdAt: new Date().toISOString(),
    };

    await kv.set(`property_${id}`, property);

    return c.json({ success: true, data: property }, 201);
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/properties/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const existingProperty = await kv.get(`property_${id}`);
    if (!existingProperty) {
      return c.json({ success: false, error: "Property not found" }, 404);
    }

    const updatedProperty = {
      ...existingProperty,
      ...body,
      id,
      createdAt: existingProperty.createdAt,
    };

    await kv.set(`property_${id}`, updatedProperty);

    return c.json({ success: true, data: updatedProperty });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/properties/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const existingProperty = await kv.get(`property_${id}`);
    if (!existingProperty) {
      return c.json({ success: false, error: "Property not found" }, 404);
    }

    await kv.del(`property_${id}`);

    return c.json({ success: true, message: "Property deleted" });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ADMIN CREDENTIALS ROUTES ====================

app.post("/admin/login", async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    const credentials = await kv.get("admin_credentials");

    if (!credentials) {
      return c.json(
        { success: false, error: "Keine Admin-Zugangsdaten konfiguriert" },
        404,
      );
    }

    const isValidUser = credentials.username === username;
    const isValidPassword = verifyStoredAdminPassword(password, credentials);

    if (isValidUser && isValidPassword) {
      // Alte Klartext-Datensätze beim ersten erfolgreichen Login automatisch auf Hash umstellen
      if (usesLegacyPlaintextPassword(credentials)) {
        await kv.set("admin_credentials", {
          username: credentials.username,
          passwordHash: hashPassword(password),
        });
      }

      return c.json({ success: true, message: "Login successful" });
    }

    return c.json({ success: false, error: "Invalid credentials" }, 401);
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/admin/credentials", async (c) => {
  try {
    const body = await c.req.json();
    const { currentPassword, newUsername, newPassword } = body;

    const credentials = await kv.get("admin_credentials");

    if (!credentials) {
      return c.json({ success: false, error: "No credentials found" }, 404);
    }

    if (!verifyStoredAdminPassword(currentPassword, credentials)) {
      return c.json(
        { success: false, error: "Current password is incorrect" },
        401,
      );
    }

    const updatedCredentials = {
      username: newUsername || credentials.username,
      passwordHash: newPassword
        ? hashPassword(newPassword)
        : usesLegacyPlaintextPassword(credentials)
        ? hashPassword(currentPassword)
        : credentials.passwordHash,
    };

    await kv.set("admin_credentials", updatedCredentials);

    return c.json({ success: true, message: "Credentials updated" });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/admin/change-password", async (c) => {
  try {
    const body = await c.req.json();
    const { currentPassword, newPassword } = body;

    const credentials = await kv.get("admin_credentials");

    if (!credentials) {
      return c.json({ success: false, message: "No credentials found" }, 404);
    }

    if (!verifyStoredAdminPassword(currentPassword, credentials)) {
      return c.json(
        { success: false, message: "Aktuelles Passwort ist falsch" },
        401,
      );
    }

    const updatedCredentials = {
      username: credentials.username,
      passwordHash: hashPassword(newPassword),
    };

    await kv.set("admin_credentials", updatedCredentials);

    return c.json({
      success: true,
      message: "Passwort erfolgreich geändert",
    });
  } catch (error) {
    return c.json({ success: false, message: String(error) }, 500);
  }
});

// ==================== REVIEWS MANAGEMENT ROUTES ====================

app.get("/reviews", async (c) => {
  try {
    const reviews = await kv.getByPrefix("review_");

    const sortedReviews = reviews.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ success: true, data: sortedReviews });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/reviews", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    const review = {
      id,
      author: body.author,
      rating: body.rating,
      text: body.text,
      date: body.date,
      avatarUrl: body.avatarUrl || "",
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`review_${id}`, review);

    return c.json({ success: true, data: review });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/reviews/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`review_${id}`);

    if (!existing) {
      return c.json({ success: false, error: "Review not found" }, 404);
    }

    const updated = {
      ...existing,
      ...body,
      id,
      createdAt: existing.createdAt,
    };

    await kv.set(`review_${id}`, updated);

    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/reviews/:id", async (c) => {
  try {
    const id = c.req.param("id");

    await kv.del(`review_${id}`);

    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ANALYTICS ROUTES ====================

app.post("/analytics/track", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    const clientIP =
      c.req.header("x-forwarded-for")?.split(",")[0].trim() ||
      c.req.header("x-real-ip") ||
      "unknown";

    let location = {
      country: "Unknown",
      city: "Unknown",
      countryCode: "XX",
    };

    if (
      clientIP &&
      clientIP !== "unknown" &&
      !clientIP.startsWith("127.") &&
      !clientIP.startsWith("192.168.")
    ) {
      try {
        const geoResponse = await fetch(`https://ipapi.co/${clientIP}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          location = {
            country: geoData.country_name || "Unknown",
            city: geoData.city || "Unknown",
            countryCode: geoData.country_code || "XX",
          };
        }
      } catch {
        // fallback
      }
    }

    const event = {
      id,
      ...body,
      location,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`analytics_${id}`, event);

    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/analytics/data", async (c) => {
  try {
    const events = await kv.getByPrefix("analytics_");

    const sortedEvents = events.sort((a, b) =>
      new Date(b.timestamp || b.createdAt).getTime() -
      new Date(a.timestamp || a.createdAt).getTime()
    );

    return c.json({ success: true, data: sortedEvents });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/analytics/stats", async (c) => {
  try {
    const events = await kv.getByPrefix("analytics_");

    const range = c.req.query("range") || "30d";
    const now = new Date();
    const startDate = new Date(now);

    switch (range) {
      case "24h":
        startDate.setHours(startDate.getHours() - 24);
        break;
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    const filteredEvents = events.filter((e) => {
      const eventDate = new Date(e.timestamp || e.createdAt);
      return eventDate >= startDate;
    });

    const pageViews = filteredEvents.filter((e) => e.type === "pageview");
    const uniqueVisitors = new Set(pageViews.map((e) => e.visitorId)).size;
    const sessions = new Set(pageViews.map((e) => e.sessionId)).size;

    const devices: Record<string, number> = {};
    pageViews.forEach((e) => {
      devices[e.deviceType] = (devices[e.deviceType] || 0) + 1;
    });

    const browsers: Record<string, number> = {};
    pageViews.forEach((e) => {
      browsers[e.browser] = (browsers[e.browser] || 0) + 1;
    });

    const pages: Record<string, number> = {};
    pageViews.forEach((e) => {
      pages[e.path] = (pages[e.path] || 0) + 1;
    });

    const topPages = Object.entries(pages)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const customEvents = filteredEvents.filter((e) => e.type === "event");
    const eventsByCategory: Record<string, number> = {};
    customEvents.forEach((e) => {
      eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1;
    });

    const dailyViews: Record<string, number> = {};
    pageViews.forEach((e) => {
      const date = new Date(e.timestamp || e.createdAt).toISOString().split("T")[0];
      dailyViews[date] = (dailyViews[date] || 0) + 1;
    });

    const countries: Record<string, number> = {};
    const cities: Record<string, { city: string; country: string; count: number }> = {};

    pageViews.forEach((e) => {
      if (e.location && e.location.country) {
        const country = e.location.country;
        const city = e.location.city || "Unknown";
        const cityKey = `${city}, ${country}`;

        countries[country] = (countries[country] || 0) + 1;

        if (!cities[cityKey]) {
          cities[cityKey] = { city, country, count: 0 };
        }
        cities[cityKey].count += 1;
      }
    });

    const topCountries = Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const topCities = Object.values(cities)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const stats = {
      range,
      totalPageViews: pageViews.length,
      uniqueVisitors,
      totalSessions: sessions,
      avgPageViewsPerSession: sessions > 0
        ? (pageViews.length / sessions).toFixed(2)
        : "0",
      devices,
      browsers,
      topPages,
      eventsByCategory,
      dailyViews,
      totalEvents: customEvents.length,
      topCountries: topCountries || [],
      topCities: topCities || [],
    };

    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/analytics/cleanup", async (c) => {
  try {
    const daysToKeep = parseInt(c.req.query("days") || "90");
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const events = await kv.getByPrefix("analytics_");
    const toDelete = events.filter((e) => {
      const eventDate = new Date(e.timestamp || e.createdAt);
      return eventDate < cutoffDate;
    });

    const deleteIds = toDelete.map((e) => `analytics_${e.id}`);
    if (deleteIds.length > 0) {
      await kv.mdel(deleteIds);
    }

    return c.json({ success: true, deleted: deleteIds.length });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== CONTACT EMAIL ROUTE ====================

app.post("/contact/send", async (c) => {
  try {
    const body = await c.req.json();
    const {
      firstname,
      lastname,
      email,
      phone,
      subject,
      message,
      recipientKey = "general",
      sendCopyToSender = true,
    } = body;

    if (!firstname || !lastname || !email || !subject || !message) {
      return c.json(
        {
          success: false,
          error: "Bitte fülle alle Pflichtfelder aus",
        },
        400,
      );
    }

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail credentials not configured");
      return c.json(
        {
          success: false,
          error:
            "E-Mail-Service ist nicht konfiguriert. Bitte kontaktiere uns direkt per E-Mail.",
        },
        500,
      );
    }

    const recipientMap: Record<string, string> = {
      general: "kontakt@aveyo.de",
      adrian: "nerhoff@aveyo.de",
      timo: "konrad@aveyo.de",
    };

    const targetEmail = recipientMap[String(recipientKey)] || recipientMap.general;

    const safeFirstname = escapeHtml(String(firstname));
    const safeLastname = escapeHtml(String(lastname));
    const safeEmail = escapeHtml(String(email));
    const safePhone = phone ? escapeHtml(String(phone)) : "";
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = formatMultilineHtml(String(message));
    const safeTargetEmail = escapeHtml(targetEmail);

    const nodemailer = await import("npm:nodemailer@6.9.8");

    const transporter = nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const sentAt = new Date().toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
    });

    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #172545; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Neue Kontaktanfrage</h1>
        </div>

        <div style="padding: 30px; background-color: #f5f5f5;">
          <h2 style="color: #172545; margin-top: 0;">Kontaktdaten</h2>

          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">${safeFirstname} ${safeLastname}</td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">E-Mail:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${safeEmail}" style="color: #172545;">${safeEmail}</a></td>
            </tr>
            ${
              safePhone
                ? `
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Telefon:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">${safePhone}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Betreff:</td>
              <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 15px; font-weight: bold;">Empfänger:</td>
              <td style="padding: 15px;">${safeTargetEmail}</td>
            </tr>
          </table>

          <h2 style="color: #172545; margin-top: 30px;">Nachricht</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; white-space: normal; line-height: 1.6;">
            ${safeMessage}
          </div>

          <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
            <strong>Tipp:</strong> Klicke auf "Antworten", um direkt dem Kunden zu antworten.
          </div>
        </div>

        <div style="padding: 20px; text-align: center; color: #586477; font-size: 12px;">
          <p>Diese E-Mail wurde über das Kontaktformular auf aveyo.de gesendet.</p>
          <p>Gesendet am: ${escapeHtml(sentAt)}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: gmailUser,
      to: targetEmail,
      replyTo: String(email),
      subject: `Neue Kontaktanfrage: ${String(subject)}`,
      html: internalHtml,
      text:
        `Neue Kontaktanfrage\n\n` +
        `Name: ${String(firstname)} ${String(lastname)}\n` +
        `E-Mail: ${String(email)}\n` +
        `${phone ? `Telefon: ${String(phone)}\n` : ""}` +
        `Betreff: ${String(subject)}\n` +
        `Empfänger: ${targetEmail}\n\n` +
        `Nachricht:\n${String(message)}`,
    });

    if (sendCopyToSender) {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #172545; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Vielen Dank für Ihre Nachricht</h1>
          </div>

          <div style="padding: 30px; background-color: #f5f5f5;">
            <p>Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich zurück.</p>
            <p><strong>Betreff:</strong> ${safeSubject}</p>
            <p><strong>Ihre Nachricht:</strong></p>
            <div style="background: white; padding: 20px; border-radius: 8px; white-space: normal; line-height: 1.6;">
              ${safeMessage}
            </div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: gmailUser,
        to: String(email),
        subject: `Kopie Ihrer Anfrage an AVEYO: ${String(subject)}`,
        html: customerHtml,
        text:
          `Vielen Dank für Ihre Nachricht.\n\n` +
          `Betreff: ${String(subject)}\n\n` +
          `Ihre Nachricht:\n${String(message)}`,
      });
    }

    console.log(`Contact form submitted by ${email} -> ${targetEmail}`);

    return c.json({
      success: true,
      message: "Nachricht erfolgreich gesendet",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return c.json(
      {
        success: false,
        error:
          "Fehler beim Senden der Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
      },
      500,
    );
  }
});

Deno.serve(app.fetch);