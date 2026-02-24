import { useEffect, useRef, useState } from "react";
import { assets } from "@/config/assets";
import { ShapeDivider } from "@/app/components/shape-divider";

export function LogoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [imageProgress, setImageProgress] = useState(0);
  const [isImageFullyVisible, setIsImageFullyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate when section enters viewport
      if (sectionTop <= windowHeight && sectionTop >= -sectionHeight) {
        // Calculate progress (0 to 1) for the image reveal
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / windowHeight));
        setImageProgress(progress);

        // Mark as fully visible when progress reaches 100%
        if (progress >= 0.95) {
          setIsImageFullyVisible(true);
        } else {
          setIsImageFullyVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{
        minHeight: "200vh",
        position: isImageFullyVisible ? "relative" : "sticky",
        top: isImageFullyVisible ? "auto" : 0,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(54, 95, 107, 0.1) 50px,
              rgba(54, 95, 107, 0.1) 51px
            )`,
          }}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center relative">
        {/* Logo - Fades out as image appears */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
          style={{ opacity: 1 - imageProgress }}
        >
          <img src={assets.logo.reveal} alt="AVEYO" className="h-auto w-[90%] max-w-none mb-12 px-4" style={{ maxHeight: '80vh' }} />
          <p className="text-3xl md:text-5xl lg:text-6xl text-gray-600 text-center max-w-5xl px-4">
            Eine Plattform für Investment, Immobilien und Vorsorge
          </p>
        </div>

        {/* Image - Reveals from bottom */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{
            clipPath: `inset(${100 - imageProgress * 100}% 0 0 0)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3Njk3MTM1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury real estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/80 via-[#172545]/40 to-transparent" />
        </div>

        {/* Text overlay on image */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-20 transition-opacity duration-500"
          style={{ opacity: imageProgress }}
        >
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              Premium Immobilien & Versicherungen
            </h2>
            <p className="text-xl text-white/90">
              Entdecken Sie exklusive Angebote und maßgeschneiderte Lösungen
            </p>
          </div>
        </div>
      </div>

      {/* Shape Divider to next section */}
      <div className="absolute bottom-0 left-0 w-full">
        <ShapeDivider position="bottom" color="#172545" alignment="center" />
      </div>
    </section>
  );
}