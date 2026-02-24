import { Facebook, Instagram, Linkedin, Mail, Phone, Cookie } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { useCookies } from "../context/cookie-context";

interface FooterProps {
  variant?: "blue" | "white";
}

export function Footer({ variant = "white" }: FooterProps) {
  const { openSettings } = useCookies();

  const isBlue = variant === "blue";
  const bgColor = isBlue ? "bg-[#172545]" : "bg-white";
  const textColor = isBlue ? "text-white" : "text-[#172545]";
  const textSecondary = isBlue ? "text-white/80" : "text-[#586477]";
  const textTertiary = isBlue ? "text-white/70" : "text-[#586477]";
  const hoverColor = isBlue ? "hover:text-white" : "hover:text-[#172545]";
  const iconBg = isBlue ? "bg-white/10 hover:bg-white/20" : "bg-[#172545]/10 hover:bg-[#172545]/20";
  const iconColor = isBlue ? "text-white" : "text-[#172545]";
  const borderColor = isBlue ? "border-white/20" : "border-[#172545]/20";

  return (
    <footer className={`${bgColor} ${textColor} relative`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className={`text-2xl font-bold ${textColor} mb-2`}>
              AVEYO
            </div>
            <p className={`${textSecondary} leading-relaxed`}>
              Unsere Leistungen – Einfach. Klar. Für dich gemacht.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg mb-4 ${textColor}`}>Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#immobilien" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Immobilien
                </a>
              </li>
              <li>
                <a href="#versicherungen" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Versicherungen
                </a>
              </li>
              <li>
                <a href="#uber-uns" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Über uns
                </a>
              </li>
              <li>
                <a href="#kontakt" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-lg mb-4 ${textColor}`}>Services</h4>
            <ul className="space-y-2">
              <li className={textTertiary}>Immobilienberatung</li>
              <li className={textTertiary}>Versicherungsberatung</li>
              <li className={textTertiary}>Investmentberatung</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg mb-4 ${textColor}`}>Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${textTertiary}`} />
                <a href="tel:+4940650557200" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  040 65055720
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${textTertiary}`} />
                <a href="mailto:Kontakt@aveyo.de" className={`${textTertiary} ${hoverColor} transition-colors`}>
                  Kontakt@aveyo.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${borderColor} pt-8 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`${textTertiary} text-sm`}>
            © 2026 AVEYO. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <a href="/impressum" className={`${textTertiary} ${hoverColor} transition-colors`}>
              Impressum
            </a>
            <a href="/datenschutz" className={`${textTertiary} ${hoverColor} transition-colors`}>
              Datenschutz
            </a>
            <a href="/erstinformationen" className={`${textTertiary} ${hoverColor} transition-colors`}>
              Erstinformationen
            </a>
            <a href="/eu-transparenz" className={`${textTertiary} ${hoverColor} transition-colors`}>
              EU-Transparenzverordnung
            </a>
            <button
              onClick={openSettings}
              className={`flex items-center gap-2 ${textTertiary} ${hoverColor} transition-colors`}
            >
              <Cookie className="w-4 h-4" />
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}