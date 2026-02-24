import { Linkedin, Mail } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { assets } from "@/config/assets";

export function About() {
  const team = [
    {
      name: "Adrian Nerhoff",
      role: "Geschäftsführer",
      image: assets.team.profile1,
      description: "Experte für Investment und Versicherungen",
      statement: "Meine Leidenschaft ist es, Menschen dabei zu helfen, finanzielle Freiheit zu erreichen. Jeder verdient eine maßgeschneiderte Strategie für langfristigen Erfolg.",
      email: "a.nerhoff@aveyo.de",
      linkedin: "https://www.linkedin.com/in/adrian-nerhoff",
    },
    {
      name: "Timo Konrad",
      role: "Geschäftsführer",
      image: assets.team.profile2,
      description: "Experte für Immobilieninvestment und Versicherungen",
      statement: "Absicherung bedeutet Lebensqualität. Ich sorge dafür, dass Sie und Ihr Unternehmen optimal geschützt sind – transparent und verlässlich.",
      email: "t.konrad@aveyo.de",
      linkedin: "https://www.linkedin.com/in/timo-konrad",
    },
  ];

  return (
    <section id="uber-uns" className="pt-40 pb-32 bg-white relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-8 text-gray-900">
            Über AVEYO
          </h2>
        </div>

        {/* Digital Benefits */}
        <div className="max-w-3xl mx-auto mb-20">
          <p className="text-[#172545] text-lg leading-relaxed text-center">
            Warum wir? Weil wir verstehen, was du brauchst. Weil wir modern denken und handeln. 
            Wir haben den Mahagoni-Schreibtisch gegen schlanke Dashboards getauscht – 
            Beratung per Video-Call oder Chat, deine Unterlagen immer griffbereit in der App. 
            Kein Papier, kein Stress, keine Öffnungszeiten. Egal ob du Startup-Gründer, Creator oder Skalierer bist: Wir matchen dein Tempo.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#172545] via-[#1e2f54] to-[#172545] rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#586477]/20 rounded-full blur-3xl"></div>
              </div>

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl text-white mb-2 font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm text-white/60 font-medium mb-2 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-white/90 leading-relaxed mb-8 text-base">
                  {member.description}
                </p>

                {/* Statement - integrated with divider lines */}
                <div className="w-full mb-8 relative">
                  {typeof member.statement === 'string' ? (
                    <>
                      <div className="absolute left-0 top-3 w-8 h-[2px] bg-gradient-to-r from-white/40 to-transparent"></div>
                      <div className="absolute right-0 top-3 w-8 h-[2px] bg-gradient-to-l from-white/40 to-transparent"></div>
                      <p className="text-sm italic text-white/70 leading-relaxed px-12">
                        "{member.statement}"
                      </p>
                    </>
                  ) : (
                    <div className="text-left space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">
                        {member.statement.title}
                      </h4>
                      <div className="space-y-3">
                        {member.statement.qualities.map((quality, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-semibold text-white">{quality.label}:</span>
                            <span className="text-white/80"> {quality.text}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm italic text-white/70 leading-relaxed pt-4">
                        {member.statement.closing}
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 w-full">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#172545] rounded-xl hover:bg-white/90 transition-all duration-300 text-sm font-semibold hover:scale-105"
                  >
                    <Mail size={16} />
                    <span>Kontakt</span>
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-semibold border border-white/20 hover:scale-105"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShapeDivider position="bottom" color="#172545" alignment="right" />
    </section>
  );
}