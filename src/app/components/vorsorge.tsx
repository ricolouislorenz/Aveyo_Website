import { useState, useEffect, useRef, useCallback } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { User, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/config/assets";

const DESKTOP_STICKY_TOP = 120;

type Service = {
  title: string;
  description: string;
  image: string;
};

export function Vorsorge() {
  const [activeTab, setActiveTab] = useState<"private" | "business">("private");
  const [currentStep, setCurrentStep] = useState(0);

  // Desktop scroll-driven
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const desktopStickyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Mobile snap-carousel
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileRafRef = useRef<number | null>(null);

  const privateServices: Service[] = [
    {
      title: "Privathaftpflicht",
      description:
        "Der absolute Basisschutz. Schützt dich, wenn du anderen versehentlich einen Schaden zufügst.",
      image: assets.vorsorge.private.privathaftpflicht,
    },
    {
      title: "Berufsunfähigkeitsversicherung (BU)",
      description:
        "Sichert dein Einkommen, wenn du aus gesundheitlichen Gründen nicht mehr arbeiten kannst.",
      image: assets.vorsorge.private.berufsunfaehigkeit,
    },
    {
      title: "Rentenversicherung",
      description:
        "Baue dir ein finanzielles Polster auf für einen sorgenfreien Ruhestand.",
      image: assets.vorsorge.private.rentenversicherung,
    },
    {
      title: "Pflegezusatzversicherung",
      description:
        "Schließe die Lücke der gesetzlichen Pflegeversicherung und schütze dein Vermögen.",
      image: assets.vorsorge.private.pflegezusatzversicherung,
    },
    {
      title: "Krankenzusatzversicherung",
      description:
        "Upgrade für Kassenpatienten – Chefarztbehandlung, Einzelzimmer und mehr.",
      image: assets.vorsorge.private.krankenzusatzversicherung,
    },
    {
      title: "Zahnzusatzversicherung",
      description:
        "Übernimmt hohe Kosten für Zahnersatz und Implantate ohne Sorgen.",
      image: assets.vorsorge.private.zahnzusatzversicherung,
    },
    {
      title: "Auslandsreiseversicherung",
      description:
        "Weltweit geschützt – übernimmt Behandlungskosten und Rücktransport im Urlaub.",
      image: assets.vorsorge.private.auslandsreiseversicherung,
    },
    {
      title: "Private Krankenversicherung (PKV)",
      description:
        "Individueller Schutz auf höchstem Niveau für Selbstständige und Gutverdiener.",
      image: assets.vorsorge.private.privateKrankenversicherung,
    },
    {
      title: "Hausratversicherung",
      description:
        "Ersetzt den Neuwert deiner Einrichtung bei Feuer, Wasser oder Einbruch.",
      image: assets.vorsorge.private.hausratversicherung,
    },
    {
      title: "Wohngebäudeversicherung",
      description:
        "Schützt deine vier Wände vor Schäden durch Sturm, Feuer oder Leitungswasser.",
      image: assets.vorsorge.private.wohngebaeudeversicherung,
    },
    {
      title: "KFZ-Versicherung",
      description:
        "Optimaler Schutz für dich und dein Auto – vom Pflichtschutz bis zur Vollkasko.",
      image: assets.vorsorge.private.kfzVersicherung,
    },
    {
      title: "Tierversicherung",
      description:
        "Schützt dich vor Schadensersatzansprüchen und deckt hohe Tierarztkosten ab.",
      image: assets.vorsorge.private.tierversicherung,
    },
    {
      title: "Unfallversicherung",
      description:
        "Schützt vor den finanziellen Folgen einer Invalidität – weltweit, rund um die Uhr.",
      image: assets.vorsorge.private.unfallversicherung,
    },
    {
      title: "Rechtsschutzversicherung",
      description:
        "Trägt Anwalts- und Gerichtskosten, damit du dein Recht durchsetzen kannst.",
      image: assets.vorsorge.private.rechtsschutzversicherung,
    },
  ];

  const businessServices: Service[] = [
    {
      title: "Betriebshaftpflicht",
      description:
        "Das Must-have für jeden Unternehmer – schützt vor Schadensersatzansprüchen Dritter.",
      image: assets.vorsorge.business.betriebshaftpflicht,
    },
    {
      title: "Inhaltsversicherung",
      description:
        "Schützt dein gesamtes Betriebsinventar gegen Feuer, Wasser, Sturm und Einbruch.",
      image: assets.vorsorge.business.inhaltsversicherung,
    },
    {
      title: "Betriebsunterbrechungsversicherung",
      description:
        "Ersetzt fortlaufende Kosten und entgangenen Gewinn bei Betriebsstillstand.",
      image: assets.vorsorge.business.betriebsunterbrechungsversicherung,
    },
    {
      title: "Cyber-Versicherung",
      description:
        "Umfassender Schutz vor den finanziellen Folgen von Cyberangriffen und Datenverlust.",
      image: assets.vorsorge.business.cyberversicherung,
    },
    {
      title: "Firmen-Rechtsschutz",
      description:
        "Durchsetzung deiner Rechte ohne hohes Kostenrisiko bei Streitigkeiten.",
      image: assets.vorsorge.business.firmenRechtsschutz,
    },
    {
      title: "Geschäftsführer-Vorsorge (D&O)",
      description: "Schützt dein Privatvermögen vor den Folgen von Managementfehlern.",
      image: assets.vorsorge.business.geschaeftsfuehrerVorsorgeDo,
    },
    {
      title: "Mitarbeiterabsicherung (bAV & bKV)",
      description:
        "Attraktive Zusatzleistungen zur Mitarbeiterbindung und als Wettbewerbsvorteil.",
      image: assets.vorsorge.business.mitarbeiterabsicherung,
    },
  ];

  const currentServices = activeTab === "private" ? privateServices : businessServices;
  const totalSteps = currentServices.length;

  const desktopScrollHeightVh = Math.max(320, 110 + (totalSteps - 1) * 34);

  // Reset on tab switch
  useEffect(() => {
    setCurrentStep(0);
    // Mobile: scroll back to start
    if (window.innerWidth < 1024 && mobileTrackRef.current) {
      mobileTrackRef.current.scrollTo({ left: 0, behavior: "instant" as any });
    }
  }, [activeTab]);

  // ---------------- Desktop: update step from scroll progress ----------------
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

      const nextStep = Math.min(totalSteps - 1, Math.floor(clampedProgress * totalSteps));
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

  // ---------------- Mobile: derive step from scroll-snap position ----------------
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const updateFromScroll = () => {
      if (window.innerWidth >= 1024) return;

      const left = track.scrollLeft;
      let bestIndex = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < mobileCardRefs.current.length; i++) {
        const el = mobileCardRefs.current[i];
        if (!el) continue;
        const dist = Math.abs(el.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      }

      setCurrentStep((prev) => (prev === bestIndex ? prev : bestIndex));
    };

    const onScroll = () => {
      if (mobileRafRef.current !== null) cancelAnimationFrame(mobileRafRef.current);
      mobileRafRef.current = requestAnimationFrame(() => {
        updateFromScroll();
        mobileRafRef.current = null;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    updateFromScroll();

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (mobileRafRef.current !== null) cancelAnimationFrame(mobileRafRef.current);
    };
  }, [activeTab, totalSteps]);

  const scrollToIndex = useCallback((index: number) => {
    const track = mobileTrackRef.current;
    const el = mobileCardRefs.current[index];
    if (!track || !el) return;
    track.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }, []);

  const goToPrevious = () => scrollToIndex(Math.max(currentStep - 1, 0));
  const goToNext = () => scrollToIndex(Math.min(currentStep + 1, totalSteps - 1));

  const getOpacity = (index: number) => {
    if (index === currentStep) return 1;
    if (index === currentStep - 1 || index === currentStep + 1) return 0.3;
    return 0;
  };

  const progressPct = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

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
            Schluss mit Papierkram und Chaos: Wir digitalisieren deine Versicherungen.
            Mit uns weißt du immer, was du zahlst und wofür – keine versteckten Kosten,
            nur Klarheit.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 lg:mb-20">
          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setActiveTab("private")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "private" ? "bg-white text-[#172545]" : "text-white/80"
              }`}
            >
              Privat
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "business" ? "bg-white text-[#172545]" : "text-white/80"
              }`}
            >
              Unternehmen
            </button>
          </div>

          {/* Desktop toggle */}
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
                    activeTab === "private" ? "scale-110" : "scale-90 opacity-70"
                  }`}
                >
                  <User
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "private" ? "text-[#172545]" : "text-white"
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
                    activeTab === "business" ? "scale-110" : "scale-90 opacity-70"
                  }`}
                >
                  <Briefcase
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "business" ? "text-[#172545]" : "text-white"
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

        {/* ---------------- Mobile (modern snap carousel) ---------------- */}
        <div className="lg:hidden mb-12">
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#172545] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#172545] to-transparent z-10" />

            <div
              ref={mobileTrackRef}
              className="
                flex gap-4 px-4
                overflow-x-auto
                snap-x snap-mandatory
                scroll-smooth
                overscroll-x-contain
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {currentServices.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    mobileCardRefs.current[index] = el;
                  }}
                  className="snap-start shrink-0 w-[88%] max-w-[420px]"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        width="640"
                        height="400"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#172545]/35" />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white leading-snug [overflow-wrap:anywhere]">
                          {service.title}
                        </h3>
                        <span className="text-xs text-white/70 bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
                          {index + 1}/{totalSteps}
                        </span>
                      </div>

                      <p className="text-white/80 text-sm leading-relaxed [overflow-wrap:anywhere]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress + Controls */}
            <div className="mt-5 px-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-all ${
                    currentStep === 0
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-white/90 text-[#172545] shadow-lg active:scale-95"
                  }`}
                  aria-label="Vorherige Leistung"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <div className="flex-1">
                  <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-[width] duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="mt-2 text-center text-white/60 text-xs">
                    Wischen oder Buttons nutzen
                  </div>
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentStep === totalSteps - 1}
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-all ${
                    currentStep === totalSteps - 1
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-white/90 text-[#172545] shadow-lg active:scale-95"
                  }`}
                  aria-label="Nächste Leistung"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Desktop (deine bestehende Animation) ---------------- */}
        <div
          ref={desktopScrollRef}
          className="hidden lg:block relative mb-20"
          style={{ minHeight: `${desktopScrollHeightVh}svh` }}
        >
          <div ref={desktopStickyRef} className="sticky" style={{ top: `${DESKTOP_STICKY_TOP}px` }}>
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
                      transform: `translateY(calc(-50% + ${(index - currentStep) * 150}px))`,
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
                      loading={index === currentStep ? "eager" : "lazy"}
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