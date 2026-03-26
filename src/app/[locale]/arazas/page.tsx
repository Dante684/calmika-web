import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pricing' });
  return {
    title: `${t('title')} — Calmika`,
    description: t('description'),
  };
}
import { Check, X, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// ─── Feature comparison data ───────────────────────────────────────────────────
const comparisonRows = [
  { key: 'aac',       free: '80 core', pro: '5000+' },
  { key: 'coloring',  free: '3 kép',   pro: '110+' },
  { key: 'vocab',     free: '5 szó',   pro: '757' },
  { key: 'music',     free: 'Alap',    pro: '6 almodul, 15 hangszer' },
  { key: 'schedule',  free: 'Alap',    pro: 'Teljes + sablonok' },
  { key: 'emotions',  free: null,      pro: true },
  { key: 'social',    free: null,      pro: true },
  { key: 'cognitive', free: null,      pro: true },
  { key: 'printable', free: null,      pro: '86 sablon' },
  { key: 'reports',   free: null,      pro: true },
  { key: 'dualLang',  free: null,      pro: '✅ 3 nyelv (HU/EN/PL)' },
  { key: 'offline',   free: true,      pro: true },
] as const;

function FeatureCell({ value }: { value: string | boolean | null }) {
  if (value === null || value === false) {
    return (
      <td className="p-5 text-center">
        <X className="h-4 w-4 mx-auto" style={{ color: '#bbcac6' }} />
      </td>
    );
  }
  if (value === true) {
    return (
      <td className="p-5 text-center">
        <Check className="h-4 w-4 mx-auto" style={{ color: '#006b5f' }} />
      </td>
    );
  }
  return (
    <td className="p-5 text-center text-sm font-medium" style={{ color: '#3c4947' }}>
      {value}
    </td>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// ─── Locale-based pricing helper ──────────────────────────────────────────────
function useRegionPricing(t: ReturnType<typeof useTranslations>) {
  const locale = useLocale();
  const isHu = locale === 'hu';

  return {
    monthly: {
      primary: isHu ? `🇭🇺 ${t('pro_monthly.price_hu')}` : `🇪🇺 ${t('pro_monthly.price_eu')}`,
      secondary: isHu
        ? `🇪🇺 ${t('pro_monthly.price_eu')} · 🇺🇸 ${t('pro_monthly.price_us')}`
        : `🇭🇺 ${t('pro_monthly.price_hu')} · 🇺🇸 ${t('pro_monthly.price_us')}`,
    },
    yearly: {
      primary: isHu ? `🇭🇺 ${t('pro_yearly.price_hu')}` : `🇪🇺 ${t('pro_yearly.price_eu')}`,
      secondary: isHu
        ? `🇪🇺 ${t('pro_yearly.price_eu')} · 🇺🇸 ${t('pro_yearly.price_us')}`
        : `🇭🇺 ${t('pro_yearly.price_hu')} · 🇺🇸 ${t('pro_yearly.price_us')}`,
    },
  };
}

export default function ArazasPage() {
  const t = useTranslations('pricing');
  const prices = useRegionPricing(t);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f9f9f7' }}>

      {/* ── 1. Hero ── */}
      <section className="pt-28 pb-16 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Overline label */}
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: '#006b5f', letterSpacing: '0.2em' }}
          >
            Simple Pricing
          </span>
          <h1
            className="font-nunito text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight"
            style={{ color: '#1a1c1b' }}
          >
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#3c4947' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── 2. Pricing cards ── */}
      <section className="container mx-auto px-4 max-w-6xl pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Card 1 — Free */}
          <div
            className="flex flex-col h-full rounded-3xl p-9"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 40px 60px -15px rgba(0,107,95,0.05)',
            }}
          >
            <div className="mb-7">
              <span
                className="text-xs font-bold tracking-widest uppercase block mb-2"
                style={{ color: '#6c7a77' }}
              >
                Essential
              </span>
              <h3
                className="font-nunito text-2xl font-bold"
                style={{ color: '#1a1c1b' }}
              >
                {t('free.name')}
              </h3>
            </div>
            <div className="mb-7">
              <span
                className="font-nunito text-4xl font-extrabold"
                style={{ color: '#1a1c1b' }}
              >
                {t('free.price')}
              </span>
              <p className="text-sm mt-1" style={{ color: '#6c7a77' }}>
                {t('free.period')}
              </p>
            </div>
            <ul className="space-y-3 mb-9 flex-grow">
              {(t.raw('free.features') as string[]).map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#1a1c1b' }}>
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#006b5f' }} />
                  {feat}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-4 rounded-full font-nunito font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#eeeeec', color: '#1a1c1b' }}
            >
              {t('free.cta')}
            </button>
          </div>

          {/* Card 2 — Pro Monthly (featured / kiemelve) */}
          <div
            className="relative flex flex-col rounded-3xl p-9 md:scale-105 z-10"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 40px 80px -10px rgba(0,107,95,0.18)',
              // Gradient border via outline + ring simulation
              outline: '2.5px solid #006b5f',
              outlineOffset: '0px',
            }}
          >
            {/* "Legnépszerűbb" badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span
                className="inline-block px-5 py-1.5 rounded-full text-xs font-bold font-nunito"
                style={{
                  backgroundColor: '#006b5f',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,107,95,0.3)',
                }}
              >
                {t('pro_monthly.badge')}
              </span>
            </div>

            <div className="mb-7 pt-3">
              <span
                className="text-xs font-bold tracking-widest uppercase block mb-2"
                style={{ color: '#006b5f' }}
              >
                Pro Access
              </span>
              <h3
                className="font-nunito text-2xl font-bold"
                style={{ color: '#1a1c1b' }}
              >
                {t('pro_monthly.name')}
              </h3>
            </div>
            <div className="mb-7">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span
                  className="font-nunito text-4xl font-extrabold"
                  style={{ color: '#006b5f' }}
                >
                  {prices.monthly.primary}
                </span>
              </div>
              <p className="text-xs mt-1.5" style={{ color: '#6c7a77' }}>
                {prices.monthly.secondary}
              </p>
            </div>
            <ul className="space-y-3 mb-9 flex-grow">
              {(t.raw('pro_monthly.features') as string[]).map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium" style={{ color: '#1a1c1b' }}>
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#006b5f' }} />
                  {feat}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-4 rounded-full font-nunito font-bold text-sm text-white transition-transform active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #006b5f, #14b8a6)',
                boxShadow: '0 8px 30px rgba(0,107,95,0.3)',
              }}
            >
              {t('pro_monthly.cta')}
            </button>
          </div>

          {/* Card 3 — Pro Yearly */}
          <div
            className="relative flex flex-col h-full rounded-3xl p-9"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 40px 60px -15px rgba(0,107,95,0.05)',
            }}
          >
            {/* "Legjobb ajánlat" + "2 hónap ingyen" badges */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-2 whitespace-nowrap">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold font-nunito"
                style={{ backgroundColor: '#f9bd22', color: '#261a00' }}
              >
                {t('pro_yearly.badge')}
              </span>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold font-nunito"
                style={{ backgroundColor: '#b9e9e0', color: '#3d6b63' }}
              >
                {t('pro_yearly.savings')}
              </span>
            </div>

            <div className="mb-7 pt-3">
              <span
                className="text-xs font-bold tracking-widest uppercase block mb-2"
                style={{ color: '#6c7a77' }}
              >
                Best Value
              </span>
              <h3
                className="font-nunito text-2xl font-bold"
                style={{ color: '#1a1c1b' }}
              >
                {t('pro_yearly.name')}
              </h3>
            </div>
            <div className="mb-7">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span
                  className="font-nunito text-4xl font-extrabold"
                  style={{ color: '#1a1c1b' }}
                >
                  {prices.yearly.primary}
                </span>
              </div>
              <p className="text-xs mt-1.5" style={{ color: '#6c7a77' }}>
                {prices.yearly.secondary}
              </p>
            </div>
            <ul className="space-y-3 mb-9 flex-grow">
              {(t.raw('pro_yearly.features') as string[]).map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#1a1c1b' }}>
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#006b5f' }} />
                  {feat}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-4 rounded-full font-nunito font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#1a1c1b', color: '#f9f9f7' }}
            >
              {t('pro_yearly.cta')}
            </button>
          </div>

        </div>
      </section>

      {/* ── 3. Ethics banner ── */}
      <section className="container mx-auto px-4 max-w-5xl pb-28">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center gap-8"
          style={{
            backgroundColor: '#006b5f',
            boxShadow: '0 40px 80px -20px rgba(0,107,95,0.25)',
          }}
        >
          {/* Decorative blur */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              backgroundColor: 'rgba(20,184,166,0.15)',
              filter: 'blur(60px)',
              transform: 'translate(25%, -25%)',
            }}
          />
          {/* Icon */}
          <div
            className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
          {/* Text */}
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-nunito text-2xl md:text-3xl font-extrabold text-white mb-3">
              A kommunikáció alapvető emberi jog.
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              AAC és Nyugi Sarok{' '}
              <strong className="text-[#71f8e4]">MINDIG INGYENES</strong>. Hisszük,
              hogy minden gyereknek joga van kifejezni magát — anyagi helyzettől függetlenül.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Feature comparison table ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-28">
        <h2
          className="font-nunito text-3xl font-bold text-center mb-14"
          style={{ color: '#1a1c1b' }}
        >
          {t('comparison.title')}
        </h2>
        <div
          className="rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#f4f4f2' }}
        >
          <table className="w-full border-spacing-0 border-separate">
            <thead>
              <tr style={{ backgroundColor: '#eeeeec' }}>
                <th
                  className="p-5 text-left font-nunito font-bold text-sm"
                  style={{ color: '#1a1c1b' }}
                >
                  {t('comparison.feature')}
                </th>
                <th
                  className="p-5 text-center font-nunito font-bold text-sm"
                  style={{ color: '#6c7a77' }}
                >
                  {t('comparison.free')}
                </th>
                <th
                  className="p-5 text-center font-nunito font-bold text-sm"
                  style={{ color: '#006b5f' }}
                >
                  {t('comparison.pro')}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.key}
                  style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f4f4f2' }}
                >
                  <td className="p-5 font-medium text-sm" style={{ color: '#1a1c1b' }}>
                    {t(`comparison.rows.${row.key}`)}
                  </td>
                  <FeatureCell value={row.free} />
                  <FeatureCell value={row.pro} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Therapist & School tier placeholder ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-16">
        <div
          className="rounded-3xl p-8 text-center"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 40px 60px -15px rgba(0,107,95,0.05)',
          }}
        >
          <div className="text-4xl mb-4">🏫</div>
          <h2
            className="font-nunito text-2xl font-bold mb-3"
            style={{ color: '#1a1c1b' }}
          >
            {t('therapists.title')}
          </h2>
          <p className="mb-6" style={{ color: '#6c7a77' }}>
            {t('therapists.subtitle')}
          </p>
          <Link href="/terapeutaknak">
            <button
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-nunito font-semibold text-sm transition-opacity hover:opacity-80"
              style={{
                backgroundColor: '#eeeeec',
                color: '#006b5f',
              }}
            >
              {t('therapists.cta')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="container mx-auto px-4 max-w-2xl pb-28">
        <h2
          className="font-nunito text-3xl font-bold text-center mb-10"
          style={{ color: '#1a1c1b' }}
        >
          {t('faq.title')}
        </h2>
        <Accordion className="w-full space-y-3">
          {(['q1', 'q2', 'q3', 'q4'] as const).map((qKey) => {
            const aKey = qKey.replace('q', 'a') as 'a1' | 'a2' | 'a3' | 'a4';
            return (
              <AccordionItem
                key={qKey}
                className="rounded-2xl px-5 overflow-hidden"
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 24px rgba(0,107,95,0.04)',
                }}
              >
                <AccordionTrigger
                  className="font-nunito font-semibold text-left py-5"
                  style={{ color: '#1a1c1b' }}
                >
                  {t(`faq.${qKey}`)}
                </AccordionTrigger>
                <AccordionContent className="pb-5" style={{ color: '#3c4947' }}>
                  {t(`faq.${aKey}`)}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* ── Bottom CTA ── */}
      <CtaBottomSection />
    </main>
  );
}
