import { useState, useEffect, useRef } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { User, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/config/assets";

export function Vorsorge() {
  const [activeTab, setActiveTab] = useState<"private" | "business">("private");
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const privateServices = [
    {
      title: "Privathaftpflicht",
      description: "Der absolute Basisschutz. Schützt dich, wenn du anderen versehentlich einen Schaden zufügst.",
      image: assets.vorsorge.betriebshaftpflicht,
    },
    {
      title: "Berufsunfähigkeitsversicherung (BU)",
      description: "Sichert dein Einkommen, wenn du aus gesundheitlichen Gründen nicht mehr arbeiten kannst.",
      image: assets.vorsorge.do,
    },
    {
      title: "Rentenversicherung",
      description: "Baue dir ein finanzielles Polster auf für einen sorgenfreien Ruhestand.",
      image: assets.vorsorge.bav,
    },
    {
      title: "Pflegezusatzversicherung",
      description: "Schließe die Lücke der gesetzlichen Pflegeversicherung und schütze dein Vermögen.",
      image: assets.vorsorge.firmengebaude,
    },
    {
      title: "Krankenzusatzversicherung",
      description: "Upgrade für Kassenpatienten – Chefarztbehandlung, Einzelzimmer und mehr.",
      image: assets.vorsorge.betriebshaftpflicht,
    },
    {
      title: "Zahnzusatzversicherung",
      description: "Übernimmt hohe Kosten für Zahnersatz und Implantate ohne Sorgen.",
      image: assets.vorsorge.cyber,
    },
    {
      title: "Auslandsreiseversicherung",
      description: "Weltweit geschützt – übernimmt Behandlungskosten und Rücktransport im Urlaub.",
      image: assets.vorsorge.bav,
    },
    {
      title: "Private Krankenversicherung (PKV)",
      description: "Individueller Schutz auf höchstem Niveau für Selbstständige und Gutverdiener.",
      image: assets.vorsorge.do,
    },
    {
      title: "Hausratversicherung",
      description: "Ersetzt den Neuwert deiner Einrichtung bei Feuer, Wasser oder Einbruch.",
      image: assets.vorsorge.firmengebaude,
    },
    {
      title: "Wohngebäudeversicherung",
      description: "Schützt deine vier Wände vor Schäden durch Sturm, Feuer oder Leitungswasser.",
      image: assets.vorsorge.betriebshaftpflicht,
    },
    {
      title: "KFZ-Versicherung",
      description: "Optimaler Schutz für dich und dein Auto – vom Pflichtschutz bis zur Vollkasko.",
      image: assets.vorsorge.cyber,
    },
    {
      title: "Tierversicherung",
      description: "Schützt dich vor Schadensersatzansprüchen und deckt hohe Tierarztkosten ab.",
      image: assets.vorsorge.bav,
    },
    {
      title: "Unfallversicherung",
      description: "Schützt vor den finanziellen Folgen einer Invalidität – weltweit, rund um die Uhr.",
      image: assets.vorsorge.do,
    },
    {
      title: "Rechtsschutzversicherung",
      description: "Trägt Anwalts- und Gerichtskosten, damit du dein Recht durchsetzen kannst.",
      image: assets.vorsorge.firmengebaude,
    },
  ];

  const businessServices = [
    {
      title: "Betriebshaftpflicht",
      description: "Das Must-have für jeden Unternehmer – schützt vor Schadensersatzansprüchen Dritter.",
      image: assets.vorsorge.betriebshaftpflicht,
    },
    {
      title: "Inhaltsversicherung",
      description: "Schützt dein gesamtes Betriebsinventar gegen Feuer, Wasser, Sturm und Einbruch.",
      image: assets.vorsorge.firmengebaude,
    },
    {
      title: "Betriebsunterbrechungsversicherung",
      description: "Ersetzt fortlaufende Kosten und entgangenen Gewinn bei Betriebsstillstand.",
      image: assets.vorsorge.cyber,
    },
    {
      title: "Cyber-Versicherung",
      description: "Umfassender Schutz vor den finanziellen Folgen von Cyberangriffen und Datenverlust.",
      image: assets.vorsorge.cyber,
    },
    {
      title: "Firmen-Rechtsschutz",
      description: "Durchsetzung deiner Rechte ohne hohes Kostenrisiko bei Streitigkeiten.",
      image: assets.vorsorge.bav,
    },
    {
      title: "Geschäftsführer-Vorsorge (D&O)",
      description: "Schützt dein Privatvermögen vor den Folgen von Managementfehlern.",
      image: assets.vorsorge.do,
    },
    {
      title: "Mitarbeiterabsicherung (bAV & bKV)",
      description: "Attraktive Zusatzleistungen zur Mitarbeiterbindung und als Wettbewerbsvorteil.",
      image: assets.vorsorge.bav,
    },
  ];

  const currentServices = activeTab === "private" ? privateServices : businessServices;
  const totalSteps = currentServices.length;

  // Reset to step 0 when changing tabs
  useEffect(() => {
    setCurrentStep(0);
    scrollAccumulator.current = 0;
  }, [activeTab]);

  // Desktop scroll-through effect
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      
      // Only apply scroll effect on desktop (lg and above)
      if (window.innerWidth < 1024) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Lock zone: Section should be centered in viewport during scroll-through
      const lockZoneTop = windowHeight * 0.1;
      const lockZoneBottom = windowHeight * 0.9;
      const isInLockZone = rect.top <= lockZoneTop && rect.bottom >= lockZoneBottom;

      if (isInLockZone) {
        // Check if we're at the last step and scrolling down with enough accumulation
        if (currentStep === totalSteps - 1 && e.deltaY > 0 && scrollAccumulator.current >= 300) {
          setIsScrollLocked(false);
          return;
        }

        // Check if we're at the first step and scrolling up with enough accumulation
        if (currentStep === 0 && e.deltaY < 0 && scrollAccumulator.current <= -300) {
          setIsScrollLocked(false);
          return;
        }

        e.preventDefault();
        setIsScrollLocked(true);

        scrollAccumulator.current += e.deltaY;

        const threshold = 300;

        if (Math.abs(scrollAccumulator.current) >= threshold) {
          if (scrollAccumulator.current > 0 && currentStep < totalSteps - 1) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
            scrollAccumulator.current = 0;
          } else if (scrollAccumulator.current < 0 && currentStep > 0) {
            setCurrentStep((prev) => Math.max(prev - 1, 0));
            scrollAccumulator.current = 0;
          } else {
            scrollAccumulator.current = Math.max(-400, Math.min(400, scrollAccumulator.current));
          }
        }
      } else {
        setIsScrollLocked(false);
        if (rect.bottom < 0 || rect.top > windowHeight) {
          scrollAccumulator.current = 0;
          setCurrentStep(0);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentStep, totalSteps]);

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
    if (isRightSwipe && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Desktop: Get opacity for each service item
  const getOpacity = (index: number) => {
    if (index === currentStep) return 1;
    if (index === currentStep - 1 || index === currentStep + 1) return 0.3;
    return 0;
  };

  return (
    <section id="vorsorge" className="relative bg-[#172545] pt-40 pb-32" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-8 text-white">
            Vorsorge & Absicherung
          </h2>
        </div>

        {/* Subtext */}
        <div className="max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-white/90 text-base md:text-lg leading-relaxed text-center">
            Schluss mit Papierkram und Chaos: Wir digitalisieren deine Versicherungen. Mit uns weißt du immer, was du zahlst und wofür – keine versteckten Kosten, nur Klarheit.
          </p>
        </div>

        {/* Tab Navigation - Simple Switch for Mobile, Fancy Toggle for Desktop */}
        <div className="flex justify-center mb-12 lg:mb-20">
          {/* Mobile Switch - Simple and Clean */}
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

          {/* Desktop Toggle - Fancy Design */}
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
                <div className={`transition-all duration-500 ${
                  activeTab === "private" ? "scale-110" : "scale-90 opacity-70"
                }`}>
                  <User 
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "private" ? "text-[#172545]" : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span className={`text-base font-semibold transition-all duration-500 ${
                  activeTab === "private" 
                    ? "text-[#172545]" 
                    : "text-white/90 group-hover:text-white"
                }`}>
                  Privatpersonen
                </span>
              </button>

              <button
                onClick={() => setActiveTab("business")}
                className="relative px-6 py-3.5 rounded-xl transition-all duration-500 flex items-center gap-2.5 min-w-[180px] justify-center group z-10"
              >
                <div className={`transition-all duration-500 ${
                  activeTab === "business" ? "scale-110" : "scale-90 opacity-70"
                }`}>
                  <Briefcase 
                    className={`w-5 h-5 transition-colors duration-500 ${
                      activeTab === "business" ? "text-[#172545]" : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span className={`text-base font-semibold transition-all duration-500 ${
                  activeTab === "business" 
                    ? "text-[#172545]" 
                    : "text-white/90 group-hover:text-white"
                }`}>
                  Unternehmer
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-12">
          <div 
            ref={carouselRef}
            className="relative -mx-4 px-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex gap-3 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(-${currentStep * 100}% - ${currentStep * 12}px + 16px))` }}
            >
              {currentServices.map((service, index) => (
                <div 
                  key={index} 
                  className="min-w-[calc(100%-32px)] flex-shrink-0"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full">
                    {/* Image */}
                    <div className="relative w-full h-40 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#172545]/20" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Peek element to show there's more */}
              <div className="min-w-[60px] flex-shrink-0" />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`pointer-events-auto p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all ${
                  currentStep === 0 ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-[#172545]" strokeWidth={2.5} />
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                disabled={currentStep === totalSteps - 1}
                className={`pointer-events-auto p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all ${
                  currentStep === totalSteps - 1 ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
              >
                <ChevronRight className="w-5 h-5 text-[#172545]" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="text-white/60 text-sm font-medium">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
        </div>

        {/* Desktop Scroll-Through Content */}
        <div className="hidden lg:block relative mb-20">
          <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">
            {/* Left Side - Service List */}
            <div className="lg:w-1/2 relative h-[600px] overflow-hidden">
              {currentServices.map((service, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-700 ease-out"
                  style={{
                    opacity: getOpacity(index),
                    transform: `translateY(calc(-50% + ${(index - currentStep) * 150}px))`,
                    pointerEvents: index === currentStep ? 'auto' : 'none',
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

            {/* Right Side - Image */}
            <div className="lg:w-1/2 flex justify-end">
              <div className="relative w-[450px]">
                {currentServices.map((service, index) => (
                  <img
                    key={index}
                    src={service.image}
                    alt={service.title}
                    className="absolute top-0 left-0 w-[450px] h-[450px] rounded-3xl shadow-2xl object-cover transition-opacity duration-700"
                    style={{
                      opacity: index === currentStep ? 1 : 0,
                      pointerEvents: index === currentStep ? 'auto' : 'none',
                    }}
                  />
                ))}
                {/* Placeholder for height */}
                <img
                  src={currentServices[0].image}
                  alt=""
                  className="w-[450px] h-[450px] rounded-3xl opacity-0"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
    </section>
  );
}