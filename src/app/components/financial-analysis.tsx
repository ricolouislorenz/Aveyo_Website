import { useEffect, useState, useRef, useCallback } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function progressBetween(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start), 0, 1);
}

export function FinancialAnalysis() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSectionPinned, setIsSectionPinned] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateAnimation = useCallback(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;

    // Longer scroll range = longer visible "pause" while sticky
    const scrollRange = Math.max(sectionHeight - viewportHeight, 1);

    // 0 when section reaches viewport top, 1 when sticky phase is fully passed
    const rawProgress = clamp(-rect.top / scrollRange, 0, 1);

    // Sticky is actively pinning while the section spans at least one viewport
    const pinned = rect.top <= 0 && rect.bottom >= viewportHeight;

    setScrollProgress(rawProgress);
    setIsSectionPinned(pinned);
  }, []);

  useEffect(() => {
    const requestUpdate = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        updateAnimation();
        rafRef.current = null;
      });
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateAnimation]);

  /**
   * Timeline (intentionally stretched so the section "holds" longer):
   *
   * 0.00 - 0.20  Logo stays centered (clear pause)
   * 0.20 - 0.42  Logo shrinks + fades out
   * 0.42 - 0.66  Document slides in from below
   * 0.58 - 0.76  Heading + button fade in
   * 0.76 - 1.00  Final state stays visible (clear pause)
   */

  const logoFadeProgress = progressBetween(scrollProgress, 0.2, 0.42);
  const imageEnterProgress = progressBetween(scrollProgress, 0.42, 0.66);
  const textFadeProgress = progressBetween(scrollProgress, 0.58, 0.76);

  // Logo
  const image1Scale = 1 - logoFadeProgress * 0.28; // 1 -> 0.72
  const image1Opacity = 1 - logoFadeProgress;

  // Document image: slightly smaller so heading + button remain visible
  const image2Scale = 0.58 + imageEnterProgress * 0.14; // 0.58 -> 0.72
  const image2Opacity = imageEnterProgress;
  const image2TranslateY = (1 - imageEnterProgress) * 22; // 22% -> 0%

  // Heading + CTA
  const textOpacity = textFadeProgress;
  const textTranslateY = (1 - textFadeProgress) * 10;

  return (
    <section
      id="finanzanalyse"
      ref={sectionRef}
      className="relative bg-white overflow-hidden min-h-[380vh] sm:min-h-[430vh] lg:min-h-[470vh]"
    >
      {/* Sticky stage */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ height: "100svh" }}
      >
        <div className="relative w-full h-full flex items-center justify-center px-4">
          {/* Image 1: AVEYO Logo */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              transform: `scale(${image1Scale})`,
              opacity: image1Opacity,
              pointerEvents: image1Opacity > 0 ? "auto" : "none",
            }}
          >
            <img
              src={assets.financialAnalysis.logo}
              alt="AVEYO"
              className="max-w-[82%] sm:max-w-[70%] md:max-w-[560px] h-auto"
            />
          </div>

          {/* Image 2: Finanzgutachten */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              transform: `scale(${image2Scale}) translateY(${image2TranslateY}%)`,
              opacity: image2Opacity,
              pointerEvents: image2Opacity > 0 ? "auto" : "none",
            }}
          >
            <div className="w-full max-w-5xl flex flex-col items-center gap-4 md:gap-6 px-2 sm:px-4">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#172545] text-center transition-all duration-300"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                }}
              >
                Dein kostenloses Finanzgutachten
              </h2>

              <img
                src={assets.financialAnalysis.document}
                alt="Dein persönliches Finanzgutachten"
                className="w-full max-w-[86vw] sm:max-w-[74vw] md:max-w-[680px] lg:max-w-[720px] h-auto rounded-2xl shadow-2xl"
              />

              <Link
                to="/finanzcheck"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 hover:shadow-xl text-base sm:text-lg font-semibold"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                }}
              >
                Mehr erfahren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Scroll indicator during initial hold */}
          {isSectionPinned && scrollProgress < 0.18 && (
            <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-400 text-xs sm:text-sm">
                Scrolle weiter
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}