import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Shield } from "lucide-react";

export function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#172545] pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Datenschutzerklärung
              </h1>
              <p className="text-xl text-white/90">
                Ihre Privatsphäre ist uns wichtig
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
                {/* Allgemeine Hinweise */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">
                    Allgemeine Hinweise
                  </h2>
                  <p className="text-[#586477] leading-relaxed">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>
                </div>

                {/* Datenerfassung auf dieser Website - Cookies */}
                <div>
                  <h2 className="text-3xl font-semibold text-[#172545] mb-6">Datenerfassung auf dieser Website</h2>
                  
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">Cookies</h3>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-6">
                    Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
                  </p>
                  <p className="text-[#586477] leading-relaxed">
                    Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.
                  </p>
                </div>

                {/* Cookie-Einwilligung mit Borlabs Cookie */}
                <div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">Cookie-Einwilligung mit Borlabs Cookie</h3>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Unsere Website nutzt die Cookie-Consent-Technologie von Borlabs Cookie, um Ihre Einwilligung zur Speicherung bestimmter Cookies in Ihrem Browser einzuholen und diese datenschutzkonform zu dokumentieren. Anbieter dieser Technologie ist Borlabs – Benjamin A. Bornschein, Rübenkamp 32, 22305 Hamburg (im Folgenden Borlabs).
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Wenn Sie unsere Website betreten, wird ein Borlabs-Cookie in Ihrem Browser gespeichert, in dem die von Ihnen erteilten Einwilligungen oder der Widerruf dieser Einwilligungen gespeichert werden. Diese Daten werden nicht an den Anbieter von Borlabs Cookie weitergegeben.
                    </p>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Die erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern bzw. das Borlabs-Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt. Details zur Datenverarbeitung von Borlabs Cookie finden Sie unter https://de.borlabs.io/kb/welche-daten-speichert-borlabs-cookie/
                    </p>
                    <p className="text-[#586477] leading-relaxed">
                      Der Einsatz der Borlabs-Cookie-Consent-Technologie erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von Cookies einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 S. 1 lit. c DSGVO.
                    </p>
                  </div>
                </div>

                {/* Server-Log-Dateien */}
                <div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">Server-Log-Dateien</h3>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                    </p>
                    <ul className="space-y-2 text-[#586477] mb-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Browsertyp und Browserversion</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>verwendetes Betriebssystem</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Referrer URL</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Hostname des zugreifenden Rechners</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>Uhrzeit der Serveranfrage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#172545] font-bold mt-1">•</span>
                        <span>IP-Adresse</span>
                      </li>
                    </ul>
                    <p className="text-[#586477] leading-relaxed mb-4">
                      Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                    </p>
                    <p className="text-[#586477] leading-relaxed">
                      Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
                    </p>
                  </div>
                </div>

                {/* Kontaktformular */}
                <div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">Kontaktformular</h3>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                  </p>
                  <p className="text-[#586477] leading-relaxed">
                    Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                  </p>
                </div>

                {/* Anfrage per E-Mail, Telefon oder Telefax */}
                <div>
                  <h3 className="text-xl font-semibold text-[#172545] mb-4">Anfrage per E-Mail, Telefon oder Telefax</h3>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p className="text-[#586477] leading-relaxed mb-4">
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                  </p>
                  <p className="text-[#586477] leading-relaxed">
                    Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
                  </p>
                </div>

                {/* Stand */}
                <div className="text-center pt-8 border-t border-gray-200">
                  <p className="text-sm text-[#586477]">
                    Stand dieser Datenschutzerklärung: Februar 2026
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