import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";

export function Contact() {
  return (
    <section id="kontakt" className="pt-40 pb-32 bg-[#172545] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Kontakt</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Nehmen Sie Kontakt mit uns auf - wir freuen uns auf Ihre Nachricht
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl mb-6 text-white">Senden Sie uns eine Nachricht</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option className="text-gray-900">Immobilien - Verkauf</option>
                  <option className="text-gray-900">Immobilien - Kauf</option>
                  <option className="text-gray-900">Versicherungsberatung</option>
                  <option className="text-gray-900">Allgemeine Anfrage</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                  placeholder="Ihre Nachricht..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Nachricht senden
              </button>
            </form>
          </div>

          {/* Contact Information */}
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
                    <a href="tel:+4989123456789" className="text-lg text-white/90 hover:text-white hover:underline">
                      +49 89 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#172545]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">E-Mail</div>
                    <a href="mailto:info@aveyo.de" className="text-lg text-white/90 hover:text-white hover:underline">
                      info@aveyo.de
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
                      Musterstraße 123<br />
                      80331 München
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
                      Mo - Fr: 9:00 - 18:00 Uhr<br />
                      Sa: 10:00 - 14:00 Uhr
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white border border-white/20">
              <h4 className="text-xl mb-3">Beratungstermin vereinbaren</h4>
              <p className="text-white/90 mb-6">
                Vereinbaren Sie noch heute einen persönlichen Beratungstermin - vor Ort oder online.
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