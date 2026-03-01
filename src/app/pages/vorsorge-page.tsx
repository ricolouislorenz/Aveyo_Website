import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { ShapeDivider } from "@/app/components/shape-divider";
import { Shield, Heart, Briefcase, Users, Building, FileText, ArrowRight, CheckCircle, UserCheck, Home, Car, Plane, Activity, Umbrella, Lock, Server, Scale, ShieldCheck, Wallet, TrendingUp, PawPrint } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function VorsorgePage() {
  const [activeTab, setActiveTab] = useState<"private" | "business">("private");

  const privateInsuranceCategories = [
    {
      category: "Deine Existenz im Fokus",
      description: "Bevor wir über Sachwerte sprechen, sichern wir das Wichtigste ab: Dich und deine finanzielle Zukunft.",
      insurances: [
        {
          icon: <Umbrella className="w-6 h-6" />,
          title: "Privathaftpflicht",
          description: "Der absolute Basisschutz. Sie zahlt, wenn du anderen versehentlich einen Schaden zufügst – egal ob Kaffeefleck auf dem Teppich oder ein Unfall mit dem Fahrrad."
        },
        {
          icon: <UserCheck className="w-6 h-6" />,
          title: "Berufsunfähigkeitsversicherung (BU)",
          description: "Deine Arbeitskraft ist dein größtes Kapital. Wenn du aus gesundheitlichen Gründen nicht mehr arbeiten kannst, sichert die BU dein Einkommen."
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Rentenversicherung",
          description: "Deine Freiheit für später. Baue dir ein finanzielles Polster auf, damit du nach dem Arbeitsleben genau so leben kannst, wie du es dir vorstellst."
        },
        {
          icon: <Activity className="w-6 h-6" />,
          title: "Pflegezusatzversicherung",
          description: "Die gesetzliche Pflegeversicherung ist nur ein \"Teilkasko\"-Schutz. Schließe die Lücke, um im Pflegefall dein Vermögen zu schützen."
        }
      ]
    },
    {
      category: "Gesundheit & Wohlbefinden",
      description: "Die gesetzliche Kasse bietet eine Grundversorgung. Wer mehr will, muss privat vorsorgen.",
      insurances: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Krankenzusatzversicherung",
          description: "Upgrade für Kassenpatienten. Gönn dir Chefarztbehandlung, Einzelzimmer oder den Zugang zu Naturheilverfahren."
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Zahnzusatzversicherung",
          description: "Damit du auch morgen noch kraftvoll zubeißen kannst, ohne Angst vor der Rechnung. Sie übernimmt hohe Kosten für Zahnersatz und Implantate."
        },
        {
          icon: <Plane className="w-6 h-6" />,
          title: "Auslandsreiseversicherung",
          description: "Krank im Urlaub? Diese Versicherung übernimmt weltweit die Behandlungskosten und den medizinisch sinnvollen Rücktransport."
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Private Krankenversicherung (PKV)",
          description: "Für Selbstständige und Gutverdiener oft die leistungsstärkere Wahl mit individuellem Schutz auf höchstem Niveau."
        }
      ]
    },
    {
      category: "Hab & Gut",
      description: "Was du dir aufgebaut hast, sollte auch geschützt bleiben.",
      insurances: [
        {
          icon: <Home className="w-6 h-6" />,
          title: "Hausratversicherung",
          description: "Ob Feuer, Wasser oder Einbruch – diese Versicherung ersetzt dir den Neuwert deiner gesamten Einrichtung, vom Sofa bis zum Laptop."
        },
        {
          icon: <Building className="w-6 h-6" />,
          title: "Wohngebäudeversicherung",
          description: "Ein Muss für Hausbesitzer. Sie schützt deine vier Wände vor Schäden durch Sturm, Feuer oder Leitungswasser."
        },
        {
          icon: <Car className="w-6 h-6" />,
          title: "KFZ-Versicherung",
          description: "Vom gesetzlichen Pflichtschutz bis zur Vollkasko. Wir finden den Tarif, der dich und dein Auto optimal absichert."
        },
        {
          icon: <PawPrint className="w-6 h-6" />,
          title: "Tierversicherung",
          description: "Dein Vierbeiner ist ein Familienmitglied. Eine Haftpflicht schützt dich vor Schadensersatzansprüchen, die Tierkrankenversicherung deckt hohe Tierarztkosten ab."
        }
      ]
    },
    {
      category: "Recht & Unfall",
      description: "Für die unvorhersehbaren Momente im Leben.",
      insurances: [
        {
          icon: <Wallet className="w-6 h-6" />,
          title: "Unfallversicherung",
          description: "Schützt dich vor den finanziellen Folgen einer dauerhaften Invalidität durch einen Unfall – weltweit und rund um die Uhr."
        },
        {
          icon: <Scale className="w-6 h-6" />,
          title: "Rechtsschutzversicherung",
          description: "Recht haben und Recht bekommen sind zweierlei. Diese Versicherung trägt Anwalts- und Gerichtskosten, damit du dein Recht durchsetzen kannst."
        }
      ]
    }
  ];

  const businessInsuranceCategories = [
    {
      category: "Die Fundamente deines Erfolgs",
      description: "Diese Versicherungen sind das Nonplusultra für jedes Unternehmen, egal ob Startup oder etablierter Player. Sie schützen dich vor den größten externen Bedrohungen.",
      insurances: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Betriebshaftpflicht",
          description: "Das Must-have für jeden Unternehmer. Sie springt ein, wenn dein Unternehmen oder deine Mitarbeiter Dritten einen Schaden zufügen – von der beschädigten Kundenausrüstung bis hin zu Personenschäden."
        },
        {
          icon: <Building className="w-6 h-6" />,
          title: "Inhaltsversicherung",
          description: "Schützt dein gesamtes Betriebsinventar – Büromöbel, technische Ausstattung, Waren – gegen Schäden wie Feuer, Wasser, Sturm und Einbruchdiebstahl."
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Betriebsunterbrechungsversicherung",
          description: "Was passiert, wenn dein Betrieb nach einem Schaden stillsteht? Diese Versicherung ersetzt dir die fortlaufenden Kosten und den entgangenen Gewinn, bis dein Business wieder läuft."
        }
      ]
    },
    {
      category: "Schutz für die digitale & rechtliche Welt",
      description: "In der modernen Wirtschaft lauern Risiken nicht nur in der realen Welt. Wir sichern dich auch digital und rechtlich ab.",
      insurances: [
        {
          icon: <Lock className="w-6 h-6" />,
          title: "Cyber-Versicherung",
          description: "Ein Hackerangriff kann Existenzen vernichten. Diese Police deckt die Kosten für Datenwiederherstellung, IT-Forensik, Betriebsunterbrechung und Schadensersatzforderungen nach einem Cyber-Vorfall."
        },
        {
          icon: <Scale className="w-6 h-6" />,
          title: "Firmen-Rechtsschutz",
          description: "Ob Streit mit einem Lieferanten, arbeitsrechtliche Auseinandersetzungen oder Ärger mit Behörden – diese Versicherung sorgt dafür, dass du dein Recht ohne hohes Kostenrisiko durchsetzen kannst."
        }
      ]
    },
    {
      category: "Absicherung für die Schlüsselpersonen",
      description: "Dein Unternehmen ist nur so stark wie die Menschen dahinter. Deshalb steht der Schutz von dir als Geschäftsführer und deinem Team im Mittelpunkt.",
      insurances: [
        {
          icon: <ShieldCheck className="w-6 h-6" />,
          title: "Geschäftsführer-Vorsorge (D&O)",
          description: "Als Geschäftsführer haftest du bei Fehlentscheidungen oft mit deinem Privatvermögen. Die D&O-Versicherung schützt dich vor den finanziellen Folgen von Managementfehlern."
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Mitarbeiterabsicherung (bAV & bKV)",
          description: "Zeige deinem Team, dass es dir wichtig ist. Mit einer betrieblichen Altersvorsorge (bAV) oder Krankenversicherung (bKV) bindest du wertvolle Fachkräfte an dein Unternehmen und positionierst dich als attraktiver Arbeitgeber."
        }
      ]
    }
  ];

  const currentInsurance = activeTab === "private" ? privateInsuranceCategories : businessInsuranceCategories;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Blue background without top divider */}
        <section className="relative bg-[#172545] pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Vorsorge & Absicherung
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Umfassende Absicherung für Privatpersonen und Unternehmen - individuell und bedarfsgerecht
              </p>
            </div>
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>

        {/* Intro Section */}
        <section className="relative bg-white pt-32 pb-0">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-[#172545] font-bold">
                Maßgeschneiderte Absicherung für jeden Lebensbereich
              </h2>
              <p className="text-xl text-[#586477] leading-relaxed mb-40">
                Ob du als Privatperson deine Familie absichern möchtest oder als Unternehmer dein Business schützen willst – wir haben die passende Lösung für dich. Wähle deine Zielgruppe und entdecke unsere spezialisierten Versicherungskonzepte.
              </p>
            </div>
          </div>
          
          {/* Shape Divider with Headings */}
          <div className="relative overflow-visible">
            <ShapeDivider position="bottom" color="#172545" alignment={activeTab === "private" ? "right" : "left"} />
            
            {/* Clickable Headings positioned in/near the transition area */}
            <div className="absolute bottom-0 left-0 right-0 z-50" style={{ transform: 'translateY(20%)' }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto relative" style={{ height: '60px' }}>
                  {/* Privatpersonen - Positioned at left */}
                  <button
                    onClick={() => setActiveTab("private")}
                    className="absolute pointer-events-auto"
                    style={{ 
                      left: '23%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap ${
                      activeTab === "private" 
                        ? "text-white" 
                        : "text-[#172545]"
                    }`}>
                      Privatpersonen
                    </h3>
                  </button>

                  {/* Unternehmer - Positioned at right */}
                  <button
                    onClick={() => setActiveTab("business")}
                    className="absolute pointer-events-auto"
                    style={{ 
                      left: '77%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap ${
                      activeTab === "business" 
                        ? "text-white" 
                        : "text-[#172545]"
                    }`}>
                      Unternehmer
                    </h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Grid Section */}
        <section className="relative bg-[#172545] pt-32 pb-32">
          <div className="container mx-auto px-4">
            {activeTab === "private" ? (
              <div className="max-w-6xl mx-auto">
                {/* Intro for Private */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
                    Dein Sicherheitsnetz für alle Fälle
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-4">
                    Das Leben ist voller Überraschungen – gute wie schlechte. Versicherungen sind kein notwendiges Übel, sondern dein persönliches Sicherheitsnetz. Sie sorgen dafür, dass ein Missgeschick nicht zur finanziellen Katastrophe wird.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Wir helfen dir dabei, den Dschungel aus Tarifen und Klauseln zu lichten. Unser Ziel: So viel Schutz wie nötig, so wenig Kosten wie möglich.
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-16">
                  {privateInsuranceCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl text-white font-bold mb-3">
                          {category.category}
                        </h3>
                        <p className="text-white/70 text-lg">
                          {category.description}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {category.insurances.map((insurance, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0d1a30] rounded-2xl p-6 border border-[#586477]/30 hover:border-white/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center border border-[#586477]/30 flex-shrink-0">
                                <div className="text-white/90">{insurance.icon}</div>
                              </div>
                              <div>
                                <h4 className="text-lg text-white font-semibold mb-2">
                                  {insurance.title}
                                </h4>
                                <p className="text-white/70 leading-relaxed">
                                  {insurance.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Check-Up CTA */}
                <div className="mt-16 bg-[#0d1a30] rounded-3xl p-8 md:p-12 border border-[#586477]/30 text-center">
                  <h3 className="text-2xl md:text-3xl text-white font-bold mb-4">
                    Dein individueller Check-Up
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                    Brauchst du wirklich alles? Wahrscheinlich nicht. Welche Versicherungen für dich sinnvoll sind, hängt von deiner Lebensphase und deinen Zielen ab.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    Lass uns gemeinsam prüfen, wo du gut aufgestellt bist und wo Lücken bestehen.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-lg text-lg font-semibold"
                  >
                    Termin vereinbaren
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                {/* Intro for Business */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
                    Dein Business auf sicherem Fundament
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-4">
                    Dein Unternehmen ist mehr als nur ein Job – es ist dein Antrieb, deine Vision. Doch unternehmerischer Erfolg bringt auch Verantwortung und Risiken mit sich. Ein einziger unvorhergesehener Vorfall kann alles gefährden, was du dir aufgebaut hast.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Wir verstehen das. Deshalb entwickeln wir maßgeschneiderte Absicherungskonzepte, die dein Business schützen, damit du dich auf das konzentrieren kannst, was du am besten kannst: wachsen.
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-16">
                  {businessInsuranceCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl text-white font-bold mb-3">
                          {category.category}
                        </h3>
                        <p className="text-white/70 text-lg">
                          {category.description}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {category.insurances.map((insurance, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0d1a30] rounded-2xl p-6 border border-[#586477]/30 hover:border-white/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center border border-[#586477]/30 flex-shrink-0">
                                <div className="text-white/90">{insurance.icon}</div>
                              </div>
                              <div>
                                <h4 className="text-lg text-white font-semibold mb-2">
                                  {insurance.title}
                                </h4>
                                <p className="text-white/70 leading-relaxed">
                                  {insurance.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Check-Up CTA */}
                <div className="mt-16 bg-[#0d1a30] rounded-3xl p-8 md:p-12 border border-[#586477]/30 text-center">
                  <h3 className="text-2xl md:text-3xl text-white font-bold mb-4">
                    Dein strategischer Sicherheits-Check
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                    Jedes Business ist einzigartig. Standardlösungen greifen hier zu kurz. Lass uns gemeinsam eine Risikoanalyse durchführen und ein Sicherheitsnetz spannen, das perfekt zu deinem Geschäftsmodell, deiner Branche und deiner Wachstumsphase passt.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    Sichere dein Lebenswerk ab – strategisch und effizient.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-lg text-lg font-semibold"
                  >
                    Termin vereinbaren
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}
          </div>
          <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
        </section>
      </main>
      <Footer />
    </div>
  );
}