import { useState, useEffect } from "react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { projectId, publicAnonKey } from "/utils/supabase/info";

type Partner = {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  teamPhotoUrl: string;
};

const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15/partners`;

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrl, { headers: { Authorization: `Bearer ${publicAnonKey}` } })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setPartners(result.data);
      })
      .catch(() => {});
  }, []);

  if (partners.length === 0) return null;

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

        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto mb-16">
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
                  href={partner.url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onMouseEnter={() => setHoveredPartner(partner.id)}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl aspect-[16/9] border border-[#172545]/10">
                    {/* Logo */}
                    <div
                      className={`absolute inset-0 bg-white transition-opacity duration-500 flex items-center justify-center ${
                        isHovered ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={`${partner.name} Logo`}
                          className="w-full h-full object-contain p-8"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-[#172545]">{partner.name}</span>
                      )}
                    </div>

                    {/* Team Image */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {partner.teamPhotoUrl && (
                        <>
                          <img
                            src={partner.teamPhotoUrl}
                            alt={`${partner.name} Team`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#172545]/60 to-transparent" />
                        </>
                      )}
                    </div>
                  </div>
                </a>

                {/* Name below image */}
                <a
                  href={partner.url || undefined}
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
