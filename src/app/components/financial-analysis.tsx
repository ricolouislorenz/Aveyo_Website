import { useRef } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

const BOTTOM_GUTTER = 24;

// Länger = mehr "Verweilen" beim Scrollen
const SECTION_HEIGHT = "420svh";

export function FinancialAnalysis() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    trackContentSize: true,
  });

  /**
   * Timeline
   * 0.00 - 0.18: Logo bleibt sichtbar
   * 0.18 - 0.32: Logo schrumpft + blendet aus
   * 0.28 - 0.48: Dokument fährt von unten ein
   * 0.42 - 0.58: Überschrift + Button blenden ein
   * 0.58 - 1.00: Endzustand bleibt sichtbar
   */

  // Logo
  const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 1, 0.72]);

  // Dokument-Gesamtblock
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.36, 1],
    [0, 1, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0.26, 0.48, 1],
    [96, 0, 0]
  );

  // Nur das Bild selbst
  const documentScale = useTransform(
    scrollYProgress,
    [0.30, 0.48, 1],
    [0.92, 1.02, 1.02]
  );

  // Bild separat von unten einfahren
  const imageY = useTransform(
    scrollYProgress,
    [0.26, 0.52, 1],
    [160, 0, 0]
  );

  // Text/Button
  const textOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.42, 0.58], [16, 0]);

  // Scroll-Hinweis am Anfang
  const hintOpacity = useTransform(scrollYProgress, [0, 0.10, 0.14], [1, 1, 0]);

  return (
    <section
      id="finanzanalyse"
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: SECTION_HEIGHT }}
    >
      {/* Sticky Bühne */}
      <div className="sticky top-0" style={{ height: "100svh" }}>
        <div className="relative w-full h-full overflow-hidden">
          {/* Sichtbarer Bereich unter dem Header */}
          <div
            className="absolute inset-x-0"
            style={{
              top: "clamp(72px, 10vh, 120px)",
              bottom: `${BOTTOM_GUTTER}px`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div
                className="relative w-full max-w-6xl"
                style={{ height: "min(74svh, 760px)" }}
              >
                {/* Logo-Ebene */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: logoOpacity,
                    scale: logoScale,
                  }}
                >
                  <img
                    src={assets.financialAnalysis.logo}
                    alt="AVEYO"
                    className="max-w-[84%] sm:max-w-[72%] md:max-w-[620px] h-auto"
                  />
                </motion.div>

                {/* Dokument-Ebene */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: contentOpacity,
                    y: contentY,
                  }}
                >
                  <div
                    className="w-full h-full grid"
                    style={{
                      gridTemplateRows: "auto 1fr auto",
                      rowGap: "clamp(20px, 4vh, 72px)",
                      paddingTop: "clamp(8px, 2vh, 20px)",
                      paddingBottom: "clamp(10px, 2vh, 24px)",
                    }}
                  >
                    {/* Überschrift */}
                    <div className="flex items-start justify-center">
                      <motion.h2
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#172545] text-center"
                        style={{
                          opacity: textOpacity,
                          y: textY,
                        }}
                      >
                        Dein kostenloses Finanzgutachten
                      </motion.h2>
                    </div>

                    {/* Bild */}
                    <div className="flex items-center justify-center min-h-0 p-3">
                      <motion.img
                        src={assets.financialAnalysis.document}
                        alt="Dein persönliches Finanzgutachten"
                        className="w-full max-w-[99vw] sm:max-w-[94vw] md:max-w-[1060px] lg:max-w-[1220px] h-full object-contain rounded-2xl"
                        style={{
                          scale: documentScale,
                          y: imageY,
                          boxShadow: "0 0 0 2px rgba(255,255,255,0.9), 0 0 0 4px #172545",
                        }}
                      />
                    </div>

                    {/* Button */}
                    <div className="flex items-end justify-center">
                      <motion.div
                        style={{
                          opacity: textOpacity,
                          y: textY,
                        }}
                      >
                        <Link
                          to="/finanzcheck"
                          className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-colors duration-300 hover:shadow-xl text-sm sm:text-lg font-semibold"
                        >
                          Mehr erfahren
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll-Hinweis */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: hintOpacity }}
            >
              <span className="text-gray-600 text-xs sm:text-sm">
                Scrolle weiter
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}
