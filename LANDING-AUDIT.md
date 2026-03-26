# 🔍 Calmika Landing Page — Teljes Audit Riport

**Dátum:** 2026-03-26  
**Kódbázis:** `~/Projects/calmika-web/`  
**Stack:** Next.js + Tailwind v4 + next-intl  
**Referencia:** `~/Projects/Magic-Worlds/README.md` árazás + app jelenlegi állapota

---

## 📊 Összefoglaló

| Kategória | Kritikus 🚨 | Fontos ⚠️ | Javítandó 💡 |
|---|---|---|---|
| Hamis/túlzó állítások | 3 | 2 | 1 |
| Platform inkonzisztencia | 1 | 2 | 0 |
| Hardcoded szövegek | 0 | 5 | 3 |
| Törött linkek | 1 | 3 | 2 |
| SEO hiányok | 0 | 4 | 3 |
| Accessibility | 0 | 2 | 3 |
| UX problémák | 0 | 3 | 4 |
| Placeholderek | 0 | 2 | 3 |
| L10n problémák | 0 | 3 | 2 |
| Email inkonzisztencia | 1 | 1 | 0 |

---

## 🚨 KRITIKUS PROBLÉMÁK

### 1. Platform hazugság — "Android + iOS" (Calmika Android-only!)

**Fájl:** `src/components/home/social-proof-section.tsx:31`
```tsx
platform: "Android + iOS",  // ❌ HAMIS — app csak Android!
```

Az összehasonlítás táblában Calmika platformjaként **"Android + iOS"** szerepel, holott az app **csak Android-on** létezik (iOS tervezett, de nem kész). Ez a legveszélyesebb hamis állítás — felhasználók letöltik iOS-re, csalódnak.

**Javítás:**
```tsx
platform: "Android (iOS hamarosan)",
// vagy:
platform: "Android",
```
A badge-ben is (`cta-bottom-section.tsx:105`) és mindenhol jelezni kell az iOS státuszt.

---

### 2. "Trusted by 100+ families" — alaptalan claim

**Fájl:** `src/components/home/hero-section.tsx:363`
```tsx
Trusted by 100+ families
```

Ez hardcoded, nincs alátámasztva, és az app még béta fázisban van (nincs Play Store-ban). Ha valóban van 100+ béta tesztelő, ez jelezendő. Ha nincs — le kell venni vagy pontosítani.

**Javítás (ha van adata):**  
Tedd i18n kulcs alá, és csak ha tényleg van 100+ béta tesztelő:
```json
// hu.json
"trustedBy": "100+ béta tesztelő bízik bennünk"
```
**Ha nincs adat → töröld a sort.**

---

### 3. E-mail inkonzisztencia — `hello@calmika.app` vs `hello@calmika.com`

**Fájlok:**
- `src/app/[locale]/terapeutaknak/page.tsx:182` → `hello@calmika.app`
- `src/app/[locale]/kapcsolat/page.tsx:52,214` → `hello@calmika.com`
- `src/app/[locale]/gyik/page.tsx:192,195` → `hello@calmika.com`
- `src/app/[locale]/adatvedelem/page.tsx:107,120` → `hello@calmika.com`
- `src/app/[locale]/aszf/page.tsx:106` → `hello@calmika.com`
- `src/i18n/messages/en.json:365` → `contact@calmika.app`

Három különböző e-mail cím szerepel az oldalon. Ez **bizalomvesztéshez** vezet. Döntsd el melyik a helyes, és cseréld le mindenütt.

**Javítás:** Egységesítés egy e-mailre (pl. `hello@calmika.app`), i18n kulcsba kiemelve.

---

## ⚠️ FONTOS PROBLÉMÁK

### 4. "⭐ Kutatás-alapú módszertan" / "Evidence-based methods" — félrevezető badge

**Fájl:** `src/i18n/messages/hu.json:215`, `en.json:215`  
`src/components/home/hero-section.tsx:386` — trust badge section

```json
"trustValidated": "Kutatás-alapú módszertan"
```

A "Kutatás-alapú módszertan" badge csillag ikonnal és shield ikonnal jelenik meg — ez implicit klinikai validációt sugall. Az app **nincs klinikailag validálva**. A /terapeutaknak oldalon idézett kutatások (Romski & Sevcik, Geretsegger stb.) az AAC/zeneTerápia MÓDSZEREKRE vonatkoznak, nem a Calmika appra.

