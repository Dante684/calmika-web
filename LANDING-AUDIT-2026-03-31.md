# Landing Page Tartalmi Audit — 2026-03-31

## Kritikus hibák (javítandó)

### 1. 🔴 EN story: "My twin sons, Alex and Olivia"
- **Fájl:** `src/i18n/messages/en.json` → `story.quote`
- **Probléma:** "My twin sons, Alex and Olivia" — Olivia lánynév. Ha vegyes ikrekről van szó (fiú + lány), akkor "My twins" a helyes, nem "twin sons".
- **HU verzió ugyanez:** `hu.json` → `story.quote`: "Két fiamnak, Alexnek és Oliviának" — Olivia lány, tehát "Két gyerekemnek" lenne a helyes.
- **Hatás:** Hitelesség — a landing page személyes történet, ha az alap tényadat hibás, az az egész authentikusságot aláássa.

### 2. 🔴 URL inkonzisztencia: `calmika.com` vs `calmika-web.vercel.app`
- **Probléma:** Az oldal két különböző domainnevet használ vegyes módon:
  - `calmika.com`: `rss.xml/route.ts`, `sitemap.ts`, `layout.tsx` (metaBase), `blog/[slug]/page.tsx` (postUrl)
  - `calmika-web.vercel.app`: `page.tsx` (organizationSchema), `lib/seo.ts` (BASE_URL), `layout.tsx` (openGraph images), `blog/[slug]/page.tsx` (publisher logo)
- **Hatás:** SEO-károsan a canonical URL-ek keverednek, Google bot duplikátumot lát. A structured data (JSON-LD) különböző URL-eket tartalmaz.
- **Megoldás:** Egységesíteni kell. Ha `calmika.com` a végleges → mindenhol az legyen. Ha még nincs domain → `calmika-web.vercel.app` mindenhol.

### 3. 🔴 Árazás oldal: `price_pl` key hiányzik HU és EN i18n-ből
- **Fájl:** `src/app/[locale]/arazas/page.tsx` (sor ~68) → `useRegionPricing()` → `t('${tier}.price_pl')`
- **Probléma:** Ha PL locale-os user az árazás oldalra megy, a kód `pricing.pro_monthly.price_pl`-t próbálja kiolvasni. Ez a key CSAK `pl.json`-ban létezik. `hu.json` és `en.json`-ból hiányzik — de a kód bármely locale-ról elérhető a PL pricing fallback-kel.
- **Hatás:** Ha valamilyen okból PL locale fut HU/EN i18n-nel, broken text jelenik meg. Alacsony prioritás, mert normál esetben PL locale-hoz PL JSON töltődik, de a key hiánya potenciális bug.

---

## Tartalmi hiányok

### 4. ⚠️ Lifetime (örök) előfizetés nincs megjelenítve
- **Task szerint:** HU: 49 990 Ft örök | EU: €149.99 örök | US: $179.99 örök
- **Jelenlegi állapot:** Az árazás oldal CSAK Free + Pro Monthly + Pro Yearly kártyát tartalmaz. Lifetime/örök opció sehol nem jelenik meg.
- **i18n:** `common.lifetime` key létezik ("Lifetime" / "Lifetime"), de sehol nincs használva.
- **Megoldás:** Vagy hozzáadni 4. kártyaként, vagy az éves kártya alá "Lifetime opció is elérhető" felirattal.

### 5. ⚠️ AOSZ kedvezmény (50%) nincs sehol
- **Task szerint:** "AOSZ: 50% kedvezmény igazolással"
- **Jelenlegi állapot:** Sem az árazás oldalon, sem a GYIK-ben, sem sehol máshol nem szerepel AOSZ kedvezmény.
- **Megoldás:** Árazás oldalon vagy GYIK-ben említeni: "Igazolt AOSZ kedvezmény: 50%".

