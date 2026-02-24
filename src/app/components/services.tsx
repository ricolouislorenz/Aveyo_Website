import { Home, Shield, Key, TrendingUp, Users, Award } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";

export function Services() {
  const services = [
    {
      icon: Home,
      title: "Immobilienverkauf",
      description: "Professionelle Vermarktung Ihrer Immobilie mit modernsten Methoden und großer Reichweite.",
    },
    {
      icon: Key,
      title: "Immobilienkauf",
      description: "Finden Sie Ihr Traumhaus oder die perfekte Anlageimmobilie mit unserer Unterstützung.",
    },
    {
      icon: TrendingUp,
      title: "Immobilienbewertung",
      description: "Kostenlose und fundierte Bewertung Ihrer Immobilie durch unsere Experten.",
    },
    {
      icon: Shield,
      title: "Versicherungsberatung",
      description: "Umfassende Beratung zu allen Versicherungsarten - maßgeschneidert auf Ihre Bedürfnisse.",
    },
    {
      icon: Users,
      title: "Bestandsanalyse",
      description: "Optimierung Ihres Versicherungsportfolios für bestmöglichen Schutz.",
    },
    {
      icon: Award,
      title: "Premium Service",
      description: "Persönliche Betreuung und höchste Qualitätsstandards für Ihre Zufriedenheit.",
    },
  ];

  return (
    <section className="py-20 bg-[#172545] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Unsere Leistungen</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professionelle Beratung und Service in allen Bereichen rund um Immobilien und Versicherungen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all hover:transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#172545]" />
                </div>
                <h3 className="text-xl mb-3 text-white">{service.title}</h3>
                <p className="text-white/80 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ShapeDivider position="bottom" color="#ffffff" alignment="left" />
    </section>
  );
}