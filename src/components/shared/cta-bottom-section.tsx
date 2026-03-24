import { useTranslations } from 'next-intl';

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
 * CtaBottomSection — újrahasználható alsó CTA szekcó
 * Használat: <CtaBottomSection /> bármely oldalon
 */
export function CtaBottomSection() {
  const t = useTranslations('ctaBottom');
  const tCommon = useTranslations('common');

  return (
    <section className="py-20 text-center bg-gradient-to-r from-calmika-teal-500 to-calmika-teal-600">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-nunito font-bold text-white mb-4">
          {t('title')}
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-lg mb-10">
          {t('subtitle')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Play Store */}
          <a
            href="https://play.google.com/store/apps/details?id=com.magicworlds.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white text-white rounded-full px-8 py-3 font-semibold hover:bg-white hover:text-calmika-teal-600 transition-colors duration-200"
          >
            <PlayStoreIcon />
            {t('playStore')}
          </a>

          {/* App Store (coming soon) */}
          <div className="relative inline-flex">
            <span
              className="inline-flex items-center gap-2 border-2 border-white text-white rounded-full px-8 py-3 font-semibold opacity-70 cursor-not-allowed"
              aria-disabled="true"
            >
              <AppleIcon />
              {t('appStore')}
            </span>
            {/* Badge */}
            <span className="absolute -top-3 -right-2 bg-calmika-gold-400 text-calmika-dark text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              {t('appStoreComingSoon')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
