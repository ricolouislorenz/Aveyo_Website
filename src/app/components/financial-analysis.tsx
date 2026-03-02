import { useEffect, useState, useRef } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const LOCK_DISTANCE = 2400;
const LOCK_TOP_TOLERANCE = 8;
const LOCK_BOTTOM_TOLERANCE = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function FinancialAnalysis() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
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

    return (
      rect.top <= LOCK_TOP_TOLERANCE &&
      rect.bottom >= viewportHeight - LOCK_BOTTOM_TOLERANCE
    );
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
        lastTouchYRef.current = y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY;
      const lastY = lastTouchYRef.current;

      if (typeof currentY !== "number") return;

      if (!isAtLockPoint()) {
        setIsLocked(false);
        lastTouchYRef.current = currentY;
        return;
      }

      if (typeof lastY !== "number") {
        lastTouchYRef.current = currentY;
        return;
      }

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
      lastTouchYRef.current = null;
      if (!isAtLockPoint()) {
        setIsLocked(false);
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // User is above the section again -> always start fresh next time
      if (rect.top > LOCK_TOP_TOLERANCE) {
        if (progressRef.current !== 0) {
          updateProgress(0);
        }
        setIsLocked(false);
        return;
      }

      // User is below the section -> keep final state until scrolling back up
      if (rect.bottom < viewportHeight - LOCK_BOTTOM_TOLERANCE) {
        if (progressRef.current !== LOCK_DISTANCE) {
          updateProgress(LOCK_DISTANCE);
        }
        setIsLocked(false);
        return;
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

  /**
   * Timeline
   * 0.00 - 0.18: Logo stays centered and visible
   * 0.18 - 0.40: Logo shrinks and fades out
   * 0.40 - 0.62: Document slides in
   * 0.54 - 0.72: Heading + button fade in
   * 0.72 - 1.00: Final state remains visible
   */

  const logoFadeProgress =
    animationProgress < 0.18
      ? 0
      : animationProgress < 0.4
      ? (animationProgress - 0.18) / 0.22
      : 1;

  const imageEnterProgress =
    animationProgress < 0.4
      ? 0
      : animationProgress < 0.62
      ? (animationProgress - 0.4) / 0.22
      : 1;

  const textFadeProgress =
    animationProgress < 0.54
      ? 0
      : animationProgress < 0.72
      ? (animationProgress - 0.54) / 0.18
      : 1;

  const image1Scale = 1 - logoFadeProgress * 0.24;
  const image1Opacity = 1 - logoFadeProgress;

  const image2Scale = 0.66 + imageEnterProgress * 0.12; // bigger than before
  const image2Opacity = imageEnterProgress;
  const image2TranslateY = (1 - imageEnterProgress) * 16;

  const textOpacity = textFadeProgress;
  const textTranslateY = (1 - textFadeProgress) * 8;

  const showScrollHint = isLocked && animationProgress < 0.16;

  // Slightly lower than before
  const stageOffsetVh = 12;

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
                  className="max-w-[82%] sm:max-w-[68%] md:max-w-[560px] h-auto"
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
                <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 md:gap-7 px-2 sm:px-4">
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#172545] text-center transition-all duration-300"
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
                    className="w-full max-w-[88vw] sm:max-w-[76vw] md:max-w-[720px] lg:max-w-[760px] h-auto rounded-2xl shadow-2xl"
                  />

                  <Link
                    to="/finanzcheck"
                    className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4.5 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 hover:shadow-xl text-base sm:text-lg font-semibold"
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