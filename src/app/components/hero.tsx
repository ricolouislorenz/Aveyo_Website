import { ArrowRight } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";
import { Link } from "react-router";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-[#172545] to-[#0d1a30] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.1) 50px,
              rgba(255, 255, 255, 0.1) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.1) 50px,
              rgba(255, 255, 255, 0.1) 51px
            )`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="flex flex-col items-start">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              Einfach. Klar.<br />Für dich gemacht.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl">
              Schluss mit Papierkram und versteckten Kosten. Wir machen Finanzen digital, 
              transparent und einfach – damit du mehr Zeit für die wichtigen Dinge hast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kontakt"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border-2 border-white rounded-xl hover:bg-white hover:text-[#172545] transition-all hover:shadow-lg backdrop-blur-sm"
              >
                Jetzt Kontakt aufnehmen
              </Link>
              <Link
                to="/termin"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                Kostenloses Finanzgutachten
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Broker Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={assets.hero.main}
                alt="AVEYO Makler" 
                className="w-full h-auto"
              />
              {/* Subtle overlay for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Shape Divider */}
      <ShapeDivider position="bottom" color="#ffffff" alignment="center" inverted={true} />
    </section>
  );
}