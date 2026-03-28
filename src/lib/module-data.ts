export type ModuleKey =
  | 'aac'
  | 'napirend'
  | 'erzelmek'
  | 'szocialis'
  | 'szotanulas'
  | 'zeneterpia'
  | 'kifesto'
  | 'nyugi-sarok'
  | 'jatekok'
  | 'szuloi-zona';

export type ModuleCategory =
  | 'communication'
  | 'learning'
  | 'sensory'
  | 'parental';

export interface ModuleData {
  icon: string;
  category: ModuleCategory;
  huName: string;
  enName: string;
  huDesc: string;
  enDesc: string;
  huFeatures: string[];
  enFeatures: string[];
  huSteps: string[];
  enSteps: string[];
  competitors: { app: string; price: string };
  related: ModuleKey[];
}

export const moduleData: Record<ModuleKey, ModuleData> = {
  aac: {
    icon: 'MessageSquare',
    category: 'communication',
    huName: 'AAC Kommunikáció',
    enName: 'AAC Communication',
    huDesc:
      'Augmentatív és Alternatív Kommunikációs tábla 5000+ szóval, predikciós sávval és drag-and-drop szerkesztővel — hogy minden gyerek megtalálja a hangját.',
    enDesc:
      'Augmentative and Alternative Communication board with 5000+ words, prediction bar and drag-and-drop editor — so every child can find their voice.',
    huFeatures: [
      '77 000+ ragozott alak (HU + EN + PL) — valódi mondatok, nem csak szavak',
      'Predikciós motor 330+ szabállyal — okos mondatépítés',
      'Fitzgerald Key színkódolás (PCS szabvány)',
      'Drag-and-drop tábla szerkesztő — teljes testreszabás',
      'Vera TTS (ElevenLabs) — természetes, sóhajmentes hang',
      'Szituációs sablonok (8 helyszín: otthon, iskola, orvos…)',
    ],
    enFeatures: [
      '77,000+ inflected forms (HU + EN + PL) — real sentences, not just word grids',
      'Prediction engine with 330+ rules — smart sentence building',
      'Fitzgerald Key color coding (PCS standard)',
      'Drag-and-drop board editor — full customization',
      'Vera TTS (ElevenLabs) — natural, sigh-free voice',
      'Situational templates (8 locations: home, school, doctor…)',
    ],
    huSteps: [
      'Válassz témát vagy keress szót a keresőben',
      'Érintsd meg a szavakat — az app kimondja hangosan',
      'Építs mondatokat a predikciós sávval egyetlen érintéssel',
    ],
    enSteps: [
      'Choose a topic or search for a word',
      'Tap the words — the app speaks them aloud',
      'Build sentences with the prediction bar in one tap',
    ],
    competitors: { app: 'Proloquo2Go', price: '$249/év' },
    related: ['napirend', 'szocialis'],
  },

  napirend: {
    icon: 'Calendar',
    category: 'learning',
    huName: 'Vizuális Napirend',
    enName: 'Visual Schedule',
    huDesc:
      'Képes vizuális napirend, amely segít az ASD gyerekeknek megérteni a nap menetét — kiszámíthatóság, rutin, biztonság.',
    enDesc:
      'Picture-based visual schedule that helps ASD children understand the flow of the day — predictability, routine, safety.',
    huFeatures: [
      'Vizuális napirend képkártyákkal (drag-and-drop sorrend)',
      'Rutin sablonok: reggel, iskolai nap, lefekvés',
      'First-Then tábla (előbb–aztán vizualizáció)',
      'Aktivitásonkénti visszaszámlálás timer',
      'Offline működés — internet nélkül is tökéletes',
      'Szülői módból egyszerűen szerkeszthető',
    ],
    enFeatures: [
      'Visual schedule with picture cards (drag-and-drop order)',
      'Routine templates: morning, school day, bedtime',
      'First-Then board (before-after visualization)',
      'Per-activity countdown timer',
      'Offline mode — works perfectly without internet',
      'Easily editable from parent mode',
    ],
    huSteps: [
      'Válassz egy sablon napirendet vagy hozz létre sajátot',
      'Húzd a képkártyákat a kívánt sorrendbe',
      'Mutasd meg a gyereknek — pipa, ha kész egy feladat',
    ],
    enSteps: [
      'Choose a template schedule or create your own',
      'Drag the picture cards into the desired order',
      'Show the child — checkmark when a task is done',
    ],
    competitors: { app: 'ChoiceWorks', price: '$6.99' },
    related: ['aac', 'erzelmek'],
  },

  erzelmek: {
    icon: 'Heart',
    category: 'learning',
    huName: 'Érzelmek & Zones',
    enName: 'Emotions & Zones',
    huDesc:
      'Érzelemfelismerés, Zones of Regulation keretrendszer és érzelem-napló — hogy a gyerek megismerje és kezelni tudja saját érzéseit.',
    enDesc:
      'Emotion recognition, Zones of Regulation framework and emotion journal — so the child can understand and manage their own feelings.',
    huFeatures: [
      'Érzelemkártyák illusztrációkkal és nevekkel',
      'Zones of Regulation: kék, zöld, sárga, piros zóna',
      'Érzelem-hőmérő (intenzitás skála 1–10)',
      'Napi érzelem-napló szülői megtekintéssel',
      'Szociális szituációk és érzelem-felismerési feladatok',
      'Offline is teljes mértékben elérhető',
    ],
    enFeatures: [
      'Emotion cards with illustrations and names',
      'Zones of Regulation: blue, green, yellow, red zone',
      'Emotion thermometer (intensity scale 1–10)',
      'Daily emotion journal with parent view',
      'Social situations and emotion recognition tasks',
      'Fully available offline',
    ],
    huSteps: [
      'Nézd meg az érzelemkártyákat és találd meg, hogyan érzed magad',
      'Mutasd meg a Zones of Regulation táblán az érzésed zónáját',
      'Írd be a naplóba, mi történt — és mit segített',
    ],
    enSteps: [
      'Look at the emotion cards and find how you feel',
      'Show your feeling zone on the Zones of Regulation board',
      'Write in the journal what happened — and what helped',
    ],
    competitors: { app: 'Zones of Regulation App', price: '$7.99' },
    related: ['napirend', 'nyugi-sarok'],
  },

  szocialis: {
    icon: 'Users',
    category: 'communication',
    huName: 'Szociális Történetek',
    enName: 'Social Stories',
    huDesc:
      'Illusztrált szociális történetek és szabálykártyák, amelyek segítenek az ASD gyerekeknek megérteni a szociális helyzeteket és viselkedési elvárásokat.',
    enDesc:
      'Illustrated social stories and rule cards that help ASD children understand social situations and behavioral expectations.',
    huFeatures: [
      'Illusztrált szociális történetek (20+ téma)',
      'Szabálykártyák vizuális útmutatóval',
      'Szociális szabályok: sorban állás, köszönés, segítségkérés',
      'Saját történet készítője szülőknek',
      'Animált szereplők ASD-barát grafikával',
      'Offline használható — ideális terápiás helyzetekre',
    ],
    enFeatures: [
      'Illustrated social stories (20+ topics)',
      'Rule cards with visual guide',
      'Social rules: queuing, greeting, asking for help',
      'Custom story creator for parents',
      'Animated characters with ASD-friendly graphics',
      'Offline use — ideal for therapeutic settings',
    ],
    huSteps: [
      'Válassz egy szociális helyzetet (pl. óvoda, orvos, bolt)',
      'Olvasd el együtt a gyerekkel a képes történetet',
      'Ismételd meg és practice-old a szabályokat együtt',
    ],
    enSteps: [
      'Choose a social situation (e.g. kindergarten, doctor, shop)',
      'Read the illustrated story together with the child',
      'Repeat and practice the rules together',
    ],
    competitors: { app: 'Social Story Creator', price: '$39.99/év' },
    related: ['aac', 'erzelmek'],
  },

  szotanulas: {
    icon: 'BookOpen',
    category: 'learning',
    huName: 'Szótanulás & ABC',
    enName: 'Vocabulary & ABC',
    huDesc:
      '757 szó képes szókártyákkal, dual language módban — hogy a gyerek egyszerre tanuljon két nyelven játékos kvíz feladatokkal.',
    enDesc:
      '757 words with picture flashcards, in dual language mode — so the child learns two languages simultaneously with playful quiz tasks.',
    huFeatures: [
      '757 szó képes szókártyákkal (10 kategória)',
      'Dual language mód — egyszerre 2 nyelv (7 választható)',
      'Interaktív ABC — betűfelismerés és kiejtés',
      'Kvíz mód: szó-kép párosítás, hangos kérdések',
      'Haladáskövetés és szülői statisztika',
      'Offline teljesen elérhető, nincs internet-függés',
    ],
    enFeatures: [
      '757 words with picture flashcards (10 categories)',
      'Dual language mode — 2 languages at once (7 options)',
      'Interactive ABC — letter recognition and pronunciation',
      'Quiz mode: word-image matching, audio questions',
      'Progress tracking and parent statistics',
      'Fully offline, no internet dependency',
    ],
    huSteps: [
      'Válassz egy kategóriát (pl. állatok, ételek, színek)',
      'Böngészd a képes szókártyákat és hallgasd a kiejtést',
      'Próbáld ki a kvíz módot — párosítsd a képet a szóval',
    ],
    enSteps: [
      'Choose a category (e.g. animals, food, colors)',
      'Browse the picture flashcards and listen to pronunciation',
      'Try quiz mode — match the image to the word',
    ],
    competitors: { app: 'Lingo Kids', price: '$9.99/hó' },
    related: ['aac', 'jatekok'],
  },

  zeneterpia: {
    icon: 'Music',
    category: 'sensory',
    huName: 'Zeneterápia',
    enName: 'Music Therapy',
    huDesc:
      '6 interaktív zenei almodul 15 hangszerrel — xilofon, dob, ritmusjáték, falling notes és saját ritmus készítő. Szenzoros élmény és fejlesztés egyszerre.',
    enDesc:
      '6 interactive music submodules with 15 instruments — xylophone, drum, rhythm game, falling notes and custom rhythm creator. Sensory experience and development at once.',
    huFeatures: [
      '6 almodul: xilofon, dob, zongorabillentyűk, ritmusjáték, falling notes, saját ritmus',
      '15 különböző hangszer valódi hangmintákkal',
      'Falling notes — kövesd a leeső hangjegyeket',
      'Saját ritmus készítő — rögzítsd és lejátszd vissza',
      'Szenzoros visszajelzés (szín + animáció + hang egyszerre)',
      'Offline teljesen működő — ideális terápiás környezetbe',
    ],
    enFeatures: [
      '6 submodules: xylophone, drums, piano keys, rhythm game, falling notes, custom rhythm',
      '15 different instruments with real sound samples',
      'Falling notes — follow the falling musical notes',
      'Custom rhythm creator — record and play back',
      'Sensory feedback (color + animation + sound together)',
      'Fully offline — ideal for therapeutic settings',
    ],
    huSteps: [
      'Válassz hangszert vagy zenei almodult',
      'Érintsd meg a billentyűket — azonnali szín+hang visszajelzés',
      'Próbáld ki a falling notes módot — kövesd a ritmust',
    ],
    enSteps: [
      'Choose an instrument or music submodule',
      'Touch the keys — instant color+sound feedback',
      'Try falling notes mode — follow the rhythm',
    ],
    competitors: { app: 'Simply Piano', price: '$14.99/hó' },
    related: ['kifesto', 'nyugi-sarok'],
  },

  kifesto: {
    icon: 'Palette',
    category: 'sensory',
    huName: 'Kifestő',
    enName: 'Coloring',
    huDesc:
      '110+ kifestő kép ASD-barát szenzoros grafikával — nyugtató, strukturált, offline. A legkedveltebb relaxációs modul.',
    enDesc:
      '110+ coloring images with ASD-friendly sensory graphics — calming, structured, offline. The most beloved relaxation module.',
    huFeatures: [
      '110+ kifestő kép (állatok, természet, minták, mesék)',
      'ASD-barát szenzoros világ — egyszerű, tiszta vonalak',
      'Szín-kitöltés egyérintéssel (flood fill)',
      'Szabadkézi rajzolás is lehetséges',
      'Offline teljesen elérhető — mindig kéznél van',
      'Kész alkotás mentése és megosztása',
    ],
    enFeatures: [
      '110+ coloring images (animals, nature, patterns, fairy tales)',
      'ASD-friendly sensory world — simple, clean lines',
      'One-tap color fill (flood fill)',
      'Freehand drawing also possible',
      'Fully available offline — always at hand',
      'Save and share finished artwork',
    ],
    huSteps: [
      'Válassz egy képet a galériából',
      'Válassz színt és érintsd meg a területet — azonnal kiszíneződik',
      'Mentsd el vagy mutasd meg büszkén a kész alkotást',
    ],
    enSteps: [
      'Choose an image from the gallery',
      'Pick a color and tap the area — it fills instantly',
      'Save or proudly show off the finished artwork',
    ],
    competitors: { app: 'Color by Number', price: '$4.99' },
    related: ['zeneterpia', 'nyugi-sarok'],
  },

  'nyugi-sarok': {
    icon: 'CloudSun',
    category: 'sensory',
    huName: 'Nyugi Sarok',
    enName: 'Calm Corner',
    huDesc:
      'Lélegzés animáció, buborékok, nyugtató hangok és meltdown SOS gomb — a Nyugi Sarok MINDIG INGYENES, mert a megnyugvás alapjog.',
    enDesc:
      'Breathing animation, bubbles, calming sounds and meltdown SOS button — Calm Corner is ALWAYS FREE, because calming down is a basic right.',
    huFeatures: [
      'Vezérelt lélegzés animáció (box breathing, 4-7-8 technika)',
      'Interaktív buborékfújás — szenzoros megnyugtató',
      'Nyugtató hangok könyvtára (eső, óceán, erdő…)',
      'Meltdown SOS gomb — azonnali segítség krízishelyzetben',
      'Vizuális fókusz eszközök (spinning, glitter jar)',
      '🎁 MINDIG INGYENES — akkor is, ha nincs Pro előfizetés',
    ],
    enFeatures: [
      'Guided breathing animation (box breathing, 4-7-8 technique)',
      'Interactive bubble blowing — sensory calmer',
      'Calming sounds library (rain, ocean, forest…)',
      'Meltdown SOS button — instant help in crisis situations',
      'Visual focus tools (spinning, glitter jar)',
      '🎁 ALWAYS FREE — even without a Pro subscription',
    ],
    huSteps: [
      'Nyomj az SOS gombra — vagy válassz egy megnyugtató tevékenységet',
      'Kövesd a lélegzés animációt: be…tartsd…ki…',
      'Hallgasd a nyugtató hangokat és engedd el a feszültséget',
    ],
    enSteps: [
      'Press the SOS button — or choose a calming activity',
      'Follow the breathing animation: in…hold…out…',
      'Listen to the calming sounds and release the tension',
    ],
    competitors: { app: 'Headspace Kids', price: '$12.99/hó' },
    related: ['erzelmek', 'kifesto'],
  },

  jatekok: {
    icon: 'Puzzle',
    category: 'parental',
    huName: 'Kognitív Játékok',
    enName: 'Cognitive Games',
    huDesc:
      'Memóriajáték, kvíz, párosítás, szín és forma felismerés — kognitív fejlesztő játékok ASD gyerekeknek, szülői nyomkövetéssel.',
    enDesc:
      'Memory game, quiz, matching, color and shape recognition — cognitive development games for ASD children, with parent tracking.',
    huFeatures: [
      'Memóriajáték (kép-kép párosítás, nehézségi szintek)',
      'Kvíz mód — kérdés-válasz képekkel',
      'Szín és forma felismerés (3 nehézségi szint)',
      'Kép-kép párosítás tematikus kategóriákban',
      'Haladáskövetés és szülői eredménynapló',
      'ASD-barát lassú animáció, nincs zavaró reklám',
    ],
    enFeatures: [
      'Memory game (image-image matching, difficulty levels)',
      'Quiz mode — question-answer with images',
      'Color and shape recognition (3 difficulty levels)',
      'Image-image matching in thematic categories',
      'Progress tracking and parent result log',
      'ASD-friendly slow animation, no distracting ads',
    ],
    huSteps: [
      'Válassz játéktípust (memória, kvíz, párosítás)',
      'Játssz a gyerekkel — vagy hadd fedezze fel önállóan',
      'Nézd meg a szülői zónában az elért eredményeket',
    ],
    enSteps: [
      'Choose a game type (memory, quiz, matching)',
      'Play with the child — or let them explore independently',
      'Check the results in the parent zone',
    ],
    competitors: { app: 'Lumosity Kids', price: '$11.99/hó' },
    related: ['szotanulas', 'szuloi-zona'],
  },

  'szuloi-zona': {
    icon: 'Shield',
    category: 'parental',
    huName: 'Szülői Zóna',
    enName: 'Parent Zone',
    huDesc:
      'Gyerekprofil kezelés, fejlődési statisztikák, nyomtatható sablonok és riportok — minden egy helyen, amit a szülőnek vagy terapeutának tudnia kell.',
    enDesc:
      "Child profile management, development statistics, printable templates and reports — everything in one place that a parent or therapist needs to know.",
    huFeatures: [
      'Gyerekprofil létrehozás és kezelés (több profil is)',
      'Részletes fejlődési statisztikák modulonként',
      '86 nyomtatható sablon (napirend, érzelmek, AAC táblák)',
      'Heti és havi haladásriportok PDF formátumban',
      'Tartalom szerkesztő — AAC, napirend, történetek testreszabása',
      'Szülői PIN kód — gyerek nem tud belépni',
    ],
    enFeatures: [
      'Child profile creation and management (multiple profiles)',
      'Detailed development statistics per module',
      '86 printable templates (schedules, emotions, AAC boards)',
      'Weekly and monthly progress reports in PDF format',
      'Content editor — customize AAC, schedules, stories',
      'Parent PIN code — child cannot enter',
    ],
    huSteps: [
      'Hozz létre gyerekprofilt a Szülői Zónában',
      'Kövesd nyomon a modul-használatot és a fejlődést',
      'Töltsd le a havi riportot — PDF-ben, készen a terapeutának',
    ],
    enSteps: [
      'Create a child profile in the Parent Zone',
      'Track module usage and development',
      'Download the monthly report — PDF ready for the therapist',
    ],
    competitors: { app: 'TalkPath Therapy', price: '$19.99/hó' },
    related: ['jatekok', 'napirend'],
  },
};

export const moduleKeys = Object.keys(moduleData) as ModuleKey[];

export const categoryLabels: Record<
  ModuleCategory,
  { hu: string; en: string }
> = {
  communication: { hu: 'Kommunikáció', en: 'Communication' },
  learning: { hu: 'Tanulás', en: 'Learning' },
  sensory: { hu: 'Szenzoros', en: 'Sensory' },
  parental: { hu: 'Szülői', en: 'Parental' },
};
