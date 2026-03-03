import { useEffect, type ReactNode } from "react";
import { X, Shield, ChevronRight } from "lucide-react";

interface DatenschutzModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SectionBlockProps {
  number: string;
  title: string;
  children: ReactNode;
}

interface SubSectionProps {
  title: string;
  children: ReactNode;
}

function SectionBlock({ number, title, children }: SectionBlockProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#172545] text-sm font-bold text-white shadow-lg">
          {number}
        </div>
        <div className="pt-1">
          <h3 className="text-2xl font-bold text-[#172545]">{title}</h3>
        </div>
      </div>
      <div className="space-y-6 pl-0 md:pl-14">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="rounded-2xl border border-[#172545]/10 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
      <h4 className="mb-4 text-lg font-semibold text-[#172545]">{title}</h4>
      <div className="space-y-4 text-[#586477] leading-relaxed">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#172545]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DatenschutzModal({
  isOpen,
  onClose,
}: DatenschutzModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="datenschutz-modal-title"
    >
      <div
        className="mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-[#172545] px-6 py-6 text-white md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h2
                  id="datenschutz-modal-title"
                  className="text-2xl md:text-3xl font-bold"
                >
                  Datenschutzerklärung
                </h2>
                <p className="mt-1 text-sm md:text-base text-white/80">
                  Transparente Informationen zum Umgang mit Ihren Daten
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Datenschutzerklärung schließen"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50/70 px-6 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="rounded-2xl border border-[#172545]/10 bg-white p-6 shadow-sm">
              <p className="text-[#586477] leading-relaxed">
                Nachfolgend informieren wir Sie darüber, welche personenbezogenen
                Daten wir beim Besuch unserer Website sowie im Rahmen unserer
                Kommunikation und Leistungen verarbeiten, zu welchen Zwecken dies
                geschieht und welche Rechte Ihnen zustehen.
              </p>
            </div>

            <SectionBlock number="1" title="Datenschutz auf einen Blick">
              <SubSection title="Allgemeine Hinweise">
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber,
                  was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                  Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können.
                </p>
                <p>
                  Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
                  den nachfolgenden Abschnitten dieser Datenschutzerklärung.
                </p>
              </SubSection>

              <SubSection title="Datenerfassung auf dieser Website">
                <BulletList
                  items={[
                    <>
                      <strong>Verantwortlichkeit:</strong> Die Datenverarbeitung
                      auf dieser Website erfolgt durch den Websitebetreiber.
                      Dessen Kontaktdaten finden Sie im Abschnitt{" "}
                      <em>„Hinweis zur verantwortlichen Stelle“</em>.
                    </>,
                    <>
                      <strong>Wie erfassen wir Ihre Daten?</strong> Zum einen
                      dadurch, dass Sie uns Daten aktiv mitteilen, z. B. über ein
                      Kontaktformular. Andere Daten werden automatisch oder nach
                      Ihrer Einwilligung durch unsere IT-Systeme erfasst.
                    </>,
                    <>
                      <strong>Welche Daten sind das?</strong> Vor allem technische
                      Daten, z. B. Browser, Betriebssystem oder Uhrzeit des
                      Seitenaufrufs.
                    </>,
                    <>
                      <strong>Wofür nutzen wir Ihre Daten?</strong> Zur
                      fehlerfreien Bereitstellung der Website, zur Bearbeitung von
                      Anfragen sowie – sofern erforderlich – zur Analyse des
                      Nutzerverhaltens.
                    </>,
                  ]}
                />
              </SubSection>

              <SubSection title="Ihre Rechte">
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten. Sie haben außerdem das Recht auf
                  Berichtigung, Löschung, Einschränkung der Verarbeitung,
                  Datenübertragbarkeit sowie ein Beschwerderecht bei der
                  zuständigen Aufsichtsbehörde.
                </p>
                <p>
                  Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die
                  Zukunft widerrufen.
                </p>
              </SubSection>

              <SubSection title="Analyse-Tools und Tools von Drittanbietern">
                <p>
                  Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch
                  ausgewertet werden. Das geschieht insbesondere mit
                  Analyse-Tools, sofern Sie darin eingewilligt haben.
                </p>
              </SubSection>
            </SectionBlock>

            <SectionBlock
              number="2"
              title="Hosting und Content Delivery Networks (CDN)"
            >
              <SubSection title="Externes Hosting">
                <p>
                  Diese Website wird extern gehostet. Die auf dieser Website
                  erfassten personenbezogenen Daten werden auf den Servern des
                  Hosters gespeichert. Hierbei kann es sich insbesondere um
                  IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                  Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige
                  Daten handeln.
                </p>
                <p>
                  Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung
                  gemäß Art. 6 Abs. 1 lit. b DSGVO sowie im Interesse einer
                  sicheren, schnellen und effizienten Bereitstellung unseres
                  Online-Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO. Sofern eine
                  Einwilligung abgefragt wurde, erfolgt die Verarbeitung auf
                  Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
                </p>
                <p>
                  <strong>Eingesetzter Hoster:</strong> Cloudflare Germany GmbH,
                  c/o Design Offices München Atlas, Rosenheimer Straße 143C,
                  81671 München.
                </p>
              </SubSection>

              <SubSection title="Cloudflare">
                <BulletList
                  items={[
                    <>
                      <strong>Zweck:</strong> Absicherung, Performance-Steigerung
                      und Auslieferung der Website über ein Content Delivery
                      Network (CDN) sowie Nutzung als Reverse-Proxy.
                    </>,
                    <>
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f
                      DSGVO (berechtigtes Interesse an einer sicheren und
                      effizienten Bereitstellung unseres Webangebots).
                    </>,
                    <>
                      <strong>Auftragsverarbeitung:</strong> Mit Cloudflare wurde
                      ein Vertrag über Auftragsverarbeitung (AVV) geschlossen.
                    </>,
                    <>
                      <strong>Datentransfer:</strong> Eine Übermittlung in die USA
                      kann nicht ausgeschlossen werden. Diese erfolgt auf Basis
                      von Standardvertragsklauseln und der Zertifizierung nach dem
                      EU-US Data Privacy Framework.
                    </>,
                  ]}
                />
              </SubSection>

              <SubSection title="Google Cloud CDN">
                <BulletList
                  items={[
                    <>
                      <strong>Anbieter:</strong> Google Ireland Limited, Gordon
                      House, Barrow Street, Dublin 4, Irland.
                    </>,
                    <>
                      <strong>Zweck:</strong> Beschleunigung der Ladezeiten durch
                      Auslieferung von Inhalten über weltweit verteilte Server.
                    </>,
                    <>
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f
                      DSGVO (berechtigtes Interesse an der
                      Performance-Optimierung).
                    </>,
                    <>
                      <strong>Datenschutz:</strong> Google ist nach dem EU-US Data
                      Privacy Framework zertifiziert.
                    </>,
                  ]}
                />
              </SubSection>
            </SectionBlock>

            <SectionBlock
              number="3"
              title="Allgemeine Hinweise und Pflichtinformationen"
            >
              <SubSection title="Datenschutz">
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                  Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                  vertraulich und entsprechend den gesetzlichen
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Wir weisen darauf hin, dass die Datenübertragung im Internet
                  Sicherheitslücken aufweisen kann. Ein lückenloser Schutz vor dem
                  Zugriff durch Dritte ist nicht möglich.
                </p>
              </SubSection>

              <SubSection title="Hinweis zur verantwortlichen Stelle">
                <div className="space-y-1">
                  <p>
                    <strong>AVEYO GmbH</strong>
                  </p>
                  <p>Herr Adrian Nerhoff</p>
                  <p>Hartwicusstr. 3</p>
                  <p>22087 Hamburg</p>
                  <p>Telefon: 040 65055720</p>
                  <p>
                    E-Mail:{" "}
                    <a
                      href="mailto:datenschutz@aveyo.de"
                      className="font-medium text-[#172545] underline underline-offset-2"
                    >
                      datenschutz@aveyo.de
                    </a>
                  </p>
                </div>
              </SubSection>

              <SubSection title="Speicherdauer">
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                  Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
                  Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                </p>
                <p>
                  Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
                  Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern
                  keine anderen rechtlich zulässigen Gründe (z. B. steuer- oder
                  handelsrechtliche Aufbewahrungsfristen) entgegenstehen.
                </p>
              </SubSection>

              <SubSection title="Allgemeine Hinweise zu den Rechtsgrundlagen">
                <BulletList
                  items={[
                    <>
                      <strong>Einwilligung:</strong> Art. 6 Abs. 1 lit. a DSGVO
                      und § 25 Abs. 1 TDDDG
                    </>,
                    <>
                      <strong>Vertragserfüllung / vorvertragliche Maßnahmen:</strong>{" "}
                      Art. 6 Abs. 1 lit. b DSGVO
                    </>,
                    <>
                      <strong>Rechtliche Verpflichtung:</strong> Art. 6 Abs. 1
                      lit. c DSGVO
                    </>,
                    <>
                      <strong>Berechtigtes Interesse:</strong> Art. 6 Abs. 1 lit.
                      f DSGVO
                    </>,
                  ]}
                />
              </SubSection>

              <SubSection title="Verarbeitung von Kunden- und Vertragsdaten">
                <p>
                  Wir erheben, verarbeiten und nutzen personenbezogene Daten zur
                  Begründung, inhaltlichen Ausgestaltung und Änderung des
                  Rechtsverhältnisses (Bestandsdaten).
                </p>
                <p>
                  Hierzu verarbeiten wir insbesondere Daten von Kunden, wie Namen,
                  Adressen und Kontaktdaten, zur Abwicklung von Bestellungen,
                  Anfragen und vertraglichen Vorgängen.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                  (Vertragserfüllung). Gelöschte Daten werden nach Abschluss des
                  Auftrags oder Beendigung der Geschäftsbeziehung unter Beachtung
                  gesetzlicher Aufbewahrungsfristen entfernt.
                </p>
              </SubSection>

              <SubSection title="Weitere Pflichtinformationen">
                <BulletList
                  items={[
                    <>
                      <strong>Empfänger:</strong> Eine Weitergabe
                      personenbezogener Daten erfolgt nur, wenn dies zur
                      Vertragserfüllung erforderlich ist, eine gesetzliche Pflicht
                      besteht oder ein berechtigtes Interesse vorliegt.
                    </>,
                    <>
                      <strong>Betroffenenrechte:</strong> Sie haben insbesondere
                      das Recht auf Widerruf erteilter Einwilligungen, Widerspruch
                      gegen die Verarbeitung, Beschwerde bei der
                      Aufsichtsbehörde, Datenübertragbarkeit sowie Auskunft,
                      Berichtigung und Löschung.
                    </>,
                  ]}
                />
              </SubSection>

              <SubSection title="SSL- bzw. TLS-Verschlüsselung">
                <p>
                  Diese Seite nutzt eine SSL- bzw. TLS-Verschlüsselung zum Schutz
                  vertraulicher Inhalte. Eine verschlüsselte Verbindung erkennen
                  Sie an dem Schloss-Symbol in der Browserzeile und dem Wechsel
                  von „http://“ auf „https://“.
                </p>
              </SubSection>
            </SectionBlock>

            <SectionBlock number="4" title="Datenerfassung auf dieser Website">
              <SubSection title="Cookies">
                <p>
                  Unsere Internetseiten verwenden Cookies. Dabei handelt es sich
                  um kleine Datenpakete, die auf Ihrem Endgerät gespeichert
                  werden. Technisch notwendige Cookies werden auf Grundlage von
                  Art. 6 Abs. 1 lit. f DSGVO gespeichert.
                </p>
                <p>
                  Andere Cookies, insbesondere Analyse- oder Marketing-Cookies,
                  werden nur mit Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a
                  DSGVO verwendet.
                </p>
              </SubSection>

              <SubSection title="Server-Log-Dateien">
                <p>
                  Der Provider der Website erhebt und speichert automatisch
                  Informationen in Server-Log-Dateien, die Ihr Browser
                  automatisch übermittelt. Hierzu zählen insbesondere
                  IP-Adresse, Browsertyp, Betriebssystem und Uhrzeit des Zugriffs.
                </p>
                <p>
                  Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
                  DSGVO zur technisch fehlerfreien Darstellung und Sicherstellung
                  des Betriebs der Website.
                </p>
              </SubSection>

              <SubSection title="Kontaktformular und Anfragen per E-Mail / Telefon">
                <p>
                  Wenn Sie uns per Kontaktformular, E-Mail oder Telefon Anfragen
                  zukommen lassen, werden Ihre Angaben inklusive der von Ihnen
                  angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
                  den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
                  DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen) oder
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                  effizienten Bearbeitung von Anfragen).
                </p>
              </SubSection>

              <SubSection title="Google Analytics">
                <BulletList
                  items={[
                    <>
                      <strong>Anbieter:</strong> Google Ireland Limited.
                    </>,
                    <>
                      <strong>Einwilligung:</strong> Die Nutzung erfolgt
                      ausschließlich auf Grundlage Ihrer ausdrücklichen
                      Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                    </>,
                    <>
                      <strong>IP-Anonymisierung:</strong> Wir haben die
                      IP-Anonymisierung aktiviert. Ihre IP-Adresse wird innerhalb
                      der EU bzw. des EWR vor der Übermittlung in die USA gekürzt.
                    </>,
                    <>
                      <strong>Widerruf:</strong> Sie können Ihre Einwilligung
                      jederzeit über die Cookie-Einstellungen oder ein
                      Browser-Plugin widerrufen.
                    </>,
                  ]}
                />
              </SubSection>

              <SubSection title="Meetergo">
                <BulletList
                  items={[
                    <>
                      <strong>Anbieter:</strong> meetergo GmbH, Hansaallee 299,
                      40549 Düsseldorf.
                    </>,
                    <>
                      <strong>Verarbeitete Daten:</strong> Name, E-Mail-Adresse
                      und Termin-Metadaten.
                    </>,
                    <>
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
                      DSGVO (Terminvereinbarung zur Vertragserfüllung) oder Art.
                      6 Abs. 1 lit. f DSGVO (Effizienzsteigerung).
                    </>,
                    <>
                      <strong>Auftragsverarbeitung:</strong> Mit meetergo wurde
                      ein AVV geschlossen.
                    </>,
                  ]}
                />
              </SubSection>
            </SectionBlock>

            <SectionBlock number="5" title="Konferenz- und Kommunikationstools">
              <SubSection title="Google Meet">
                <BulletList
                  items={[
                    <>
                      <strong>Anbieter:</strong> Google Ireland Limited.
                    </>,
                    <>
                      <strong>Verarbeitung:</strong> Metadaten wie Teilnehmer,
                      Zeitpunkte sowie Audio- und Videodaten.
                    </>,
                    <>
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
                      DSGVO (bei vertragsbezogenen Gesprächen) oder Art. 6 Abs. 1
                      lit. f DSGVO (effektive Kommunikation).
                    </>,
                    <>
                      <strong>Sicherheit:</strong> Google ist nach dem EU-US Data
                      Privacy Framework zertifiziert.
                    </>,
                  ]}
                />
              </SubSection>
            </SectionBlock>

            <SectionBlock number="6" title="Soziale Medien">
              <SubSection title="Instagram">
                <BulletList
                  items={[
                    <>
                      <strong>Anbieter:</strong> Meta Platforms Ireland Limited.
                    </>,
                    <>
                      <strong>Einwilligung:</strong> Die Nutzung erfolgt auf
                      Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a
                      DSGVO.
                    </>,
                    <>
                      <strong>Gemeinsame Verantwortlichkeit:</strong> Für die
                      Erfassung und Weitergabe bestimmter Daten kann eine
                      gemeinsame Verantwortlichkeit mit Meta im Sinne des Art. 26
                      DSGVO bestehen.
                    </>,
                    <>
                      <strong>Datentransfer:</strong> Eine Übermittlung in die USA
                      ist durch das EU-US Data Privacy Framework abgesichert.
                    </>,
                  ]}
                />
              </SubSection>
            </SectionBlock>

            <SectionBlock number="7" title="Newsletter">
              <SubSection title="Newsletterdaten">
                <p>
                  Wenn Sie den Newsletter beziehen möchten, benötigen wir Ihre
                  E-Mail-Adresse. Die Verarbeitung erfolgt auf Grundlage Ihrer
                  Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                </p>
                <p>
                  Ein Widerruf ist jederzeit über den in jeder Newsletter-Mail
                  enthaltenen Austragen-Link möglich.
                </p>
              </SubSection>

              <SubSection title="Newsletterversand an Bestandskunden">
                <p>
                  Wenn Sie bei uns Waren oder Dienstleistungen bestellen, können
                  wir Ihnen Informationen zu ähnlichen eigenen Angeboten
                  zusenden, sofern dies gesetzlich zulässig ist.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO in Verbindung mit
                  § 7 Abs. 3 UWG. Sie können dem jederzeit widersprechen.
                </p>
              </SubSection>
            </SectionBlock>

            <div className="rounded-2xl border border-[#172545]/10 bg-white p-6 shadow-sm">
              <div className="space-y-2 text-sm text-[#586477]">
                <p>
                  <strong>Stand dieser Datenschutzerklärung:</strong> März 2026
                </p>
                <p>
                  <strong>Hinweis:</strong> Die Basistexte wurden unter anderem
                  unter Verwendung von Formulierungsbausteinen von e-recht24
                  erstellt und individuell angepasst.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-slate-200 bg-white px-6 py-5 md:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#586477]">
              Bei Fragen zum Datenschutz kontaktieren Sie uns jederzeit.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl bg-[#172545] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0d1a30]"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}