import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Partners } from "@/app/components/partners";
import { Zap, Smartphone, Shield, CheckCircle, ArrowRight, Linkedin, Mail, User } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useState } from "react";
import { assets } from "@/config/assets";

export function AboutPage() {
  const [activeTabAdrian, setActiveTabAdrian] = useState<"about" | "drives">("about");
  const [activeTabTimo, setActiveTabTimo] = useState<"about" | "drives">("about");

  const promises = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Transparenz",
      description: "Du weißt immer, was du zahlst und warum."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Klarheit",
      description: "Kein Fachchinesisch. Kein Blabla. Nur Fakten."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Effizienz",
      description: "Wir respektieren deine Zeit und automatisieren den langweiligen Kram."
    }
  ];

  const founders = [
    {
      name: "Adrian Nerhoff",
      role: "Geschäftsführer",
      expertise: "Experte für Investment und Versicherungen",
      aboutMe: "Nach über 10 Jahren in der traditionellen Finanzbranche habe ich erkannt, dass die alte Welt nicht mehr zu den Bedürfnissen der digitalen Generation passt. Ich habe bei führenden Finanzinstituten gearbeitet, Hunderte von Kunden betreut und dabei eines gelernt: Die besten Strategien sind die, die man versteht. Mein Weg führte mich von der klassischen Bankenwelt über spezialisierte Versicherungsmakler bis hin zur Gründung von AVEYO – immer mit dem Ziel, Finanzberatung transparenter, digitaler und kundenorientierter zu machen.",
      whatDrivesMe: {
        qualities: [
          {
            label: "Empathisch",
            text: "Ich höre zu, bevor ich berate. Es ist mir wichtig, Ihre Situation wirklich zu verstehen – mit all Ihren Zielen, Fragen und Unsicherheiten."
          },
          {
            label: "Leidenschaftlich",
            text: "Finanzen sind für mich mehr als Zahlen. Ich brenne dafür, Unternehmerinnen und Unternehmern zu helfen, Klarheit zu gewinnen und das Beste aus ihren Ressourcen zu machen."
          },
          {
            label: "Strukturiert",
            text: "Komplexe Themen bringe ich auf den Punkt. Mit einem klaren Plan und durchdachten Strategien schaffen wir gemeinsam messbare Fortschritte für Ihr Unternehmen."
          },
          {
            label: "Wertschätzend",
            text: "Ich arbeite mit Menschen, nicht mit Verträgen. Offenheit, Respekt und eine angenehme Atmosphäre sind für mich selbstverständlich – auch im geschäftlichen Kontext."
          },
          {
            label: "Kompetent",
            text: "Mit Fachwissen, Erfahrung und kontinuierlicher Weiterbildung sorge ich dafür, dass Sie sich bei mir fachlich wie menschlich bestens aufgehoben fühlen."
          }
        ],
        closing: "Klingt das nach einer Zusammenarbeit, wie Sie sie sich wünschen? Dann freue ich mich, Sie kennenzulernen und gemeinsam mit Ihnen das Richtige für Ihr Unternehmen zu gestalten."
      },
      email: "adrian@aveyo.de",
      linkedin: "#"
    },
    {
      name: "Timo Konrad",
      role: "Geschäftsführer",
      expertise: "Experte für Immobilieninvestment und Versicherungen",
      aboutMe: "Immobilien sind meine Leidenschaft seit meinem ersten Investment vor über 12 Jahren. Ich habe den Markt von allen Seiten kennengelernt: Als Investor, Berater und Projektentwickler. Von der ersten kleinen Eigentumswohnung bis zu komplexen gewerblichen Portfolios – ich habe gesehen, was funktioniert und was nicht. Meine Expertise liegt darin, aus Daten und Marktanalysen konkrete Investmentstrategien zu entwickeln, die wirklich Rendite bringen.",
      whatDrivesMe: {
        qualities: [
          {
            label: "Lösungsorientiert",
            text: "Ich erkenne Herausforderungen – und sorge für Klarheit. Ich analysiere bestehende Versicherungsverträge, erkenne Lücken und optimiere Ihre Absicherung mit durchdachten, individuell abgestimmten Konzepten. Damit Sie sich auf Ihr Kerngeschäft konzentrieren können."
          },
          {
            label: "Weitsichtig",
            text: "Ich denke über den Vertrag hinaus: Absicherung ist mehr als ein Produkt. Ich berate Sie strategisch – mit dem Blick für Risiken, Strukturen und Ziele. Auch bei der Vermögensbildung mit Immobilien bin ich langfristig an Ihrer Seite."
          },
          {
            label: "Persönlich",
            text: "Ich bin Ihr Ansprechpartner – direkt, verlässlich und nahbar. Vertrauen entsteht im Gespräch. Ich nehme mir Zeit, Ihre Situation zu verstehen, bin offen für Ihre Fragen und begleite Sie partnerschaftlich durch alle Phasen Ihrer Absicherungs- oder Investitionsstrategie."
          },
          {
            label: "Kompetent",
            text: "Mit Fachwissen, Erfahrung und stetiger Weiterbildung sorge ich dafür, dass Sie sich bei mir gut aufgehoben fühlen – fachlich und menschlich."
          }
        ],
        closing: ""
      },
      email: "timo@aveyo.de",
      linkedin: "#"
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
                Wir haben das System gehackt
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Die traditionelle Finanzwelt ist langsam, staubig und papierbesessen. Wir haben uns diese Welt angesehen und entschieden: Wir bauen das Gegenteil.
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Mission - Digital DNA */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Centered Title Only */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-[#172545] font-bold leading-tight">
                  Digitale DNA: Der Finanzpartner für die digitale Generation
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                {/* Text Content - Left Side */}
                <div className="lg:w-1/2">
                  <p className="text-lg text-[#586477] leading-relaxed mb-6">
                    Du steuerst dein Leben und dein Business über dein Smartphone. Deine Finanzberatung sollte genau dort stattfinden.
                  </p>
                  <p className="text-lg text-[#586477] leading-relaxed mb-6">
                    Wir haben den Mahagoni-Schreibtisch gegen schlanke Dashboards getauscht. Statt Verkaufsgesprächen bekommst du datenbasierte Strategien. Keine "Öffnungszeiten" – wir liefern Lösungen, wo du bist.
                  </p>
                  <p className="text-lg text-[#586477] leading-relaxed">
                    Egal ob du Startup-Gründer, Creator oder Skalierer bist – wir matchen dein Tempo.
                  </p>
                </div>
                
                {/* Image - Right Side */}
                <div className="lg:w-1/2 flex justify-end">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759884247142-028abd1e8ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaWdpdGFsJTIwd29ya3NwYWNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcxMjU1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Modernes digitales Arbeiten"
                    className="w-full max-w-[450px] aspect-square rounded-3xl shadow-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="left" />
        </section>

        {/* Expertise Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold leading-tight">
                  Echte Expertise. Null Steifheit.
                </h2>
                <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-4">
                  Wenn es um dein Geld geht, spielen wir keine Spielchen.
                </p>
                <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  Wir verkaufen Sicherheit und Wohlstand. Wir kümmern uns obsessiv um das Kleingedruckte deiner Versicherungen und die Performance deines Portfolios, damit du es nicht musst.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Komplexe Regularien?</h3>
                    <p className="text-white/80">Wir übersetzen sie in klares Deutsch.</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Privatbank-Kompetenz</h3>
                    <p className="text-white/80">Mit der Usability deiner Lieblings-App.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="right" />
        </section>

        {/* Promise Section */}
        <section className="relative bg-white pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                  Unser Versprechen
                </h2>
                <p className="text-xl text-[#586477] max-w-2xl mx-auto">
                  Drei Prinzipien, die uns von der alten Finanzwelt unterscheiden
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {promises.map((promise, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#172545]/5 to-[#172545]/10 rounded-2xl p-8 border border-[#172545]/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 bg-[#172545] rounded-xl flex items-center justify-center text-white">
                        {promise.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#172545] mb-3 text-center">
                      {promise.title}
                    </h3>
                    <p className="text-[#586477] text-center leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#172545" alignment="left" />
        </section>

        {/* Founders Section */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold">
                  Die Köpfe hinter AVEYO
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {founders.map((founder, index) => {
                  const activeTab = index === 0 ? activeTabAdrian : activeTabTimo;
                  const setActiveTab = index === 0 ? setActiveTabAdrian : setActiveTabTimo;
                  
                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      {/* Profile Image */}
                      <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full">
                        <img
                          src={index === 0 ? assets.team.profile1 : assets.team.profile2}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {founder.name}
                        </h3>
                        <p className="text-white/60 text-sm font-semibold mb-2 uppercase tracking-wide">
                          {founder.role}
                        </p>
                        <p className="text-white/80 text-sm mb-8 italic">
                          {founder.expertise}
                        </p>

                        {/* Tab Toggle - like Vorsorge Section */}
                        <div className="flex justify-center mb-8">
                          <div className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
                            {/* Animated background slider */}
                            <div 
                              className="absolute top-1 h-[calc(100%-8px)] rounded-lg bg-white shadow-lg transition-all duration-300 ease-out"
                              style={{
                                left: activeTab === "about" ? "4px" : "calc(50%)",
                                width: "calc(50% - 4px)",
                              }}
                            />
                            
                            {/* Über mich Button */}
                            <button
                              onClick={() => setActiveTab("about")}
                              className="relative px-6 py-3 rounded-lg transition-all duration-300 z-10 text-sm font-semibold min-w-[140px]"
                            >
                              <span className={`transition-colors duration-300 ${
                                activeTab === "about" ? "text-[#172545]" : "text-white/90"
                              }`}>
                                Über mich
                              </span>
                            </button>

                            {/* Was mich ausmacht Button */}
                            <button
                              onClick={() => setActiveTab("drives")}
                              className="relative px-6 py-3 rounded-lg transition-all duration-300 z-10 text-sm font-semibold min-w-[140px]"
                            >
                              <span className={`transition-colors duration-300 ${
                                activeTab === "drives" ? "text-[#172545]" : "text-white/90"
                              }`}>
                                Was mich ausmacht
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Text Content with Smooth Transition */}
                        <div className="relative mb-6 min-h-[200px] overflow-hidden">
                          {/* Über mich Text */}
                          <div 
                            className={`transition-all duration-500 ease-out ${
                              activeTab === "about" 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 -translate-y-4 absolute top-0 left-0 right-0 pointer-events-none'
                            }`}
                          >
                            <p className="text-white/90 leading-relaxed text-left px-2">
                              {founder.aboutMe}
                            </p>
                          </div>

                          {/* Was mich ausmacht Text */}
                          <div 
                            className={`transition-all duration-500 ease-out ${
                              activeTab === "drives" 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4 absolute top-0 left-0 right-0 pointer-events-none'
                            }`}
                          >
                            {typeof founder.whatDrivesMe === "string" ? (
                              <p className="text-white/90 leading-relaxed text-left px-2">
                                {founder.whatDrivesMe}
                              </p>
                            ) : (
                              <div>
                                {founder.whatDrivesMe.qualities.map((quality, index) => (
                                  <div key={index} className="mb-4">
                                    <h4 className="text-xl font-bold text-white/90 mb-2">
                                      {quality.label}
                                    </h4>
                                    <p className="text-white/80 leading-relaxed text-left px-2">
                                      {quality.text}
                                    </p>
                                  </div>
                                ))}
                                {founder.whatDrivesMe.closing && (
                                  <p className="text-white/90 leading-relaxed text-left px-2 mt-6">
                                    {founder.whatDrivesMe.closing}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Contact Icons */}
                        <div className="flex justify-center gap-4">
                          <a
                            href={`mailto:${founder.email}`}
                            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="E-Mail"
                          >
                            <Mail className="w-5 h-5 text-white" />
                          </a>
                          <a
                            href={founder.linkedin}
                            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-5 h-5 text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="right" />
        </section>

        {/* Partner Section */}
        <Partners />

        {/* CTA Section - Bereit für das Upgrade? */}
        <section className="relative bg-[#172545] pt-32 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bereit für das Upgrade?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Hör auf, dich mit dem Banking von gestern zufrieden zu geben. Lass uns deine Zukunft bauen.
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-white/90 transition-all duration-300 font-semibold text-lg"
              >
                Kontakt aufnehmen
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