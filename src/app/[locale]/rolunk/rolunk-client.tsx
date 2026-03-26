import { useTranslations } from 'next-intl';
import { MessageSquare, Ban, Shield, CreditCard } from 'lucide-react';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// ─── Timeline Item ─────────────────────────────────────────────────────────────

function TimelineItem({
  year,
  title,
  text,
  icon,
  quote,
  reverse,
}: {
  year: string;
  title: string;
  text: string;
  icon: string;
  quote: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14 mb-20 last:mb-0 relative`}
    >
      {/* Text side */}
      <div className={`w-full md:w-1/2 ${reverse ? 'md:text-left' : 'md:text-right'}`}>
        <span
          className="font-nunito text-7xl font-black block mb-1 select-none"
          style={{ color: 'rgba(0,107,95,0.08)' }}
        >
          {year}
        </span>
        <h3
          className="font-nunito text-2xl font-bold mb-3"
          style={{ color: '#1a1c1b' }}
        >
          {title}
        </h3>
        <p className="leading-relaxed text-base md:text-lg" style={{ color: '#3c4947' }}>
          {text}
        </p>
      </div>

      {/* Center dot — hidden on mobile, shown on md+ */}
      <div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
        style={{
          backgroundColor: '#006b5f',
          boxShadow: '0 0 0 4px #f9f9f7, 0 0 0 7px rgba(0,107,95,0.2)',
        }}
      />

      {/* Card side */}
      <div className="w-full md:w-1/2">
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 40px 60px -15px rgba(0,107,95,0.07)',
          }}
        >
          <span
            className="text-3xl mb-4 block"
            style={{ color: '#006b5f' }}
          >
            {icon}
          </span>
          <p className="italic text-base" style={{ color: '#3c4947' }}>
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Value Card ───────────────────────────────────────────────────────────────

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col items-start transition-transform duration-300 hover:scale-[1.03]"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 40px 60px -15px rgba(0,107,95,0.05)',
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: '#b9e9e0' }}
      >
        <Icon className="w-6 h-6" style={{ color: '#3d6b63' }} />
      </div>
      <h4
        className="font-nunito font-bold text-lg mb-2"
        style={{ color: '#1a1c1b' }}
      >
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: '#3c4947' }}>
        {description}
      </p>
    </div>
  );
}

// ─── Photo Placeholder ────────────────────────────────────────────────────────

function PhotoPlaceholder({
  width,
  height,
  rounded,
  label,
}: {
  width: number;
  height: number;
  rounded: string;
  label: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${rounded}`}
      style={{ width, height, backgroundColor: '#eeeeec' }}
      aria-label={label}
      role="img"
    >
      <span className="text-sm font-medium" style={{ color: '#6c7a77' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RolunkClient() {
  const t = useTranslations('about');
  const valueIcons = [MessageSquare, Ban, Shield, CreditCard];

  return (
    <main style={{ backgroundColor: '#f9f9f7' }}>

      {/* ── 1. Hero ── */}
      <section className="pt-28 pb-20 md:pb-28">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase block mb-5"
                style={{ color: '#006b5f', letterSpacing: '0.2em' }}
              >
                {t('timeline.overline')}
              </span>
              <h1
                className="font-nunito font-extrabold tracking-tight leading-tight mb-7"
                style={{ color: '#1a1c1b', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                {t('timeline.heroTitle1')}{' '}
                <br />
                <span style={{ color: '#006b5f' }}>{t('timeline.heroTitle2')}</span>
              </h1>
              <p
                className="text-xl leading-relaxed max-w-xl"
                style={{ color: '#3c4947' }}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Right: image card + quote */}
            <div className="relative">
              {/* Hero illustration */}
              <div
                className="rounded-3xl overflow-hidden aspect-square rotate-3"
                style={{
                  boxShadow: '0 40px 80px -20px rgba(0,107,95,0.18)',
                }}
              >
                <img
                  src="/images/about-hero.png"
                  alt={t('photos.family')}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold quote card */}
              <div
                className="absolute -bottom-8 -left-8 p-7 rounded-2xl -rotate-2 max-w-[240px]"
                style={{
                  backgroundColor: '#f9bd22',
                  boxShadow: '0 20px 50px rgba(249,189,34,0.3)',
                }}
              >
                <p
                  className="font-nunito font-bold text-base leading-snug"
                  style={{ color: '#261a00' }}
                >
                  &ldquo;A kommunikáció emberi jog, nem luxus.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Timeline ── */}
      <section className="py-24 px-4 overflow-hidden" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="container mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2
              className="font-nunito text-4xl font-bold tracking-tight"
              style={{ color: '#1a1c1b' }}
            >
              {t('timeline.sectionTitle')}
            </h2>
            <div
              className="w-20 h-1.5 mx-auto mt-4 rounded-full"
              style={{ backgroundColor: '#14b8a6' }}
            />
          </div>

          {/* Central line — md+ only */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full rounded-full"
              style={{ backgroundColor: 'rgba(20,184,166,0.25)' }}
            />

            <TimelineItem
              year="2022"
              title={t('timeline.y2022.title')}
              text={t('timeline.y2022.text')}
              icon="👨‍👩‍👦‍👦"
              quote="Két diagnózis egyszerre. Hegy a láthatáron, és nincs térkép."
              reverse={false}
            />
            <TimelineItem
              year="2023"
              title={t('timeline.y2023.title')}
              text={t('timeline.y2023.text')}
              icon="💻"
              quote="Hajnali 3-kor kódolok. Soronként. Értük."
              reverse={true}
            />
            <TimelineItem
              year="2024"
              title={t('timeline.y2024.title')}
              text={t('timeline.y2024.text')}
              icon="🔧"
              quote="Egy kommunikációs gombból egy neurodiverzitás-ökoszisztéma lett."
              reverse={false}
            />
            <TimelineItem
              year="2025–2026"
              title={t('timeline.y2025.title')}
              text={t('timeline.y2025.text')}
              icon="🌍"
              quote="Globális hatás, helyi és személyes szívvel."
              reverse={true}
            />
          </div>
        </div>
      </section>

      {/* ── 3. Értékeink ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
            <div className="max-w-2xl">
              <h2
                className="font-nunito text-4xl font-bold tracking-tight mb-4"
                style={{ color: '#1a1c1b' }}
              >
                {t('values.sectionTitle')}
              </h2>
              <p className="text-lg" style={{ color: '#3c4947' }}>
                {t('values.sectionSubtitle')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['accessibility', 'noAds', 'privacy', 'pricing'] as const).map((key, i) => (
              <ValueCard
                key={key}
                icon={valueIcons[i]}
                title={t(`values.cards.${key}.title`)}
                description={t(`values.cards.${key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Team — "Built by a Father & AI" ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ backgroundColor: 'rgba(20,184,166,0.07)' }}
          >
            {/* Decorative shape */}
            <div
              className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
              style={{
                backgroundColor: 'rgba(20,184,166,0.04)',
                transform: 'rotate(-12deg) translate(15%, 10%)',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 p-12 lg:p-20 relative z-10 items-center">
              {/* Text */}
              <div>
                <h2
                  className="font-nunito text-4xl font-bold tracking-tight mb-7"
                  style={{ color: '#1a1c1b' }}
                >
                  {t('team.sectionTitle')}
                </h2>
                <div
                  className="space-y-5 text-lg leading-relaxed mb-8"
                  style={{ color: '#3c4947' }}
                >
                  <p>{t('team.description')}</p>
                </div>

                {/* Founder card */}
                <div
                  className="flex items-center gap-4 pt-7"
                  style={{ borderTop: '1px solid rgba(0,107,95,0.1)' }}
                >
                  {/* Founder avatar */}
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      outline: '2px solid #14b8a6',
                      outlineOffset: '2px',
                    }}
                  >
                    <img
                      src="/images/founder-avatar.png"
                      alt="Dávid"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-nunito font-bold"
                      style={{ color: '#1a1c1b' }}
                    >
                      Dávid
                    </p>
                    <p className="text-sm" style={{ color: '#6c7a77' }}>
                      {t('team.founderTitle')}
                    </p>
                  </div>
                </div>
              </div>

              {/* About illustration */}
              <div
                className="rounded-2xl overflow-hidden aspect-square"
                style={{
                  boxShadow: '0 40px 80px -20px rgba(0,107,95,0.12)',
                }}
              >
                <img
                  src="/images/about-hero.png"
                  alt={t('photos.family')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA Bottom ── */}
      <CtaBottomSection />
    </main>
  );
}
