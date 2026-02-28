import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { TrendingUp, Shield, Target, BarChart3, Globe, DollarSign, LineChart, CheckCircle, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "react-router";

export function InvestmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Blue background */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Dein Vermögen.<br />Wissenschaftlich fundiert.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Während die Inflation dein Geld entwertet,<br />sorgen wir dafür, dass dein Vermögen für dich arbeitet.
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Investment Philosophie */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                  Unsere Investment-Philosophie
                </h2>
                <p className="text-xl text-[#586477] max-w-3xl mx-auto leading-relaxed">
                  Wir glauben nicht an die Glaskugel. Niemand kann die Zukunft vorhersagen – weder wir noch die "Gurus" an der Wall Street. Deshalb basieren unsere Strategien auf Evidenz, nicht auf Spekulation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Prognosefrei investieren</h3>
                  <p className="text-white/80 leading-relaxed">
                    Wir versuchen nicht, den Markt zu schlagen (was langfristig fast niemand schafft), sondern die Marktrendite effizient einzufangen.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Kosten minimieren</h3>
                  <p className="text-white/80 leading-relaxed">
                    Jeder Euro, den du an Gebühren sparst, ist ein Euro mehr Rendite für dich. Wir nutzen kosteneffiziente Lösungen, um deinen Zinseszinseffekt zu maximieren.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 font-semibold">Disziplin statt Emotionen</h3>
                  <p className="text-white/80 leading-relaxed">
                    Die Börse schwankt. Das ist normal. Wir helfen dir, Kurs zu halten und rationale Entscheidungen zu treffen, wenn andere nervös werden.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="right" />
        </section>

        {/* ETFs Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Centered Title Only */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-white font-bold leading-tight">
                  Globale Indexfonds (ETFs)
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
                {/* Image - Left Side */}
                <div className="lg:w-1/2 flex justify-start">
                  <ImageWithFallback
                    src="/images/etf.png"
                    alt="Globale Diversifikation"
                    className="w-full max-w-[450px] aspect-square rounded-3xl shadow-2xl object-cover"
                  />
                </div>

                {/* Text Content - Right Side */}
                <div className="lg:w-1/2 text-white">
                  <p className="text-xl mb-6 text-white/90 italic">
                    Warum die Nadel im Heuhaufen suchen, wenn man einfach den ganzen Heuhaufen kaufen kann?
                  </p>
                  <p className="text-lg mb-6 leading-relaxed text-white/80">
                    Statt auf einzelne Aktien zu wetten, setzen wir auf globale Diversifikation. Mit Indexfonds (ETFs) investierst du in tausende von Unternehmen weltweit – gleichzeitig.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-white/90 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Maximale Streuung</h4>
                        <p className="text-white/70">Du bist nicht abhängig vom Erfolg einer einzelnen Firma oder Region. Geht es einem Unternehmen schlecht, fangen die anderen das auf.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-white/90 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Hohe Liquidität</h4>
                        <p className="text-white/70">Dein Geld ist flexibel verfügbar. Kein Festgeld, keine langen Kündigungsfristen.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-white/90 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Transparenz</h4>
                        <p className="text-white/70">Du weißt immer genau, worin du investiert bist.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
        </section>

        {/* Vanguard Partnership */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                  Starke Partner: Unsere Zusammenarbeit mit Vanguard
                </h2>
                <p className="text-xl text-[#586477] max-w-3xl mx-auto leading-relaxed">
                  Für dein Geld wollen wir nur das Beste. Deshalb arbeiten wir strategisch mit Vanguard zusammen, einem der größten und vertrauenswürdigsten Vermögensverwalter der Welt.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 md:p-12 mb-12">
                <h3 className="text-3xl text-[#172545] mb-8 font-bold text-center">Warum Vanguard?</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#172545] mb-3">Genossenschaftliche Struktur</h4>
                    <p className="text-[#586477] leading-relaxed">
                      Vanguard gehört den Fondsanlegern selbst. Es gibt keine externen Aktionäre, die Gewinne abschöpfen wollen. Das Ziel ist allein dein Vorteil.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#172545] mb-3">Kostenführerschaft</h4>
                    <p className="text-[#586477] leading-relaxed">
                      Vanguard ist Pionier bei niedrigen Gebühren. Diese Kostenvorteile geben wir direkt an dich weiter.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#172545] mb-3">Langfristige Ausrichtung</h4>
                    <p className="text-[#586477] leading-relaxed">
                      Genau wie wir denkt Vanguard in Jahrzehnten, nicht in Quartalen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="right" />
        </section>

        {/* Gesamtportfolio */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">
                  Investment im Gesamtportfolio
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Ein ETF-Sparplan allein ist noch keine Strategie. Dein Investment muss zu deinem Leben passen – und zu deinen Risiken.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-12">
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Wir betrachten dein Vermögen ganzheitlich:
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-white font-semibold">Risikotragfähigkeit</h3>
                      <p className="text-white/70 leading-relaxed">
                        Wieviel Schwankung hältst du aus (und kannst du dir leisten)? Wir ermitteln dein individuelles Risikoprofil.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-white font-semibold">Asset Allocation</h3>
                      <p className="text-white/70 leading-relaxed">
                        Wir mischen risikobehaftete Anlagen (Aktien) und risikoarme Bausteine (Anleihen/Tagesgeld) so, dass sie exakt zu deinen Zielen passen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-white font-semibold">Liquiditätsplanung</h3>
                      <p className="text-white/70 leading-relaxed">
                        Bevor wir den ersten Euro investieren, stellen wir sicher, dass dein Notgroschen steht und deine Existenzrisiken abgesichert sind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* CTA Section */}
        <section className="relative bg-white py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                Bereit, dein Geld arbeiten zu lassen?
              </h2>
              <p className="text-xl text-[#586477] mb-10 leading-relaxed">
                Lass uns deine Strategie bauen. Wissenschaftlich, kosteneffizient und genau auf dich zugeschnitten.
              </p>
              <Link
                to="/termin"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 hover:shadow-xl text-lg font-semibold"
              >
                Termin vereinbaren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="blue" />
    </div>
  );
}
