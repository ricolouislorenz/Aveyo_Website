// Asset configuration

// Logos
const logoMain = "/logo.png";
const logoReveal = "/logo-reveal.png";

// Hero
const heroMain = "/images/hero.png";

// Financial Analysis
const financialAnalysisLogo = "/logo-reveal.png";
const financialAnalysisDocument = "/images/Finanzgutachten.png";

// Startseite
const investmentMain = "/images/startseite_investment.png";
const propertiesMain = "/images/startseite_immobilien.png";

// Vorsorge Overview
const vorsorgeOverviewPrivate = "/images/vorsorge/overview/private-overview.jpg";
const vorsorgeOverviewBusiness = "/images/vorsorge/overview/business-overview.jpg";

// Vorsorge Privat
const vorsorgePrivatePrivathaftpflicht =
  "/images/vorsorge/private/privathaftpflicht.png";
const vorsorgePrivateBerufsunfaehigkeit =
  "/images/vorsorge/private/berufsunfaehigkeit.png";
const vorsorgePrivateRentenversicherung =
  "/images/vorsorge/private/rentenversicherung.png";
const vorsorgePrivatePflegezusatzversicherung =
  "/images/vorsorge/private/pflegezusatzversicherung.png";
const vorsorgePrivateKrankenzusatzversicherung =
  "/images/vorsorge/private/krankenzusatzversicherung.png";
const vorsorgePrivateZahnzusatzversicherung =
  "/images/vorsorge/private/zahnzusatzversicherung.png";
const vorsorgePrivateAuslandsreiseversicherung =
  "/images/vorsorge/private/auslandsreiseversicherung.png";
const vorsorgePrivatePrivateKrankenversicherung =
  "/images/vorsorge/private/private-krankenversicherung.png";
const vorsorgePrivateHausratversicherung =
  "/images/vorsorge/private/hausratversicherung.png";
const vorsorgePrivateWohngebaeudeversicherung =
  "/images/vorsorge/private/wohngebaeudeversicherung.png";
const vorsorgePrivateKfzVersicherung =
  "/images/vorsorge/private/kfz-versicherung.png";
const vorsorgePrivateTierversicherung =
  "/images/vorsorge/private/tierversicherung.png";
const vorsorgePrivateUnfallversicherung =
  "/images/vorsorge/private/unfallversicherung.png";
const vorsorgePrivateRechtsschutzversicherung =
  "/images/vorsorge/private/rechtsschutzversicherung.png";

// Vorsorge Business
const vorsorgeBusinessBetriebshaftpflicht =
  "/images/vorsorge/business/betriebshaftpflicht.png";
const vorsorgeBusinessInhaltsversicherung =
  "/images/vorsorge/business/inhaltsversicherung.png";
const vorsorgeBusinessBetriebsunterbrechungsversicherung =
  "/images/vorsorge/business/betriebsunterbrechungsversicherung.png";
const vorsorgeBusinessCyberversicherung =
  "/images/vorsorge/business/cyberversicherung.png";
const vorsorgeBusinessFirmenRechtsschutz =
  "/images/vorsorge/business/firmen-rechtsschutz.png";
const vorsorgeBusinessGeschaeftsfuehrerVorsorgeDo =
  "/images/vorsorge/business/geschaeftsfuehrer-vorsorge-do.png";
const vorsorgeBusinessMitarbeiterabsicherung =
  "/images/vorsorge/business/mitarbeiterabsicherung.png";

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