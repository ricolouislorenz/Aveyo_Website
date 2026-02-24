import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Home, Building2, TrendingUp, Key, Search, Calculator, ArrowRight, CheckCircle, ClipboardCheck, FileText, Shield, Target, MapPin, DollarSign, Lock, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { PropertiesShowcase } from "@/app/components/properties-showcase";
import { Link } from "react-router";

export function ImmobilienPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Blue background */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Dein Fundament für stabilen Vermögensaufbau
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Betongold ist mehr als nur ein Sprichwort. Eine Immobilie als Kapitalanlage ist ein bewährter Baustein für finanzielle Stabilität und langfristigen Wohlstand.
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Immobilien als Kapitalanlage */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                  Immobilien als Kapitalanlage
                </h2>
                <p className="text-xl text-[#586477] max-w-3xl mx-auto leading-relaxed">
                  Warum in Immobilien investieren? Weil sie eine einzigartige Kombination aus Vorteilen bieten, die andere Anlageklassen oft nicht haben.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Stabiler Cashflow</h3>
                  <p className="text-white/80 leading-relaxed">
                    Mieteinnahmen sorgen für ein regelmäßiges, passives Einkommen, das dir Monat für Monat finanzielle Sicherheit gibt.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Inflationsschutz</h3>
                  <p className="text-white/80 leading-relaxed">
                    Mieten und Immobilienwerte steigen in der Regel mit der Inflation. Dein investiertes Kapital und deine Erträge bleiben also wertstabil.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Wertsteigerungspotenzial</h3>
                  <p className="text-white/80 leading-relaxed">
                    Gut ausgewählte Immobilien in den richtigen Lagen gewinnen über die Jahre an Wert. Das ist dein langfristiger Vermögens-Booster.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Steuerliche Vorteile</h3>
                  <p className="text-white/80 leading-relaxed">
                    Als Kapitalanleger profitierst du von verschiedenen steuerlichen Gestaltungsmöglichkeiten, die deine Rendite optimieren.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="left" />
        </section>

        {/* Immobilien-Strategie */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">
                  Unsere Immobilien-Strategie
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Wir verkaufen dir keine beliebige Wohnung. Wir entwickeln mit dir eine Strategie, die zu deinem Leben und deinen finanziellen Zielen passt. Unser Ansatz ist datengetrieben und fokussiert.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl mb-3 text-white font-semibold">Standortanalyse</h3>
                      <p className="text-white/80 leading-relaxed">
                        Wir setzen auf A- und B-Lagen in wachsenden Metropolregionen. Denn die Lage entscheidet über die langfristige Wertentwicklung und Vermietbarkeit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl mb-3 text-white font-semibold">Objektprüfung</h3>
                      <p className="text-white/80 leading-relaxed">
                        Jede Immobilie wird von uns auf Herz und Nieren geprüft – von der Bausubstanz bis zum wirtschaftlichen Potenzial.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl mb-3 text-white font-semibold">Finanzierungs-Check</h3>
                      <p className="text-white/80 leading-relaxed">
                        Wir sorgen für eine solide Finanzierungsstruktur, die zu deiner Bonität passt und finanzielle Puffer für Unvorhergesehenes berücksichtigt.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl mb-3 text-white font-semibold">Renditeberechnung</h3>
                      <p className="text-white/80 leading-relaxed">
                        Keine Milchmädchenrechnungen. Du erhältst eine transparente Kalkulation der Netto-Rendite nach allen Kosten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="right" />
        </section>

        {/* Off-Market Immobilien */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Centered Title Only */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-[#172545] font-bold leading-tight">
                  Exklusiver Zugang: Off-Market-Immobilien
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
                {/* Image - Left Side */}
                <div className="lg:w-1/2 flex justify-start">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNsdXNpdmUlMjByZWFsJTIwZXN0YXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTI1NTYyNXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Off-Market Immobilien"
                    className="w-full max-w-[450px] aspect-square rounded-3xl shadow-2xl object-cover"
                  />
                </div>

                {/* Text Content - Right Side */}
                <div className="lg:w-1/2">
                  <p className="text-lg mb-6 text-[#586477] leading-relaxed">
                    Die besten Deals findest du selten auf den großen Online-Portalen. Dort ist die Konkurrenz hoch und die Preise sind oft schon ausgereizt.
                  </p>
                  <p className="text-lg mb-6 text-[#586477] leading-relaxed">
                    Dank unseres starken Netzwerks aus Projektentwicklern, Banken und lokalen Partnern haben wir Zugang zu Off-Market-Immobilien – Objekte, die nie öffentlich zum Verkauf angeboten werden.
                  </p>
                  
                  <div className="bg-[#172545]/5 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xl font-semibold text-[#172545] mb-4">Dein Vorteil:</h4>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#172545] flex-shrink-0 mt-1" />
                      <div>
                        <h5 className="font-semibold text-[#172545] mb-1">Weniger Wettbewerb</h5>
                        <p className="text-[#586477]">Du agierst ohne den Druck von Massenbesichtigungen.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#172545] flex-shrink-0 mt-1" />
                      <div>
                        <h5 className="font-semibold text-[#172545] mb-1">Attraktivere Konditionen</h5>
                        <p className="text-[#586477]">Oft können wir bessere Kaufpreise und Bedingungen für dich verhandeln.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#172545] flex-shrink-0 mt-1" />
                      <div>
                        <h5 className="font-semibold text-[#172545] mb-1">Geprüfte Qualität</h5>
                        <p className="text-[#586477]">Wir bekommen nur Objekte angeboten, die bereits eine erste Qualitätsprüfung durch unsere Partner bestanden haben.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="left" />
        </section>

        {/* Aktuelle Angebote */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">
                Aktuelle Angebote
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Entdecke unsere sorgfältig geprüften Kapitalanlage-Immobilien
              </p>
            </div>

            <PropertiesShowcase />
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="right" />
        </section>

        {/* Die Immobilie im Finanzplan */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                  Die Immobilie im Finanzplan
                </h2>
                <p className="text-xl text-[#586477] max-w-3xl mx-auto leading-relaxed">
                  Eine Immobilie ist kein isoliertes Investment. Sie ist ein zentraler Bestandteil deines gesamten Finanzplans. Wir stellen sicher, dass alles nahtlos ineinandergreift.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-[#172545]/10 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-3">Ganzheitliche Planung</h3>
                  <p className="text-[#586477] leading-relaxed">
                    Passt die monatliche Belastung zu deinem Cashflow? Wie beeinflusst die Immobilie deine Altersvorsorge oder andere Sparziele? Wir betrachten das große Ganze.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-[#172545]/10 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-3">Risikomanagement</h3>
                  <p className="text-[#586477] leading-relaxed">
                    Was passiert bei Mietausfall oder unvorhergesehenen Reparaturen? Wir planen Puffer und Absicherungen ein, damit dein Fundament nicht ins Wanken gerät.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-[#172545]/10 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-3">Exit-Strategie</h3>
                  <p className="text-[#586477] leading-relaxed">
                    Wir denken von Anfang an mit dir darüber nach, wann und wie ein späterer Verkauf sinnvoll sein könnte, um Gewinne zu realisieren.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="center" />
        </section>

        {/* CTA Section */}
        <section className="relative bg-[#172545] py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">
                Bereit, dein Fundament zu legen?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Lass uns darüber sprechen, wie eine Kapitalanlage-Immobilie dein Portfolio perfekt ergänzen kann. Sicher, rentabel und strategisch durchdacht.
              </p>
              <Link
                to="/termin"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl text-lg font-semibold"
              >
                Termin vereinbaren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="white" />
    </div>
  );
}