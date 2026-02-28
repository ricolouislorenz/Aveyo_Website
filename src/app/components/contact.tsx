import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";

const CONTACT_ENDPOINT =
  "https://hoaidflzabvrsubatjbw.supabase.co/functions/v1/make-server/contact/send";

export function Contact() {
  const [recipientKey, setRecipientKey] = useState<"general" | "adrian" | "timo">("general");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Immobilien - Verkauf",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get("recipient");

    if (recipient === "adrian" || recipient === "timo" || recipient === "general") {
      setRecipientKey(recipient);
    }
  }, []);

  const recipientLabel =
    recipientKey === "adrian"
      ? "Ihre Nachricht geht direkt an Adrian Nerhoff."
      : recipientKey === "timo"
      ? "Ihre Nachricht geht direkt an Timo Konrad."
      : "Ihre Nachricht geht an kontakt@aveyo.de.";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const trimmedName = formData.name.trim();
      const nameParts = trimmedName.split(/\s+/).filter(Boolean);

      const firstname = nameParts[0] || trimmedName;
      const lastname = nameParts.slice(1).join(" ") || "-";

      const payload = {
        firstname,
        lastname,
        email: formData.email.trim(),
        phone: "",
        subject: formData.subject,
        message: formData.message.trim(),
        recipientKey,
        sendCopyToSender: true,
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Nachricht konnte nicht gesendet werden");
      }

      setSuccessMessage("Nachricht erfolgreich gesendet.");
      setFormData({
        name: "",
        email: "",
        subject: "Immobilien - Verkauf",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Verbindungsfehler beim Senden"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="pt-40 pb-32 bg-[#172545] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Kontakt</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Nehmen Sie Kontakt mit uns auf - wir freuen uns auf Ihre Nachricht
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl mb-3 text-white">
              Senden Sie uns eine Nachricht
            </h3>

            <p className="text-white/80 mb-6 text-sm">
              {recipientLabel}
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Betreff
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="Immobilien - Verkauf" className="text-gray-900">
                    Immobilien - Verkauf
                  </option>
                  <option value="Immobilien - Kauf" className="text-gray-900">
                    Immobilien - Kauf
                  </option>
                  <option
                    value="Versicherungsberatung"
                    className="text-gray-900"
                  >
                    Versicherungsberatung
                  </option>
                  <option value="Allgemeine Anfrage" className="text-gray-900">
                    Allgemeine Anfrage
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                  placeholder="Ihre Nachricht..."
                />
              </div>

              {successMessage && (
                <div className="rounded-lg bg-green-500/20 border border-green-300/30 px-4 py-3 text-green-100">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-lg bg-red-500/20 border border-red-300/30 px-4 py-3 text-red-100">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6 text-white">Kontaktinformationen</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#172545]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Telefon</div>
                    <a
                      href="tel:+494065055720"
                      className="text-lg text-white/90 hover:text-white hover:underline"
                    >
                      +49 40 650 557 20
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#172545]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">E-Mail</div>
                    <a
                      href="mailto:kontakt@aveyo.de"
                      className="text-lg text-white/90 hover:text-white hover:underline"
                    >
                      kontakt@aveyo.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#172545]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Adresse</div>
                    <div className="text-lg text-white/90">
                      Hartwicusstraße 3
                      <br />
                      22087 Hamburg
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#172545]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Öffnungszeiten</div>
                    <div className="text-lg text-white/90">
                      Mo - Fr: 9:00 - 18:00 Uhr
                      <br />
                      Sa: 10:00 - 14:00 Uhr
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white border border-white/20">
              <h4 className="text-xl mb-3">Beratungstermin vereinbaren</h4>
              <p className="text-white/90 mb-6">
                Vereinbaren Sie noch heute einen persönlichen Beratungstermin -
                vor Ort oder online.
              </p>
              <button className="px-6 py-3 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                Termin buchen
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
    </section>
  );
}