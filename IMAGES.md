# 📸 Bilder aus Figma Make extrahieren

Wenn Sie Ihre Original-Bilder aus dem Figma Make Projekt extrahieren möchten, folgen Sie diesen Schritten:

## 🎯 Methode 1: Aus dem Export

1. **Projekt aus Figma Make exportieren/herunterladen**
   - Suchen Sie nach dem "Export" oder "Download" Button in Figma Make
   - Laden Sie das komplette Projekt herunter

2. **Bilder finden**
   
   Im Export-Ordner sollten die Bilder unter einem dieser Pfade liegen:
   ```
   /public/
   /assets/
   /src/imports/
   /figma-assets/
   ```

3. **Bilder kopieren**
   
   Kopieren Sie alle `.png`, `.jpg`, `.webp` Dateien in Ihren `/public/images/` Ordner

---

## 🎯 Methode 2: Aus dem Browser

Falls die Bilder nicht im Export enthalten sind:

1. **Öffnen Sie Ihre Figma Make Website im Browser**

2. **DevTools öffnen** (F12 oder Rechtsklick → "Untersuchen")

3. **Zum Network-Tab gehen**

4. **Seite neu laden** (F5)

5. **Filter auf "Img" setzen**

6. **Bilder finden:**
   - Suchen Sie nach Requests mit `figma:asset` oder Bild-URLs
   - Klicken Sie mit Rechtsklick auf das Bild
   - "Open in new tab"
   - Bild speichern (Rechtsklick → "Bild speichern unter...")

---

## 🎯 Methode 3: Aus der Original-Figma-Datei

Falls Sie Zugriff auf das Original-Figma-Design haben:

1. **Figma-Datei öffnen**

2. **Bilder auswählen**

3. **Rechtsklick → "Copy/Paste" → "Copy as PNG"** oder
   **File → Export → PNG/JPG**

4. **Bilder in hoher Qualität exportieren:**
   - Empfohlene Größe: 2x oder 3x für Retina-Displays
   - Format: PNG für Logos, JPG für Fotos

---

## 📁 Dateistruktur nach dem Extrahieren

Organisieren Sie die Bilder so:

```
/public/
├── logo.png              # Haupt-Logo
├── logo-reveal.png       # Logo für Scroll-Animation
├── favicon.png           # Favicon
└── images/
    ├── hero.jpg          # Hero-Bild Startseite
    ├── investment.jpg    # Investment-Sektion
    ├── properties.jpg    # Immobilien-Sektion
    ├── team/
    │   ├── profile-1.jpg
    │   └── profile-2.jpg
    ├── partners/
    │   ├── solve-logo.png
    │   ├── solve-team.jpg
    │   ├── martin-logo.png
    │   └── martin-team.jpg
    └── vorsorge/
        ├── private.jpg
        ├── business.jpg
        ├── cyber.jpg
        └── ...
```

---

## 🔧 Assets-Datei aktualisieren

Nachdem Sie die Bilder in `/public` abgelegt haben, aktualisieren Sie `/src/config/assets.ts`:

```typescript
// Vorher (Placeholder):
const logoMain = "https://via.placeholder.com/200x60/172545/ffffff?text=AVEYO";

// Nachher (lokale Datei):
const logoMain = "/logo.png";

// Oder mit CDN:
const logoMain = "https://ihr-cdn.com/images/logo.png";
```

### Vollständiges Beispiel:

```typescript
// /src/config/assets.ts
const logoMain = "/logo.png";
const logoReveal = "/logo-reveal.png";
const heroMain = "/images/hero.jpg";
const financialAnalysisLogo = "/images/financial-analysis-logo.png";
const financialAnalysisDocument = "/images/financial-analysis-document.jpg";
const investmentMain = "/images/investment.jpg";
const propertiesMain = "/images/properties.jpg";
const vorsorgePrivate = "/images/vorsorge/private.jpg";
const vorsorgeBusiness = "/images/vorsorge/business.jpg";
const vorsorgeDo = "/images/vorsorge/do.jpg";
const vorsorgeCyber = "/images/vorsorge/cyber.jpg";
const vorsorgeBetriebshaftpflicht = "/images/vorsorge/betriebshaftpflicht.jpg";
const vorsorgeBav = "/images/vorsorge/bav.jpg";
const vorsorgeFirmengebaude = "/images/vorsorge/firmengebaude.jpg";
const teamProfile1 = "/images/team/profile-1.jpg";
const teamProfile2 = "/images/team/profile-2.jpg";
const partnersSolveLogo = "/images/partners/solve-logo.png";
const partnersSolveTeam = "/images/partners/solve-team.jpg";
const partnersMartinLogo = "/images/partners/martin-logo.png";
const partnersMartinTeam = "/images/partners/martin-team.jpg";

export const assets = {
  // ... rest bleibt gleich
};
```

---

## 🎨 Bildoptimierung (Empfohlen)

Bevor Sie die Bilder hochladen:

### **1. Komprimieren**
- Online-Tool: [TinyPNG](https://tinypng.com)
- Lokales Tool: `ImageOptim` (Mac), `FileOptimizer` (Windows)

### **2. Richtige Größen**
- **Logos:** 200-400px Breite, PNG mit Transparenz
- **Hero-Bilder:** 1920x1080px, JPG, Qualität 80%
- **Team-Fotos:** 400x400px, JPG, Qualität 85%
- **Partner-Logos:** 150x150px, PNG mit Transparenz
- **Sektions-Bilder:** 800x600px, JPG, Qualität 80%

### **3. WebP verwenden** (Optional, für bessere Performance)
- Konvertieren Sie JPG/PNG zu WebP
- Tool: `cwebp` (command line) oder [Squoosh](https://squoosh.app)

---

## 🚀 Alternative: CDN verwenden

Statt lokale Dateien zu nutzen, können Sie auch einen CDN-Dienst verwenden:

### **Cloudflare Images**
1. Bilder zu Cloudflare hochladen
2. URLs in `assets.ts` einfügen
3. Vorteil: Automatische Optimierung & globales Caching

### **Cloudinary**
1. Account erstellen auf [cloudinary.com](https://cloudinary.com)
2. Bilder hochladen
3. URLs verwenden
4. Vorteil: On-the-fly Transformationen

### **AWS S3 + CloudFront**
1. S3 Bucket erstellen
2. Bilder hochladen
3. CloudFront CDN einrichten
4. URLs verwenden

---

## ❓ Häufige Fragen

**Q: Muss ich alle Bilder ersetzen?**
- Nein, die Placeholder funktionieren auch. Aber für Produktion sollten Sie Ihre eigenen Bilder verwenden.

**Q: Kann ich die Placeholder-Bilder behalten?**
- Ja, für Tests. Aber für die echte Website sollten Sie Ihre Marken-Assets verwenden.

**Q: Wie groß sollten die Bilder sein?**
- Siehe "Bildoptimierung" oben. Nie größer als 2MB pro Bild.

**Q: Welches Format ist besser: PNG oder JPG?**
- **PNG:** Für Logos, Icons (brauchen Transparenz)
- **JPG:** Für Fotos, Screenshots (kleinere Dateigröße)
- **WebP:** Für beides (modernste Option, beste Kompression)

---

**Viel Erfolg beim Einrichten Ihrer Bilder! 📸**
