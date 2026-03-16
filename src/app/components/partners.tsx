import { useState } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";

type Partner = {
  id: string;
  name: string;
  shortName?: string;
  url: string;
  useTextLogo?: boolean;
  textLogoSubline?: string;
  logoSrc: string; // immer 640
  teamSrc: string; // immer 640
};

function makePartner(id: string, name: string, url: string, shortName?: string): Partner {
  const base = `/images/partners/${id}`;
  return {
    id,
    name,
    shortName,
    url,
    useTextLogo: false,
    logoSrc: `${base}/logo_640.webp`,
    teamSrc: `${base}/team_640.webp`,
  };
}

const partners: Partner[] = [
  makePartner("solve", "SOLVE Rechtsanwälte & Steuerberatung", "https://www.solve-law.de/", "SOLVE"),
  makePartner("martin", "Finanzierungsberatung Martin Mühle", "https://www.martinmuehle.de/", "Martin Mühle"),
  makePartner("taxfix", "Ganz einfach Ø 1.172€ Steuern zurückholen", "https://taxfix.de/finanzberater-adrian-nerhoff/", "Taxfix"),
  // weitere Partner einfach hier ergänzen:
];

export function Partners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <section id="partner" className="pt-40 pb-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl mb-4 text-[#172545]">
            Unsere Partner
          </h2>
          <p className="text-2xl text-[#586477] max-w-2xl mx-auto">
            Gemeinsam stark – mit unseren Partnern bieten wir Ihnen umfassende Expertise
          </p>
        </div>

        {/* Symmetrisch bei jeder Anzahl (1–10+) */}
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          {partners.map((partner) => {
            const isHovered = hoveredPartner === partner.id;

            return (
              <div
                key={partner.id}
                className="
                  space-y-6
                  w-full
                  sm:basis-[calc(50%-20px)]
                  lg:basis-[calc(33.333%-27px)]
                  max-w-[640px]
                "
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onMouseEnter={() => setHoveredPartner(partner.id)}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl aspect-[16/9] border border-[#172545]/10">
                    {/* Logo / Text */}
                    <div
                      className={`absolute inset-0 bg-white transition-opacity duration-500 flex items-center justify-center ${
                        isHovered ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {partner.useTextLogo ? (
                        <div className="text-center p-8">
                          <h3 className="text-5xl md:text-6xl font-bold text-[#172545] tracking-wider">
                            {partner.shortName ?? partner.name}
                          </h3>
                          {partner.textLogoSubline && (
                            <div className="text-sm text-[#586477] mt-2 font-medium">
                              {partner.textLogoSubline}
                            </div>
                          )}
                        </div>
                      ) : (
                        <img
                          src={partner.logoSrc} // IMMER 640
                          alt={`${partner.name} Logo`}
                          className="w-full h-full object-contain p-8"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>

                    {/* Team Image */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={partner.teamSrc} // IMMER 640
                        alt={`${partner.name} Team`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/60 to-transparent" />
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
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#172545] text-center hover:text-[#586477] transition-colors">
                    {partner.name}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="center" />
    </section>
  );
}