import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Globe } from "lucide-react";

export function EUTransparenzPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                EU-Transparenz­verordnung
              </h1>
              <p className="text-xl text-white/90">
                Informationen zur Nachhaltigkeit von Finanzprodukten
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Content Section */}
        <section className="relative bg-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none space-y-12">
                {/* Einleitung */}
                <div className="bg-blue-50 border-l-4 border-[#172545] p-6 rounded-lg">
                  <p className="text-[#172545] leading-relaxed">
                    Gemäß der EU-Verordnung 2019/2088 (Offenlegungs-Verordnung / SFDR - Sustainable Finance Disclosure Regulation) sind Finanzmarktteilnehmer und Finanzberater verpflichtet, über die Einbeziehung von Nachhaltigkeitsrisiken und nachteiligen Auswirkungen in ihre Anlageberatung zu informieren.
                  </p>
                </div>

                {/* 1. Berücksichtigung von Nachhaltigkeitsrisiken */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    1. Berücksichtigung von Nachhaltigkeitsrisiken
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#172545] mb-3">
                        Was sind Nachhaltigkeitsrisiken?
                      </h3>
                      <p className="text-[#586477] leading-relaxed">
                        Nachhaltigkeitsrisiken sind Ereignisse oder Bedingungen aus den Bereichen Umwelt, Soziales oder Unternehmensführung (ESG - Environmental, Social, Governance), deren Eintreten tatsächlich oder potenziell wesentliche negative Auswirkungen auf den Wert der Investition oder Versicherung haben können.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#172545] mb-3">
                        Unsere Vorgehensweise
                      </h3>
                      <p className="text-[#586477] leading-relaxed">
                        Im Rahmen unserer Beratung berücksichtigen wir Nachhaltigkeitsrisiken, soweit diese für die jeweilige Anlage oder Versicherung relevant sind. Wir informieren Sie über:
                      </p>
                      <ul className="mt-3 space-y-2 text-[#586477]">
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Mögliche Auswirkungen von Nachhaltigkeitsrisiken auf die Rendite Ihrer Anlage</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Wie Produktanbieter Nachhaltigkeitsrisiken in ihre Anlagestrategie einbeziehen</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Verfügbare nachhaltige Anlageprodukte und deren Merkmale</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2. Berücksichtigung nachteiliger Auswirkungen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    2. Berücksichtigung der wichtigsten nachteiligen Auswirkungen (PAI)
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#172545] mb-3">
                        Was sind nachteilige Auswirkungen?
                      </h3>
                      <p className="text-[#586477] leading-relaxed">
                        Nachteilige Auswirkungen (Principal Adverse Impacts - PAI) sind die negativen Auswirkungen, die Investitionsentscheidungen auf Nachhaltigkeitsfaktoren haben können, z.B.:
                      </p>
                      <ul className="mt-3 space-y-2 text-[#586477]">
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Treibhausgasemissionen und CO₂-Fußabdruck</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Verletzung internationaler Normen und Standards</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Geschlechterdiversität in Leitungsorganen</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#172545] font-bold mt-1">•</span>
                          <span>Engagement in umstrittenen Waffen</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#172545] mb-3">
                        Unsere Erklärung
                      </h3>
                      <p className="text-[#586477] leading-relaxed">
                        [Hier fügen Sie Ihre Erklärung ein, ob und wie Sie die wichtigsten nachteiligen Auswirkungen von Anlageentscheidungen auf Nachhaltigkeitsfaktoren berücksichtigen.]
                      </p>
                      <div className="mt-4 p-4 bg-white rounded-lg border border-[#172545]/20">
                        <p className="text-sm text-[#586477] italic">
                          <strong className="text-[#172545]">Beispiel-Text:</strong><br />
                          "Bei der Auswahl und Empfehlung von Anlageprodukten berücksichtigen wir die wichtigsten nachteiligen Auswirkungen auf Nachhaltigkeitsfaktoren. Wir bevorzugen Produkte von Anbietern, die eine PAI-Strategie implementiert haben und transparent über ihre Nachhaltigkeitsbemühungen berichten."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Nachhaltigkeitspräferenzen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    3. Abfrage von Nachhaltigkeitspräferenzen
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                    <p className="text-[#586477] leading-relaxed">
                      Im Rahmen unserer Beratung fragen wir Ihre persönlichen Nachhaltigkeitspräferenzen ab. Dies umfasst:
                    </p>

                    <div className="space-y-4 mt-4">
                      <div className="bg-white rounded-lg p-6 border border-[#172545]/10">
                        <h4 className="text-[#172545] font-semibold mb-2">
                          Taxonomie-konforme Investitionen
                        </h4>
                        <p className="text-[#586477] text-sm leading-relaxed">
                          Mindestanteil an Investitionen in ökologisch nachhaltige Wirtschaftstätigkeiten gemäß EU-Taxonomie-Verordnung
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 border border-[#172545]/10">
                        <h4 className="text-[#172545] font-semibold mb-2">
                          Nachhaltige Investitionen
                        </h4>
                        <p className="text-[#586477] text-sm leading-relaxed">
                          Mindestanteil an nachhaltigen Investitionen im Sinne der Offenlegungs-Verordnung (Artikel 2 Nr. 17 SFDR)
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 border border-[#172545]/10">
                        <h4 className="text-[#172545] font-semibold mb-2">
                          PAI-Berücksichtigung
                        </h4>
                        <p className="text-[#586477] text-sm leading-relaxed">
                          Berücksichtigung der wichtigsten nachteiligen Auswirkungen auf Nachhaltigkeitsfaktoren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Kategorien nachhaltiger Produkte */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    4. Kategorien nachhaltiger Finanzprodukte
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          9
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-green-900 mb-3">
                            Artikel 9 - Nachhaltige Investitionen
                          </h3>
                          <p className="text-green-800 leading-relaxed">
                            Produkte, die ein nachhaltiges Investitionsziel verfolgen. Diese Produkte investieren ausschließlich oder überwiegend in nachhaltige Wirtschaftstätigkeiten.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          8
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900 mb-3">
                            Artikel 8 - ESG-Merkmale fördernd
                          </h3>
                          <p className="text-blue-800 leading-relaxed">
                            Produkte, die ökologische oder soziale Merkmale bewerben, aber nicht ausschließlich nachhaltig investieren. Diese Produkte berücksichtigen ESG-Kriterien in ihrer Anlagestrategie.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          6
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Artikel 6 - Sonstige Produkte
                          </h3>
                          <p className="text-gray-800 leading-relaxed">
                            Produkte ohne nachhaltige Investitionsstrategie. Diese Produkte können trotzdem Nachhaltigkeitsrisiken in ihrem Risikomanagement berücksichtigen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Weitere Informationen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    5. Weitere Informationen und Transparenz
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Detaillierte Informationen zur Nachhaltigkeitsstrategie der einzelnen Finanzprodukte finden Sie in den jeweiligen:
                    </p>
                    <ul className="space-y-2 text-[#586477]">
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Vorvertraglichen Informationen (Produktinformationsblätter)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Regelmäßigen Berichten der Produktanbieter</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Websites der Produktanbieter</span>
                      </li>
                    </ul>
                    <p className="text-[#586477] leading-relaxed mt-4">
                      Gerne stellen wir Ihnen diese Informationen im Rahmen unserer Beratung zur Verfügung.
                    </p>
                  </div>
                </div>

                {/* 6. Kontakt */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    6. Fragen zu Nachhaltigkeit?
                  </h2>
                  <div className="bg-gradient-to-br from-[#172545] to-[#2a3f6f] rounded-2xl p-8 text-white">
                    <p className="leading-relaxed mb-4">
                      Haben Sie Fragen zur Berücksichtigung von Nachhaltigkeitsaspekten in Ihrer Finanzberatung? Wir beraten Sie gerne!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="mailto:info@aveyo.de"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#172545] rounded-lg font-semibold hover:bg-white/90 transition-colors"
                      >
                        E-Mail senden
                      </a>
                      <a
                        href="tel:+4989123456789"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border-2 border-white"
                      >
                        +49 89 123 456 789
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hinweis */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Wichtiger Hinweis:</strong> Dies ist ein Muster-Text zu den Offenlegungspflichten nach der EU-Transparenzverordnung (SFDR). Die konkreten Angaben müssen auf Ihre tatsächliche Geschäftspraxis abgestimmt werden. Lassen Sie diese Informationen von einem Fachanwalt oder Compliance-Berater überprüfen.
                  </p>
                </div>

                {/* Weiterführende Links */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">
                    Weiterführende Informationen
                  </h3>
                  <ul className="space-y-2 text-[#586477]">
                    <li>
                      <a
                        href="https://eur-lex.europa.eu/eli/reg/2019/2088/oj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#172545] hover:underline"
                      >
                        → EU-Verordnung 2019/2088 (Offenlegungs-Verordnung)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://eur-lex.europa.eu/eli/reg/2020/852/oj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#172545] hover:underline"
                      >
                        → EU-Verordnung 2020/852 (Taxonomie-Verordnung)
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Stand */}
                <div className="text-center pt-8 border-t border-gray-200">
                  <p className="text-sm text-[#586477]">
                    Stand dieser Informationen: Februar 2026
                  </p>
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