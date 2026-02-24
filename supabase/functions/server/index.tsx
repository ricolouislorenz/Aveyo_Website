import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
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

// Health check endpoint
app.get("/make-server-78b4cf15/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize admin credentials (call this once to set up default credentials)
app.post("/make-server-78b4cf15/admin/init", async (c) => {
  try {
    const existingCredentials = await kv.get("admin_credentials");
    
    if (existingCredentials) {
      return c.json({ 
        success: true, 
        message: "Credentials already initialized",
        username: existingCredentials.username 
      });
    }
    
    // Create default credentials
    const defaultCredentials = { username: "admin", password: "aveyo2024" };
    await kv.set("admin_credentials", defaultCredentials);
    
    return c.json({ 
      success: true, 
      message: "Default credentials created: admin/aveyo2024" 
    });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Seed sample properties (for testing)
app.post("/make-server-78b4cf15/admin/seed", async (c) => {
  try {
    // Check if properties already exist
    const existingProperties = await kv.getByPrefix("property_");
    if (existingProperties.length > 0) {
      return c.json({ 
        success: true, 
        message: `${existingProperties.length} properties already exist` 
      });
    }
    
    // Sample properties
    const sampleProperties = [
      {
        title: "Moderne 3-Zimmer Wohnung in München",
        type: "Eigentumswohnung",
        location: "München - Schwabing",
        price: 450000,
        size: 85,
        rooms: 3,
        description: "Helle und moderne 3-Zimmer-Wohnung in bester Lage von München-Schwabing. Mit Balkon und Einbauküche.",
        features: ["Balkon", "Einbauküche", "Tiefgarage", "Fußbodenheizung"],
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
        status: "available" as const,
      },
      {
        title: "Einfamilienhaus mit Garten",
        type: "Einfamilienhaus",
        location: "München - Perlach",
        price: 850000,
        size: 150,
        rooms: 5,
        description: "Großzügiges Einfamilienhaus mit sonnigem Garten und Garage in ruhiger Wohnlage.",
        features: ["Garten", "Garage", "Keller", "Terrasse"],
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        status: "available" as const,
      },
      {
        title: "Penthouse mit Dachterrasse",
        type: "Eigentumswohnung",
        location: "München - Maxvorstadt",
        price: 1200000,
        size: 120,
        rooms: 4,
        description: "Exklusives Penthouse mit großer Dachterrasse und herrlichem Ausblick über München.",
        features: ["Dachterrasse", "Aufzug", "Smart Home", "Klimaanlage"],
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        status: "available" as const,
      },
      {
        title: "Gewerbeimmobilie im Zentrum",
        type: "Gewerbeimmobilie",
        location: "München - Innenstadt",
        price: 2500000,
        size: 300,
        rooms: 8,
        description: "Repräsentative Gewerbeimmobilie in Top-Lage mit hoher Laufkundschaft.",
        features: ["Schaufenster", "Lager", "Büroflächen", "Parkplätze"],
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        status: "available" as const,
      },
      {
        title: "Neubau-Projekt in Planung",
        type: "Neubau-Projekt",
        location: "München - Riem",
        price: 380000,
        size: 75,
        rooms: 2,
        description: "Moderne Neubauwohnungen mit höchstem Energiestandard. Fertigstellung 2025.",
        features: ["Neubau", "KfW 40", "Smart Home", "Tiefgarage"],
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        status: "available" as const,
      },
    ];
    
    // Create all properties
    for (const prop of sampleProperties) {
      const id = crypto.randomUUID();
      const property = {
        id,
        ...prop,
        createdAt: new Date().toISOString(),
      };
      await kv.set(`property_${id}`, property);
    }
    
    return c.json({ 
      success: true, 
      message: `Seeded ${sampleProperties.length} sample properties` 
    });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== IMMOBILIEN ROUTES ====================

// Get all properties
app.get("/make-server-78b4cf15/properties", async (c) => {
  try {
    const properties = await kv.getByPrefix("property_");
    
    // Sort by creation date (newest first)
    const sortedProperties = properties.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ success: true, data: sortedProperties });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single property by ID
app.get("/make-server-78b4cf15/properties/:id", async (c) => {
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

// Create new property
app.post("/make-server-78b4cf15/properties", async (c) => {
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

// Update property
app.put("/make-server-78b4cf15/properties/:id", async (c) => {
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
      id, // Ensure ID doesn't change
      createdAt: existingProperty.createdAt, // Preserve creation date
    };
    
    await kv.set(`property_${id}`, updatedProperty);
    
    return c.json({ success: true, data: updatedProperty });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete property
app.delete("/make-server-78b4cf15/properties/:id", async (c) => {
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

// Get admin credentials (for login verification)
app.post("/make-server-78b4cf15/admin/login", async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;
    
    // Get stored credentials
    let credentials = await kv.get("admin_credentials");
    
    // If no credentials exist, create default (admin/aveyo2024)
    if (!credentials) {
      credentials = { username: "admin", password: "aveyo2024" };
      await kv.set("admin_credentials", credentials);
    }
    
    // Verify credentials
    if (credentials.username === username && credentials.password === password) {
      return c.json({ success: true, message: "Login successful" });
    } else {
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update admin credentials
app.put("/make-server-78b4cf15/admin/credentials", async (c) => {
  try {
    const body = await c.req.json();
    const { currentPassword, newUsername, newPassword } = body;
    
    // Get stored credentials
    const credentials = await kv.get("admin_credentials");
    
    if (!credentials) {
      return c.json({ success: false, error: "No credentials found" }, 404);
    }
    
    // Verify current password
    if (credentials.password !== currentPassword) {
      return c.json({ success: false, error: "Current password is incorrect" }, 401);
    }
    
    // Update credentials
    const newCredentials = {
      username: newUsername || credentials.username,
      password: newPassword || credentials.password,
    };
    
    await kv.set("admin_credentials", newCredentials);
    
    return c.json({ success: true, message: "Credentials updated" });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Change admin password (dedicated route)
app.post("/make-server-78b4cf15/admin/change-password", async (c) => {
  try {
    const body = await c.req.json();
    const { currentPassword, newPassword } = body;
    
    // Get stored credentials
    const credentials = await kv.get("admin_credentials");
    
    if (!credentials) {
      return c.json({ success: false, message: "No credentials found" }, 404);
    }
    
    // Verify current password
    if (credentials.password !== currentPassword) {
      return c.json({ success: false, message: "Aktuelles Passwort ist falsch" }, 401);
    }
    
    // Update password
    const updatedCredentials = {
      username: credentials.username,
      password: newPassword,
    };
    
    await kv.set("admin_credentials", updatedCredentials);
    
    return c.json({ 
      success: true, 
      message: "Passwort erfolgreich geändert" 
    });
  } catch (error) {
    return c.json({ success: false, message: String(error) }, 500);
  }
});

// ==================== REVIEWS MANAGEMENT ROUTES ====================

// Get all reviews
app.get("/make-server-78b4cf15/reviews", async (c) => {
  try {
    const reviews = await kv.getByPrefix("review_");
    
    // Sort by creation date (newest first)
    const sortedReviews = reviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ success: true, data: sortedReviews });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create new review
app.post("/make-server-78b4cf15/reviews", async (c) => {
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

// Update review
app.put("/make-server-78b4cf15/reviews/:id", async (c) => {
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
      id, // Keep original ID
      createdAt: existing.createdAt, // Keep original creation date
    };
    
    await kv.set(`review_${id}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete review
app.delete("/make-server-78b4cf15/reviews/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    await kv.del(`review_${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Analytics Tracking Routes
// Track analytics event
app.post("/make-server-78b4cf15/analytics/track", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    
    // Get client IP address for geolocation
    const clientIP = c.req.header('x-forwarded-for')?.split(',')[0].trim() 
                     || c.req.header('x-real-ip') 
                     || 'unknown';
    
    // Fetch geolocation data from IP (DSGVO-compliant: we don't store the IP, only location)
    let location = {
      country: 'Unknown',
      city: 'Unknown',
      countryCode: 'XX',
    };
    
    if (clientIP && clientIP !== 'unknown' && !clientIP.startsWith('127.') && !clientIP.startsWith('192.168.')) {
      try {
        // Using ipapi.co free tier (1000 requests/day, no API key needed)
        const geoResponse = await fetch(`https://ipapi.co/${clientIP}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          location = {
            country: geoData.country_name || 'Unknown',
            city: geoData.city || 'Unknown',
            countryCode: geoData.country_code || 'XX',
          };
        }
      } catch (geoError) {
        // Continue with default location
      }
    }
    
    const event = {
      id,
      ...body,
      location, // Add location data
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`analytics_${id}`, event);
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get analytics data with filters
app.get("/make-server-78b4cf15/analytics/data", async (c) => {
  try {
    const events = await kv.getByPrefix("analytics_");
    
    // Sort by timestamp (newest first)
    const sortedEvents = events.sort((a, b) => 
      new Date(b.timestamp || b.createdAt).getTime() - new Date(a.timestamp || a.createdAt).getTime()
    );
    
    return c.json({ success: true, data: sortedEvents });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get analytics summary/stats
app.get("/make-server-78b4cf15/analytics/stats", async (c) => {
  try {
    const events = await kv.getByPrefix("analytics_");
    
    // Filter by time range if provided
    const range = c.req.query("range") || "30d";
    const now = new Date();
    let startDate = new Date(now);
    
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
    
    // Calculate statistics
    const pageViews = filteredEvents.filter((e) => e.type === "pageview");
    const uniqueVisitors = new Set(pageViews.map((e) => e.visitorId)).size;
    const sessions = new Set(pageViews.map((e) => e.sessionId)).size;
    
    // Device breakdown
    const devices: Record<string, number> = {};
    pageViews.forEach((e) => {
      devices[e.deviceType] = (devices[e.deviceType] || 0) + 1;
    });
    
    // Browser breakdown
    const browsers: Record<string, number> = {};
    pageViews.forEach((e) => {
      browsers[e.browser] = (browsers[e.browser] || 0) + 1;
    });
    
    // Top pages
    const pages: Record<string, number> = {};
    pageViews.forEach((e) => {
      pages[e.path] = (pages[e.path] || 0) + 1;
    });
    
    const topPages = Object.entries(pages)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Events breakdown
    const customEvents = filteredEvents.filter((e) => e.type === "event");
    const eventsByCategory: Record<string, number> = {};
    customEvents.forEach((e) => {
      eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1;
    });
    
    // Daily pageviews (last 30 days)
    const dailyViews: Record<string, number> = {};
    pageViews.forEach((e) => {
      const date = new Date(e.timestamp || e.createdAt).toISOString().split("T")[0];
      dailyViews[date] = (dailyViews[date] || 0) + 1;
    });
    
    // Location breakdown (countries and cities)
    const countries: Record<string, number> = {};
    const cities: Record<string, { city: string; country: string; count: number }> = {};
    
    pageViews.forEach((e) => {
      if (e.location && e.location.country) {
        const country = e.location.country;
        const city = e.location.city || 'Unknown';
        const cityKey = `${city}, ${country}`;
        
        countries[country] = (countries[country] || 0) + 1;
        
        if (!cities[cityKey]) {
          cities[cityKey] = { city, country, count: 0 };
        }
        cities[cityKey].count += 1;
      }
    });
    
    // Top 10 countries
    const topCountries = Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Top 10 cities
    const topCities = Object.values(cities)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    const stats = {
      range,
      totalPageViews: pageViews.length,
      uniqueVisitors,
      totalSessions: sessions,
      avgPageViewsPerSession: sessions > 0 ? (pageViews.length / sessions).toFixed(2) : "0",
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

// Delete old analytics data (GDPR compliance)
app.delete("/make-server-78b4cf15/analytics/cleanup", async (c) => {
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

// Send contact form email via Gmail
app.post("/make-server-78b4cf15/contact/send", async (c) => {
  try {
    const body = await c.req.json();
    const { firstname, lastname, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!firstname || !lastname || !email || !subject || !message) {
      return c.json({ 
        success: false, 
        error: "Bitte fülle alle Pflichtfelder aus" 
      }, 400);
    }
    
    // Get Gmail credentials from environment
    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");
    
    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail credentials not configured");
      return c.json({ 
        success: false, 
        error: "E-Mail-Service ist nicht konfiguriert. Bitte kontaktiere uns direkt per E-Mail." 
      }, 500);
    }
    
    // Import nodemailer (npm: specifier for Deno)
    const nodemailer = await import("npm:nodemailer@6.9.8");
    
    // Create transporter
    const transporter = nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });
    
    // Email content to AVEYO
    const mailOptions = {
      from: gmailUser,
      to: gmailUser, // Send to your own Gmail
      replyTo: email, // Set reply-to as customer email
      subject: `Neue Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #172545; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Neue Kontaktanfrage</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f5f5f5;">
            <h2 style="color: #172545; margin-top: 0;">Kontaktdaten</h2>
            
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">${firstname} ${lastname}</td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">E-Mail:</td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #172545;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Telefon:</td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;"><a href="tel:${phone}" style="color: #172545;">${phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Betreff:</td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">${subject}</td>
              </tr>
            </table>
            
            <h2 style="color: #172545; margin-top: 30px;">Nachricht</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">
              ${message}
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <strong>Tipp:</strong> Klicke auf "Antworten", um direkt dem Kunden zu antworten.
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #586477; font-size: 12px;">
            <p>Diese E-Mail wurde über das Kontaktformular auf aveyo.de gesendet.</p>
            <p>Gesendet am: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
          </div>
        </div>
      `,
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Log successful contact submission
    console.log(`Contact form submitted by ${email} - Subject: ${subject}`);
    
    return c.json({ 
      success: true, 
      message: "Nachricht erfolgreich gesendet" 
    });
    
  } catch (error) {
    console.error("Error sending contact email:", error);
    return c.json({ 
      success: false, 
      error: "Fehler beim Senden der Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail." 
    }, 500);
  }
});

Deno.serve(app.fetch);