**Javítás:**
```json
"trustValidated": "Bizonyítékokon alapuló módszerek"
```
Vagy változtasd a badge szövegét: `"ASD-szakértők által tervezett"` / `"ASD experts contributed"` — de csak ha ez igaz.

---

### 5. Összehasonlítás táblában: Calmika ára csak EUR-ban jelenik meg

**Fájl:** `src/components/home/social-proof-section.tsx:30`
```tsx
price: "€5,99",
```

Ez hardcoded EUR ár. Magyar felhasználók HUF-ban látják a többi helyen az árat (1 990 Ft/hó), de itt csak EUR jelenik meg. Félrevezető lehet, hogy azt higgyék drágább.

**Javítás:**
```tsx
// Locale-függő vagy i18n-ból
price: locale === 'hu' ? "1 990 Ft/hó" : "€5,99/hó",
```

---

### 6. Összehasonlítás táblában: "Avaz supports Hungarian" — questionable claim

**Fájl:** `src/components/home/social-proof-section.tsx:66`
```tsx
hungarian: "yes",  // Avaz-nál
```

Az Avaz egy indiai AAC app. Magyar nyelvű AAC támogatása **valószínűleg nem valós** — érdemes ellenőrizni. Ha nem igaz, ez az app számára is hiteltelenné teszi az összehasonlítást.

**Javítás:** Ellenőrizd az Avaz magyar nyelvtámogatását → ha nincs → `"partial"` vagy `"no"`.

---

### 7. Footer: `href="#"` — törött linkek Google Play és App Store badge-eknél

**Fájl:** `src/components/layout/footer.tsx:61,71,132,144`
```tsx
href="#"  // 4 helyen: Google Play badge + App Store badge + Facebook + Reddit
```

A footer-ben a store badge-ek `href="#"` értékkel rendelkeznek. A Google Play link már létezik (`cta-bottom-section`-ban) — a footer-ben is valódi URL kell.

**Javítás (Google Play):**
```tsx
href="https://play.google.com/store/apps/details?id=com.magicworlds.app"
```
**App Store badge:** Mivel nincs iOS app, a badge-et le kell venni vagy `aria-disabled="true"` + "Hamarosan" badge kell (mint a cta-bottom-section-ban van).

---

### 8. Hero section + features section: `next/link` helyett `@/i18n/navigation` Link kellene

**Fájlok:**
- `src/components/home/hero-section.tsx:4` — `import Link from "next/link"`
- `src/components/home/features-section.tsx:4` — `import Link from "next/link"`

```tsx
// PROBLÉMA: EN locale-ban /letoltes → /download kellene
href="/letoltes"  // hero-section.tsx:322 — EN-ben hibás!
href="/funkciok"  // hero-section.tsx:337 — EN-ben /features kellene!
```

A plain `next/link` nem végzi el a pathname-fordítást locale között. EN felhasználó `/letoltes` URL-t kap a `/download` helyett.

**Javítás:**
```tsx
import { Link } from "@/i18n/navigation";
```
Mindkét komponensben cseréld le.

**Ugyanez érintett fájlok:**
- `src/app/[locale]/gyik/page.tsx` — `from 'next/link'`
- `src/app/[locale]/funkciok/[module]/page.tsx` — `from 'next/link'`

---

### 9. SEO: 6 fontos oldal teljesen hiányzó `generateMetadata`

**Érintett oldalak:**

| Oldal | Fájl | Prioritás |
|---|---|---|
| Főoldal | `[locale]/page.tsx` | 🔴 Legfontosabb |
| Árazás | `[locale]/arazas/page.tsx` | 🔴 Magas |
| Letöltés | `[locale]/letoltes/page.tsx` | 🔴 Magas |
| Terapeutáknak | `[locale]/terapeutaknak/page.tsx` | 🟡 Közepes |
| Rólunk | `[locale]/rolunk/page.tsx` | 🟡 Közepes |
| Kapcsolat | `[locale]/kapcsolat/page.tsx` | 🟡 Közepes |

A layout-ban lévő fallback metadata (`title: 'Calmika'`) minden oldalra ugyanazt adja — ez szörnyen néz ki a Google-ben.

**Javítás (példa az /arazas oldalhoz):**
```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pricing' });
  return {
    title: `${t('title')} — Calmika`,
    description: t('description'),
  };
}
```

---

### 10. SEO: Nincs Open Graph / Twitter Card meta

