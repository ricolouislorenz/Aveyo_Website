import { Mail, Phone, Cookie } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCookies } from "../context/cookie-context";
import { assets } from "@/config/assets";
import { ObfuscatedLink } from "@/app/components/obfuscated-link";

interface FooterProps {
  variant?: "blue" | "white";
}

export function Footer({ variant = "white" }: FooterProps) {
  const { openSettings } = useCookies();
  const location = useLocation();

  const isBlue = variant === "blue";
  const bgColor = isBlue ? "bg-[#172545]" : "bg-white";
  const textColor = isBlue ? "text-white" : "text-[#172545]";
  const textSecondary = isBlue ? "text-white/80" : "text-[#586477]";
  const textTertiary = isBlue ? "text-white/70" : "text-[#586477]";
  const hoverColor = isBlue ? "hover:text-white" : "hover:text-[#172545]";
  const borderColor = isBlue ? "border-white/20" : "border-[#172545]/20";

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path?: string) =>
    `${textTertiary} ${hoverColor} transition-colors ${
      path && isActive(path) ? (isBlue ? "text-white" : "text-[#172545]") : ""
    }`;

  return (
    <footer className={`${bgColor} ${textColor} relative`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className={`text-2xl font-bold ${textColor} mb-2`}>AVEYO</div>
            <p className={`${textSecondary} leading-relaxed mb-4`}>
              Unsere Leistungen – Einfach. Klar. Für dich gemacht.
            </p>
            <div className="inline-block bg-white rounded-xl p-3 w-4/5">
              <img src={assets.logo.main} alt="AVEYO" className="w-full h-auto" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={`text-lg mb-4 ${textColor}`}>Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={linkClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/investment" className={linkClass("/investment")}>
                  Investment
                </Link>
              </li>
              <li>
                <Link to="/immobilien" className={linkClass("/immobilien")}>
                  Immobilien
                </Link>
              </li>
              <li>
                <Link to="/vorsorge" className={linkClass("/vorsorge")}>
                  Vorsorge
                </Link>
              </li>
              <li>
                <Link to="/ueber-uns" className={linkClass("/ueber-uns")}>
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={linkClass("/kontakt")}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-lg mb-4 ${textColor}`}>Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/investment" className={linkClass("/investment")}>
                  Investmentberatung
                </Link>
              </li>
              <li>
                <Link to="/immobilien" className={linkClass("/immobilien")}>
                  Immobilienberatung
                </Link>
              </li>
              <li>
                <Link to="/vorsorge" className={linkClass("/vorsorge")}>
                  Vorsorgeberatung
                </Link>
              </li>
              <li>
                <Link to="/finanzcheck" className={linkClass("/finanzcheck")}>
                  Finanzgutachten
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-lg mb-4 ${textColor}`}>Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${textTertiary}`} />
                <ObfuscatedLink
                  encodedHref="dGVsOis0OTQwNjUwNTU3MjAw"
                  className={`${textTertiary} ${hoverColor} transition-colors`}
                >
                  040 65055720
                </ObfuscatedLink>
              </li>
              <li className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${textTertiary}`} />
                <ObfuscatedLink
                  encodedHref="bWFpbHRvOmtvbnRha3RAYXZleW8uZGU="
                  className={`${textTertiary} ${hoverColor} transition-colors`}
                >
                  kontakt@aveyo.de
                </ObfuscatedLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${borderColor} pt-8 flex flex-col md:flex-row justify-between items-center gap-4`}
        >
          <p className={`${textTertiary} text-sm`}>© 2026 AVEYO. Alle Rechte vorbehalten.</p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link to="/impressum" className={linkClass("/impressum")}>
              Impressum
            </Link>
            <Link to="/datenschutz" className={linkClass("/datenschutz")}>
              Datenschutz
            </Link>
            <Link to="/erstinformationen" className={linkClass("/erstinformationen")}>
              Erstinformationen
            </Link>
            <Link to="/eu-transparenz" className={linkClass("/eu-transparenz")}>
              EU-Transparenzverordnung
            </Link>

            <button
              onClick={openSettings}
              className={`flex items-center gap-2 ${textTertiary} ${hoverColor} transition-colors`}
              type="button"
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