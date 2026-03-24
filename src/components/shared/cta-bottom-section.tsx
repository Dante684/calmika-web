import { useTranslations } from 'next-intl';
import { BlurFade } from '@/components/magicui/blur-fade';

// Play Store SVG icon (simplified)
function PlayStoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M3.18 23.76a2 2 0 0 0 2.18-.22l12.26-7.08-2.88-2.88L3.18 23.76ZM.5 1.49A2 2 0 0 0 0 2.91v18.18a2 2 0 0 0 .5 1.42l.07.07 10.18-10.18v-.24L.57 1.42.5 1.49ZM21.12 10.4l-2.93-1.7-3.23 3.23 3.23 3.24 2.95-1.7a2.01 2.01 0 0 0 0-3.07ZM5.36.46 17.62 7.54l-2.88 2.88L3.18.22A2 2 0 0 1 5.36.46Z" />
    </svg>
  );
}

// Apple icon (simplified)
function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/**
 * CtaBottomSection — Stitch-style, cream bg, tonal design
 */
export function CtaBottomSection() {
  const t = useTranslations('ctaBottom');

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#eeeeec' }}>
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: '#f9bd22', filter: 'blur(100px)', opacity: 0.15 }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: '#14b8a6', filter: 'blur(100px)', opacity: 0.10 }}
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
        <BlurFade inView delay={0}>
          {/* Badge */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8"
            style={{ backgroundColor: '#b9e9e0', color: '#006b5f' }}
          >
            {t('badge')}
          </div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl font-nunito font-extrabold tracking-tight mb-5"
            style={{ color: '#1a1c1b' }}
          >
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            style={{ color: '#3c4947' }}
          >
            {t('subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Play Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.magicworlds.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)',
                boxShadow: '0 20px 40px rgba(20,184,166,0.25)',
              }}
            >
              <PlayStoreIcon />
              {t('playStore')}
            </a>

            {/* App Store (coming soon) */}
            <div className="relative inline-flex">
              <span
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base opacity-60 cursor-not-allowed"
                style={{ backgroundColor: '#ffffff', color: '#3c4947' }}
                aria-disabled="true"
              >
                <AppleIcon />
                {t('appStore')}
              </span>
              {/* Badge */}
              <span
                className="absolute -top-3 -right-2 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: '#f9bd22', color: '#3c4947' }}
              >
                {t('appStoreComingSoon')}
              </span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
