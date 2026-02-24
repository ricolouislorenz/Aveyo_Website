#  AVEYO

Eine moderne, professionelle Website für AVEYO - Ihr Partner für Immobilien und Versicherungen. 
![AVEYO Website](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38bdf8)

---

##  Inhaltsverzeichnis

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Entwicklung](#-entwicklung)
- [Admin-Bereich](#-admin-bereich)
- [Deployment](#-deployment)
- [Projektstruktur](#-projektstruktur)
- [Konfiguration](#-konfiguration)
- [Lizenz](#-lizenz)

---

##  Features

###  **Frontend**
-  Moderne, responsive Website mit Tailwind CSS v4
-  Immobilien-Showcases mit Detailansichten
-  Versicherungs-Portfolio (Vorsorge & Absicherung)
-  Finanzanalyse-Tool für Kunden
-  Kundenbewertungen mit Sternebewertung
-  Über-uns-Sektion mit Team-Vorstellung
-  Kontaktformular mit Validierung
-  Abgerundete Notch-Übergänge zwischen Sektionen
-  Logo-Scroll-Animation im Header
-  Mobile-optimiert mit Peek-Effekt-Slidern

###  **Admin-System** (Shift + A + T)
-  **Dashboard**: Übersicht über Immobilien, Bewertungen und Analytics
-  **Immobilien-Verwaltung**: CRUD für Immobilien mit Bild-Upload
-  **Bewertungen-Verwaltung**: Kundenbewertungen moderieren
-  **Analytics**: Besucher-Tracking, Conversion-Metriken, Standort-Daten
-  **Einstellungen**: Admin-Passwort ändern
-  Sichere Authentifizierung mit Session-Management
-  Bildvalidierung & Auto-Resize für optimale Performance

###  **Analytics & DSGVO**
-  DSGVO-konformes Cookie-Management
-  Granulare Cookie-Kontrolle (Notwendig, Funktional, Analytics, Marketing)
-  Opt-in-Funktionalität für alle Tracking-Cookies
-  Besucher-Metriken (Pageviews, Unique Visitors, Bounce Rate)
-  Verhaltens-Tracking (Session Duration, Pages per Session)
-  Conversion-Tracking (Leads, Contact Form Submissions)
-  Standort-Tracking (Land/Stadt via ipapi.co)
-  Referrer-Analyse

###  **Design**
- **Markenfarben**: 
  - Primär: `#172545` (Dunkelblau)
  - Sekundär: `#586477` (Grau)
  - Akzent: `#ffffff` (Weiß)
- **Typografie**: Moderne, lesbare Schriftarten
- **Layout**: Zentrierte Navigation, cleanes Design
- **Responsive**: Mobile-First-Ansatz

---

##  Tech Stack

### **Frontend**
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4.1.12
- **Routing**: React Router (Data Mode)
- **Icons**: Lucide React
- **Animationen**: Motion (ehemals Framer Motion)

### **Backend**
- **Platform**: Supabase Edge Functions
- **Runtime**: Deno
- **Web Framework**: Hono
- **Datenbank**: Supabase PostgreSQL (KV Store)
- **Storage**: Supabase Storage (für Bilder)
- **Auth**: Custom Admin Authentication

### **Deployment**
- **Hosting**: Cloudflare Pages
- **CDN**: Cloudflare Global Network
- **Analytics**: Custom In-House Solution

---

##  Entwicklung

### **Verfügbare Scripts**
```bash
# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Build-Preview lokal testen
npm run preview

# TypeScript Type-Checking
npm run type-check

# Linting (falls konfiguriert)
npm run lint
```

### **Projekt-Ordner bearbeiten**
```
/src/app/
├── components/       # Wiederverwendbare UI-Komponenten
├── pages/           # Seiten-Komponenten (Home, Admin, etc.)
├── context/         # React Context (Auth, Cookie, Analytics)
├── utils/           # Utility-Funktionen
└── styles/          # Global CSS & Theme

/supabase/functions/server/
├── index.tsx        # Haupt-Server mit Hono
└── kv_store.tsx     # Key-Value Store Utilities
```

---

##  Projektstruktur

```
aveyo-website/
├── src/
│   ├── app/
│   │   ├── components/          # UI-Komponenten
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── properties.tsx
│   │   │   ├── vorsorge.tsx
│   │   │   ├── reviews.tsx
│   │   │   └── ...
│   │   ├── pages/              # Seiten
│   │   │   ├── home-page.tsx
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── admin-immobilien.tsx
│   │   │   ├── admin-reviews.tsx
│   │   │   ├── admin-analytics.tsx
│   │   │   └── admin-settings.tsx
│   │   ├── context/            # State Management
│   │   │   ├── auth-context.tsx
│   │   │   ├── cookie-context.tsx
│   │   │   └── analytics-context.tsx
│   │   ├── utils/              # Utilities
│   │   │   └── image-validator.tsx
│   │   ├── routes.ts           # React Router Config
│   │   └── App.tsx             # Root Component
│   ├── styles/
│   │   ├── theme.css           # Design Tokens
│   │   └── fonts.css           # Font Imports
│   ├── imports/                # Figma Assets
│   └── main.tsx                # Entry Point
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx       # Hono Server
│           └── kv_store.tsx    # DB Utilities
├── public/                     # Static Assets
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📧 Support

Bei Fragen oder Problemen:
- **E-Mail**: support@aveyo.de
- **Issues**: [GitHub Issues](https://github.com/IHR-USERNAME/aveyo-website/issues)

---

## 📄 Lizenz

Dieses Projekt ist proprietär und gehört AVEYO. Alle Rechte vorbehalten.

---

