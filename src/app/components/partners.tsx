import { useState } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";

export function Partners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const partners = [
    {
      id: "solve",
      name: "SOLVE Rechtsanwälte & Steuerberatung",
      shortName: "SOLVE",
      logo: assets.partners.solveLogo,
      teamImage: assets.partners.solveTeam,
      url: "https://www.solve-law.de/",
      useTextLogo: false, // Logo wieder aktiviert
    },
    {
      id: "martin",
      name: "Finanzierungsberatung Martin Mühle",
      shortName: "Martin Mühle",
      logo: assets.partners.martinLogo,
      teamImage: assets.partners.martinTeam,
      url: "https://www.martinmuehle.de/",
      useTextLogo: false,
    },
  ];

  return (
    <section id="partner" className="pt-40 pb-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#172545]">Unsere Partner</h2>
          <p className="text-xl text-[#586477] max-w-2xl mx-auto">
            Gemeinsam stark – mit unseren Partnern bieten wir Ihnen umfassende Expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <div key={partner.id} className="space-y-6">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl aspect-[2/1] border border-[#172545]/10">
                  {/* Logo or Text Fallback */}
                  <div 
                    className={`absolute inset-0 bg-white transition-opacity duration-500 flex items-center justify-center ${
                      hoveredPartner === partner.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {partner.useTextLogo ? (
                      // Text Logo für SOLVE (immer anzeigen wenn useTextLogo=true)
                      <div className="text-center p-8">
                        <h3 className="text-5xl md:text-6xl font-bold text-[#172545] tracking-wider">
                          {partner.shortName}
                        </h3>
                        <div className="text-sm text-[#586477] mt-2 font-medium">
                          Rechtsanwälte & Steuerberatung
                        </div>
                      </div>
                    ) : (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        className="w-full h-full object-contain p-8"
                      />
                    )}
                  </div>

                  {/* Team Image */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredPartner === partner.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={partner.teamImage}
                      alt={`${partner.name} Team`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/60 to-transparent"></div>
                  </div>
                </div>
              </a>
              
              {/* Name below image */}
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="text-2xl font-semibold text-[#172545] text-center hover:text-[#586477] transition-colors">
                  {partner.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
      <ShapeDivider position="bottom" color="#172545" alignment="left" />
    </section>
  );
}
