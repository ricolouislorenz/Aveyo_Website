// Asset configuration for external hosting

// Placeholder URLs for external deployment
const logoMain = "/logo.png";
const logoReveal = "/logo-reveal.png";
const heroMain = "/images/hero.png";
const financialAnalysisLogo = "/logo-reveal.png";
const financialAnalysisDocument = "/images/Finanzgutachten.png";
const investmentMain = "/images/startseite_investment.png";
const propertiesMain = "/images/startseite_immobilien.png";
const vorsorgePrivate = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop";
const vorsorgeBusiness = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop";
const vorsorgeDo = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop";
const vorsorgeCyber = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop";
const vorsorgeBetriebshaftpflicht = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop";
const vorsorgeBav = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop";
const vorsorgeFirmengebaude = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop";
const teamProfile1 = "/images/Adrian.png";
const teamProfile2 = "/images/Timo.png";
const partnersSolveLogo = "/images/solve_logo.jpg";
const partnersSolveTeam = "/images/solve_team.jpg";
const partnersMartinLogo = "/images/martinmuehle-logo.png";
const partnersMartinTeam = "/images/martinmuehle-team.png";

export const assets = {
  // Logos
  logo: {
    main: logoMain,
    reveal: logoReveal,
  },
  
  // Hero
  hero: {
    main: heroMain,
  },
  
  // Financial Analysis
  financialAnalysis: {
    logo: financialAnalysisLogo,
    document: financialAnalysisDocument,
  },
  
  // Investment
  investment: {
    main: investmentMain,
  },
  
  // Properties
  properties: {
    main: propertiesMain,
  },
  
  // Vorsorge
  vorsorge: {
    private: vorsorgePrivate,
    business: vorsorgeBusiness,
    do: vorsorgeDo,
    cyber: vorsorgeCyber,
    betriebshaftpflicht: vorsorgeBetriebshaftpflicht,
    bav: vorsorgeBav,
    firmengebaude: vorsorgeFirmengebaude,
  },
  
  // About/Team
  team: {
    profile1: teamProfile1,
    profile2: teamProfile2,
  },
  
  // Partners
  partners: {
    solveLogo: partnersSolveLogo,
    solveTeam: partnersSolveTeam,
    martinLogo: partnersMartinLogo,
    martinTeam: partnersMartinTeam,
  },
};

// Helper function to get asset URL
export function getAssetUrl(assetPath: string): string {
  // When hosted externally, you can modify this function to return your CDN URLs
  return assetPath;
}