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

  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateAnimation = useCallback(() => {
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const rect = stage.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const stageHeight = stage.offsetHeight;

    const scrollRange = Math.max(stageHeight - viewportHeight, 1);
    const rawProgress = clamp(-rect.top / scrollRange, 0, 1);
    const pinned = rect.top <= 0 && rect.bottom >= viewportHeight;

    setScrollProgress(rawProgress);
    setIsSectionPinned(pinned);
  }, []);

  useEffect(() => {
    const requestUpdate = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateAnimation]);

  /**
   * Timeline
   * 0.00 - 0.08  Logo sichtbar, kurze Haltephase
   * 0.08 - 0.24  Logo schrumpft + blendet aus
   * 0.18 - 0.42  Dokument fährt von unten rein
   * 0.34 - 0.52  Überschrift + Button blenden ein
   * 0.52 - 1.00  Finale Ansicht bleibt lange sichtbar
   */

  const logoFadeProgress = progressBetween(scrollProgress, 0.08, 0.24);
  const imageEnterProgress = progressBetween(scrollProgress, 0.18, 0.42);
  const textFadeProgress = progressBetween(scrollProgress, 0.34, 0.52);

  const image1Scale = 1 - logoFadeProgress * 0.22; // 1 -> 0.78
  const image1Opacity = 1 - logoFadeProgress;

  const image2Scale = 0.64 + imageEnterProgress * 0.1; // 0.64 -> 0.74
  const image2Opacity = imageEnterProgress;
  const image2TranslateY = (1 - imageEnterProgress) * 18; // 18% -> 0%

  const textOpacity = textFadeProgress;
  const textTranslateY = (1 - textFadeProgress) * 8;

  return (
    <section
      id="finanzanalyse"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fafc]"
    >
      {/* Scroll-Strecke für spürbares "Anhalten" */}
      <div
        ref={stageRef}
        className="relative h-[320vh] sm:h-[360vh] lg:h-[400vh]"
      >
        {/* Sticky Bühne */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center px-4">
            {/* Logo */}
            <div
              className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-200 ease-out"
              style={{
                transform: `scale(${image1Scale})`,
                opacity: image1Opacity,
                pointerEvents: image1Opacity > 0 ? "auto" : "none",
              }}
            >
              <img
                src={assets.financialAnalysis.logo}
                alt="AVEYO"
                className="max-w-[78%] sm:max-w-[64%] md:max-w-[520px] h-auto drop-shadow-[0_12px_32px_rgba(23,37,69,0.08)]"
              />
            </div>

            {/* Dokument */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-200 ease-out"
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
                  className="w-full max-w-[84vw] sm:max-w-[72vw] md:max-w-[660px] lg:max-w-[700px] h-auto rounded-2xl shadow-2xl"
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

            {/* Scroll-Hinweis */}
            {isSectionPinned && scrollProgress < 0.1 && (
              <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-30">
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
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}