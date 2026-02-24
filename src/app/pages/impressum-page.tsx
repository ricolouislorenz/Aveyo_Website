import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Building2, Mail, Phone, Scale, FileText, Shield } from "lucide-react";

export function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Impressum
              </h1>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Content Section */}
        <section className="relative bg-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {/* Angaben gemäß § 5 TMG */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                    <div>
                      <p className="text-[#172545] font-semibold text-2xl mb-2">AVEYO GmbH</p>
                      <p className="text-[#586477] mb-4">Immobilien & Versicherungen</p>
                    </div>
                    
                    <div className="flex items-start gap-3 text-[#586477]">
                      <Building2 className="w-5 h-5 text-[#172545] mt-1 flex-shrink-0" />
                      <div>
                        <p>Hartwicusstraße 3</p>
                        <p>22087 Hamburg</p>
                        <p>Deutschland</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 mt-6">
                      <p className="text-[#172545] font-semibold mb-2">Handelsregister:</p>
                      <p className="text-[#586477]">HRB196519</p>
                      <p className="text-[#586477]">Registergericht: Handelsregister B des Amtsgerichts Hamburg</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 mt-6">
                      <p className="text-[#172545] font-semibold mb-2">Vertreten durch:</p>
                      <p className="text-[#586477]">Timo-Maximilian Konrad und Adrian Nerhoff</p>
                    </div>
                  </div>
                </div>

                {/* Kontakt */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Kontakt
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                    <div className="flex items-center gap-3 text-[#586477]">
                      <Phone className="w-5 h-5 text-[#172545] flex-shrink-0" />
                      <div>
                        <p>Telefon: <a href="tel:+494065055720" className="hover:text-[#172545] transition-colors">040 65055720</a></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[#586477]">
                      <Mail className="w-5 h-5 text-[#172545] flex-shrink-0" />
                      <a href="mailto:kontakt@aveyo.de" className="hover:text-[#172545] transition-colors">
                        kontakt@aveyo.de
                      </a>
                    </div>
                  </div>
                </div>

                {/* Gewerbeanmeldung */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Gewerbeanmeldung
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Die Gewerbeerlaubnis nach <strong className="text-[#172545]">§ 34c, § 34d und § 34f GewO</strong> wurde am <strong className="text-[#172545]">03.02.2026</strong> von folgender Stelle erteilt:
                    </p>
                    <p className="text-[#172545] font-semibold">Handelskammer Hamburg</p>
                  </div>
                </div>

                {/* Vermittlerregister */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Vermittlerregister
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      <strong className="text-[#172545]">Registrierungs-Nr.:</strong> D-F-131-8AVD-92
                    </p>
                    <p className="text-[#586477]">
                      <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline font-semibold">
                        www.vermittlerregister.info
                      </a>
                    </p>
                  </div>
                </div>

                {/* Aufsichtsbehörde */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Aufsichtsbehörde
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] mb-4">
                      <strong className="text-[#172545] text-lg">Handelskammer Hamburg</strong>
                    </p>
                    <p className="text-[#586477]">
                      Adolphsplatz 1<br />
                      20457 Hamburg
                    </p>
                    <p className="text-[#586477] mt-4">
                      Web: <a href="https://www.hk24.de" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">www.hk24.de</a>
                    </p>
                  </div>
                </div>

                {/* Berufsbezeichnung und berufsrechtliche Regelungen */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Berufsbezeichnung und berufsrechtliche Regelungen
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <p className="text-[#172545] font-semibold mb-2">Berufsbezeichnung:</p>
                      <p className="text-[#586477]">Versicherungsmakler und Immobilienmakler</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-[#172545] font-semibold mb-2">Zuständige Kammer:</p>
                      <p className="text-[#586477]">
                        Handelskammer Hamburg<br />
                        Adolphsplatz 1<br />
                        20457 Hamburg
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-[#172545] font-semibold mb-2">Verliehen in:</p>
                      <p className="text-[#586477]">Deutschland</p>
                    </div>

                    <div>
                      <p className="text-[#172545] font-semibold mb-3">Es gelten folgende berufsrechtliche Regelungen:</p>
                      <ul className="space-y-3 text-[#586477]">
                        <li className="flex flex-col gap-1">
                          <span className="font-medium">§ 34d Gewerbeordnung (GewO)</span>
                          <a href="https://www.gesetze-im-internet.de/gewo/__34d.html" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline text-sm">
                            https://www.gesetze-im-internet.de/gewo/__34d.html
                          </a>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="font-medium">Versicherungsvermittlungsverordnung (VersVermV)</span>
                          <a href="https://www.gesetze-im-internet.de/versvermv_2018/index.html" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline text-sm">
                            https://www.gesetze-im-internet.de/versvermv_2018/index.html
                          </a>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="font-medium">§§ 59-68 Versicherungsvertragsgesetz (VVG)</span>
                          <a href="https://www.gesetze-im-internet.de/vvg_2008/index.html#BJNR263100007BJNE006401306" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline text-sm">
                            https://www.gesetze-im-internet.de/vvg_2008/index.html#BJNR263100007BJNE006401306
                          </a>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="font-medium">§ 34c Gewerbeordnung (GewO)</span>
                          <a href="https://www.gesetze-im-internet.de/gewo/__34c.html" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline text-sm">
                            https://www.gesetze-im-internet.de/gewo/__34c.html
                          </a>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="font-medium">Makler- und Bauträgerverordnung (MaBV)</span>
                          <a href="https://www.gesetze-im-internet.de/gewo_mabv/index.html" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline text-sm">
                            https://www.gesetze-im-internet.de/gewo_mabv/index.html
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Angaben zur Berufshaftpflichtversicherung */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Angaben zur Berufshaftpflichtversicherung
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <p className="text-[#172545] font-semibold mb-2">Name und Sitz des Versicherers:</p>
                      <p className="text-[#586477] mb-2">
                        CGPA Europe S.A.<br />
                        41 boulevard Royale<br />
                        L-2449 Luxembourg
                      </p>
                      <p className="text-[#586477]">
                        CGPA Europe Underwriting GmbH
                      </p>
                    </div>
                    <div>
                      <p className="text-[#172545] font-semibold mb-2">Geltungsraum der Versicherung:</p>
                      <p className="text-[#586477]">Deutschland</p>
                    </div>
                  </div>
                </div>

                {/* Redaktionell verantwortlich */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Redaktionell verantwortlich
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#172545] font-semibold mb-2">AVEYO GmbH</p>
                    <p className="text-[#586477]">
                      Adrian Nerhoff<br />
                      Hartwicusstr. 3<br />
                      22087 Hamburg
                    </p>
                  </div>
                </div>

                {/* Verbraucherstreitbeilegung */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Verbraucherstreitbeilegung/Universalschlichtungsstelle
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed">
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </div>

                {/* DSA Kontaktstelle */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Zentrale Kontaktstelle nach dem Digital Services Act - DSA
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      (Verordnung (EU) 2022/265)
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
                    </p>
                    <div className="space-y-2">
                      <p className="text-[#586477]">
                        E-Mail: <a href="mailto:kontakt@aveyo.de" className="text-[#172545] hover:underline">kontakt@aveyo.de</a>
                      </p>
                      <p className="text-[#586477]">
                        Telefon: <a href="tel:+494065055720" className="text-[#172545] hover:underline">040 65055720</a>
                      </p>
                      <p className="text-[#586477] mt-4">
                        Die für den Kontakt zur Verfügung stehenden Sprachen sind: <strong className="text-[#172545]">Deutsch</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Haftungsausschluss */}
                <div className="mb-12">
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Haftungsausschluss
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#172545] mb-3">Haftung für Inhalte</h3>
                      <p className="text-[#586477] leading-relaxed">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#172545] mb-3">Haftung für Links</h3>
                      <p className="text-[#586477] leading-relaxed">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                      </p>
                      <p className="text-[#586477] leading-relaxed mt-4">
                        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#172545] mb-3">Urheberrecht</h3>
                      <p className="text-[#586477] leading-relaxed">
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                      </p>
                      <p className="text-[#586477] leading-relaxed mt-4">
                        Soweit die Inhalte auf dieser Website nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                      </p>
                    </div>
                  </div>
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