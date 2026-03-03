import { X, Shield } from "lucide-react";

interface DatenschutzModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DatenschutzModal({ isOpen, onClose }: DatenschutzModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#172545] text-white p-6 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Datenschutzerklärung</h2>
                <p className="text-white/80 text-sm mt-1">
                  Ihre Privatsphäre ist uns wichtig
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-8">
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Allgemeine Hinweise */}
            <div>
              <h3 className="text-2xl font-semibold text-[#172545] mb-4">
                Allgemeine Hinweise
              </h3>
              <p className="text-[#586477] leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </div>

            {/* Datenerfassung auf dieser Website - Cookies */}
            <div>
              <h3 className="text-2xl font-semibold text-[#172545] mb-4">
                Datenerfassung auf dieser Website
              </h3>
              
              <h4 className="text-xl font-semibold text-[#172545] mb-3">Cookies</h4>
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

            {/* Cookie-Einwilligung */}
            <div>
              <h4 className="text-xl font-semibold text-[#172545] mb-3">Cookie-Einwilligung</h4>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-[#586477] leading-relaxed mb-4">
                  Unsere Website nutzt eine Cookie-Consent-Technologie, um Ihre Einwilligung zur Speicherung bestimmter Cookies in Ihrem Browser einzuholen und diese datenschutzkonform zu dokumentieren.
                </p>
                <p className="text-[#586477] leading-relaxed mb-4">
                  Wenn Sie unsere Website betreten, wird ein Cookie in Ihrem Browser gespeichert, in dem die von Ihnen erteilten Einwilligungen oder der Widerruf dieser Einwilligungen gespeichert werden.
                </p>
                <p className="text-[#586477] leading-relaxed mb-4">
                  Die erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern bzw. das Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.
                </p>
                <p className="text-[#586477] leading-relaxed">
                  Der Einsatz der Cookie-Consent-Technologie erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von Cookies einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 S. 1 lit. c DSGVO.
                </p>
              </div>
            </div>

            {/* Server-Log-Dateien */}
            <div>
              <h4 className="text-xl font-semibold text-[#172545] mb-3">Server-Log-Dateien</h4>
              <div className="bg-gray-50 rounded-2xl p-6">
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
                    <span>Verwendetes Betriebssystem</span>
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

            {/* Analytics */}
            <div>
              <h4 className="text-xl font-semibold text-[#172545] mb-3">Analytics und Tracking</h4>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-[#586477] leading-relaxed mb-4">
                  Diese Website nutzt Funktionen zur Analyse des Nutzerverhaltens. Dabei werden anonymisierte Daten wie Seitenaufrufe, Verweildauer und Herkunft erfasst.
                </p>
                <p className="text-[#586477] leading-relaxed mb-4">
                  Die Analyse erfolgt ausschließlich zu statistischen Zwecken und zur Verbesserung unseres Angebots. Eine Weitergabe an Dritte findet nicht statt.
                </p>
                <p className="text-[#586477] leading-relaxed">
                  Die Rechtsgrundlage für die Verarbeitung ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                </p>
              </div>
            </div>

            {/* Ihre Rechte */}
            <div>
              <h3 className="text-2xl font-semibold text-[#172545] mb-4">
                Ihre Rechte
              </h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-[#586477] leading-relaxed mb-4">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
                <p className="text-[#586477] leading-relaxed">
                  Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                </p>
              </div>
            </div>

            {/* Stand */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-[#586477]">
                Stand dieser Datenschutzerklärung: Februar 2026
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#172545] text-white px-6 py-3 rounded-xl hover:bg-[#0d1a30] transition-colors font-semibold"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
