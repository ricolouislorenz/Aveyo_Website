// Asset configuration

// Logos
const logoMain = "/logo.png";
const logoReveal = "/logo-reveal.png";

// Hero
const heroMain = "/images/hero.png";

// Financial Analysis
const financialAnalysisLogo = "/logo-reveal.png";
const financialAnalysisDocument = "/images/Finanzgutachten.png";

// Vorsorge Overview
const vorsorgeOverviewPrivate = "/images/vorsorge/overview/private-overview.jpg";
const vorsorgeOverviewBusiness = "/images/vorsorge/overview/business-overview.jpg";

// Vorsorge Privat
const vorsorgePrivatePrivathaftpflicht =
  "/images/vorsorge/private/privathaftpflicht.webp";
const vorsorgePrivateBerufsunfaehigkeit =
  "/images/vorsorge/private/berufsunfaehigkeit.webp";
const vorsorgePrivateRentenversicherung =
  "/images/vorsorge/private/rentenversicherung.webp";
const vorsorgePrivatePflegezusatzversicherung =
  "/images/vorsorge/private/pflegezusatzversicherung.webp";
const vorsorgePrivateKrankenzusatzversicherung =
  "/images/vorsorge/private/krankenzusatzversicherung.webp";
const vorsorgePrivateZahnzusatzversicherung =
  "/images/vorsorge/private/zahnzusatzversicherung.webp";
const vorsorgePrivateAuslandsreiseversicherung =
  "/images/vorsorge/private/auslandsreiseversicherung.webp";
const vorsorgePrivatePrivateKrankenversicherung =
  "/images/vorsorge/private/private-krankenversicherung.webp";
const vorsorgePrivateHausratversicherung =
  "/images/vorsorge/private/hausratversicherung.webp";
const vorsorgePrivateWohngebaeudeversicherung =
  "/images/vorsorge/private/wohngebaeudeversicherung.webp";
const vorsorgePrivateKfzVersicherung =
  "/images/vorsorge/private/kfz-versicherung.webp";
const vorsorgePrivateTierversicherung =
  "/images/vorsorge/private/tierversicherung.webp";
const vorsorgePrivateUnfallversicherung =
  "/images/vorsorge/private/unfallversicherung.webp";
const vorsorgePrivateRechtsschutzversicherung =
  "/images/vorsorge/private/rechtsschutzversicherung.webp";

// Vorsorge Business
const vorsorgeBusinessBetriebshaftpflicht =
  "/images/vorsorge/business/betriebshaftpflicht.webp";
const vorsorgeBusinessInhaltsversicherung =
  "/images/vorsorge/business/inhaltsversicherung.webp";
const vorsorgeBusinessBetriebsunterbrechungsversicherung =
  "/images/vorsorge/business/betriebsunterbrechungsversicherung.webp";
const vorsorgeBusinessCyberversicherung =
  "/images/vorsorge/business/cyberversicherung.webp";
const vorsorgeBusinessFirmenRechtsschutz =
  "/images/vorsorge/business/firmen-rechtsschutz.webp";
const vorsorgeBusinessGeschaeftsfuehrerVorsorgeDo =
  "/images/vorsorge/business/geschaeftsfuehrer-vorsorge-do.webp";
const vorsorgeBusinessMitarbeiterabsicherung =
  "/images/vorsorge/business/mitarbeiterabsicherung.webp";

// Team
const teamProfile1 = "/images/Adrian.png";
const teamProfile2 = "/images/Timo.png";

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