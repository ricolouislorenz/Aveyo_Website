import { Star } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { useState, useEffect, useRef } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl: string;
  isActive: boolean;
  createdAt: string;
}

const CARD_WIDTH = 650;
const INTERVAL_MS = 6000;
const TRANSITION_MS = 700;

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState<string>("5.0");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(false);
  const rafRef = useRef<number | null>(null);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, settingsRes] = await Promise.all([
          fetch(`${apiUrl}/reviews`, { headers: { Authorization: `Bearer ${publicAnonKey}` } }),
          fetch(`${apiUrl}/reviews/settings`, { headers: { Authorization: `Bearer ${publicAnonKey}` } }),
        ]);

        if (reviewsRes.ok) {
          const result = await reviewsRes.json();
          if (result.success) {
            setReviews(result.data.filter((r: Review) => r.isActive));
          }
        }

        if (settingsRes.ok) {
          const result = await settingsRes.json();
          if (result.success) {
            setOverallScore(result.data.overallScore.toFixed(1));
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // [copy1][copy2][copy3] — wir starten und bleiben in copy2
  const n = reviews.length;
  const extendedReviews = n > 0 ? [...reviews, ...reviews, ...reviews] : [];

  // Initialisierung: sofort auf copy2-Start springen, dann Animation aktivieren
  useEffect(() => {
    if (n === 0) return;
    setAnimated(false);
    setCurrentIndex(n);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => setAnimated(true));
    });
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [n]);

  // Auto-Advance
  useEffect(() => {
    if (n === 0) return;
    const interval = setInterval(() => setCurrentIndex((prev) => prev + 1), INTERVAL_MS);
    return () => clearInterval(interval);
  }, [n]);

  // Seamless Reset: wenn copy3 erreicht → nach Transition zurück zu copy2
  useEffect(() => {
    if (n === 0 || currentIndex < n * 2) return;
    const timeout = setTimeout(() => {
      setAnimated(false);
      setCurrentIndex(n);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setAnimated(true));
      });
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [currentIndex, n]);

  // Welche Review ist gerade aktiv — Modulo funktioniert über alle Kopien
  const activeReviewIndex = n > 0 ? currentIndex % n : -1;


  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <section id="reviews" className="pt-40 pb-32 bg-[#172545] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Das sagen unsere Kunden</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="relative flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-white/20 text-white/20" />
              ))}
              <div
                className="absolute top-0 left-0 bottom-0 flex gap-1 overflow-hidden"
                style={{ width: `${(parseFloat(overallScore) / 5) * 100}%` }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                ))}
              </div>
            </div>
            <span className="text-white text-lg ml-2">{overallScore} von 5.0</span>
          </div>
          <p className="text-white/90 text-lg">Basierend auf Google Rezensionen</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-white/70">Lade Bewertungen...</p>
          </div>
        ) : n === 0 ? (
          <div className="text-center py-20">
            <Star className="w-12 h-12 mx-auto mb-3 text-white/40" />
            <p className="text-white/70">Noch keine Bewertungen verfügbar</p>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#172545] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#172545] to-transparent z-10 pointer-events-none" />

            <div className="flex justify-center">
              <div
                style={{
                  display: "flex",
                  transform: `translateX(calc(-${currentIndex * CARD_WIDTH}px + 50vw - ${CARD_WIDTH / 2}px))`,
                  transition: animated ? `transform ${TRANSITION_MS}ms ease-in-out` : "none",
                }}
              >
                {extendedReviews.map((review, index) => {
                  const isActive = index % n === activeReviewIndex;
                  return (
                    <div
                      key={`review-${index}`}
                      style={{ width: `${CARD_WIDTH}px`, flexShrink: 0, padding: "0 16px" }}
                    >
                      <div
                        style={{
                          transition: animated ? `opacity ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out, background-color ${TRANSITION_MS}ms ease-in-out, border-color ${TRANSITION_MS}ms ease-in-out, box-shadow ${TRANSITION_MS}ms ease-in-out` : "none",
                          boxShadow: isActive ? "0 0 40px rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.3)" : "none",
                        }}
                        className={`rounded-2xl p-8 border backdrop-blur-md ${
                          isActive
                            ? "bg-white/15 border-white/50 opacity-100 scale-100"
                            : "bg-white/8 border-white/15 opacity-55 scale-90"
                        }`}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          {review.avatarUrl ? (
                            <img
                              src={review.avatarUrl}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20">
                              <span className="font-semibold text-white">
                                {getInitials(review.author)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-white">
                              {review.author}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/25 text-white/25"}`} />
                                ))}
                              </div>
                              <span className="text-sm text-white/60">
                                {new Date(review.date).toLocaleDateString("de-DE")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="leading-relaxed text-white/85">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=AVEYO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#172545] rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Alle Bewertungen auf Google ansehen
          </a>
        </div>
      </div>

      <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
    </section>
  );
}
