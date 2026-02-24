import { Star } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { useState, useEffect } from "react";
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

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  // Fetch active reviews from database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/reviews`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          // Filter only active reviews
          const activeReviews = result.data.filter((r: Review) => r.isActive);
          setReviews(activeReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Use fallback reviews if fetch fails
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Triple the reviews for seamless infinite scroll
  const extendedReviews = reviews.length > 0 
    ? [...reviews, ...reviews, ...reviews]
    : [];
  const startIndex = reviews.length;

  useEffect(() => {
    if (reviews.length > 0) {
      // Start at the middle set
      setCurrentIndex(startIndex);
    }
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Reset to middle set when reaching end
  useEffect(() => {
    if (reviews.length === 0) return;
    
    if (currentIndex === startIndex + reviews.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, startIndex, reviews.length]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  // Helper to get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="reviews" className="pt-40 pb-32 bg-[#172545] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Das sagen unsere Kunden</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white text-lg ml-2">{averageRating} von 5.0</span>
          </div>
          <p className="text-white/90 text-lg">Basierend auf Google Rezensionen</p>
        </div>

        {/* Carousel Container */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-white/70">Lade Bewertungen...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <Star className="w-12 h-12 mx-auto mb-3 text-white/40" />
            <p className="text-white/70">Noch keine Bewertungen verfügbar</p>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto overflow-hidden">
            {/* Left Fade Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#172545] via-[#172545]/80 to-transparent z-10 pointer-events-none" />
            
            {/* Right Fade Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#172545] via-[#172545]/80 to-transparent z-10 pointer-events-none" />

            <div className="flex justify-center">
              <div
                className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{
                  transform: `translateX(calc(-${currentIndex * 650}px + 50vw - 325px))`
                }}
              >
                {extendedReviews.map((review, index) => (
                  <div
                    key={`review-${index}`}
                    className="flex-shrink-0 px-4"
                    style={{ width: '650px' }}
                  >
                    <div 
                      className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-700 ${
                        index === currentIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-40 scale-90'
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
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[#172545] font-semibold">
                              {getInitials(review.author)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{review.author}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-white/60 text-sm">
                              {new Date(review.date).toLocaleDateString("de-DE")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/90 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))}
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