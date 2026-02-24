import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Calendar, CheckCircle, ArrowRight } from "lucide-react";

export function TerminPage() {
  const handleBooking = () => {
    window.open("https://cal.meetergo.com/team/aveyo/kostenloses-erstgesprach", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Termin vereinbaren
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Buche jetzt dein persönliches Beratungsgespräch – kostenlos und unverbindlich
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Info Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Info Box */}
              <div className="bg-gradient-to-br from-[#172545]/5 to-[#172545]/10 rounded-2xl p-8 md:p-12 mb-12 border border-[#172545]/10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#172545] mb-6 text-center">
                  So läuft's ab
                </h2>
                <ul className="space-y-4 text-lg text-[#586477]">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="flex-shrink-0 w-7 h-7 text-[#172545] mt-1" />
                    <span>Klicke auf den Button "Termin buchen" und wähle deinen Wunschtermin aus den verfügbaren Zeiten</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="flex-shrink-0 w-7 h-7 text-[#172545] mt-1" />
                    <span>Gib deine Kontaktdaten ein – deine Daten werden sicher und vertraulich behandelt</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="flex-shrink-0 w-7 h-7 text-[#172545] mt-1" />
                    <span>Du erhältst sofort eine Bestätigung per E-Mail mit allen Details und einem Kalender-Eintrag</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="flex-shrink-0 w-7 h-7 text-[#172545] mt-1" />
                    <span>Wir freuen uns auf das Gespräch mit dir – online oder persönlich vor Ort</span>
                  </li>
                </ul>
              </div>

              {/* CTA Box with Button */}
              <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl shadow-2xl overflow-hidden p-12 md:p-16 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Bereit für dein kostenloses Erstgespräch?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Wähle jetzt deinen Wunschtermin und starte in deine finanzielle Zukunft.
                  </p>

                  {/* Main Booking Button */}
                  <button
                    onClick={handleBooking}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-xl hover:shadow-2xl hover:scale-105 transform"
                  >
                    <Calendar className="w-6 h-6" />
                    Termin buchen
                    <ArrowRight className="w-6 h-6" />
                  </button>

                  <p className="text-white/70 mt-6 text-sm">
                    Das Buchungsfenster öffnet sich in einem neuen Tab
                  </p>
                  
                  <div className="mt-12 pt-8 border-t border-white/20">
                    <div className="grid md:grid-cols-3 gap-6 text-white/80">
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">100%</div>
                        <div className="text-base">Kostenlos</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">30-60 Min</div>
                        <div className="text-base">Beratungsdauer</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">Flexibel</div>
                        <div className="text-base">Online oder vor Ort</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <p className="text-lg text-[#586477] leading-relaxed">
                  Keine versteckten Kosten, keine Verpflichtungen. Wir nehmen uns Zeit für dich und deine Fragen.
                </p>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="right" />
        </section>

        {/* What to expect Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold leading-tight">
                  Was dich im Gespräch erwartet
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Ein lockeres, persönliches Gespräch auf Augenhöhe – ohne Verkaufsdruck
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-4">Kennenlernen</h3>
                  <p className="text-white/80 leading-relaxed">
                    Wir lernen uns kennen und sprechen über deine aktuelle Situation, deine Ziele und Wünsche.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-4">Bedarfsanalyse</h3>
                  <p className="text-white/80 leading-relaxed">
                    Gemeinsam schauen wir, wo du stehst und welche Themen für dich gerade relevant sind.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-4">Erste Einschätzung</h3>
                  <p className="text-white/80 leading-relaxed">
                    Du bekommst eine erste, ehrliche Einschätzung zu deiner Finanz- und Versicherungssituation.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-4">Nächste Schritte</h3>
                  <p className="text-white/80 leading-relaxed">
                    Wir besprechen gemeinsam, wie es weitergehen kann – ganz ohne Druck oder Verpflichtung.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
        </section>

        {/* Final CTA Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold leading-tight">
                Lass uns loslegen!
              </h2>
              <p className="text-xl text-[#586477] mb-10 leading-relaxed">
                Buche jetzt deinen Termin und finde heraus, wie wir dir helfen können.
              </p>
              <button
                onClick={handleBooking}
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#172545] text-white rounded-xl hover:bg-[#2a3f6f] transition-all duration-300 font-bold text-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Calendar className="w-6 h-6" />
                Jetzt Termin buchen
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="blue" />
    </div>
  );
}
