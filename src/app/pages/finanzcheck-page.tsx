import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { CheckCircle, ArrowRight, TrendingUp, Shield, FileText, Calendar } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function FinanzcheckPage() {
  const benefits = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Umfassende Analyse",
      description: "Wir analysieren deine aktuelle Finanz- und Versicherungssituation ganzheitlich."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Optimierungspotenzial",
      description: "Wir identifizieren Einsparpotenziale und Wachstumschancen in deinem Portfolio."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Absicherung checken",
      description: "Wir prüfen, ob du optimal abgesichert bist – nicht zu viel, nicht zu wenig."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Termin buchen",
      description: "Wähle einen Termin, der zu deinem Zeitplan passt – online oder vor Ort."
    },
    {
      number: "02",
      title: "Daten bereitstellen",
      description: "Teile uns digital deine aktuellen Verträge und Finanzdaten mit (optional schon vor dem Termin)."
    },
    {
      number: "03",
      title: "Analyse-Gespräch",
      description: "Wir besprechen deine Situation, Ziele und Wünsche in einem persönlichen Gespräch."
    },
    {
      number: "04",
      title: "Finanzgutachten-Report",
      description: "Du erhältst dein individuelles Finanzgutachten mit konkreten Handlungsempfehlungen."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl mb-6 text-white leading-tight">
                Dein kostenloses Finanzgutachten
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Verschenke kein Geld. Finde heraus, wo du optimieren kannst – bei Versicherungen, Investments und Absicherung.
              </p>
              <Link
                to="/termin"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl text-lg font-semibold"
              >
                Jetzt kostenlos starten
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* What is Finanzcheck Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Centered Title */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-[#172545] font-bold leading-tight">
                  Was ist das Finanzgutachten?
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
                {/* Image - Left Side */}
                <div className="lg:w-1/2 flex justify-start">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGFuYWx5c2lzfGVufDF8fHx8MTc3MTI1NTYyNXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Finanzcheck Analyse"
                    className="w-full max-w-[450px] aspect-square rounded-3xl shadow-2xl object-cover"
                  />
                </div>

                {/* Text Content - Right Side */}
                <div className="lg:w-1/2">
                  <p className="text-lg mb-6 text-[#586477] leading-relaxed">
                    Das Finanzgutachten ist deine persönliche Finanzanalyse – komplett kostenlos und unverbindlich. Das Finanzgutachten entspricht einem Marktwert von ca. 500,00 €.
                  </p>
                  <p className="text-lg mb-6 text-[#586477] leading-relaxed">
                    Wir schauen uns deine aktuelle Situation an: Welche Versicherungen hast du? Wie ist dein Vermögen aufgestellt? Wo fließt dein Geld hin – und wo könnte es besser investiert sein?
                  </p>
                  <p className="text-lg text-[#586477] leading-relaxed">
                    Das Ergebnis: Ein klarer, datenbasierter Report, der dir zeigt, wo du stehst und welche Schritte dich finanziell weiterbringen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="right" />
        </section>

        {/* Benefits Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold leading-tight">
                  Was bringt dir der Finanzcheck?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Klarheit, Transparenz und konkrete Handlungsempfehlungen für deine finanzielle Zukunft
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#172545]">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 text-center leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
        </section>

        {/* Process Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold leading-tight">
                  So läuft's ab
                </h2>
                <p className="text-xl text-[#586477] max-w-2xl mx-auto">
                  In 4 einfachen Schritten zu deinem persönlichen Finanzcheck
                </p>
              </div>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-[#172545]/5 to-[#172545]/10 rounded-2xl p-8 border border-[#172545]/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#172545] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#172545] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-[#586477] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="center" />
        </section>

        {/* What we analyze Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold leading-tight">
                  Was checken wir?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Versicherungen</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Bist du über- oder unterversichert?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Zahlst du zu viel für deine Policen?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Gibt es Lücken in deiner Absicherung?</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Investments</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Wie ist dein Vermögen diversifiziert?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Gibt es Optimierungspotenzial bei Kosten?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Passt deine Strategie zu deinen Zielen?</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Altersvorsorge</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Reicht deine Vorsorge für später?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Nutzt du alle Förderungen optimal?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Gibt es bessere Alternativen?</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Immobilien</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Macht ein Immobilienkauf Sinn für dich?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Wie viel Eigenkapital brauchst du wirklich?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-1" />
                      <span className="text-white/80">Welche Finanzierungsoptionen gibt es?</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="right" />
        </section>

        {/* CTA Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-3xl p-8 md:p-12 text-center">
                <Calendar className="w-16 h-16 text-white mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Bereit für deinen Finanzcheck?
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Buche jetzt deinen kostenlosen Termin und finde heraus, wie du deine Finanzen auf das nächste Level bringst.
                </p>
                <Link
                  to="/termin"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg hover:shadow-xl"
                >
                  Termin vereinbaren
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-white/70 mt-6 text-sm">
                  100% kostenlos • Unverbindlich • Keine versteckten Kosten
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="blue" />
    </div>
  );
}