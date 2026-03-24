import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function StorySection() {
  const t = useTranslations('story');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-nunito font-bold text-center text-calmika-dark mb-12">
          {t('sectionTitle')}
        </h2>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: quote card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* Big quotation mark */}
            <div className="text-calmika-teal-200 text-6xl font-serif leading-none mb-4 select-none">
              &ldquo;
            </div>

            {/* Quote text */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {t('quote')}
            </p>

            {/* Author */}
            <p className="font-semibold text-calmika-teal-600">
              — {t('author')}
            </p>

            {/* CTA */}
            <Link
              href="/rolunk"
              className="inline-block mt-8 px-6 py-3 rounded-full border-2 border-calmika-teal-500 text-calmika-teal-600 font-semibold hover:bg-calmika-teal-500 hover:text-white transition-colors duration-200"
            >
              {t('ctaReadMore')}
            </Link>
          </div>

          {/* Right: photo placeholder */}
          <div
            className="rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            style={{ height: '300px', maxWidth: '400px', width: '100%', margin: '0 auto' }}
            aria-hidden="true"
          >
            <span className="text-gray-400 text-sm font-medium">Fotó hamarosan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
