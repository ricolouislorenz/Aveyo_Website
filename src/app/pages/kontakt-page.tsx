import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function KontaktPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "Allgemeine Anfrage",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15/contact/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei dir.",
        });
        // Reset form
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          subject: "Allgemeine Anfrage",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es erneut.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#172545] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl mb-6 text-white">
                Kontaktieren Sie uns
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Wir freuen uns auf Ihre Nachricht und beraten Sie gerne persönlich zu allen Fragen rund um Investment, Immobilien und Vorsorge
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-[#0d1a30] rounded-2xl p-8 border border-[#172545]/20">
                <h3 className="text-2xl mb-6 text-white">Senden Sie uns eine Nachricht</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstname" className="block text-white mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        placeholder="Max"
                        value={formData.firstname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname" className="block text-white mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        placeholder="Mustermann"
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="max.mustermann@email.de"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="+49 123 456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">
                      Betreff *
                    </label>
                    <select
                      id="subject"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option className="text-gray-900">Immobilien - Verkauf</option>
                      <option className="text-gray-900">Immobilien - Kauf</option>
                      <option className="text-gray-900">Investment - Beratung</option>
                      <option className="text-gray-900">Vorsorge - Privatpersonen</option>
                      <option className="text-gray-900">Vorsorge - Unternehmer</option>
                      <option className="text-gray-900">Allgemeine Anfrage</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                      placeholder="Beschreiben Sie uns Ihr Anliegen..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-semibold flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Senden..." : "Nachricht senden"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  {submitStatus && (
                    <div
                      className={`mt-4 px-4 py-3 rounded-lg ${
                        submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-6 text-[#172545]">Kontaktinformationen</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#172545] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#172545] font-semibold mb-1">Telefon</div>
                        <a href="tel:+4989123456789" className="text-lg text-[#586477] hover:text-[#172545] hover:underline">
                          +49 89 123 456 789
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#172545] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#172545] font-semibold mb-1">E-Mail</div>
                        <a href="mailto:info@aveyo.de" className="text-lg text-[#586477] hover:text-[#172545] hover:underline">
                          info@aveyo.de
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#172545] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#172545] font-semibold mb-1">Adresse</div>
                        <div className="text-lg text-[#586477]">
                          Musterstraße 123<br />
                          80331 München
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#172545] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#172545] font-semibold mb-1">Öffnungszeiten</div>
                        <div className="text-lg text-[#586477]">
                          Mo - Fr: 9:00 - 18:00 Uhr<br />
                          Sa: 10:00 - 14:00 Uhr
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#172545] rounded-2xl p-8 text-white">
                  <h4 className="text-xl mb-3 font-semibold">Beratungstermin vereinbaren</h4>
                  <p className="text-white/90 mb-6">
                    Vereinbaren Sie noch heute einen persönlichen Beratungstermin - vor Ort oder online.
                  </p>
                  <Link 
                    to="/termin"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-semibold"
                  >
                    Termin buchen
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="bg-gray-100 rounded-2xl p-8">
                  <h4 className="text-xl mb-3 text-[#172545] font-semibold">Kostenloses Finanzgutachten</h4>
                  <p className="text-[#586477] mb-6">
                    Erhalten Sie eine kostenlose Analyse Ihrer aktuellen Finanzsituation und entdecken Sie Optimierungspotenziale.
                  </p>
                  <Link
                    to="/termin"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-lg hover:bg-[#0d1a30] transition-colors shadow-lg font-semibold"
                  >
                    Jetzt Finanzgutachten starten
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="blue" />
    </div>
  );
}