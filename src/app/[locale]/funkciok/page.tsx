import { getLocale, getTranslations } from 'next-intl/server';
import { ModuleGrid } from '@/components/funkciok/module-grid';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata() {
  const locale = await getLocale();
  const isHu = locale === 'hu';
  return {
    title: `${isHu ? 'Funkciók' : 'Features'}`,
    description: isHu
      ? 'AAC kommunikáció, vizuális naptár, zeneterápia és 30+ modul ASD-s gyerekeknek.'
      : 'AAC communication, visual schedules, music therapy and 30+ modules for children with ASD.',
    alternates: getSeoAlternates('/funkciok', locale),
  };
}

export default async function FunkciokPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const isHu = locale === 'hu';

  const basePath = isHu ? '/funkciok' : '/features';

  const labels = {
    all: isHu ? 'Mind' : 'All',
    communication: isHu ? 'Kommunikáció' : 'Communication',
    learning: isHu ? 'Tanulás' : 'Learning',
    sensory: isHu ? 'Szenzoros' : 'Sensory',
    parental: isHu ? 'Szülői' : 'Parental',
    learnMore: isHu ? 'Tudj meg többet' : 'Learn more',
    offlineBanner: isHu
      ? 'Minden modul offline is működik'
      : 'Every module works offline too',
    offlineBannerDesc: isHu
      ? 'Nincs szükség internetre — a Calmika terápiás környezetben is tökéletesen használható.'
      : 'No internet required — Calmika works perfectly in therapeutic environments too.',
  };

  return (
    <main className="min-h-screen bg-calmika-cream">
      {/* ── Hero header ── */}
      <section className="py-20 text-center bg-gradient-to-b from-calmika-teal-500 via-calmika-teal-400 to-calmika-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {isHu ? '30+ modul • ASD-barát • Ingyenes AAC' : '30+ modules • ASD-friendly • Free AAC'}
          </div>
          <h1 className="font-nunito text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
            {isHu ? 'Funkciók' : 'Features'}
          </h1>
          <p className="text-white/90 text-xl font-medium">
            {isHu
              ? '30+ modul egyetlen alkalmazásban'
              : '30+ modules in one single app'}
          </p>
          <p className="text-white/75 text-base mt-3 max-w-xl mx-auto">
            {isHu
              ? 'AAC kommunikációtól a zeneterápiáig — minden, amire egy ASD családnak szüksége van.'
              : 'From AAC communication to music therapy — everything an ASD family needs.'}
          </p>
        </div>
      </section>

      {/* ── Module grid with filter ── */}
      <section className="container mx-auto px-4 max-w-7xl py-16">
        <ModuleGrid locale={locale} labels={labels} basePath={basePath} />
      </section>
    </main>
  );
}
