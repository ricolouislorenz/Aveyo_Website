import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";

export function Properties() {
  return (
    <section id="immobilien" className="pt-40 pb-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-8 text-gray-900">
            Immobilien
          </h2>
        </div>

        {/* Main Content Area with Image and Text */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Text Content - Left Side */}
            <div className="lg:w-1/2 text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Immobilien als langfristige Wertanlage – wir helfen dir, die richtigen Objekte zu finden. Du profitierst von stabilen Mieteinnahmen, die dir Monat für Monat passives Einkommen sichern, gleichzeitig schützt dich die Immobilie vor Inflation und bietet langfristiges Wertsteigerungspotenzial.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Unser Fokus liegt auf A- und B-Lagen in wachsenden Metropolregionen. Standorte mit Zukunft, wo die Nachfrage hoch und die Entwicklung positiv ist. Wir prüfen jedes Objekt auf Herz und Nieren – von der Bausubstanz bis zum wirtschaftlichen Potenzial.
              </p>
              
              <p className="text-lg leading-relaxed">
                Du erhältst von uns eine transparente Renditeberechnung nach allen Kosten. Keine Milchmädchenrechnungen, sondern echte Fakten für deine Entscheidung. So weißt du genau, was du kaufst und was du erwarten kannst.
              </p>
            </div>

            {/* Image - Right Side */}
            <div className="lg:w-1/2 flex justify-end">
              <img 
                src={assets.properties.main} 
                alt="Immobilienberatung"
                className="w-[450px] h-[450px] rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}