### 6. ⚠️ Comparison tábla: Free tier részletessége nem egyezik a valós app-pal
- **Task szerint free korlátok:**
  - Kifestő: 10 kép/kategória
  - Szótanulás: alap szavak
  - Zeneterápia: alap hangszerek
  - Napirend: 3 rutin
  - Social Stories: 5 történet
  - Kognitív játékok: napi 3
  - Kategorizáló: alap
  - Érzelmek: alap
- **Árazás oldalon megjelenő free korlátok:**
  - AAC: 80 core ✅
  - Kifestő: **3 kép** (❌ nem 10 kép/kategória!)
  - Szótanulás: **5 szó** (nem "alap szavak")
  - Zeneterápia: "Alap" (nincs pontosítva)
  - Napirend: "Alap" (nincs pontosítva, task szerint 3 rutin)
  - Érzelmek: ❌ (nullként jelenik meg, de task szerint "alap" van FREE-ben!)
  - Social Stories: ❌ (nullként jelenik meg, de task szerint 5 történet FREE-ben!)
  - Kognitív játékok: ❌ (nullként jelenik meg, de task szerint napi 3 FREE-ben!)
- **Hatás:** A comparison tábla pesszimistább a valósnál — több modult mutat 100% paywall mögöttinek, mint amennyi ténylegesen az. Ez félrevezető.

### 7. ⚠️ Hiányzó modulok a comparison táblából
- **Task szerint létezik:** Kategorizáló, Szülői Akadémia (37 cikk), Streak/XP rendszer, Összes színmód
- **Árazás comparison tábla:** Ezek egyike sem szerepel.
- **Funkciók oldalon sem:** Kategorizáló, Szülői Akadémia, Streak/XP — nincsenek külön modulként felsorolva.

### 8. ⚠️ Placeholderek a module detail oldalakon
- **`funkciok/[module]/page.tsx`:** Screenshot gallery: "Képernyőkép hamarosan" / "Screenshot coming soon" placeholder ×3 minden modulnál.
- **Hero screenshot placeholder:** Ugyanaz a "Képernyőkép hamarosan" box a hero-ban.
- **Hatás:** Prototípus feeling, nem production-ready oldal benyomását kelti.

### 9. ⚠️ Story section: fotó placeholder
- **`components/home/story-section.tsx`:** Jobb oldali kártya: "Fotó hamarosan" / "Photo coming soon" placeholder.
- **Hatás:** Hiányzó vizuális elem a legérzelmesebb szekcióban.

### 10. ⚠️ Blog post page: nincs valódi hero image
- **`blog/[slug]/page.tsx`:** Minden blogposzt hero image placeholder (gradient + SVG ikon), nincs valódi kép.

---

## Inkonzisztenciák

### 11. 🟡 AAC szavak száma eltérő helyeken
| Hol | Szám |
|---|---|
| Free card features | "AAC Lite (80 core szó)" |
| Comparison tábla free | "80 core" |
| Pro card features | "5000+ AAC szó" |
| Competitor tábla (social-proof) | "5000+" |
| Funkciók oldal hero | "30+ modul • ASD-barát • Ingyenes AAC" |
| Hero badge | "30+ modules" |
| AAC modul feature | "77 000+ ragozott alak" |
- **Probléma:** A 77 000+ ragozott alak vs 5000+ szó különbség nem magyarázott sehol. Félrevezető lehet, mert a 77K ragozott alak ~5000 szóból származik, de aki először lát 5000-et majd 77 000-et, zavarodott lesz.

### 12. 🟡 Competitor árak inkonzisztencia
- **Social proof tábla:** Proloquo2Go: "$249 (once)"
- **AAC modul detail:** Proloquo2Go: "$249/év"
- **Hatás:** Az egyik "once" (egyszeri), a másik "per év" — nagy különbség.

