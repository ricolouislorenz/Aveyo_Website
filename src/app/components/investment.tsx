import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";

export function Investment() {
  return (
    <section id="investment" className="pt-40 pb-32 bg-[#172545] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-8 text-white">
            Investment & Vermögensaufbau
          </h2>
        </div>

        {/* Main Content Area with Image and Text */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Image - Left Side */}
            <div className="lg:w-1/2 flex justify-start">
              <img 
                src={assets.investment.main} 
                alt="Investment und Vermögensaufbau"
                className="w-full max-w-[450px] h-auto rounded-3xl shadow-2xl object-cover"
              />
            </div>

            {/* Text Content - Right Side */}
            <div className="lg:w-1/2 text-white">
              <p className="text-lg leading-relaxed mb-6">
                Mehr Geld für die Dinge, die dir wichtig sind. Wir zeigen dir, wie du clever sparst und dein Vermögen aufbaust – evidenzbasiert, nicht auf Spekulation. Mit globalen ETFs investierst du in tausende Unternehmen weltweit bei minimalen Kosten.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Gemeinsam mit Vanguard, einem der größten und vertrauenswürdigsten Vermögensverwalter der Welt, bieten wir dir kosteneffiziente Lösungen. Niedrige Gebühren bedeuten mehr Rendite für dich – Jahr für Jahr.
              </p>
              
              <p className="text-lg leading-relaxed">
                Dabei betrachten wir dein Vermögen ganzheitlich: Von der Risikotragfähigkeit über die Asset Allocation bis zur Liquiditätsplanung. Alles wird exakt auf deine Ziele abgestimmt – wissenschaftlich fundiert und transparent.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
    </section>
  );
}