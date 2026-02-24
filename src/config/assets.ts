// Asset configuration for external hosting
// These URLs use placeholder images that work outside of Figma Make
// Replace with your actual hosted image URLs after uploading to your CDN

// Placeholder URLs for external deployment
const logoMain = "https://via.placeholder.com/200x60/172545/ffffff?text=AVEYO";
const logoReveal = "https://via.placeholder.com/200x60/172545/ffffff?text=AVEYO";
const heroMain = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop";
const financialAnalysisLogo = "https://via.placeholder.com/150x150/172545/ffffff?text=FA";
const financialAnalysisDocument = "https://images.unsplash.com/photo-1554224311-beee4ece91c1?w=600&h=400&fit=crop";
const investmentMain = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop";
const propertiesMain = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";
const vorsorgePrivate = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop";
const vorsorgeBusiness = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop";
const vorsorgeDo = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop";
const vorsorgeCyber = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop";
const vorsorgeBetriebshaftpflicht = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop";
const vorsorgeBav = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop";
const vorsorgeFirmengebaude = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop";
const teamProfile1 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&face=1";
const teamProfile2 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&face=1";
const partnersSolveLogo = "https://via.placeholder.com/150x150/172545/ffffff?text=SOLVE";
const partnersSolveTeam = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop";
const partnersMartinLogo = "https://via.placeholder.com/150x150/172545/ffffff?text=MARTIN";
const partnersMartinTeam = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop";

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
  // In Figma Make environment, return the figma:asset path as-is
  // When hosted externally, you can modify this function to return your CDN URLs
  return assetPath;
}