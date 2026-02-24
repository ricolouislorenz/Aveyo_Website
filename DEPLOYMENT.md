# 🚀 Deployment Guide für AVEYO Website

## ⚠️ Wichtige Hinweise vor dem Deployment

### 1. **Bilder ersetzen**

Die aktuelle Version verwendet **Placeholder-Bilder** von Unsplash und placeholder.com. 

**Für die Produktion sollten Sie:**

1. **Logo-Dateien erstellen:**
   - Erstellen Sie Ihr echtes AVEYO-Logo
   - Speichern Sie es in `/public/logo.png` und `/public/logo-reveal.png`

2. **Asset-Konfiguration aktualisieren:**
   
   Öffnen Sie `/src/config/assets.ts` und ersetzen Sie die Placeholder-URLs mit Ihren eigenen:

   ```typescript
   // Beispiel - statt Placeholder:
   const logoMain = "/logo.png";
   const logoReveal = "/logo-reveal.png";
   
   // Oder verwenden Sie Ihre CDN-URLs:
   const heroMain = "https://ihr-cdn.com/images/hero.jpg";
   ```

3. **Bilder in `/public` ablegen:**
   
   Legen Sie alle statischen Bilder in den `/public` Ordner:
   ```
   /public/
   ├── logo.png
   ├── logo-reveal.png
   ├── favicon.png
   ├── images/
   │   ├── hero.jpg
   │   ├── team-1.jpg
   │   ├── team-2.jpg
   │   └── ...
   ```

4. **Alternative: CDN verwenden**
   
   Laden Sie Ihre Bilder zu einem CDN hoch (z.B. Cloudflare Images, AWS S3, Cloudinary) und verwenden Sie die URLs in `assets.ts`.

---

## 📦 Deployment-Optionen

### **Option 1: Cloudflare Pages (Empfohlen)**

#### Vorteile:
- ✅ Kostenlos für kleine/mittlere Projekte
- ✅ Globales CDN
- ✅ Automatisches SSL
- ✅ Git-Integration
- ✅ Perfekt für Supabase Edge Functions

#### Schritte:

1. **Repository zu GitHub pushen** (falls noch nicht geschehen)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/aveyo-website.git
   git push -u origin main
   ```

2. **Cloudflare Pages Setup**
   - Gehe zu [dash.cloudflare.com](https://dash.cloudflare.com)
   - Klicke auf "Workers & Pages" → "Create Application" → "Pages"
   - Verbinde dein GitHub Repository
   - Branch auswählen: `main`

3. **Build-Konfiguration**
   ```
   Build command:       npm run build
   Build output:        dist
   Root directory:      /
   ```

4. **Environment Variables hinzufügen**
   
   In Cloudflare Pages → Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Deploy**
   - Klicke auf "Save and Deploy"
   - Warten auf Build (ca. 2-5 Minuten)
   - Fertig! 🎉

6. **Custom Domain einrichten** (Optional)
   - In Cloudflare Pages → Custom Domains
   - Domain hinzufügen (z.B. `www.aveyo.de`)

---

### **Option 2: Vercel**

#### Schritte:

1. **Vercel CLI installieren**
   ```bash
   npm i -g vercel
   ```

2. **Projekt deployen**
   ```bash
   vercel
   ```

3. **Folge den Anweisungen:**
   - Link to existing project? → No
   - Project name? → aveyo-website
   - Directory? → ./

4. **Environment Variables setzen**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

### **Option 3: Netlify**

#### Schritte:

1. **Netlify CLI installieren**
   ```bash
   npm i -g netlify-cli
   ```

2. **Projekt bauen**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Environment Variables** in Netlify Dashboard hinzufügen

---

## 🔐 Supabase Edge Functions deployen

### **Voraussetzung: Supabase CLI**

```bash
npm i -g supabase
supabase login
```

### **Function deployen**

```bash
# In Projektordner
supabase functions deploy make-server-78b4cf15 --project-ref YOUR_PROJECT_REF
```

### **Environment Secrets setzen**

```bash
supabase secrets set GMAIL_USER=your-email@gmail.com --project-ref YOUR_PROJECT_REF
supabase secrets set GMAIL_APP_PASSWORD=your-app-password --project-ref YOUR_PROJECT_REF
```

### **Storage Bucket erstellen**

1. Gehe zu [Supabase Dashboard](https://supabase.com/dashboard) → Storage
2. "Create Bucket"
3. Name: `make-78b4cf15-property-images`
4. Privacy: **Private**
5. Fertig!

---

## ✅ Post-Deployment Checklist

Nach dem Deployment sollten Sie:

- [ ] **Website aufrufen** und alle Seiten testen
- [ ] **Admin-Login testen** (Shift + A + T)
- [ ] **Admin-Passwort ändern** (wichtig!)
- [ ] **Immobilien-Upload testen**
- [ ] **Analytics prüfen** (Cookie-Banner sollte erscheinen)
- [ ] **Mobile-Ansicht testen**
- [ ] **Logo & Bilder ersetzen** (falls noch nicht geschehen)
- [ ] **Kontaktformular testen**
- [ ] **SSL-Zertifikat prüfen** (HTTPS)
- [ ] **Impressum & Datenschutz ausfüllen**
- [ ] **Custom Domain einrichten** (optional)

---

## 🐛 Troubleshooting

### **Build schlägt fehl**

**Problem:** `Cannot find module 'figma:asset'`
- ✅ **Gelöst:** Alle `figma:asset` Imports wurden bereits entfernt

**Problem:** `Module not found` Fehler
- Lösung: `npm install` ausführen und erneut bauen

### **Bilder werden nicht angezeigt**

- Prüfen Sie, ob die URLs in `/src/config/assets.ts` korrekt sind
- Wenn Sie `/public` Pfade nutzen, Bilder mit `/` beginnen: `/logo.png`

### **Supabase Fehler**

- Environment Variables prüfen
- Edge Function Status prüfen: `supabase functions list`
- Logs anschauen: `supabase functions logs make-server-78b4cf15`

### **Admin-Login funktioniert nicht**

- Standard-Credentials: `admin` / `aveyo2024`
- Browser-Cache leeren
- Session-Storage prüfen (F12 → Application → Session Storage)

---

## 📧 Support

Bei Problemen:
- GitHub Issues: [Repository Issues](https://github.com/USERNAME/aveyo-website/issues)
- E-Mail: support@aveyo.de

---

**Viel Erfolg mit Ihrem Deployment! 🚀**
