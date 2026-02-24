import { Header } from "@/app/components/header";
import { Hero } from "@/app/components/hero";
import { FinancialAnalysis } from "@/app/components/financial-analysis";
import { Investment } from "@/app/components/investment";
import { Properties } from "@/app/components/properties";
import { Vorsorge } from "@/app/components/vorsorge";
import { About } from "@/app/components/about";
import { Reviews } from "@/app/components/reviews";
import { Footer } from "@/app/components/footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FinancialAnalysis />
        <Investment />
        <Properties />
        <Vorsorge />
        <About />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}