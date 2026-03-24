'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Star, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Separator } from '@/components/ui/separator';
import { features } from '@/lib/features-data';

function FooterWave() {
  return (
    <div className="w-full overflow-hidden leading-[0] pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[48px] md:h-[60px]"
        style={{ display: 'block' }}
      >
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill="#1a1c1b"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const supportLinks = [
    { key: 'faq', label: t('nav.faq'), href: '/gyik' },
    { key: 'contact', label: t('nav.contact'), href: '/kapcsolat' },
    { key: 'beta', label: t('nav.beta'), href: '/beta' },
    { key: 'privacy', label: t('nav.privacy'), href: '/adatvedelem' },
    { key: 'terms', label: t('nav.terms'), href: '/aszf' },
  ] as const;

  return (
    <>
    <FooterWave />
    <footer className="bg-calmika-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Oszlop 1: Calmika brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-7 w-7 text-calmika-teal-400 fill-calmika-teal-600" />
              <span className="font-nunito font-bold text-xl text-white">
                Calmika
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-[200px]">
              {t('footer.description')}
            </p>
            {/* Store badges */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:border-calmika-teal-400 hover:text-calmika-teal-300 transition-colors w-fit"
              >
                {/* Google Play icon placeholder */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6L4.6 21.3c-.66.5-1.6.03-1.6-.8z" />
                </svg>
                Google Play
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:border-calmika-teal-400 hover:text-calmika-teal-300 transition-colors w-fit"
              >
                {/* App Store icon placeholder */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
            </div>
          </div>

          {/* Oszlop 2: Funkciók */}
          <div className="space-y-4">
            <h3 className="font-nunito font-bold text-white text-base">
              {t('footer.features')}
            </h3>
            <ul className="space-y-2">
              {features.map((feature) => {
                const name = locale === 'hu' ? feature.huName : feature.enName;
                return (
                  <li key={feature.key}>
                    <Link
                      href={feature.href as any}
                      className="text-sm text-slate-300 hover:text-calmika-teal-300 transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Oszlop 3: Támogatás */}
          <div className="space-y-4">
            <h3 className="font-nunito font-bold text-white text-base">
              {t('footer.support')}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-slate-300 hover:text-calmika-teal-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Oszlop 4: Közösség */}
          <div className="space-y-4">
            <h3 className="font-nunito font-bold text-white text-base">
              {t('footer.community')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-calmika-teal-300 transition-colors"
                >
                  {/* Facebook icon */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-calmika-teal-300 transition-colors"
                >
                  {/* Reddit icon */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                  <span>Reddit</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@calmika.com"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-calmika-teal-300 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@calmika.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12">
          <Separator className="bg-slate-700 mb-6" />
          <p className="text-center text-sm text-slate-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
