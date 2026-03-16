import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { assets } from "@/config/assets";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If not on home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and scroll
      setTimeout(() => {
        const element = document.getElementById('kontakt');
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById('kontakt');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If on home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "w-[95%] lg:w-[90%]" : "w-[95%] lg:w-[85%]"
      }`}
    >
      <div
        className={`rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20"
            : "bg-white/85 backdrop-blur-md"
        }`}
      >
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 xl:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" onClick={handleLogoClick}>
                <img src={assets.logo.main} alt="AVEYO" className="h-9 md:h-10 xl:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* Navigation — centered in middle column */}
            <nav className="hidden lg:flex items-center justify-center gap-10 xl:gap-7 px-4">
              <Link
                to="/investment"
                className="text-gray-700 hover:text-[#172545] transition-colors text-lg xl:text-xl font-semibold whitespace-nowrap"
              >
                Investment
              </Link>
              <Link
                to="/immobilien"
                className="text-gray-700 hover:text-[#172545] transition-colors text-lg xl:text-xl font-semibold whitespace-nowrap"
              >
                Immobilien
              </Link>
              <Link
                to="/vorsorge"
                className="text-gray-700 hover:text-[#172545] transition-colors text-lg xl:text-xl font-semibold whitespace-nowrap"
              >
                Vorsorge
              </Link>
              <Link
                to="/ueber-uns"
                className="text-gray-700 hover:text-[#172545] transition-colors text-lg xl:text-xl font-semibold whitespace-nowrap"
              >
                Über Uns
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center justify-end gap-3">
              {/* CTA Buttons — only at xl+ */}
              <div className="hidden xl:flex items-center gap-3">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center px-4 py-2 bg-white text-[#172545] border-2 border-[#172545] rounded-xl hover:bg-[#172545] hover:text-white transition-all font-semibold text-sm whitespace-nowrap"
                >
                  Jetzt Kontakt aufnehmen
                </Link>
                <Link
                  to="/termin"
                  className="inline-flex items-center px-4 py-2 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all font-semibold text-sm whitespace-nowrap"
                >
                  Kostenloses Finanzgutachten
                </Link>
              </div>

              {/* CTA Buttons — zwischen sm und lg (wenn Nav-Links ausgeblendet) */}
              <div className="hidden sm:flex lg:hidden items-center gap-2">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center px-3 py-2 bg-white text-[#172545] border-2 border-[#172545] rounded-xl hover:bg-[#172545] hover:text-white transition-all font-semibold text-sm whitespace-nowrap"
                >
                  Kontakt
                </Link>
                <Link
                  to="/termin"
                  className="inline-flex items-center px-3 py-2 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all font-semibold text-sm whitespace-nowrap"
                >
                  Finanzgutachten
                </Link>
              </div>

              {/* Mobile/Tablet Menu Button */}
              <button
                className="lg:hidden text-gray-700 p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#172545]/95 backdrop-blur-lg border-t border-white/10 rounded-b-2xl">
              <nav className="px-4 py-6 flex flex-col gap-2">
                <Link
                  to="/investment"
                  className="text-white hover:text-white/80 transition-colors py-3 px-2 text-lg font-semibold border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Investment
                </Link>
                <Link
                  to="/immobilien"
                  className="text-white hover:text-white/80 transition-colors py-3 px-2 text-lg font-semibold border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Immobilien
                </Link>
                <Link
                  to="/vorsorge"
                  className="text-white hover:text-white/80 transition-colors py-3 px-2 text-lg font-semibold border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vorsorge
                </Link>
                <Link
                  to="/ueber-uns"
                  className="text-white hover:text-white/80 transition-colors py-3 px-2 text-lg font-semibold border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Über Uns
                </Link>
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white hover:text-[#172545] transition-all font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jetzt Kontakt aufnehmen
                  </Link>
                  <Link
                    to="/termin"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#172545] rounded-xl hover:bg-gray-100 transition-all font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kostenloses Finanzgutachten
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}