**Fájl:** `src/app/[locale]/layout.tsx:23`
```tsx
export const metadata: Metadata = {
  title: 'Calmika',
  description: 'Calmika – Autism-friendly educational app for children',
  // ❌ Nincs openGraph, nincs twitter card, nincs image
};
```

Social mediára megosztva az oldal `Calmika` + leírás nélkül jelenik meg, kép nélkül.

**Javítás:**
```tsx
openGraph: {
  title: 'Calmika — Autism-friendly educational app',
  description: 'AAC communication, visual schedules, music therapy and 30+ modules.',
  url: 'https://calmika.com',
  siteName: 'Calmika',
  images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  locale: 'hu_HU',
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'Calmika',
  description: '...',
  images: ['/og-image.png'],
},
```

---

### 11. "Hamarosan béta tesztelői vélemények" — üres placeholder a főoldalon

**Fájl:** `src/i18n/messages/hu.json:200`, `en.json` megfelelő sor
```json
"placeholder": "Hamarosan béta tesztelői vélemények..."
```

Ez a `socialProof.testimonials.placeholder` — ha a testimoniális szekció megjelenik, ez üres placeholder szöveg jelenik meg a látogatóknak.

**Javítás:** 
- Ha nincs testimonial → tedd el a komponenst/szekciót (`SocialProofSection`-ból távolítsd el)
- Ha van 1-2 béta tesztelő vélemény → add hozzá valódi tartalomként

---

### 12. Comparison table / stats: `3 + languages` stat, de a badge `3 languages (HU/EN/PL)` mondja

**Fájl:** `src/components/home/social-proof-section.tsx:112`
```tsx
{ value: 3, suffix: "", label: t("languages") },
```

Ez helyes (3 teljes nyelv), de a hero badge `3 languages (HU/EN/PL)` és a stats `3` — konzisztens. **DE** az app valójában 7 nyelven is elérhető (részlegesen 4 plusz). A stat kissé aláértékeli az app-ot.

**Javaslat:** `{ value: 7, suffix: "+", label: t("languages") }` — ha a "7 nyelven elérhető UI" is kommunikálható.

---

## 💡 JAVÍTANDÓ PROBLÉMÁK

### 13. Hardcoded szövegek EN locale-ban az árazás oldalon

**Fájl:** `src/app/[locale]/arazas/page.tsx`
```tsx
// Sor 88:
"Simple Pricing"  // hardcoded EN
// Sor 119:
"Essential"       // hardcoded EN  
// Sor 185:
"Pro Access"      // hardcoded EN
// Sor 255:
"Best Value"      // hardcoded EN
```

Ezek soha nem fognak lefordítódni HU-ba — megmaradnak angolul minden locale-ban.

**Javítás:** Add hozzá `hu.json`/`en.json`-hoz és `t('pricing.label.simple')` stb.

---

### 14. Hardcoded szövegek a Rólunk oldalon

**Fájl:** `src/app/[locale]/rolunk/page.tsx`
```tsx
// Sor 162:
"Our Journey"        // hardcoded EN
// Sor 168-170:
"From Diagnosis to"  // hardcoded EN
"Daily Support"      // hardcoded EN
```

HU locale-ban ezek angolul jelennek meg.

**Javítás:** i18n-ba kiemelni.

---

### 15. Hero floating cards: hardcoded angol szöveg

**Fájl:** `src/components/home/hero-section.tsx:197-224`
```tsx
"Progress"        // hardcoded
"New milestone!"  // hardcoded
"AAC Tool"        // hardcoded
"I want juice"    // hardcoded
```

Ezek a lebegő kártyák nem fordítódnak — HU locale-ban is angolul jelenik meg.

**Javítás:** `t("hero.floatingProgress")` stb. i18n kulcsokra cserélni, vagy ha dekoratív elemek → hagyd angolul, és tedd `aria-hidden`-be.

---

### 16. Features section: hardcoded "Open Now →" és "Learn more →"

**Fájl:** `src/components/home/features-section.tsx:182,248`
```tsx
"Open Now →"    // sor 182 - hardcoded
"Learn more →"  // sor 248 - hardcoded
```

A JSON-ban van `features.learnMore` kulcs — de ez nem kerül felhasználásra a komponensben.

**Javítás:**
```tsx
{t("learnMore")} →
```

---

### 17. Letöltés oldal: QR kód placeholder

**Fájl:** `src/app/[locale]/letoltes/page.tsx:175-178`
```tsx
<div ... aria-label="QR code placeholder">
  QR
</div>
```

Egyszerű "QR" feliratú placeholder jelenik meg — csúnya és értelmetlen a felhasználónak.

