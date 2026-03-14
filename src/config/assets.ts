// Asset configuration

// Logos
const logoMain = "/logo.png";
const logoReveal = "/logo-reveal.png";

// Hero
const heroMain = "/images/hero.png";

// Financial Analysis
const financialAnalysisLogo = "/logo-reveal.png";
const financialAnalysisDocument = "/images/home/financial-analysis/Finanzgutachten.png";

// Startseite
const investmentMain = "/images/startseite_investment.png";
const propertiesMain = "/images/startseite_immobilien.png";

// Vorsorge Overview
const vorsorgeOverviewPrivate = "/images/vorsorge/overview/private-overview.jpg";
const vorsorgeOverviewBusiness = "/images/vorsorge/overview/business-overview.jpg";

// Vorsorge Privat
const vorsorgePrivatePrivathaftpflicht =
  "/images/pages/vorsorge/private/privathaftpflicht.webp";
const vorsorgePrivateBerufsunfaehigkeit =
  "/images/pages/vorsorge/private/berufsunfaehigkeit.webp";
const vorsorgePrivateRentenversicherung =
  "/images/pages/vorsorge/private/rentenversicherung.webp";
const vorsorgePrivatePflegezusatzversicherung =
  "/images/pages/vorsorge/private/pflegezusatzversicherung.webp";
const vorsorgePrivateKrankenzusatzversicherung =
  "/images/pages/vorsorge/private/krankenzusatzversicherung.webp";
const vorsorgePrivateZahnzusatzversicherung =
  "/images/pages/vorsorge/private/zahnzusatzversicherung.webp";
const vorsorgePrivateAuslandsreiseversicherung =
  "/images/pages/vorsorge/private/auslandsreiseversicherung.webp";
const vorsorgePrivatePrivateKrankenversicherung =
  "/images/pages/vorsorge/private/private-krankenversicherung.webp";
const vorsorgePrivateHausratversicherung =
  "/images/pages/vorsorge/private/hausratversicherung.webp";
const vorsorgePrivateWohngebaeudeversicherung =
  "/images/pages/vorsorge/private/wohngebaeudeversicherung.webp";
const vorsorgePrivateKfzVersicherung =
  "/images/pages/vorsorge/private/kfz-versicherung.webp";
const vorsorgePrivateTierversicherung =
  "/images/pages/vorsorge/private/tierversicherung.webp";
const vorsorgePrivateUnfallversicherung =
  "/images/pages/vorsorge/private/unfallversicherung.webp";
const vorsorgePrivateRechtsschutzversicherung =
  "/images/pages/vorsorge/private/rechtsschutzversicherung.webp";

// Vorsorge Business
const vorsorgeBusinessBetriebshaftpflicht =
  "/images/pages/vorsorge/business/betriebshaftpflicht.webp";
const vorsorgeBusinessInhaltsversicherung =
  "/images/pages/vorsorge/business/inhaltsversicherung.webp";
const vorsorgeBusinessBetriebsunterbrechungsversicherung =
  "/images/pages/vorsorge/business/betriebsunterbrechungsversicherung.webp";
const vorsorgeBusinessCyberversicherung =
  "/images/pages/vorsorge/business/cyberversicherung.webp";
const vorsorgeBusinessFirmenRechtsschutz =
  "/images/pages/vorsorge/business/firmen-rechtsschutz.webp";
const vorsorgeBusinessGeschaeftsfuehrerVorsorgeDo =
  "/images/pages/vorsorge/business/geschaeftsfuehrer-vorsorge-do.webp";
const vorsorgeBusinessMitarbeiterabsicherung =
  "/images/pages/vorsorge/business/mitarbeiterabsicherung.webp";

// Team
const teamProfile1 = "/images/Adrian.png";
const teamProfile2 = "/images/Timo.png";

// Partners
const partnersSolveLogo = "/images/solve_logo.jpg";
const partnersSolveTeam = "/images/solve_team.jpg";
const partnersMartinLogo = "/images/martinmuehle-logo.png";
const partnersMartinTeam = "/images/martinmuehle-team.png";

export const assets = {
  logo: {
    main: logoMain,
    reveal: logoReveal,
  },

  hero: {
    main: heroMain,
  },

  financialAnalysis: {
    logo: financialAnalysisLogo,
    document: financialAnalysisDocument,
  },

  investment: {
    main: investmentMain,
  },

  properties: {
    main: propertiesMain,
  },

  vorsorge: {
    overview: {
      private: vorsorgeOverviewPrivate,
      business: vorsorgeOverviewBusiness,
    },
    private: {
      privathaftpflicht: vorsorgePrivatePrivathaftpflicht,
      berufsunfaehigkeit: vorsorgePrivateBerufsunfaehigkeit,
      rentenversicherung: vorsorgePrivateRentenversicherung,
      pflegezusatzversicherung: vorsorgePrivatePflegezusatzversicherung,
      krankenzusatzversicherung: vorsorgePrivateKrankenzusatzversicherung,
      zahnzusatzversicherung: vorsorgePrivateZahnzusatzversicherung,
      auslandsreiseversicherung: vorsorgePrivateAuslandsreiseversicherung,
      privateKrankenversicherung: vorsorgePrivatePrivateKrankenversicherung,
      hausratversicherung: vorsorgePrivateHausratversicherung,
      wohngebaeudeversicherung: vorsorgePrivateWohngebaeudeversicherung,
      kfzVersicherung: vorsorgePrivateKfzVersicherung,
      tierversicherung: vorsorgePrivateTierversicherung,
      unfallversicherung: vorsorgePrivateUnfallversicherung,
      rechtsschutzversicherung: vorsorgePrivateRechtsschutzversicherung,
    },
    business: {
      betriebshaftpflicht: vorsorgeBusinessBetriebshaftpflicht,
      inhaltsversicherung: vorsorgeBusinessInhaltsversicherung,
      betriebsunterbrechungsversicherung:
        vorsorgeBusinessBetriebsunterbrechungsversicherung,
      cyberversicherung: vorsorgeBusinessCyberversicherung,
      firmenRechtsschutz: vorsorgeBusinessFirmenRechtsschutz,
      geschaeftsfuehrerVorsorgeDo:
        vorsorgeBusinessGeschaeftsfuehrerVorsorgeDo,
      mitarbeiterabsicherung: vorsorgeBusinessMitarbeiterabsicherung,
    },
  },

  team: {
    profile1: teamProfile1,
    profile2: teamProfile2,
  },

  partners: {
    solveLogo: partnersSolveLogo,
    solveTeam: partnersSolveTeam,
    martinLogo: partnersMartinLogo,
    martinTeam: partnersMartinTeam,
  },
};

export function getAssetUrl(assetPath: string): string {
  return assetPath;
}