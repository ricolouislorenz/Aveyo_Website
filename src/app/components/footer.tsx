import { useState, useEffect, useRef } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { User, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

const DESKTOP_STICKY_TOP = 120;

// Public-Pfad: /public/images/vorsorge/privat|business/<name>.webp
const vorsorgeImg = (scope: "privat" | "business", fileBaseName: string) =>
  `/images/vorsorge/${scope}/${fileBaseName}.webp`;

export function Vorsorge() {
  const [activeTab, setActiveTab] = useState<"private" | "business">("private");
  const [currentStep, setCurrentStep] = useState(0);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const desktopStickyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const privateServices = [
    {
      title: "Privathaftpflicht",
      description:
        "Der absolute Basisschutz. Schützt dich, wenn du anderen versehentlich einen Schaden zufügst.",
      image: vorsorgeImg("privat", "privathaftpflicht"),
    },
    {
      title: "Berufsunfähigkeitsversicherung (BU)",
      description:
        "Sichert dein Einkommen, wenn du aus gesundheitlichen Gründen nicht mehr arbeiten kannst.",
      image: vorsorgeImg("privat", "berufsunfaehigkeit"),
    },
    {
      title: "Rentenversicherung",
      description:
        "Baue dir ein finanzielles Polster auf für einen sorgenfreien Ruhestand.",
      image: vorsorgeImg("privat", "rentenversicherung"),
    },
    {
      title: "Pflegezusatzversicherung",
      description:
        "Schließe die Lücke der gesetzlichen Pflegeversicherung und schütze dein Vermögen.",
      image: vorsorgeImg("privat", "pflegezusatzversicherung"),
    },
    {
      title: "Krankenzusatzversicherung",
      description:
        "Upgrade für Kassenpatienten – Chefarztbehandlung, Einzelzimmer und mehr.",
      image: vorsorgeImg("privat", "krankenzusatzversicherung"),
    },
    {
      title: "Zahnzusatzversicherung",
      description:
        "Übernimmt hohe Kosten für Zahnersatz und Implantate ohne Sorgen.",
      image: vorsorgeImg("privat", "zahnzusatzversicherung"),
    },
    {
      title: "Auslandsreiseversicherung",
      description:
        "Weltweit geschützt – übernimmt Behandlungskosten und Rücktransport im Urlaub.",
      image: vorsorgeImg("privat", "auslandsreiseversicherung"),
    },
    {
      title: "Private Krankenversicherung (PKV)",
      description:
        "Individueller Schutz auf höchstem Niveau für Selbstständige und Gutverdiener.",
      image: vorsorgeImg("privat", "privatekrankenversicherung"),
    },
    {
      title: "Hausratversicherung",
      description:
        "Ersetzt den Neuwert deiner Einrichtung bei Feuer, Wasser oder Einbruch.",
      image: vorsorgeImg("privat", "hausratversicherung"),
    },
    {
      title: "Wohngebäudeversicherung",
      description:
        "Schützt deine vier Wände vor Schäden durch Sturm, Feuer oder Leitungswasser.",
      image: vorsorgeImg("privat", "wohngebaeudeversicherung"),
    },
    {
      title: "KFZ-Versicherung",
      description:
        "Optimaler Schutz für dich und dein Auto – vom Pflichtschutz bis zur Vollkasko.",
      image: vorsorgeImg("privat", "kfzversicherung"),
    },
    {
      title: "Tierversicherung",
      description:
        "Schützt dich vor Schadensersatzansprüchen und deckt hohe Tierarztkosten ab.",
      image: vorsorgeImg("privat", "tierversicherung"),
    },
    {
      title: "Unfallversicherung",
      description:
        "Schützt vor den finanziellen Folgen einer Invalidität – weltweit, rund um die Uhr.",
      image: vorsorgeImg("privat", "unfallversicherung"),
    },
    {
      title: "Rechtsschutzversicherung",
      description:
        "Trägt Anwalts- und Gerichtskosten, damit du dein Recht durchsetzen kannst.",
      image: vorsorgeImg("privat", "rechtsschutzversicherung"),
    },
  ];

  const businessServices = [
    {
      title: "Betriebshaftpflicht",
      description:
        "Das Must-have für jeden Unternehmer – schützt vor Schadensersatzansprüchen Dritter.",
      image: vorsorgeImg("business", "betriebshaftpflicht"),
    },
    {
      title: "Inhaltsversicherung",
      description:
        "Schützt dein gesamtes Betriebsinventar gegen Feuer, Wasser, Sturm und Einbruch.",
      image: vorsorgeImg("business", "inhaltsversicherung"),
    },
    {
      title: "Betriebsunterbrechungsversicherung",
      description:
        "Ersetzt fortlaufende Kosten und entgangenen Gewinn bei Betriebsstillstand.",
      image: vorsorgeImg("business", "betriebsunterbrechungsversicherung"),
    },
    {
      title: "Cyber-Versicherung",
      description:
        "Umfassender Schutz vor den finanziellen Folgen von Cyberangriffen und Datenverlust.",
      image: vorsorgeImg("business", "cyberversicherung"),
    },
    {
      title: "Firmen-Rechtsschutz",
      description:
        "Durchsetzung deiner Rechte ohne hohes Kostenrisiko bei Streitigkeiten.",
      image: vorsorgeImg("business", "firmenrechtsschutz"),
    },
    {
      title: "Geschäftsführer-Vorsorge (D&O)",
      description:
        "Schützt dein Privatvermögen vor den Folgen von Managementfehlern.",
      image: vorsorgeImg("business", "geschaeftsfuehrervorsorgedo"),
    },
    {
      title: "Mitarbeiterabsicherung (bAV & bKV)",
      description:
        "Attraktive Zusatzleistungen zur Mitarbeiterbindung und als Wettbewerbsvorteil.",
      image: vorsorgeImg("business", "mitarbeiterabsicherung"),
    },
  ];

  const currentServices =
    activeTab === "private" ? privateServices : businessServices;
  const totalSteps = currentServices.length;

  const desktopScrollHeightVh = Math.max(320, 110 + (totalSteps - 1) * 34);

  useEffect(() => {
    setCurrentStep(0);
  }, [activeTab]);

  useEffect(() => {
    const updateDesktopStep = () => {
      if (window.innerWidth < 1024) return;
      if (!desktopScrollRef.current || !desktopStickyRef.current) return;

      const container = desktopScrollRef.current;
      const sticky = desktopStickyRef.current;

      const rect = container.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const scrollRange = Math.max(container.offsetHeight - stickyHeight, 1);

      const rawProgress = -rect.top / scrollRange;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      const nextStep = Math.min(
        totalSteps - 1,
        Math.floor(clampedProgress * totalSteps),
      );

      setCurrentStep((prev) => (prev === nextStep ? prev : nextStep));
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        updateDesktopStep();
        rafRef.current = null;
      });
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [totalSteps]);

  const goToPrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentStep < totalSteps - 1) goToNext();
    if (isRightSwipe && currentStep > 0) goToPrevious();

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getOpacity = (index: number) => {
    if (index === currentStep) return 1;
    if (index === currentStep - 1 || index === currentStep + 1) return 0.3;
    return 0;
  };

  return (
    <section id="vorsorge" className="relative bg-[#172545] pt-40 pb-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-8 text-white">
            Vorsorge & Absicherung
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-white/90 text-base md:text-lg leading-relaxed text-center">
            Schluss mit Papierkram und Chaos: Wir digitalisieren deine
            Versicherungen. Mit uns weißt du immer, was du zahlst und wofür –
            keine versteckten Kosten, nur Klarheit.
          </p>
        </div>

        <div className="flex justify-center mb-12 lg:mb-20">
          <div className="lg:hidden flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setActiveTab("private")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "private"
                  ? "bg-white text-[#172545]"
                  : "text-white/80"
              }`}
            >
              Privat
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "business"
                  ? "bg-white text-[#172545]"
                  : "text-white/80"
              }`}
            >
              Unternehmen
            </button>
          </div>

          <div className="hidden lg:block">
            <div className="relative inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-2xl">
              <div
                className="absolute top-1.5 h-[calc(100%-12px)] rounded-xl bg-white shadow-lg transition-all duration-500 ease-out"
                style={{
                  left: activeTab === "private" ? "6px" : "calc(50% + 2px)",
                  width: "calc(50% - 8px)",
                }}
              />

              <button
                onClick={() => setActiveTab("private")}
                className="relative px-6 py-3.5 rounded-xl transition-all duration-500 flex items-center gap-2.5 min-w-[180px] justify-center group z-10"
              >
                <div
                  className={`transition-all duration-500 ${
                    activeTab === "private"
                      ? "scale-110"
                      : "scale-90 opacity-70"
                  }`}
                >
                  <User
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "private"
                        ? "text-[#172545]"
                        : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className={`text-base font-semibold transition-all duration-500 ${
                    activeTab === "private"
                      ? "text-[#172545]"
                      : "text-white/90 group-hover:text-white"
                  }`}
                >
                  Privatpersonen
                </span>
              </button>

              <button
                onClick={() => setActiveTab("business")}
                className="relative px-6 py-3.5 rounded-xl transition-all duration-500 flex items-center gap-2.5 min-w-[180px] justify-center group z-10"
              >
                <div
                  className={`transition-all duration-500 ${
                    activeTab === "business"
                      ? "scale-110"
                      : "scale-90 opacity-70"
                  }`}
                >
                  <Briefcase
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "business"
                        ? "text-[#172545]"
                        : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className={`text-base font-semibold transition-all duration-500 ${
                    activeTab === "business"
                      ? "text-[#172545]"
                      : "text-white/90 group-hover:text-white"
                  }`}
                >
                  Unternehmer
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden mb-12">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "pan-y" }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentStep * 100}%)`,
              }}
            >
              {currentServices.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#172545]/25" />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-3 leading-snug break-words">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed break-words">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentStep === 0}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-all ${
                currentStep === 0
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-white/90 text-[#172545] shadow-lg"
              }`}
              aria-label="Vorherige Leistung"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-2">
              {currentServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Zu Schritt ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-6 bg-white"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={currentStep === totalSteps - 1}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-all ${
                currentStep === totalSteps - 1
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-white/90 text-[#172545] shadow-lg"
              }`}
              aria-label="Nächste Leistung"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="text-white/60 text-sm font-medium">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
        </div>

        {/* Desktop */}
        <div
          ref={desktopScrollRef}
          className="hidden lg:block relative mb-20"
          style={{ minHeight: `${desktopScrollHeightVh}svh` }}
        >
          <div
            ref={desktopStickyRef}
            className="sticky"
            style={{ top: `${DESKTOP_STICKY_TOP}px` }}
          >
            <div
              className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto"
              style={{
                height: `min(620px, calc(100svh - ${DESKTOP_STICKY_TOP + 32}px))`,
              }}
            >
              <div className="lg:w-1/2 relative h-full overflow-hidden">
                {currentServices.map((service, index) => (
                  <div
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-700 ease-out"
                    style={{
                      opacity: getOpacity(index),
                      transform: `translateY(calc(-50% + ${
                        (index - currentStep) * 150
                      }px))`,
                      pointerEvents: index === currentStep ? "auto" : "none",
                    }}
                  >
                    <div className="w-full">
                      <h3 className="text-2xl md:text-3xl text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-white/90 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:w-1/2 h-full flex items-center justify-end">
                <div className="relative w-[450px] h-[450px]">
                  {currentServices.map((service, index) => (
                    <img
                      key={index}
                      src={service.image}
                      alt={service.title}
                      className="absolute top-0 left-0 w-[450px] h-[450px] rounded-3xl shadow-2xl object-cover transition-opacity duration-700"
                      style={{
                        opacity: index === currentStep ? 1 : 0,
                        pointerEvents: index === currentStep ? "auto" : "none",
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
    </section>
  );
}