import type { ReactNode } from "react";
import { Header } from "@/app/components/header";
import { ObfuscatedLink } from "@/app/components/obfuscated-link";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Shield, ChevronRight } from "lucide-react";

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
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#172545] text-sm font-bold text-white shadow-lg">
          {number}
        </div>
        <div className="pt-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#172545]">
            {title}
          </h2>
        </div>
      </div>
      <div className="space-y-6 md:pl-15">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="rounded-2xl border border-[#172545]/10 bg-gradient-to-br from-white to-slate-50 p-6 md:p-8 shadow-sm">
      <h3 className="mb-4 text-xl md:text-2xl font-semibold text-[#172545]">
        {title}
      </h3>
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

export function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#172545] pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl text-white">
                Datenschutzerklärung
              </h1>
              <p className="text-xl text-white/90">
                Transparente Informationen zum Umgang mit Ihren personenbezogenen
                Daten
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Content Section */}
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl space-y-12">
              <div className="rounded-2xl border border-[#172545]/10 bg-slate-50 p-6 md:p-8 shadow-sm">
                <p className="text-[#586477] leading-relaxed">
                  Nachfolgend informieren wir Sie darüber, welche
                  personenbezogenen Daten wir beim Besuch unserer Website
                  verarbeiten, zu welchen Zwecken dies geschieht und welche Rechte
                  Ihnen in diesem Zusammenhang zustehen.
                </p>
              </div>

              <SectionBlock number="1" title="Datenschutz auf einen Blick">
                <SubSection title="Allgemeine Hinweise">
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick
                    darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                    Sie diese Website besuchen. Personenbezogene Daten sind alle
                    Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                  <p>
                    Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
                    unserer nachfolgenden Datenschutzerklärung.
                  </p>
                </SubSection>

                <SubSection title="Datenerfassung auf dieser Website">
                  <p>
                    <strong>Wer ist verantwortlich für die Datenerfassung auf
                    dieser Website?</strong> Die Datenverarbeitung auf dieser
                    Website erfolgt durch den Websitebetreiber. Dessen
                    Kontaktdaten können Sie dem Abschnitt „Hinweis zur
                    verantwortlichen Stelle“ in dieser Datenschutzerklärung
                    entnehmen.
                  </p>
                  <p>
                    <strong>Wie erfassen wir Ihre Daten?</strong> Ihre Daten
                    werden zum einen dadurch erhoben, dass Sie uns diese
                    mitteilen. Hierbei kann es sich z. B. um Daten handeln, die
                    Sie in ein Kontaktformular eingeben.
                  </p>
                  <p>
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung
                    beim Besuch der Website durch unsere IT-Systeme erfasst. Das
                    sind vor allem technische Daten (z. B. Internetbrowser,
                    Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung
                    dieser Daten erfolgt automatisch, sobald Sie diese Website
                    betreten.
                  </p>
                  <p>
                    <strong>Wofür nutzen wir Ihre Daten?</strong> Ein Teil der
                    Daten wird erhoben, um eine fehlerfreie Bereitstellung der
                    Website zu gewährleisten. Andere Daten können zur Analyse
                    Ihres Nutzerverhaltens verwendet werden. Sofern über die
                    Website Verträge geschlossen oder angebahnt werden können,
                    werden die übermittelten Daten auch für Vertragsangebote,
                    Bestellungen oder sonstige Auftragsanfragen verarbeitet.
                  </p>
                  <p>
                    <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>{" "}
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                    Herkunft, Empfänger und Zweck Ihrer gespeicherten
                    personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                    Recht, die Berichtigung oder Löschung dieser Daten zu
                    verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                    erteilt haben, können Sie diese Einwilligung jederzeit für
                    die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                    bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen. Des Weiteren steht
                    Ihnen ein Beschwerderecht bei der zuständigen
                    Aufsichtsbehörde zu.
                  </p>
                  <p>
                    Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                    Sie sich jederzeit an uns wenden.
                  </p>
                </SubSection>

                <SubSection title="Analyse-Tools und Tools von Drittanbietern">
                  <p>
                    Beim Besuch dieser Website kann Ihr Surf-Verhalten
                    statistisch ausgewertet werden. Das geschieht vor allem mit
                    sogenannten Analyseprogrammen.
                  </p>
                  <p>
                    Detaillierte Informationen zu diesen Analyseprogrammen finden
                    Sie in der folgenden Datenschutzerklärung.
                  </p>
                </SubSection>
              </SectionBlock>

              <SectionBlock
                number="2"
                title="Hosting und Content Delivery Networks (CDN)"
              >
                <SubSection title="Externes Hosting">
                  <p>
                    Diese Website wird extern gehostet. Die personenbezogenen
                    Daten, die auf dieser Website erfasst werden, werden auf den
                    Servern des Hosters gespeichert. Hierbei kann es sich v. a.
                    um IP-Adressen, Kontaktanfragen, Meta- und
                    Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
                    Websitezugriffe und sonstige Daten handeln.
                  </p>
                  <p>
                    Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung
                    (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren,
                    schnellen und effizienten Bereitstellung unseres
                    Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
                    Einwilligung abgefragt wurde, erfolgt die Verarbeitung auf
                    Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
                    TDDDG.
                  </p>
                  <p>
                    <strong>Wir setzen folgenden Hoster ein:</strong> Cloudflare
                    Germany GmbH, c/o Design Offices München Atlas, Rosenheimer
                    Straße 143C, 81671 München.
                  </p>
                </SubSection>

                <SubSection title="Cloudflare">
                  <p>
                    Wir nutzen den Service „Cloudflare“ zur Absicherung und
                    Beschleunigung unserer Website. Anbieter ist die Cloudflare
                    Germany GmbH. Cloudflare betreibt ein Content Delivery
                    Network (CDN) und dient als Reverse-Proxy, um den
                    Datenverkehr zu optimieren und Angriffe abzuwehren.
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Rechtsgrundlage:</strong> Die Nutzung erfolgt auf
                        Grundlage unseres berechtigten Interesses an einer
                        sicheren und effizienten Bereitstellung unseres
                        Webangebots (Art. 6 Abs. 1 lit. f DSGVO).
                      </>,
                      <>
                        <strong>Auftragsverarbeitung:</strong> Wir haben mit
                        Cloudflare einen Vertrag über Auftragsverarbeitung (AVV)
                        geschlossen.
                      </>,
                      <>
                        <strong>Datentransfer:</strong> Cloudflare überträgt Daten
                        ggf. in die USA. Die Übertragung basiert auf den
                        Standardvertragsklauseln der EU-Kommission und der
                        Zertifizierung nach dem EU-US Data Privacy Framework.
                      </>,
                    ]}
                  />
                </SubSection>

                <SubSection title="Google Cloud CDN">
                  <p>
                    Wir nutzen das Content Delivery Network Google Cloud CDN der
                    Google Ireland Limited, Gordon House, Barrow Street, Dublin
                    4, Irland.
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Zweck:</strong> Beschleunigung der Ladezeiten
                        durch Auslieferung von Inhalten über weltweit verteilte
                        Server.
                      </>,
                      <>
                        <strong>Rechtsgrundlage:</strong> Berechtigtes Interesse
                        an der Performance-Optimierung der Website (Art. 6 Abs. 1
                        lit. f DSGVO).
                      </>,
                      <>
                        <strong>Datenschutz:</strong> Google ist nach dem EU-US
                        Data Privacy Framework zertifiziert.
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
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                    persönlichen Daten sehr ernst. Wir behandeln Ihre
                    personenbezogenen Daten vertraulich und entsprechend den
                    gesetzlichen Datenschutzvorschriften sowie dieser
                    Datenschutzerklärung.
                  </p>
                  <p>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet
                    Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
                    Daten vor dem Zugriff durch Dritte ist nicht möglich.
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
                      <ObfuscatedLink
                        encodedHref="bWFpbHRvOmRhdGVuc2NodXR6QGF2ZXlvLmRl"
                        className="font-medium text-[#172545] underline underline-offset-2"
                      >
                        datenschutz@aveyo.de
                      </ObfuscatedLink>
                    </p>
                  </div>
                </SubSection>

                <SubSection title="Speicherdauer">
                  <p>
                    Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                    Speicherdauer genannt wurde, verbleiben Ihre Daten bei uns,
                    bis der Zweck für die Datenverarbeitung entfällt.
                  </p>
                  <p>
                    Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
                    eine Einwilligung widerrufen, werden Ihre Daten gelöscht,
                    sofern keine anderen rechtlich zulässigen Gründe (z. B.
                    steuer- oder handelsrechtliche Aufbewahrungsfristen)
                    vorliegen.
                  </p>
                </SubSection>

                <SubSection title="Allgemeine Hinweise zu den Rechtsgrundlagen">
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt auf
                    Grundlage von:
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Einwilligung:</strong> Art. 6 Abs. 1 lit. a
                        DSGVO und § 25 Abs. 1 TDDDG
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
                        <strong>Berechtigtes Interesse:</strong> Art. 6 Abs. 1
                        lit. f DSGVO
                      </>,
                    ]}
                  />
                </SubSection>

                <SubSection title="Verarbeitung von Kunden- und Vertragsdaten">
                  <p>
                    Wir erheben, verarbeiten und nutzen personenbezogene Daten
                    zur Begründung, inhaltlichen Ausgestaltung und Änderung des
                    Rechtsverhältnisses (Bestandsdaten).
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Umfang:</strong> Wir verarbeiten Daten von
                        Kunden (z. B. Namen, Adressen, Kontaktdaten) zur
                        Abwicklung von Bestellungen oder Anfragen.
                      </>,
                      <>
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
                        DSGVO (Vertragserfüllung). Die gelöschten Daten werden
                        nach Abschluss des Auftrags oder Beendigung der
                        Geschäftsbeziehung unter Beachtung gesetzlicher
                        Aufbewahrungsfristen gelöscht.
                      </>,
                    ]}
                  />
                </SubSection>

                <SubSection title="Weitere Pflichtinformationen">
                  <BulletList
                    items={[
                      <>
                        <strong>Empfänger:</strong> Wir geben personenbezogene
                        Daten nur an externe Stellen weiter, wenn dies zur
                        Vertragserfüllung erforderlich ist, eine gesetzliche
                        Pflicht besteht oder ein berechtigtes Interesse vorliegt.
                      </>,
                      <>
                        <strong>Betroffenenrechte:</strong> Sie haben das Recht
                        auf Widerruf der Einwilligung, Widerspruch gegen die
                        Datenverarbeitung, Beschwerde bei der Aufsichtsbehörde,
                        Datenübertragbarkeit sowie Auskunft, Berichtigung und
                        Löschung.
                      </>,
                    ]}
                  />
                </SubSection>

                <SubSection title="SSL- bzw. TLS-Verschlüsselung">
                  <p>
                    Diese Seite nutzt eine SSL- bzw. TLS-Verschlüsselung zum
                    Schutz vertraulicher Inhalte. Eine verschlüsselte Verbindung
                    erkennen Sie an dem Schloss-Symbol in der Browserzeile und
                    dem Wechsel von „http://“ auf „https://“.
                  </p>
                </SubSection>
              </SectionBlock>

              <SectionBlock number="4" title="Datenerfassung auf dieser Website">
                <SubSection title="Cookies">
                  <p>
                    Unsere Internetseiten verwenden Cookies. Das sind kleine
                    Datenpakete, die auf Ihrem Endgerät gespeichert werden.
                    Notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit.
                    f DSGVO gespeichert. Andere Cookies (z. B. zur Analyse)
                    werden nur mit Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a
                    DSGVO verwendet.
                  </p>
                </SubSection>

                <SubSection title="Server-Log-Dateien">
                  <p>
                    Der Provider erhebt automatisch Informationen in
                    Server-Log-Dateien (z. B. IP-Adresse, Browsertyp, Uhrzeit).
                    Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
                    DSGVO zur technisch fehlerfreien Darstellung der Website.
                  </p>
                </SubSection>

                <SubSection title="Kontaktformular und Anfragen per E-Mail / Telefon">
                  <p>
                    Wenn Sie uns Anfragen zukommen lassen, werden Ihre Angaben
                    inklusive Kontaktdaten zwecks Bearbeitung bei uns
                    gespeichert. Die Verarbeitung erfolgt auf Grundlage von
                    Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) oder Art. 6
                    Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                  </p>
                </SubSection>

                <SubSection title="Google Analytics">
                  <p>
                    Diese Website nutzt Google Analytics der Google Ireland
                    Limited.
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Einwilligung:</strong> Die Nutzung erfolgt
                        ausschließlich auf Grundlage Ihrer ausdrücklichen
                        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                      </>,
                      <>
                        <strong>IP-Anonymisierung:</strong> Wir haben die
                        IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse
                        innerhalb der EU / des EWR vor der Übermittlung in die
                        USA gekürzt wird.
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
                  <p>
                    Wir nutzen „Meetergo“ zur Online-Terminbuchung. Anbieter ist
                    die meetergo GmbH, Hansaallee 299, 40549 Düsseldorf.
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Daten:</strong> Bei der Buchung werden Name,
                        E-Mail und Termin-Metadaten verarbeitet.
                      </>,
                      <>
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
                        DSGVO (Terminvereinbarung zur Vertragserfüllung) oder
                        Art. 6 Abs. 1 lit. f DSGVO (Effizienzsteigerung).
                      </>,
                      <>
                        <strong>Auftragsverarbeitung:</strong> Wir haben mit
                        meetergo einen AVV geschlossen.
                      </>,
                    ]}
                  />
                </SubSection>
              </SectionBlock>

              <SectionBlock
                number="5"
                title="Konferenz- und Kommunikationstools"
              >
                <SubSection title="Google Meet">
                  <p>
                    Wir nutzen Google Meet für Videokonferenzen. Anbieter ist die
                    Google Ireland Limited.
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Verarbeitung:</strong> Metadaten (Teilnehmer,
                        Zeit), Audio- und Videodaten.
                      </>,
                      <>
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
                        DSGVO (bei Vertragskontext) oder Art. 6 Abs. 1 lit. f
                        DSGVO (effektive Kommunikation).
                      </>,
                      <>
                        <strong>Sicherheit:</strong> Google ist DPF-zertifiziert.
                      </>,
                    ]}
                  />
                </SubSection>
              </SectionBlock>

              <SectionBlock number="6" title="Soziale Medien">
                <SubSection title="Instagram">
                  <p>
                    Auf dieser Website sind Funktionen des Dienstes Instagram
                    eingebunden (Meta Platforms Ireland Limited).
                  </p>
                  <BulletList
                    items={[
                      <>
                        <strong>Einwilligung:</strong> Die Nutzung erfolgt auf
                        Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
                        DSGVO).
                      </>,
                      <>
                        <strong>Gemeinsame Verantwortlichkeit:</strong> Wir sind
                        mit Meta für die Erfassung und Weitergabe der Daten
                        gemeinsam verantwortlich (Art. 26 DSGVO).
                      </>,
                      <>
                        <strong>Datentransfer:</strong> Die Übertragung in die
                        USA ist durch das EU-US Data Privacy Framework
                        abgesichert.
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
                    Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ein Widerruf ist
                    jederzeit über den „Austragen“-Link möglich.
                  </p>
                </SubSection>

                <SubSection title="Newsletterversand an Bestandskunden">
                  <p>
                    Wenn Sie bei uns Waren oder Dienstleistungen bestellen,
                    können wir Ihnen Newsletter für ähnliche eigene Angebote
                    zusenden.
                  </p>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO i. V. m.
                    § 7 Abs. 3 UWG. Sie können dem jederzeit widersprechen.
                  </p>
                </SubSection>
              </SectionBlock>

              <div className="rounded-2xl border border-[#172545]/10 bg-slate-50 p-6 md:p-8 shadow-sm">
                <p className="text-sm text-[#586477]">
                  <strong>Quelle der Basistexte:</strong> e-recht24.de
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