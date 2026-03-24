import { useTranslations } from 'next-intl';
import { MessageSquare, Ban, Shield, CreditCard } from 'lucide-react';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// ─── Timeline ──────────────────────────────────────────────────────────────────

function TimelineItem({
  year,
  title,
  text,
}: {
  year: string;
  title: string;
  text: string;
}) {
  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      {/* Vertical line */}
      <span className="absolute left-0 top-2 bottom-0 w-0 border-l-2 border-calmika-teal-200" />
      {/* Dot */}
      <span className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-calmika-teal-400 border-2 border-white shadow" />
      {/* Year badge */}
      <span className="inline-block bg-calmika-teal-100 text-calmika-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-2 font-nunito tracking-wide">
        {year}
      </span>
      <h3 className="font-nunito text-lg font-bold text-calmika-dark mb-1">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{text}</p>
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
    <div className="rounded-xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-calmika-teal-50 mx-auto mb-4">
        <Icon className="w-6 h-6 text-calmika-teal-500" />
      </div>
      <h3 className="font-nunito font-bold text-calmika-dark mb-2 text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Photo Placeholder ─────────────────────────────────────────────────────────

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
      className={`bg-gray-200 flex items-center justify-center ${rounded} overflow-hidden`}
      style={{ width, height }}
      aria-label={label}
      role="img"
    >
      <span className="text-gray-400 text-sm font-medium">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RolunkPage() {
  const t = useTranslations('about');

  const valueIcons = [MessageSquare, Ban, Shield, CreditCard];

  return (
    <main className="bg-calmika-cream">

      {/* ── 1. Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-calmika-teal-50 to-calmika-cream py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-5 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* ── 2. Dávid Timeline ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark mb-12 text-center">
            {t('timeline.sectionTitle')}
          </h2>

          {/* Timeline + Portrait side by side on md+ */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Timeline */}
            <div className="flex-1 min-w-0">
              <TimelineItem
                year="2022"
                title={t('timeline.y2022.title')}
                text={t('timeline.y2022.text')}
              />
              <TimelineItem
                year="2023"
                title={t('timeline.y2023.title')}
                text={t('timeline.y2023.text')}
              />
              <TimelineItem
                year="2024"
                title={t('timeline.y2024.title')}
                text={t('timeline.y2024.text')}
              />
              <TimelineItem
                year="2025–2026"
                title={t('timeline.y2025.title')}
                text={t('timeline.y2025.text')}
              />
            </div>

            {/* Portrait placeholder */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <PhotoPlaceholder
                width={200}
                height={200}
                rounded="rounded-full"
                label={t('photos.portrait')}
              />
              <p className="text-sm text-gray-500 font-medium">{t('photos.portraitCaption')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Értékeink ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark mb-4 text-center">
            {t('values.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-12 text-base md:text-lg max-w-xl mx-auto">
            {t('values.sectionSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              'accessibility',
              'noAds',
              'privacy',
              'pricing',
            ] as const).map((key, i) => (
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

      {/* ── 4. Csapat / Solo builder ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark mb-12 text-center">
            {t('team.sectionTitle')}
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Family photo placeholder */}
            <div className="flex-shrink-0">
              <PhotoPlaceholder
                width={400}
                height={300}
                rounded="rounded-2xl"
                label={t('photos.family')}
              />
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {t('team.description')}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-calmika-teal-100 flex items-center justify-center text-calmika-teal-600 font-bold font-nunito text-sm">
                  D
                </div>
                <div>
                  <p className="font-semibold text-calmika-dark text-sm">Dávid</p>
                  <p className="text-gray-400 text-xs">{t('team.founderTitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA Bottom ─────────────────────────────────────────────────── */}
      <CtaBottomSection />
    </main>
  );
}
