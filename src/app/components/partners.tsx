import { useState } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";

type Partner = {
  id: string;
  name: string;
  shortName?: string;
  url: string;

  logo: {
    src: string;
    srcSet: string;
    sizes: string;
  };

  team: {
    src: string;
    srcSet: string;
    sizes: string;
  };

  useTextLogo?: boolean;
  textLogoSubline?: string;
};

function makePartner(id: string, name: string, url: string, shortName?: string): Partner {
  const base = `/images/partners/${id}`;
  return {
    id,
    name,
    shortName,
    url,
    useTextLogo: false,
    logo: {
      src: `${base}/logo_640.webp`,
      srcSet: `${base}/logo_320.webp 320w, ${base}/logo_640.webp 640w`,
      // Logo wird auf der Karte eher "mittelgroß" gezeigt -> Browser darf gut 640 nehmen
      sizes: "(min-width: 1280px) 260px, (min-width: 640px) 35vw, 70vw",
    },
    team: {
      src: `${base}/team_640.webp`,
      srcSet: `${base}/team_320.webp 320w, ${base}/team_640.webp 640w`,
      // Teamfoto füllt die Karte -> 640 passt zu 2:1 Kachel meistens gut
      sizes: "(min-width: 1280px) 420px, (min-width: 640px) 45vw, 90vw",
    },
  };
}

const partners: Partner[] = [
  makePartner("solve", "SOLVE Rechtsanwälte & Steuerberatung", "https://www.solve-law.de/", "SOLVE"),
  makePartner("martin", "Finanzierungsberatung Martin Mühle", "https://www.martinmuehle.de/", "Martin Mühle"),
  makePartner("taxfix", "Taxfix", "https://taxfix.de/", "Taxfix"),
];

export function Partners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <section id="partner" className="pt-40 pb-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#172545]">
            Unsere Partner
          </h2>
          <p className="text-xl text-[#586477] max-w-2xl mx-auto">
            Gemeinsam stark – mit unseren Partnern bieten wir Ihnen umfassende Expertise
          </p>
        </div>

        {/* Robust für 1–10 Partner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {partners.map((partner) => {
            const isHovered = hoveredPartner === partner.id;

            return (
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
                          src={partner.logo.src}
                          srcSet={partner.logo.srcSet}
                          sizes={partner.logo.sizes}
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
                        src={partner.team.src}
                        srcSet={partner.team.srcSet}
                        sizes={partner.team.sizes}
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
                  <h3 className="text-xl md:text-2xl font-semibold text-[#172545] text-center hover:text-[#586477] transition-colors">
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