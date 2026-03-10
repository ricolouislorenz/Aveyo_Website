import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "@/config/assets";
import { ShapeDivider } from "@/app/components/shape-divider";

export function LogoReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Logo fades out in first half of scroll
  const logoOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Image reveals upward from the bottom
  const imageClipInset = useTransform(scrollYProgress, [0.2, 0.75], [100, 0]);
  const clipPath = useTransform(
    imageClipInset,
    (v) => `inset(${v}% 0 0 0)`,
  );

  // Text overlay on image fades in
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: "200vh" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
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

      {/* Sticky stage */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Logo — fades out */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: logoOpacity }}
        >
          <img
            src={assets.logo.reveal}
            alt="AVEYO"
            className="h-auto w-[90%] max-w-none mb-12 px-4"
            style={{ maxHeight: "80vh" }}
          />
          <p className="text-3xl md:text-5xl lg:text-6xl text-gray-600 text-center max-w-5xl px-4">
            Eine Plattform für Investment, Immobilien und Vorsorge
          </p>
        </motion.div>

        {/* Image — reveals from bottom */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath }}
        >
          <img
            src="https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3Njk3MTM1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury real estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/80 via-[#172545]/40 to-transparent" />
        </motion.div>

        {/* Text overlay on image — fades in */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-20"
          style={{ opacity: overlayOpacity }}
        >
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              Premium Immobilien & Versicherungen
            </h2>
            <p className="text-xl text-white/90">
              Entdecke exklusive Angebote und maßgeschneiderte Lösungen
            </p>
          </div>
        </motion.div>
      </div>

      {/* Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <ShapeDivider position="bottom" color="#172545" alignment="center" />
      </div>
    </section>
  );
}
