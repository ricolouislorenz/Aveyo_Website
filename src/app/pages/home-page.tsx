import { Suspense, lazy } from "react";
import { SEO } from "@/app/components/seo";
import { Header } from "@/app/components/header";
import { Hero } from "@/app/components/hero";
import { Footer } from "@/app/components/footer";

// Sektionen unter dem Fold werden lazy geladen
const FinancialAnalysis = lazy(() =>
  import("@/app/components/financial-analysis").then((m) => ({ default: m.FinancialAnalysis }))
);
const Investment = lazy(() =>
  import("@/app/components/investment").then((m) => ({ default: m.Investment }))
);
const Properties = lazy(() =>
  import("@/app/components/properties").then((m) => ({ default: m.Properties }))
);
const Vorsorge = lazy(() =>
  import("@/app/components/vorsorge").then((m) => ({ default: m.Vorsorge }))
);
const About = lazy(() =>
  import("@/app/components/about").then((m) => ({ default: m.About }))
);
const Reviews = lazy(() =>
  import("@/app/components/reviews").then((m) => ({ default: m.Reviews }))
);

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Digitale Finanzberatung | Investment, Immobilien & Vorsorge"
        description="AVEYO – deine digitale Finanzberatung für Investment, Immobilien und Vorsorge. Transparent, effizient und persönlich. Jetzt kostenloses Finanzgutachten sichern."
        path="/"
      />
      <Header />
      <main>
        {/* Hero ist above-the-fold – sofort laden */}
        <Hero />
        {/* Alle weiteren Sektionen lazy */}
        <Suspense fallback={null}>
          <FinancialAnalysis />
          <Investment />
          <Properties />
          <Vorsorge />
          <About />
          <Reviews />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