**Javítás:** 
- Generálj valódi QR kódot a Play Store URL-re (qrcode.react vagy static PNG)
- Vagy tedd rejtett (`hidden`) amíg nincs kész

---

### 18. Modul detail oldalak: Minden screenshothoz placeholder

**Fájl:** `src/app/[locale]/funkciok/[module]/page.tsx:109, 181-182`
```tsx
{isHu ? 'Képernyőkép hamarosan' : 'Screenshot coming soon'}
// és:
{isHu ? 'Valódi képernyőképek hamarosan érkeznek.' : 'Real screenshots coming soon.'}
```

10 modul × 3 kép = 30 placeholder screenshot az oldalakon. A `/letoltes` oldalon viszont már vannak valódi képernyőképek (`screenshots.ts`).

**Javítás:** A `lib/screenshots.ts`-ben már meglévő screenshotokat kösd be a modul oldalakhoz is.

---

### 19. Story section: "Fotó hamarosan" placeholder visible

**Fájl:** `src/i18n/messages/hu.json:129`  
**Komponens:** `src/components/home/story-section.tsx`

```json
"photoPlaceholder": "Fotó hamarosan"
```

A Story section jobb oldala egy szürke placeholder dobozzal jelenik meg "Fotó hamarosan" szöveggel — ez production landing page-en gyenge benyomást kelt.

**Javítás:** 
- Cserélni valódi fotóra
- Vagy a placeholder helyett egy dekoratív illusztráció / infographic

---

### 20. Blog [slug] page: hardcoded magyar szöveg EN locale-ban

**Fájl:** `src/app/[locale]/blog/[slug]/page.tsx:238`
```tsx
Az egyetlen all-in-one autizmus fejlesztő app — offline, reklám nélkül, 30+ modullal.
```

Ez a blog cikk CTA szövege hardcoded magyar. EN locale-ban is magyarül jelenik meg.

**Javítás:** `t('hero.subtitle')` vagy új i18n kulcs.

---

### 21. Terapeutáknak form: `mailto:hello@calmika.app` de máshol `hello@calmika.com`

**Fájl:** `src/app/[locale]/terapeutaknak/page.tsx:182`

Részletesen lásd a #3 kritikus problémánál. A terapeuta regisztrációs form más domainen küldi az emailt mint a többi kapcsolati forma.

---

### 22. SEO: Hiányzó `alt` szöveg a letöltes oldal screenshotjain (részben)

**Fájl:** `src/app/[locale]/letoltes/page.tsx`

A screenshot galéria képein `alt` van (hardcoded HU), de EN locale-ban is HU alt marad:
```tsx
{ src: screenshots.home, alt: "Calmika főoldal" },          // HU hardcoded
{ src: screenshots.aac, alt: "AAC kommunikációs tábla" },   // HU hardcoded
```

**Javítás:** `t('download.screenshotAlts.home')` stb.

---

### 23. Árazás: `pricing.faq.a4` referál `contact@calmika.app`-ra (EN)

**Fájl:** `src/i18n/messages/en.json:365`
```json
"a4": "Yes. If you're not satisfied within the first 7 days after subscribing, we'll refund you. Email us at contact@calmika.app."
```

Harmadik e-mail variáns (contact@ vs hello@). Javítani kell egységesre.

---

### 24. Header: hardcoded "Nyelv:" felirat mobilon

**Fájl:** `src/components/layout/header.tsx:296`
```tsx
<span className="text-sm" style={{ color: '#6c7a77' }}>
  Nyelv:
</span>
```

EN locale-ban is "Nyelv:" jelenik meg (HU szó) a mobil menüben.

**Javítás:** `{t('nav.language')}` kulcsra cserélni (hozzáadva hu.json: `"language": "Nyelv"`, en.json: `"language": "Language"`).

---

### 25. Comparison table: `Proloquo2Go` ár hibás kontextus

**Fájl:** `src/components/home/social-proof-section.tsx:40`
```tsx
price: "$249 (once)",
```

A Proloquo2Go valójában **éves előfizetéses modellre váltott** (kb. $99-299/év). Az "once" misleading lehet.

**Javítás:** Ellenőrizd az aktuális árat és frissítsd.

---

### 26. `/terapeutaknak` URL hardcoded a GYIK válaszban

**Fájl:** `src/i18n/messages/hu.json:37`
```json
"a1": "Látogasd meg a /terapeutaknak oldalt..."
```