### 13. 🟡 App Store vs iOS elérhetőség üzenetei
- Az oldal minden CTA szekcióban konzisztensen "App Store — Coming Soon" / "Hamarosan" feliratot mutat ✅
- **DE:** A FAQ-ban: "iOS (iPhone / iPad) verzió fejlesztés alatt áll — hamarosan!" — ez OK.
- Az ÁSZF-ben: "Google Play Store vagy az App Store előfizetés-kezelő felületén" — ez implikálja, hogy App Store-on már elérhető.
- **Megoldás:** ÁSZF-ben pontosítani: "...a Google Play Store (és a jövőbeli App Store) felületén".

### 14. 🟡 Free tier kártya features: 5 elem vs comparison tábla 12 sor
- Free kártya: 5 feature bullet ("AAC Lite (80 core)", "Nyugi Sarok (teljes)", "3 kifestő kép", "5 szótanulás szó", "Alapvető napirend")
- Comparison tábla: 12 sor, ahol 6-ot ❌-nak mutat a free-nél
- **De:** A task szerint Érzelmek, Social Stories, Kognitív játékok IS van free-ben (korláttal)!

### 15. 🟡 Avaz: "Hungarian: ✅" a social proof táblában
- A social-proof-section.tsx competitor data-ban Avaz-nál `hungarian: "yes"` van beállítva.
- **Tényleg igaz ez?** Avaz támogat magyart? Ha nem, akkor hamis competitive claim.

---

## i18n problémák

### 16. 🔴 Hardcoded magyar szöveg rolunk-client.tsx-ben
- **Fájl:** `src/app/[locale]/rolunk/rolunk-client.tsx`
- **Érintett sorok:**
  - Sor ~207: `"A kommunikáció emberi jog, nem luxus."` (gold quote card)
  - Sor ~244: `"Két diagnózis egyszerre. Hegy a láthatáron, és nincs térkép."` (timeline quote)
  - Sor ~252: `"Hajnali 3-kor kódolok. Soronként. Értük."` (timeline quote)
  - Sor ~260: `"Egy kommunikációs gombból egy neurodiverzitás-ökoszisztéma lett."` (timeline quote)
  - Sor ~268: `"Globális hatás, helyi és személyes szívvel."` (timeline quote)
- **Hatás:** EN locale-on is magyarul jelennek meg ezek a quote-ok. Nincs i18n, nincs `t()` hívás.

### 17. 🔴 Hardcoded magyar szöveg blog/[slug]/page.tsx-ben
- **Fájl:** `src/app/[locale]/blog/[slug]/page.tsx`
- **Érintett sorok:**
  - Sor ~221: `"Calmika alapítója. Édesapja egy autizmus spektrumon élő kisfiúnak..."` (author bio box)
  - Sor ~275: `"Google Playen letölthető"` (CTA gomb)
- **Hatás:** EN blog posztokban is magyar szöveg jelenik meg az author bio-ban és a CTA gombban.

### 18. 🟡 Funkciók oldal (funkciok/page.tsx): inline i18n `isHu ?` pattern
- **Fájl:** `src/app/[locale]/funkciok/page.tsx`
- **Probléma:** Az egész oldal `isHu ? 'HU text' : 'EN text'` ternary-kkel oldja meg a fordítást, nem JSON i18n key-ekkel. Ez:
  1. Nem skálázik PL locale-ra (mindig EN-t kap PL user)
  2. Nem konzisztens a többi oldallal

### 19. 🟡 Funkciók module detail (funkciok/[module]/page.tsx): ugyanaz az `isHu ?` pattern
- Teljes oldal: ~30 helyen `isHu ? 'HU' : 'EN'` ternary
- PL felhasználó angol szöveget kap a magyar route-on

### 20. 🟡 Beta oldal metadata: PL-specifikus inline fordítás, de nem i18n JSON-ból
- **Fájl:** `src/app/[locale]/beta/page.tsx` → `generateMetadata()`
- PL-hez: `locale === 'pl' ? 'Program beta' : 'Beta program'` — ez működik, de nem konzisztens a többi oldallal, ahol i18n JSON-ból jön.

