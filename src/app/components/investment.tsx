import { ShapeDivider } from "@/app/components/shape-divider";

const INVESTMENT_IMAGE_480 = "/images/home/investment/investment_480.webp";
const INVESTMENT_IMAGE_768 = "/images/home/investment/investment_768.webp";
const INVESTMENT_IMAGE_960 = "/images/home/investment/investment_960.webp";

export function Investment() {
  return (
    <section id="investment" className="pt-40 pb-32 bg-[#172545] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-8 text-white">
            Investment & Vermögensaufbau
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Image - Left Side */}
            <div className="lg:w-1/2 flex justify-start w-full">
              <picture>
  <source media="(min-width: 1024px)" srcSet={INVESTMENT_IMAGE_960} />
  <img
    src={INVESTMENT_IMAGE_768}
    width="960"
    height="960"
    alt="Investment und Vermögensaufbau"
    loading="lazy"
    decoding="async"
    className="w-full max-w-[450px] aspect-square rounded-3xl shadow-2xl object-cover"
  />
</picture>
            </div>

            {/* Text Content - Right Side */}
            <div className="lg:w-1/2 text-white">
              <p className="text-lg leading-relaxed mb-6">
                Mehr Geld für die Dinge, die dir wichtig sind. Wir zeigen dir,
                wie du clever sparst und dein Vermögen aufbaust –
                evidenzbasiert, nicht auf Spekulation. Mit globalen ETFs
                investierst du in tausende Unternehmen weltweit bei minimalen
                Kosten.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Gemeinsam mit Vanguard, einem der größten und
                vertrauenswürdigsten Vermögensverwalter der Welt, bieten wir dir
                kosteneffiziente Lösungen. Niedrige Gebühren bedeuten mehr
                Rendite für dich – Jahr für Jahr.
              </p>

              <p className="text-lg leading-relaxed">
                Dabei betrachten wir dein Vermögen ganzheitlich: Von der
                Risikotragfähigkeit über die Asset Allocation bis zur
                Liquiditätsplanung. Alles wird exakt auf deine Ziele abgestimmt –
                wissenschaftlich fundiert und transparent.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
    </section>
  );
}