import { useState, useEffect, useRef } from "react";
import { MapPin, Euro, Maximize, BedDouble, ArrowRight, ChevronLeft, ChevronRight, X, CheckCircle } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

// Default property image placeholder
const defaultPropertyImage = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  size: number;
  rooms: number;
  description: string;
  features: string[];
  imageUrl: string;
  status: "available" | "reserved" | "sold";
  createdAt: string;
}

export function PropertiesShowcase() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        // Show only available properties
        const availableProperties = result.data.filter(
          (p: Property) => p.status === "available"
        );
        setProperties(availableProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (isTransitioning || properties.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToNext = () => {
    if (isTransitioning || properties.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % properties.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-white/70">Lade Immobilien...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-white/90">
          Aktuell keine Immobilien verfügbar
        </p>
        <p className="text-white/70 mt-2">
          Schauen Sie bald wieder vorbei oder kontaktieren Sie uns für individuelle Anfragen
        </p>
      </div>
    );
  }

  // Create extended array for infinite loop effect
  const extendedProperties = [
    ...properties.slice(-2), // Last 2 items at the beginning
    ...properties,
    ...properties.slice(0, 2), // First 2 items at the end
  ];

  // Calculate offset - card width (320px) + gap (16px) = 336px per card
  const cardWidth = 336;
  const offset = -(currentIndex + 2) * cardWidth;

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex gap-4 px-4 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(calc(50% - 168px + ${offset}px))`,
          }}
        >
          {extendedProperties.map((property, index) => (
            <div
              key={`${property.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: '320px' }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#172545] to-transparent pointer-events-none z-10" />
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#172545] to-transparent pointer-events-none z-10" />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Vorherige Immobilie"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Nächste Immobilie"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

// Separate PropertyCard component for cleaner code
function PropertyCard({ property }: { property: Property }) {
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-[#586477]/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col" style={{ height: '720px' }}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <img
            src={property.imageUrl || defaultPropertyImage}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
            Verfügbar
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pb-8 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-sm text-[#586477] font-medium">
              {property.type}
            </span>
          </div>

          <h3 className="text-xl text-[#172545] mb-2 font-semibold" style={{ minHeight: '56px' }}>
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-[#586477] mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#586477]/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#172545] mb-1">
                <Euro className="w-4 h-4 text-[#586477]" />
              </div>
              <p className="text-sm font-semibold text-[#172545]">
                {property.price.toLocaleString("de-DE")} €
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#172545] mb-1">
                <Maximize className="w-4 h-4 text-[#586477]" />
              </div>
              <p className="text-sm font-semibold text-[#172545]">
                {property.size} m²
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#172545] mb-1">
                <BedDouble className="w-4 h-4 text-[#586477]" />
              </div>
              <p className="text-sm font-semibold text-[#172545]">
                {property.rooms} Zimmer
              </p>
            </div>
          </div>

          <p className="text-[#586477] text-sm mb-4 line-clamp-3" style={{ minHeight: '60px' }}>
            {property.description}
          </p>

          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6" style={{ minHeight: '60px' }}>
              {property.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[#172545]/10 text-[#172545] text-xs rounded-full h-fit"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <button
                  onClick={() => setShowFeaturesModal(true)}
                  className="px-2 py-1 text-[#172545] hover:text-[#0d1a30] text-xs h-fit font-semibold underline cursor-pointer transition-colors"
                >
                  +{property.features.length - 3} weitere
                </button>
              )}
            </div>
          )}

          <div className="mt-auto pt-2">
            <a
              href="/kontakt"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 text-sm font-semibold"
            >
              Jetzt anfragen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Features Modal */}
      {showFeaturesModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setShowFeaturesModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#172545] mb-1">
                  Alle Merkmale
                </h3>
                <p className="text-sm text-[#586477]">
                  {property.title}
                </p>
              </div>
              <button
                onClick={() => setShowFeaturesModal(false)}
                className="text-[#586477] hover:text-[#172545] transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#172545]/5 rounded-xl hover:bg-[#172545]/10 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#172545] text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#586477]/20">
              <a
                href="/kontakt"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 font-semibold"
              >
                Jetzt anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}