### 21. 🟡 Funkciók meta: inline fordítás, nem `getTranslations()`
- **Fájl:** `src/app/[locale]/funkciok/page.tsx` → `generateMetadata()`
- `isHu ? 'Funkciók' : 'Features'` — nem i18n JSON-ból.

---

## Free vs Premium tábla javaslat

Az alábbi tábla a task-ban kapott pontos free/premium szabályokat tükrözi. **Beilleszthető az árazás oldalra a jelenlegi comparison tábla helyett.**

### Magyar verzió

| Funkció | 🆓 Ingyenes | ⭐ Pro |
|---|---|---|
| **AAC Kommunikáció** | ✅ 80 core szó (MINDIG INGYENES) | ✅ 5000+ szó, ragozás, predikció |
| **Nyugi Sarok** | ✅ Teljes (MINDIG INGYENES) | ✅ Teljes |
| **Kifestő** | 10 kép / kategória | ✅ 110+ kép, összes kategória |
| **Szótanulás & ABC** | Alap szavak | ✅ 757 szó, dual language |
| **Zeneterápia** | Alap hangszerek | ✅ 6 almodul, 15 hangszer |
| **Vizuális Napirend** | 3 rutin | ✅ Korlátlan rutin + sablonok |
| **Szociális Történetek** | 5 történet | ✅ 20+ történet + saját készítő |
| **Kognitív Játékok** | Napi 3 játék | ✅ Korlátlan játék |
| **Kategorizáló** | Alap | ✅ Teljes |
| **Érzelmek & Zones** | Alap | ✅ Teljes + napló |
| **Szülői Akadémia** | ❌ | ✅ 37 szakcikk |
| **Nyomtatható anyagok** | ❌ | ✅ 86 sablon |
| **Részletes riportok** | ❌ | ✅ Heti/havi PDF |
| **Streak/XP rendszer** | ❌ | ✅ Motivációs rendszer |
| **Összes színmód** | Alapértelmezett | ✅ 4 mód (vivid/calm/clean/highContrast) |
| **Offline mód** | ✅ | ✅ |
| **Reklám** | ❌ Nincs | ❌ Nincs |

**Árak:**
| Régió | Havi | Éves | Örök (Lifetime) |
|---|---|---|---|
| 🇭🇺 Magyarország | 1 990 Ft/hó | 14 990 Ft/év | 49 990 Ft |
| 🇪🇺 EU | €5,99/hó | €49,99/év | €149,99 |
| 🇺🇸 US | $7,99/hó | $59,99/év | $179,99 |
| 🇵🇱 Lengyelország | 39,99 PLN/hó | 399,99 PLN/év | — |

> 🏷️ **AOSZ kedvezmény:** Autizmus Országos Szövetség igazolással **50% kedvezmény** minden csomagra.

### English version

| Feature | 🆓 Free | ⭐ Pro |
|---|---|---|
| **AAC Communication** | ✅ 80 core words (ALWAYS FREE) | ✅ 5000+ words, inflection, prediction |
| **Calm Corner** | ✅ Full (ALWAYS FREE) | ✅ Full |
| **Coloring** | 10 images / category | ✅ 110+ images, all categories |
| **Vocabulary & ABC** | Basic words | ✅ 757 words, dual language |
| **Music Therapy** | Basic instruments | ✅ 6 sub-modules, 15 instruments |
| **Visual Schedule** | 3 routines | ✅ Unlimited routines + templates |
| **Social Stories** | 5 stories | ✅ 20+ stories + custom creator |
| **Cognitive Games** | 3 games / day | ✅ Unlimited games |
| **Categorization** | Basic | ✅ Full |
| **Emotions & Zones** | Basic | ✅ Full + journal |
| **Parent Academy** | ❌ | ✅ 37 expert articles |
| **Printable Materials** | ❌ | ✅ 86 templates |
| **Detailed Reports** | ❌ | ✅ Weekly/monthly PDF |
| **Streak/XP System** | ❌ | ✅ Motivation system |
| **All Color Modes** | Default | ✅ 4 modes (vivid/calm/clean/high contrast) |
| **Offline Mode** | ✅ | ✅ |
| **Ads** | ❌ None | ❌ None |