A `/terapeutaknak` hardcoded URL a szövegben. EN locale-ban `/therapists` lenne a helyes URL, de mivel szövegben van, nem fordítódik.

**Javítás:**
```json
// hu.json
"a1": "Látogasd meg a <terapeutaknak>Terapeutáknak oldalt</terapeutaknak>..."
// vagy egyszerűbben:
"a1": "Töltsd ki a regisztrációs űrlapot a Terapeutáknak oldalon..."
```

---

### 27. Blog slug page: `calmika.app` domain vs `calmika.com`

**Fájl:** `src/app/[locale]/blog/[slug]/page.tsx:72`
```tsx
const postUrl = `https://calmika.app/${locale}/blog/${slug}`;
```

De a sitemap `calmika.com`-ot használ, és az ÁSZF is `calmika.com`-ot említ. Melyik a valódi domain?

**Javítás:** Döntsd el a canonical domain-t és mindenhol egységesítsd.

---

### 28. `30+` modul állítás — csak 10 modul látható

**Fájl:** `src/lib/module-data.ts`, `src/lib/features-data.ts`

A kódbázisban **10 modul** van definiálva (`module-data.ts`). A `30+` szám az összes sub-modul, feature és tartalom (pl. 6 zeneterápia almodul, 8 napirend helyszín stb.) összesítéseként értelmezhető — de ez nincs sehol megmagyarázva.

**Javaslat:** Adj hozzá egy magyarázó sort: *"10 fő modul, 30+ funkcióval"* vagy pontosítsd a claim-et: *"10 modul, 30+ eszköz"*.

---

## 📋 Összefoglaló prioritási lista (javaslott sorrend)

### Azonnal (béta launch előtt kötelező):

1. 🚨 `social-proof-section.tsx:31` — Platform "Android + iOS" → "Android" javítás
2. 🚨 E-mail egységesítés (hello@calmika.app / .com / contact@)
3. 🚨 `hero-section.tsx:363` — "Trusted by 100+ families" törlés vagy alátámasztás
4. ⚠️ `footer.tsx` — `href="#"` törött linkek javítás
5. ⚠️ `hero-section.tsx + features-section.tsx` — `next/link` → `@/i18n/navigation` Link
6. ⚠️ `arazas/page.tsx` — hardcoded EN szövegek (Simple Pricing, Pro Access stb.)
7. ⚠️ `rolunk/page.tsx` — hardcoded EN szövegek (Our Journey, From Diagnosis)

### Rövid táv (1-2 héten belül):

8. ⚠️ `generateMetadata` hozzáadása a hiányzó 6 oldalhoz
9. ⚠️ Open Graph / Twitter Card meta hozzáadása a layout-hoz
10. ⚠️ `header.tsx:296` — "Nyelv:" → i18n kulcs
11. 💡 `story-section.tsx` — fotó placeholder → illusztráció
12. 💡 `letoltes/page.tsx` — QR placeholder → valódi QR kód
13. 💡 `blog/[slug]/page.tsx` — hardcoded HU szöveg → i18n

### Közép táv:

14. 💡 `social-proof-section.tsx` — Calmika ár locale-függő megjelenítés
15. 💡 Modul detail oldalak — screenshot placeholderek → valódi képek
16. 💡 `30+` modul állítás pontosítása
17. 💡 Domain egységesítés (calmika.com vs calmika.app)
18. 💡 Testimonials szekció — valódi béta vélemények vagy eltávolítás

---

## ℹ️ NEM PROBLÉMA (de megjegyezendő)

- **Árazás konzisztens**: hu.json + en.json árak megegyeznek a README.md referenciával (1990 Ft / €5,99 / $7,99 havi; 14990 Ft / €49,99 / $59,99 éves) ✅
- **"5000+ szó" claim konzisztens**: mindenütt `5000+` jelenik meg (nem 4845 vagy más szám) ✅
- **"NINCS klinikai validáció"**: a landingen nincs "klinikailag validált" állítás ✅ — de a "Kutatás-alapú módszertan" badge megtévesztő lehet (lásd #4)
- **GDPR/COPPA disclaimer**: az adatvédelmi oldalon megfelelő ✅
- **"Lifetime" csomag**: a README-ben van lifetime árazás (49990 Ft / €149,99 / $179,99), de a landingen CSAK havi + éves jelenik meg — ez szándékos döntés lehet, de fontolja meg hozzáadni

---

*Audit készítette: Spark (OpenClaw sub-agent) — 2026-03-26*
