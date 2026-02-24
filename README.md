# AVEYO - Professionelle Makler-Website

Eine moderne, professionelle Website für AVEYO - Ihr Partner für Immobilien und Versicherungen. Die Website kombiniert ein elegantes Frontend mit einem leistungsstarken Admin-System und umfassendem Analytics-Tracking.

![AVEYO Website](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38bdf8)

> **WICHTIG:** Diese Version verwendet Placeholder-Bilder. Für die Produktion sollten Sie Ihre eigenen Bilder einsetzen.  
> Siehe [IMAGES.md](./IMAGES.md) für Details zum Ersetzen der Bilder.

---

## Inhaltsverzeichnis

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Entwicklung](#entwicklung)
- [Admin-Bereich](#admin-bereich)
- [Deployment](#deployment)
- [Projektstruktur](#projektstruktur)
- [Konfiguration](#konfiguration)
- [Lizenz](#lizenz)

---

## Features

### Frontend
- Moderne, responsive Website mit Tailwind CSS v4
- Immobilien-Showcases mit Detailansichten
- Versicherungs-Portfolio (Vorsorge & Absicherung)
- Finanzanalyse-Tool für Kunden
- Kundenbewertungen mit Sternebewertung
- Über-uns-Sektion mit Team-Vorstellung
- Kontaktformular mit Validierung
- Abgerundete Notch-Übergänge zwischen Sektionen
- Logo-Scroll-Animation im Header
- Mobile-optimiert mit Peek-Effekt-Slidern

### Admin-System (Shift + A + T)
- **Dashboard**: Übersicht über Immobilien, Bewertungen und Analytics
- **Immobilien-Verwaltung**: CRUD für Immobilien mit Bild-Upload
- **Bewertungen-Verwaltung**: Kundenbewertungen moderieren
- **Analytics**: Besucher-Tracking, Conversion-Metriken, Standort-Daten
- **Einstellungen**: Admin-Passwort ändern
- Sichere Authentifizierung mit Session-Management
- Bildvalidierung & Auto-Resize für optimale Performance

### Analytics & DSGVO
- DSGVO-konformes Cookie-Management
- Granulare Cookie-Kontrolle (Notwendig, Funktional, Analytics, Marketing)
- Opt-in-Funktionalität für alle Tracking-Cookies
- Besucher-Metriken (Pageviews, Unique Visitors, Bounce Rate)
- Verhaltens-Tracking (Session Duration, Pages per Session)
- Conversion-Tracking (Leads, Contact Form Submissions)
- Standort-Tracking (Land/Stadt via ipapi.co)
- Referrer-Analyse

### Design
- **Markenfarben**: 
  - Primär: `#172545` (Dunkelblau)
  - Sekundär: `#586477` (Grau)
  - Akzent: `#ffffff` (Weiß)
- **Typografie**: Moderne, lesbare Schriftarten
- **Layout**: Zentrierte Navigation, cleanes Design
- **Responsive**: Mobile-First-Ansatz

---

## Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4.1.12
- **Routing**: React Router (Data Mode)
- **Icons**: Lucide React
- **Animationen**: Motion (ehemals Framer Motion)

### Backend
- **Platform**: Supabase Edge Functions
- **Runtime**: Deno
- **Web Framework**: Hono
- **Datenbank**: Supabase PostgreSQL (KV Store)
- **Storage**: Supabase Storage (für Bilder)
- **Auth**: Custom Admin Authentication

### Deployment
- **Hosting**: Cloudflare Pages
- **CDN**: Cloudflare Global Network
- **Analytics**: Custom In-House Solution

---

## Installation

### Voraussetzungen
- Node.js (v18 oder höher)
- npm oder pnpm
- Git
- Supabase Account (kostenlos)

### Schritt 1: Repository klonen
```bash
git clone https://github.com/IHR-USERNAME/aveyo-website.git
cd aveyo-website
```

### Schritt 2: Dependencies installieren
```bash
npm install
```

### Schritt 3: Environment Variables einrichten
Erstellen Sie eine `.env` Datei im Root-Verzeichnis:

```env
VITE_SUPABASE_URL=https://ihr-project.supabase.co
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

**Supabase Credentials erhalten:**
1. Gehen Sie zu [supabase.com](https://supabase.com)
2. Erstellen Sie ein neues Projekt
3. Gehen Sie zu Settings → API
4. Kopieren Sie die `URL` und `anon/public` Key

### Schritt 4: Development Server starten
```bash
npm run dev
```

Die Website ist jetzt unter `http://localhost:5173` erreichbar.

---

## Entwicklung

### Verfügbare Scripts
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

### Projekt-Ordner bearbeiten
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

## Admin-Bereich

### Zugriff
Der Admin-Bereich ist über eine Tastenkombination erreichbar:

**Shortcut**: `Shift + A + T`

### Standard-Login
- **Username**: `admin`
- **Passwort**: `aveyo2024`

**WICHTIG:** Ändern Sie das Passwort nach dem ersten Login unter "Einstellungen".

### Admin-Funktionen

#### 1. Dashboard
- Schnellübersicht über alle Metriken
- Aktuelle Immobilien-Statistiken
- Bewertungs-Zusammenfassung
- Analytics-KPIs

#### 2. Immobilien-Verwaltung
- Neue Immobilien hinzufügen
- Bestehende Immobilien bearbeiten
- Immobilien löschen
- Bilder hochladen (automatische Validierung & Resize)
- Preis, Fläche, Zimmer, Standort verwalten

#### 3. Bewertungen-Verwaltung
- Kundenbewertungen einsehen
- Bewertungen freischalten/ablehnen
- Bewertungen moderieren
- Sternebewertungen verwalten

#### 4. Analytics
- Besucher-Statistiken
- Conversion-Tracking
- Standort-Analyse (Länder/Städte)
- Referrer-Quellen
- Verhaltens-Metriken

#### 5. Einstellungen
- Admin-Passwort ändern
- System-Konfiguration

---

## Deployment

Für detaillierte Deployment-Anleitungen siehe [DEPLOYMENT.md](./DEPLOYMENT.md).

### Schnellstart: Cloudflare Pages

1. **GitHub Repository pushen**
   ```bash
   git push origin main
   ```

2. **Cloudflare Pages Setup**
   - Gehen Sie zu [dash.cloudflare.com](https://dash.cloudflare.com)
   - Workers & Pages → Create Application → Pages
   - Repository verbinden

3. **Build-Konfiguration**
   - Build command: `npm run build`
   - Build output: `dist`
   - Root directory: `/`

4. **Environment Variables hinzufügen**
   ```
   VITE_SUPABASE_URL=ihr-wert
   VITE_SUPABASE_ANON_KEY=ihr-wert
   ```

5. **Deploy starten**

### Alternative Plattformen
- Vercel
- Netlify
- AWS Amplify
- Siehe DEPLOYMENT.md für Details

---

## Projektstruktur

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

## Konfiguration

### Bilder ersetzen
Die aktuelle Version nutzt Placeholder-Bilder. Für die Produktion:

1. Lesen Sie [IMAGES.md](./IMAGES.md)
2. Ersetzen Sie Bilder in `/public/`
3. Aktualisieren Sie `/src/config/assets.ts`

### Farben anpassen
Bearbeiten Sie `/src/styles/theme.css`:

```css
:root {
  --color-primary: #172545;
  --color-secondary: #586477;
  --color-accent: #ffffff;
}
```

### Kontaktformular
Das Kontaktformular sendet E-Mails über den Supabase Edge Function Server.

**E-Mail-Konfiguration:**
1. Gmail App-Passwort erstellen
2. Secrets in Supabase setzen:
   ```bash
   supabase secrets set GMAIL_USER=ihre-email@gmail.com
   supabase secrets set GMAIL_APP_PASSWORD=ihr-app-passwort
   ```

---

## Support

Bei Fragen oder Problemen:
- **E-Mail**: support@aveyo.de
- **Issues**: [GitHub Issues](https://github.com/IHR-USERNAME/aveyo-website/issues)
- **Dokumentation**: Siehe DEPLOYMENT.md und IMAGES.md

---

## Lizenz

Dieses Projekt ist proprietär und gehört AVEYO. Alle Rechte vorbehalten.

---

**AVEYO** - Ihr Partner für Immobilien und Versicherungen
