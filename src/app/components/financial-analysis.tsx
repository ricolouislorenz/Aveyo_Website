import { useEffect, useState, useRef } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const LOCK_DISTANCE = 2400;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function FinancialAnalysis() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const lastTouchYRef = useRef<number | null>(null);

  const updateProgress = (nextValue: number) => {
    const clamped = clamp(nextValue, 0, LOCK_DISTANCE);
    progressRef.current = clamped;
    setAnimationProgress(clamped / LOCK_DISTANCE);
  };

  const isAtLockPoint = () => {
    if (!sectionRef.current) return false;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    return rect.top <= 0 && rect.bottom >= viewportHeight;
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isAtLockPoint()) {
        setIsLocked(false);
        return;
      }

      const delta = e.deltaY;

      if (delta > 0 && progressRef.current < LOCK_DISTANCE) {
        e.preventDefault();
        setIsLocked(true);
        updateProgress(progressRef.current + delta);
        return;
      }

      if (delta < 0 && progressRef.current > 0) {
        e.preventDefault();
        setIsLocked(true);
        updateProgress(progressRef.current + delta);
        return;
      }

      setIsLocked(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY;
      if (typeof y === "number") {
        touchStartYRef.current = y;
        lastTouchYRef.current = y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtLockPoint()) {
        setIsLocked(false);
        return;
      }

      const currentY = e.touches[0]?.clientY;
      const lastY = lastTouchYRef.current;

      if (typeof currentY !== "number" || typeof lastY !== "number") return;

      const delta = (lastY - currentY) * 4;

      if (delta > 0 && progressRef.current < LOCK_DISTANCE) {
        e.preventDefault();
        setIsLocked(true);
        updateProgress(progressRef.current + delta);
        lastTouchYRef.current = currentY;
        return;
      }

      if (delta < 0 && progressRef.current > 0) {
        e.preventDefault();
        setIsLocked(true);
        updateProgress(progressRef.current + delta);
        lastTouchYRef.current = currentY;
        return;
      }

      setIsLocked(false);
      lastTouchYRef.current = currentY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      lastTouchYRef.current = null;
      if (!isAtLockPoint()) {
        setIsLocked(false);
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top >= viewportHeight && progressRef.current !== 0) {
        updateProgress(0);
      }

      if (!isAtLockPoint()) {
        setIsLocked(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoFadeProgress =
    animationProgress < 0.2
      ? 0
      : animationProgress < 0.42
      ? (animationProgress - 0.2) / 0.22
      : 1;

  const imageEnterProgress =
    animationProgress < 0.42
      ? 0
      : animationProgress < 0.64
      ? (animationProgress - 0.42) / 0.22
      : 1;

  const textFadeProgress =
    animationProgress < 0.56
      ? 0
      : animationProgress < 0.74
      ? (animationProgress - 0.56) / 0.18
      : 1;

  const image1Scale = 1 - logoFadeProgress * 0.28;
  const image1Opacity = 1 - logoFadeProgress;

  const image2Scale = 0.62 + imageEnterProgress * 0.1;
  const image2Opacity = imageEnterProgress;
  const image2TranslateY = (1 - imageEnterProgress) * 18;

  const textOpacity = textFadeProgress;
  const textTranslateY = (1 - textFadeProgress) * 8;

  const showScrollHint = isLocked && animationProgress < 0.18;

  // Gesamte Animationsbühne etwas tiefer setzen
  const stageOffsetVh = 7;

  return (
    <section
      id="finanzanalyse"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: "135vh" }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ height: "100svh" }}
      >
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translateY(${stageOffsetVh}vh)` }}
          >
            <div className="relative w-full h-full">
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
                  className="max-w-[78%] sm:max-w-[64%] md:max-w-[520px] h-auto"
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
                <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-4 md:gap-6 px-2 sm:px-4">
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
            </div>
          </div>

          {/* Scroll hint */}
          {showScrollHint && (
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