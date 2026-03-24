import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BlurFade } from '@/components/magicui/blur-fade';

export function StorySection() {
  const t = useTranslations('story');

  return (
    <section className="py-24" style={{ backgroundColor: '#f9f9f7' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section title */}
        <BlurFade inView delay={0}>
          <div className="text-center mb-14">
            <span
              className="block text-xs font-bold uppercase tracking-[0.08em] mb-4"
              style={{ color: '#006b5f' }}
            >
              {t('overline')}
            </span>
            <h2
              className="text-3xl md:text-4xl font-nunito font-bold"
              style={{ color: '#1a1c1b' }}
            >
              {t('sectionTitle')}
            </h2>
          </div>
        </BlurFade>

        {/* Quote card + placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: quote card */}
          <BlurFade inView delay={0.1}>
            <div
              className="rounded-[2rem] p-8 md:p-12 flex flex-col h-full"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 40px 80px rgba(0,0,0,0.05)',
              }}
            >
              {/* Big quotation mark */}
              <div
                className="text-7xl font-serif leading-none mb-4 select-none"
                style={{ color: '#b9e9e0' }}
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <p
                className="text-lg leading-relaxed mb-6 flex-1"
                style={{ color: '#3c4947' }}
              >
                {t('quote')}
              </p>

              {/* Author */}
              <p
                className="font-bold"
                style={{ color: '#006b5f' }}
              >
                — {t('author')}
              </p>

              {/* CTA */}
              <Link
                href="/rolunk"
                className="inline-block mt-8 px-7 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:opacity-85 hover:scale-105 active:scale-95 w-fit"
                style={{
                  background: 'linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)',
                  boxShadow: '0 12px 30px rgba(20,184,166,0.25)',
                }}
              >
                {t('ctaReadMore')}
              </Link>
            </div>
          </BlurFade>

          {/* Right: decorative visual */}
          <BlurFade inView delay={0.2} direction="left">
            <div
              className="rounded-[2rem] flex items-center justify-center relative overflow-hidden"
              style={{
                height: 340,
                backgroundColor: '#eeeeec',
                boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
              }}
            >
              {/* Decorative blobs */}
              <div
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ backgroundColor: '#f9bd22', filter: 'blur(60px)', opacity: 0.3 }}
                aria-hidden
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ backgroundColor: '#14b8a6', filter: 'blur(60px)', opacity: 0.2 }}
                aria-hidden
              />
              <div className="relative z-10 text-center px-6">
                <div className="text-5xl mb-4">✨</div>
                <p
                  className="text-sm font-medium"
                  style={{ color: '#6c7a77' }}
                >
                  {t('photoPlaceholder')}
                </p>
              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
