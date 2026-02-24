import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { FileText } from "lucide-react";

export function ErstinformationenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Erstinformationen
              </h1>
              <p className="text-xl text-white/90">
                Gemäß § 15 VersVermV
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
                    Gemäß § 15 der Verordnung über die Versicherungsvermittlung und -beratung (VersVermV) sind wir verpflichtet, Sie vor Abschluss eines Versicherungsvertrages über bestimmte Informationen zu informieren.
                  </p>
                </div>

                {/* Name, Anschrift und Kontaktdaten */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Name, Anschrift und Kontaktdaten
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#172545] font-semibold text-2xl mb-2">AVEYO GmbH</p>
                    <p className="text-[#586477] mb-2">Immobilien & Versicherungen</p>
                    <p className="text-[#586477] leading-relaxed mb-6">
                      AVEYO ist dein Ansprechpartner für ganzheitliche Absicherung, strategische Finanzplanung und Vorsorgelösungen für Unternehmen. Wir begleiten Selbstständige, Start-ups und KMU – persönlich, ehrlich und transparent – bei Themen wie betrieblicher Absicherung, Unternehmensschutz und smarter Mitarbeiterbindung.
                    </p>
                    
                    <div className="space-y-4">
                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">Handelsregister:</strong><br />
                        HRB196519<br />
                        Registergericht: Handelsregister B des Amtsgerichts Hamburg
                      </p>

                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">Vertreten durch:</strong><br />
                        Timo-Maximilian Konrad und Adrian Nerhoff
                      </p>

                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">Adresse:</strong><br />
                        Hartwicusstraße 3<br />
                        22087 Hamburg
                      </p>
                      
                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">Telefon:</strong><br />
                        <a href="tel:+494065055720" className="hover:text-[#172545] transition-colors">040 65055720</a>
                      </p>

                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">E-Mail:</strong><br />
                        <a href="mailto:kontakt@aveyo.de" className="hover:text-[#172545] transition-colors">kontakt@aveyo.de</a>
                      </p>
                      
                      <p className="text-[#586477]">
                        <strong className="text-[#172545]">Öffnungszeiten:</strong><br />
                        Montag - Freitag: 09:00 - 17:00 Uhr
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tätigkeitsart und erteilte Erlaubnis */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Tätigkeitsart und erteilte Erlaubnis
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                    <p className="text-[#586477] leading-relaxed">
                      Eingetragen im Vermittlerregister bei der <strong className="text-[#172545]">Industrie- und Handelskammer zu Hamburg</strong> als Versicherungsmakler und Finanzanlagenfachmann mit Erlaubnis nach § 34d Abs. 1 GewO.
                    </p>
                    
                    <p className="text-[#586477]">
                      Vermittlerregister:{" "}
                      <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                        www.vermittlerregister.info
                      </a>
                    </p>

                    <div className="space-y-6 pt-4">
                      <div>
                        <p className="text-[#172545] font-semibold mb-3 text-lg">Adrian Nerhoff Registernummer:</p>
                        <p className="text-[#586477]">D-KHWD-FFLB9-02 (Für §34d GewO)</p>
                        <p className="text-[#586477]">D-F-131-NTTI-65 (Für §34f GewO)</p>
                      </div>

                      <div>
                        <p className="text-[#172545] font-semibold mb-3 text-lg">Timo Konrad Registernummer:</p>
                        <p className="text-[#586477]">D-EAJS-AFQPN-81 (Für §34d GewO)</p>
                      </div>

                      <div className="border-t border-[#172545]/20 pt-6">
                        <p className="text-[#172545] font-semibold mb-4 text-lg">Unsere Kooperationspartner:</p>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-[#172545] font-semibold mb-2">Ivo Heusinger Registernummer:</p>
                            <p className="text-[#586477]">D-41P0-DIF7H-33 (Für §34d GewO)</p>
                            <p className="text-[#586477]">D-F-131-7MUY-19 (Für §34f GewO)</p>
                          </div>

                          <div>
                            <p className="text-[#172545] font-semibold mb-2">Dennis Forster Registernummer:</p>
                            <p className="text-[#586477]">D-OPO8-0LD8H-61 (Für §34d GewO)</p>
                            <p className="text-[#586477]">D-F-131-7NHU-35 (Für §34f GewO)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aufsichtsbehörde */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Aufsichtsbehörde und zuständige Behörde für die Erlaubnis
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
                      <a href="https://www.hk24.de" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                        www.hk24.de
                      </a>
                    </p>
                  </div>
                </div>

                {/* Gemeinsame Registerstelle */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Gemeinsame Registerstelle
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] mb-4">
                      <strong className="text-[#172545]">Deutscher Industrie- und Handelskammertag (DIHK) e.V.</strong>
                    </p>
                    <p className="text-[#586477]">
                      Breite Straße 29<br />
                      10178 Berlin
                    </p>
                    <p className="text-[#586477] mt-4">
                      Telefon: <a href="tel:018060058550" className="hover:text-[#172545] transition-colors">0180 600 58 50</a><br />
                      <span className="text-sm">(Festnetzpreis 0,20 €/Anruf; Mobilfunkpreise maximal 0,60 €/Anruf)</span>
                    </p>
                    <p className="text-[#586477] mt-4">
                      <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                        www.vermittlerregister.info
                      </a>
                    </p>
                  </div>
                </div>

                {/* Berufsrechtliche Regelungen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Berufsrechtliche Regelungen
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] mb-4">Wir unterliegen folgenden berufsrechtlichen Regelungen:</p>
                    <ul className="space-y-2 text-[#586477]">
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>§§ 34d Gewerbeordnung (GewO)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>§§ 34f Gewerbeordnung (GewO)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>§§ 59 - 68 Versicherungsvertragsgesetz (VVG)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Versicherungsvermittlerverordnung (VersVermV)</span>
                      </li>
                    </ul>
                    <p className="text-[#586477] mt-6">
                      Die berufsrechtlichen Regelungen können Sie im Internet unter{" "}
                      <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                        www.gesetze-im-internet.de
                      </a>{" "}
                      einsehen und abrufen.
                    </p>
                  </div>
                </div>

                {/* Beratung und Vergütung */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Beratung und Vergütung
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed">
                      Wir bieten im Zuge der Vermittlung eine Beratung gemäß den gesetzlichen Vorgaben an und erhalten für die erfolgreiche Vermittlung eines Versicherungsvertrages eine Provision vom Produktanbieter. Diese Provision ist vom Kunden nicht separat an uns zu bezahlen, sondern bereits in der Versicherungsprämie enthalten. Sofern eine abweichende Regelung gewünscht wird oder von der Sache her geboten ist, wird unsere Dienstleistung durch Zahlung eines Honorars bzw. einer Aufwandsentschädigung abgegolten – gänzlich oder in Kombination mit der zuvor genannten Provision. Die Höhe des Honorars wird im Vorfeld zwischen Kunde und Berater schriftlich vereinbart. Weitere Vergütungen erhalten wir im Zusammenhang mit der Beratung und Vermittlung nicht.
                    </p>
                  </div>
                </div>

                {/* Beteiligungen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Beteiligungen
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed">
                      Wir halten keine Beteiligungen an Stimmrechten oder dem Kapital von Versicherungsunternehmen. Es gibt keine Beteiligungen von Versicherungsunternehmen an den Stimmrechten oder dem Kapital unseres Unternehmens.
                    </p>
                  </div>
                </div>

                {/* Nachhaltigkeitsbezogene Offenlegung */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Nachhaltigkeitsbezogene Offenlegung zum Vertrieb von Versicherungsanlageprodukten
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Wir verfolgen eine eigenständige Nachhaltigkeitsstrategie. Im Rahmen der Auswahl von Versicherungsgesellschaften und Versicherungsprodukten berücksichtigen wir die von den Versicherern zur Verfügung gestellten Informationen. Versicherer, die erkennbar keine Strategie zur Einbeziehung von Nachhaltigkeitsrisiken in ihre Investitionsentscheidungen einbeziehen, beziehen wir je nach Kundenwunsch nicht in unsere Empfehlungen ein.
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Im Rahmen der im Kundeninteresse erfolgenden individuellen Beratung stellen wir gesondert dar, wenn die Berücksichtigung der Nachhaltigkeitsrisiken bei der Investmententscheidung einen für uns erkennbaren Vor- bzw. Nachteil für den individuellen Kunden bedeuten. Über die jeweilige Berücksichtigung von Nachhaltigkeitsrisiken bei Investitionsentscheidungen des jeweiligen Versicherers informiert dieser mit dessen vorvertraglichen Informationen. Bei Fragen dazu kann der Kunde uns gerne im Vorfeld eines möglichen Abschlusses ansprechen.
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Im Rahmen der Beratung werden die wichtigsten nachteiligen Auswirkungen von Investitionsentscheidungen auf Nachhaltigkeitsfaktoren der Finanzmarktteilnehmer (Versicherer) berücksichtigt. Die Berücksichtigung erfolgt auf Basis der von den Versicherungsunternehmen zur Verfügung gestellten Informationen. Für deren Richtigkeit sind wir jedoch nicht verantwortlich.
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Zurzeit kann eine Berücksichtigung auf Grund sich aufbauender, aber aktuell noch ggf. rudimentärer Informationen durch die Versicherer zu Ihren Unternehmen lediglich bedingt erfolgen. Im Rahmen der Beratung werden die wichtigsten nachteiligen Auswirkungen von Investitionsentscheidungen auf Nachhaltigkeitsfaktoren der Finanzmarktteilnehmer (Versicherer) nur bedingt berücksichtigt.
                    </p>
                    <p className="text-[#586477] leading-relaxed">
                      Die Berücksichtigung erfolgt ggf. auf Basis der von den Versicherungsunternehmen zur Verfügung gestellten Informationen. Für deren Richtigkeit ist der Vermittler nicht verantwortlich. Sie können auf besonderen Wunsch des Kunden auf Basis der aktuell zur Verfügung stehenden Datenlage berücksichtigt werden.
                    </p>
                  </div>
                </div>

                {/* Schlichtungsstellen */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Schlichtungsstellen
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-xl font-semibold text-[#172545] mb-4">Versicherungsombudsmann e.V.</h3>
                      <p className="text-[#586477]">
                        Postfach 08 06 32<br />
                        10006 Berlin
                      </p>
                      <p className="text-[#586477] mt-4">
                        Tel.: <a href="tel:08003696000" className="hover:text-[#172545] transition-colors">0800 3696000</a> (kostenfrei)<br />
                        Fax: <a href="tel:08003699000" className="hover:text-[#172545] transition-colors">0800 3699000</a> (kostenfrei)
                      </p>
                      <p className="text-[#586477] mt-2">
                        <a href="https://www.versicherungsombudsmann.de" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                          www.versicherungsombudsmann.de
                        </a>
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-xl font-semibold text-[#172545] mb-4">Ombudsmann für die Private Kranken- und Pflegeversicherung</h3>
                      <p className="text-[#586477]">
                        Postfach 06 02 22<br />
                        10052 Berlin
                      </p>
                      <p className="text-[#586477] mt-4">
                        Tel.: <a href="tel:08002550444" className="hover:text-[#172545] transition-colors">0800 2550444</a> (kostenfrei)<br />
                        Fax: <a href="tel:03020458931" className="hover:text-[#172545] transition-colors">030 20458931</a>
                      </p>
                      <p className="text-[#586477] mt-2">
                        <a href="https://www.pkv-ombudsmann.de" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                          www.pkv-ombudsmann.de
                        </a>
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-xl font-semibold text-[#172545] mb-4">Online-Streitbeilegung via EU</h3>
                      <p className="text-[#586477]">
                        <a href="https://webgate.ec.europa.eu/odr" target="_blank" rel="noopener noreferrer" className="text-[#172545] hover:underline">
                          https://webgate.ec.europa.eu/odr
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beschwerdemanagement */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Beschwerdemanagement
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed">
                      Bei Beschwerden über unsere Tätigkeit wenden Sie sich gerne an die oben unter "Name, Anschrift und Kontaktdaten" genannten Kontaktdaten.
                    </p>
                  </div>
                </div>

                {/* Berufshaftpflichtversicherung */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Berufshaftpflichtversicherung
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] mb-4">
                      <strong className="text-[#172545]">Name und Anschrift des Versicherers:</strong><br />
                      CGPA Europe Underwriting GmbH<br />
                      Hohenzollernstraße 69<br />
                      80794 München
                    </p>
                    <p className="text-[#586477]">
                      <strong className="text-[#172545]">Geltungsraum der Versicherung:</strong><br />
                      Deutschland
                    </p>
                  </div>
                </div>

                {/* Stand */}
                <div className="text-center pt-8 border-t border-gray-200">
                  <p className="text-sm text-[#586477]">
                    Stand dieser Erstinformationen: Februar 2026
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