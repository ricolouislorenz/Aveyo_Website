// Asset configuration for external hosting
// Replace these with your actual hosted image URLs

// Import assets directly for Figma Make
import logoMain from "figma:asset/4a4e6e0ff44ac134273ef476e6b26c06aa6699ab.png";
import logoReveal from "figma:asset/2893b23ce2a48ff381f45c82022be6ac6f23add5.png";
import heroMain from "figma:asset/23f0e7812984ceeec5d4789ed0be340dc74d320d.png";
import financialAnalysisLogo from "figma:asset/c445db48aaa13f4c9b0a9282d8db1de3fff86f07.png";
import financialAnalysisDocument from "figma:asset/b6e8a53ef104f66be759481658e1308a0e213f83.png";
import investmentMain from "figma:asset/521d1b31dfdf6a13f5d4b723bdef8a95c5031927.png";
import propertiesMain from "figma:asset/ef1104ffddc89030a9b6439dbdc4914ff274fe52.png";
import vorsorgePrivate from "figma:asset/8fa3c12972fea64488009c9f08bfd09234ba4e43.png";
import vorsorgeBusiness from "figma:asset/5f0422aaad06e6764058e22d61f4169a21755e19.png";
import vorsorgeDo from "figma:asset/55d4c5bb4552c9af42f6f6cd7fef292fc7614bad.png";
import vorsorgeCyber from "figma:asset/01add26ac756e1f0a34937b82003b90b0af2efc5.png";
import vorsorgeBetriebshaftpflicht from "figma:asset/5ee1e562a3ed3e542c3f940902840398e0d93cad.png";
import vorsorgeBav from "figma:asset/213d91393cc8a0eacd9ecb6e23b2f83e6bc438a8.png";
import vorsorgeFirmengebaude from "figma:asset/28457dcce8d6abd9ae3c42a1875e719834350fdd.png";
import teamProfile1 from "figma:asset/e1e79b2f366a21b1e599b671704e727f1bfee03d.png";
import teamProfile2 from "figma:asset/a5e179abbab535ef304d175fe1fe184be32dd5d3.png";
import partnersSolveLogo from "figma:asset/a40c240c66532766362cbbd59ea98c82b602f46d.png";
import partnersSolveTeam from "figma:asset/6bf4af1151509823adeb022df6e3f3651d351e59.png";
import partnersMartinLogo from "figma:asset/dd7408ea0bb662ce143a0b58345b23fd38d85801.png";
import partnersMartinTeam from "figma:asset/d29e8590b4650d42deb079e9dcedea1682c93672.png";

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