import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { ShapeDivider } from "@/app/components/shape-divider";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

interface ReviewCardProps {
  review: Review;
  isActive: boolean;
  getInitials: (name: string) => string;
  onOpen: (review: Review) => void;
}

function ReviewCard({ review, isActive, getInitials, onOpen }: ReviewCardProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    const measureOverflow = () => {
      const element = textRef.current;
      if (!element) return;
      setIsClamped(element.scrollHeight > element.clientHeight + 1);
    };

    measureOverflow();
    window.addEventListener("resize", measureOverflow);
    return () => window.removeEventListener("resize", measureOverflow);
  }, [review.text, isActive]);

  const canOpenFullReview = isActive && isClamped;

  return (
    <button
      type="button"
      onClick={() => {
        if (canOpenFullReview) onOpen(review);
      }}
      disabled={!canOpenFullReview}
      aria-label={
        canOpenFullReview
          ? `Vollständige Bewertung von ${review.author} anzeigen`
          : undefined
      }
      className={`group relative flex h-[420px] w-full flex-col overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-md transition-all duration-300 sm:h-[380px] sm:p-8 ${
        isActive
          ? "bg-gradient-to-br from-white/18 via-white/12 to-white/8 text-white border-white shadow-[0_0_0_1px_rgba(255,255,255,0.45),0_24px_70px_rgba(0,0,0,0.32),0_0_48px_rgba(255,255,255,0.12)] scale-100"
          : "bg-white/8 text-white border-white/15 opacity-55 scale-90"
      } ${canOpenFullReview ? "cursor-pointer hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/70" : "cursor-default"}`}
    >
      <div className="relative mb-6 flex items-start gap-4">
        <div className="relative flex-shrink-0">
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.author}
              className={`h-14 w-14 rounded-full object-cover ${
                isActive ? "ring-2 ring-white/60 ring-offset-2 ring-offset-[#172545]" : ""
              }`}
            />
          ) : (
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${
                isActive
                  ? "bg-white/25 ring-2 ring-white/50 ring-offset-2 ring-offset-[#172545]"
                  : "bg-white/20"
              }`}
            >
              <span className="font-semibold text-white">
                {getInitials(review.author)}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div className="min-w-0 flex-1 pr-10">
          <h3 className={`font-semibold leading-tight text-white ${isActive ? "text-xl" : "text-lg"}`}>
            {review.author}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
              Google Rezension
            </span>
            <span className={`text-sm ${isActive ? "text-white/75" : "text-white/60"}`}>
              {new Date(review.date).toLocaleDateString("de-DE")}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mb-5 flex items-center gap-3">
        <div className="flex gap-1 rounded-full bg-black/10 px-3 py-2 ring-1 ring-white/10">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-white/25 text-white/25"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-white/85">{review.rating}.0</span>
      </div>

      <p
        ref={textRef}
        className={`relative overflow-hidden leading-relaxed ${
          isActive ? "text-lg text-white/95" : "text-white/85"
        }`}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: isActive ? 6 : 7,
          WebkitBoxOrient: "vertical",
        }}
      >
        {review.text}
      </p>
      {canOpenFullReview ? (
        <span className="relative mt-auto inline-flex items-center pt-4 text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
          Vollständige Bewertung anzeigen
        </span>
      ) : null}
    </button>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState<string>("5.0");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

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

  const n = reviews.length;

  useEffect(() => {
    if (n === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((index) => index % n);
  }, [n]);

  const getWrappedReview = (offset: number) => {
    if (n === 0) return null;
    return reviews[(activeIndex + offset + n) % n];
  };

  const visibleReviews = [
    { review: getWrappedReview(-1), position: "left" },
    { review: getWrappedReview(0), position: "center" },
    { review: getWrappedReview(1), position: "right" },
  ];

  const showPreviousReview = () => {
    if (n === 0) return;
    setActiveIndex((index) => (index - 1 + n) % n);
  };

  const showNextReview = () => {
    if (n === 0) return;
    setActiveIndex((index) => (index + 1) % n);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const reviewModal = selectedReview
    ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#172545]/10 pb-5">
              <div>
                <h3 id="review-modal-title" className="text-2xl font-bold leading-tight text-[#172545]">
                  {selectedReview.author}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < selectedReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-[#172545]/15 text-[#172545]/15"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#586477]">
                    {new Date(selectedReview.date).toLocaleDateString("de-DE")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Bewertung schliessen"
                className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#172545] text-white shadow-md transition-colors hover:bg-[#0d1a30] focus:outline-none focus:ring-2 focus:ring-[#172545]/40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="whitespace-pre-line text-lg leading-8 text-[#172545] sm:text-xl sm:leading-9">
              {selectedReview.text}
            </p>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <section id="reviews" className="relative bg-[#172545] pt-40 pb-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl text-white md:text-5xl">Das sagen unsere Kunden</h2>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="relative flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-white/20 text-white/20" />
              ))}
              <div
                className="absolute top-0 bottom-0 left-0 flex gap-1 overflow-hidden"
                style={{ width: `${(parseFloat(overallScore) / 5) * 100}%` }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <span className="ml-2 text-lg text-white">{overallScore} von 5.0</span>
          </div>
          <p className="text-lg text-white/90">Basierend auf Google Rezensionen</p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-white/70">Lade Bewertungen...</p>
          </div>
        ) : n === 0 ? (
          <div className="py-20 text-center">
            <Star className="mx-auto mb-3 h-12 w-12 text-white/40" />
            <p className="text-white/70">Noch keine Bewertungen verfügbar</p>
          </div>
        ) : (
          <div className="relative mx-auto max-w-7xl">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[#172545] to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#172545] to-transparent" />

            <div className="overflow-hidden px-6 sm:px-16">
              <div className="grid grid-cols-[minmax(280px,520px)] items-center justify-center gap-4 transition-all duration-300 sm:gap-6 md:grid-cols-[minmax(240px,420px)_minmax(300px,520px)_minmax(240px,420px)]">
                {visibleReviews.map(({ review, position }) =>
                  review ? (
                    <div
                      key={`${position}-${review.id}`}
                      className={position === "center" ? "z-20" : "z-0 hidden md:block"}
                    >
                      <ReviewCard
                        review={review}
                        isActive={position === "center"}
                        getInitials={getInitials}
                        onOpen={setSelectedReview}
                      />
                    </div>
                  ) : null,
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={showPreviousReview}
              aria-label="Vorherige Bewertung anzeigen"
              className="absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white text-[#172545] shadow-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={showNextReview}
              aria-label="Nächste Bewertung anzeigen"
              className="absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white text-[#172545] shadow-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=AVEYO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-[#172545] shadow-lg transition-colors hover:bg-gray-100"
          >
            Alle Bewertungen auf Google ansehen
          </a>
        </div>
      </div>

      {reviewModal}

      <ShapeDivider position="bottom" color="#ffffff" alignment="center" />
    </section>
  );
}