---

## Kisebb észrevételek

### 22. 💡 QR code placeholder a letöltés oldalon
- **Fájl:** `src/app/[locale]/letoltes/letoltes-client.tsx`
- "QR" feliratú dashed border placeholder box — nincs valódi QR kód.

### 23. 💡 Testimonials placeholder
- **Fájl:** `socialProof` i18n → `testimonials.placeholder`: "Hamarosan béta tesztelői vélemények..."
- A social proof szekció NEM rendereli a testimonials-t (a kód csak a stats + comparison table-t jeleníti meg), de az i18n key ott van.

### 24. 💡 Blog author bio: "Édesapja egy autizmus spektrumon élő kisfiúnak"
- "kisfiúnak" szó — Alex és Olivia ikrekről van szó, nem egyetlen kisfiúról.
- **Hatás:** Inkonzisztens a story szekciókkal ("ikrek").

### 25. 💡 Terapeuta Form + Beta Form + Kapcsolat Form: mailto fallback
- Mindhárom form `mailto:` linket nyit submit-ra, nem valódi backend-et hív.
- Ez nem bug per se, de érdemes tudni: mobilon a mailto nem mindig működik jól, és a "Success" üzenet megjelenik még mielőtt a user tényleg elküldte volna az emailt.

### 26. 💡 Blog post URL mismatch
- `blog/[slug]/page.tsx` sor ~75: `const postUrl = 'https://calmika.com/${locale}/blog/${slug}'`
- Ez `calmika.com`-ot használ, de a JSON-LD publisher logo `calmika-web.vercel.app`-ot → inkonzisztens structured data.

### 27. 💡 Organizáció schema: `sameAs: []` (üres array)
- **Fájl:** `page.tsx` → `organizationSchema`
- Nincs kitöltve social media link (Facebook, Reddit pedig van a footer-ben).

### 28. 💡 Features section: "Szótanulás & ABC" — 757 szó vagy "5 szó" free-ben
- A funkciók oldalon "757 szó" van kiírva, de free-ben csak 5 szó érhető el. A 757 a PRO szám — de a feature card-on nem jelzi, hogy ez Pro feature.

### 29. 💡 "30+" modul számolás
- Module-data.ts: 10 modul van definiálva (aac, napirend, erzelmek, szocialis, szotanulas, zeneterpia, kifesto, nyugi-sarok, jatekok, szuloi-zona)
- A landing page mindenhol "30+ modult" kommunikál
- Ez valószínűleg almodulokkal együtt értendő (zeneterápia 6 almodul, stb.), de a funkciók oldalon csak 10 modul card jelenik meg → zavaró lehet.

### 30. 💡 Nyugi Sarok competitor összehasonlítás a module detail-on
- `funkciok/[module]/page.tsx` sor ~206: "Más app-okban (pl. Headspace Kids) ez $12.99/hó-ba kerül."
- Sor ~209: "Calmiká-ban: ingyenesen kipróbálható, Pro-ban teljes hozzáféréssel."
- **DE** a Nyugi Sarok MINDIG INGYENES (nem "kipróbálható" hanem "örökre free"). A speciális badge csak `moduleKey === 'nyugi-sarok'` esetén jelenik meg, de az általános szöveg félrevezető.

### 31. 💡 Footer: social link-ek (Facebook, Reddit) nincsenek a schema.org `sameAs`-ban
- Az organizáció schema `sameAs: []` üres, de a kapcsolat oldalon és footerben van Facebook (`facebook.com/calmika`) és Reddit (`reddit.com/r/calmika`) link.

### 32. 💡 PL locale: Lifetime opció hiányzik
- Task: "PL: 39.99 PLN/hó | 399.99 PLN/év (nincs örök?)"
- Tényleg nincs lifetime a PL i18n-ben — ha ez szándékos, OK, de érdemes dokumentálni.
