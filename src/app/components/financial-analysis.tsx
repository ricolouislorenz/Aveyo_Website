import { useEffect, useState, useRef, useCallback } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function FinancialAnalysis() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollAccumulatorRef = useRef(0);
  const isInSectionRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport and should be "active"
      // Only trigger when the section top is at or below top of viewport (fully in white area)
      const triggerPoint = 0; // Section must be at top of viewport
      const exitPoint = windowHeight * 0.5;
      const shouldBeActive = rect.top <= triggerPoint && rect.bottom >= exitPoint;

      isInSectionRef.current = shouldBeActive;

      if (!shouldBeActive) {
        return; // Allow normal scrolling outside this zone
      }

      // We're in the active zone - check if we should lock scroll
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Allow exit at boundaries
      if (scrollingUp && scrollAccumulatorRef.current <= 0) {
        return; // Allow scrolling up past the section
      }

      if (scrollingDown && scrollAccumulatorRef.current >= 3000) {
        return; // Allow scrolling down past the section
      }

      // Lock the scroll and accumulate
      e.preventDefault();
      scrollAccumulatorRef.current += e.deltaY;
      
      // Keep accumulator within bounds
      scrollAccumulatorRef.current = Math.max(0, Math.min(3000, scrollAccumulatorRef.current));

      // Map accumulated scroll to progress (0 to 1)
      const newProgress = scrollAccumulatorRef.current / 3000;
      setAnimationProgress(newProgress);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Reset when scrolling away
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isInSectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only reset if section is completely above the viewport (scrolled past it upward)
      // Don't reset when scrolling down past it - keep the final state
      if (rect.bottom < 0) {
        setAnimationProgress(0);
        scrollAccumulatorRef.current = 0;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation phases:
  // 0.0 - 0.25: Logo is centered and visible (locked scroll)
  // 0.25 - 0.4: Logo shrinks and fades out quickly
  // 0.4 - 0.55: Finanzgutachten image slides in from bottom to center (faster)
  // 0.55 - 1.0: Finanzgutachten image stays centered and visible (longer)

  // Image 1 (Logo) calculations
  const image1Scale = animationProgress < 0.25 
    ? 1 // Stay at normal size
    : animationProgress < 0.4
    ? 1 - ((animationProgress - 0.25) / 0.15) * 0.5 // Shrink from 1 to 0.5
    : 0.5;

  const image1Opacity = animationProgress < 0.25
    ? 1
    : animationProgress < 0.4
    ? 1 - ((animationProgress - 0.25) / 0.15) // Fade out quickly
    : 0;

  // Image 2 (Finanzgutachten) calculations - slides in from bottom and stays centered
  const image2Progress = animationProgress < 0.4 
    ? 0 // Don't show yet
    : animationProgress < 0.55
    ? (animationProgress - 0.4) / 0.15 // Slide in phase (0 to 1) - faster now
    : 1; // Fully visible and centered - stays longer
  
  const image2Scale = 0.7 + image2Progress * 0.15; // Scale from 0.7 to 0.85
  const image2Opacity = image2Progress;
  const image2TranslateY = (1 - image2Progress) * 120 + 32; // Starts from 152% below, ends at 32% (stays even lower on screen)

  // Heading and button opacity - fade in when image 2 is fully visible
  const textOpacity = animationProgress >= 0.55 
    ? Math.min((animationProgress - 0.55) / 0.15, 1) 
    : 0;

  return (
    <section 
      id="finanzanalyse" 
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: "130vh" }}
    >
      {/* Sticky container for images - centered in viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center px-4">{/* removed pb-20 */}
          {/* Image 1: AVEYO Logo */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              transform: `scale(${image1Scale})`,
              opacity: image1Opacity,
              pointerEvents: image1Opacity > 0 ? 'auto' : 'none',
            }}
          >
            <img
              src={assets.financialAnalysis.logo}
              alt="AVEYO"
              className="max-w-[90%] md:max-w-[600px] h-auto"
            />
          </div>

          {/* Image 2: Finanzgutachten */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              transform: `scale(${image2Scale}) translateY(${image2TranslateY}%)`,
              opacity: image2Opacity,
              pointerEvents: image2Opacity > 0 ? 'auto' : 'none',
            }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* Heading */}
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#172545] text-center transition-opacity duration-300 px-4"
                style={{ opacity: textOpacity }}
              >
                Dein kostenloses Finanzgutachten
              </h2>
              
              {/* Image */}
              <img
                src={assets.financialAnalysis.document}
                alt="Ihr persönliches Finanzgutachten"
                className="w-full max-w-[95%] md:max-w-[900px] h-auto rounded-2xl shadow-2xl"
              />

              {/* Button */}
              <Link
                to="/finanzcheck"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 hover:shadow-xl text-lg font-semibold"
                style={{ opacity: textOpacity }}
              >
                Mehr erfahren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Scroll indicator - only show when logo is centered and locked */}
          {isInSectionRef.current && animationProgress < 0.3 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-400 text-sm">Scrollen Sie weiter</span>
              <svg 
                className="w-6 h-6 text-gray-400" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          )}
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}