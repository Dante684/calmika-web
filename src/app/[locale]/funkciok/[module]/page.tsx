import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  Puzzle,
  Shield,
  CheckCircle,
  ArrowRight,
  Download,
} from 'lucide-react';
import { moduleData, type ModuleKey } from '@/lib/module-data';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  Puzzle,
  Shield,
};

interface Props {
  params: Promise<{ module: string; locale: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { module: moduleKey } = await params;
  const locale = await getLocale();
  const isHu = locale === 'hu';

  const data = moduleData[moduleKey as ModuleKey];
  if (!data) notFound();

  const Icon = iconMap[data.icon] ?? MessageSquare;
  const name = isHu ? data.huName : data.enName;
  const desc = isHu ? data.huDesc : data.enDesc;
  const features = isHu ? data.huFeatures : data.enFeatures;
  const steps = isHu ? data.huSteps : data.enSteps;
  const { competitors } = data;
  const basePath = isHu ? '/funkciok' : '/features';
  const downloadPath = isHu ? '/letoltes' : '/download';

  const categoryColorMap: Record<string, string> = {
    communication: 'from-teal-500 via-teal-400 to-teal-300',
    learning: 'from-blue-500 via-blue-400 to-blue-300',
    sensory: 'from-purple-500 via-purple-400 to-purple-300',
    parental: 'from-orange-500 via-orange-400 to-orange-300',
  };
  const gradientClass = categoryColorMap[data.category] ?? 'from-calmika-teal-500 via-calmika-teal-400 to-calmika-teal-300';

  return (
    <main className="min-h-screen bg-calmika-cream">
      {/* ── 1. Hero ── */}
      <section className={`py-20 bg-gradient-to-b ${gradientClass} to-calmika-cream`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left: text */}
            <div className="flex-1 text-center md:text-left">
              {/* Back link */}
              <Link
                href={basePath}
                className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-6 transition-colors"
              >
                ← {isHu ? 'Vissza a funkciókhoz' : 'Back to features'}
              </Link>

              {/* Icon + name */}
              <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <h1 className="font-nunito text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                  {name}
                </h1>
              </div>

              <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                {desc}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href={downloadPath}
                  className="inline-flex items-center gap-2 bg-white text-calmika-teal-600 font-bold px-6 py-3 rounded-full shadow hover:shadow-lg transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  {isHu ? 'Töltsd le ingyen' : 'Download free'}
                </Link>
              </div>
            </div>

            {/* Right: screenshot placeholder */}
            <div className="shrink-0">
              <div className="w-[200px] h-[380px] md:w-[240px] md:h-[440px] bg-white/20 backdrop-blur-sm rounded-3xl border-4 border-white/40 shadow-2xl flex items-center justify-center">
                <div className="text-center text-white/60 px-4">
                  <Icon className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p className="text-xs font-medium">
                    {isHu ? 'Képernyőkép hamarosan' : 'Screenshot coming soon'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Feature list ── */}
      <section className="container mx-auto px-4 max-w-3xl py-16">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark mb-8 text-center">
          {isHu ? 'Mit tud ez a modul?' : 'What can this module do?'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <CheckCircle className="w-5 h-5 text-calmika-teal-500 mt-0.5 shrink-0" />
              <span className="text-gray-700 text-sm leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. How it works ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-nunito text-2xl font-bold text-calmika-dark mb-10 text-center">
            {isHu ? 'Hogyan működik?' : 'How does it work?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-calmika-cream rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-10 h-10 rounded-full bg-calmika-teal-500 text-white font-bold font-nunito text-lg flex items-center justify-center mx-auto mb-4 shadow">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-calmika-teal-300 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Screenshot gallery (placeholders) ── */}
      <section className="container mx-auto px-4 max-w-4xl py-16">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark mb-8 text-center">
          {isHu ? 'Képernyőképek' : 'Screenshots'}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-[200px] h-[380px] md:w-[240px] md:h-[440px] bg-gray-100 rounded-2xl border border-gray-200 flex flex-col items-center justify-center shadow-sm gap-3"
            >
              <Icon className="w-10 h-10 text-gray-300" />
              <span className="text-gray-300 text-xs font-medium">
                {isHu ? `Képernyőkép ${n}` : `Screenshot ${n}`}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-6">
          {isHu
            ? 'Valódi képernyőképek hamarosan érkeznek.'
            : 'Real screenshots coming soon.'}
        </p>
      </section>

      {/* ── 5. Competitor comparison ── */}
      <section className="bg-calmika-teal-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-calmika-dark text-lg font-semibold">
            {isHu
              ? `Más app-okban (pl. ${competitors.app}) ez ${competitors.price}-ba kerül.`
              : `In other apps (e.g. ${competitors.app}) this costs ${competitors.price}.`}
          </p>
          <p className="text-calmika-teal-700 text-base mt-2 font-medium">
            {isHu
              ? 'Calmiká-ban: ingyenesen kipróbálható, Pro-ban teljes hozzáféréssel. 🎁'
              : 'In Calmika: free to try, full access with Pro. 🎁'}
          </p>
          {moduleKey === 'nyugi-sarok' && (
            <div className="mt-4 inline-block bg-calmika-teal-500 text-white font-bold px-6 py-2 rounded-full text-sm">
              {isHu ? '✅ MINDIG INGYENES' : '✅ ALWAYS FREE'}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="container mx-auto px-4 max-w-2xl py-14 text-center">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark mb-3">
          {isHu ? `Próbáld ki a ${name} modult!` : `Try the ${name} module!`}
        </h2>
        <p className="text-gray-500 mb-8">
          {isHu
            ? '14 nap ingyenes Pro — nincs bankkártya szükség.'
            : '14 days free Pro — no credit card required.'}
        </p>
        <Link
          href={downloadPath}
          className="inline-flex items-center gap-2 bg-calmika-teal-500 hover:bg-calmika-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
        >
          <Download className="w-5 h-5" />
          {isHu ? 'Próbáld ki ingyen' : 'Try for free'}
        </Link>
      </section>

      {/* ── 7. Related modules ── */}
      {data.related.length > 0 && (
        <section className="container mx-auto px-4 max-w-3xl pb-16">
          <h2 className="font-nunito text-xl font-bold text-calmika-dark mb-6 text-center">
            {isHu ? 'Kapcsolódó modulok' : 'Related modules'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.related.map((relKey) => {
              const rel = moduleData[relKey];
              if (!rel) return null;
              const RelIcon = iconMap[rel.icon] ?? MessageSquare;
              const relName = isHu ? rel.huName : rel.enName;
              const relDesc = isHu ? rel.huDesc : rel.enDesc;
              return (
                <Link
                  key={relKey}
                  href={`${basePath}/${relKey}`}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-calmika-teal-300 transition-all p-5 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 bg-calmika-teal-50 text-calmika-teal-600 rounded-xl flex items-center justify-center">
                    <RelIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-calmika-dark text-sm">{relName}</p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{relDesc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-calmika-teal-600 text-xs font-semibold group-hover:gap-2 transition-all">
                    {isHu ? 'Megnézem' : 'View'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <CtaBottomSection />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(moduleData).map((key) => ({ module: key }));
}
