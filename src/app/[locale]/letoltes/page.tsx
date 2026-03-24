'use client';

import { useTranslations } from 'next-intl';
import { Download, UserPlus, Play, Smartphone, HardDrive, Wifi, Monitor, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// ── SVG icons ──────────────────────────────────────────────────────────────

function PlayStoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 shrink-0"
      aria-hidden="true"
    >
      <path d="M3.18 23.76a2 2 0 0 0 2.18-.22l12.26-7.08-2.88-2.88L3.18 23.76ZM.5 1.49A2 2 0 0 0 0 2.91v18.18a2 2 0 0 0 .5 1.42l.07.07 10.18-10.18v-.24L.57 1.42.5 1.49ZM21.12 10.4l-2.93-1.7-3.23 3.23 3.23 3.24 2.95-1.7a2.01 2.01 0 0 0 0-3.07ZM5.36.46 17.62 7.54l-2.88 2.88L3.18.22A2 2 0 0 1 5.36.46Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 shrink-0"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// ── Beta APK accordion ──────────────────────────────────────────────────────

function BetaAccordion({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-nunito font-semibold text-calmika-dark text-lg">
          {t('beta.title')}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
          {/* Warning */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <span className="text-amber-500 text-lg mt-0.5">⚠️</span>
            <p className="text-amber-700 text-sm font-medium">{t('beta.warning')}</p>
          </div>

          {/* APK download link */}
          <a
            href="https://github.com/Dante684/calmika-releases/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-3 font-semibold transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            {t('beta.downloadApk')}
          </a>

          <p className="text-gray-400 text-xs">{t('beta.hint')}</p>
        </div>
      )}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function LetoltesPage() {
  const t = useTranslations('download');

  const steps = [
    {
      num: 1,
      icon: <Download className="w-7 h-7 text-calmika-teal-600" />,
      title: t('steps.step1.title'),
      desc: t('steps.step1.desc'),
    },
    {
      num: 2,
      icon: <UserPlus className="w-7 h-7 text-calmika-teal-600" />,
      title: t('steps.step2.title'),
      desc: t('steps.step2.desc'),
    },
    {
      num: 3,
      icon: <Play className="w-7 h-7 text-calmika-teal-600" />,
      title: t('steps.step3.title'),
      desc: t('steps.step3.desc'),
    },
  ];

  const requirements = [
    { icon: <Smartphone className="w-5 h-5" />, text: t('requirements.android') },
    { icon: <HardDrive className="w-5 h-5" />, text: t('requirements.storage') },
    { icon: <Wifi className="w-5 h-5" />, text: t('requirements.offline') },
    { icon: <Monitor className="w-5 h-5" />, text: t('requirements.tablet') },
  ];

  return (
    <div className="min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-b from-calmika-teal-50 to-white pt-24 pb-16 text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* ── 2. Store buttons ── */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            {/* Google Play — teal bg */}
            <a
              href="https://play.google.com/store/apps/details?id=com.magicworlds.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-calmika-teal-500 hover:bg-calmika-teal-600 text-white rounded-2xl px-8 py-4 font-bold text-lg transition-colors duration-200 shadow-lg shadow-calmika-teal-200 min-w-[220px] justify-center"
            >
              <PlayStoreIcon />
              {t('store.googlePlay')}
            </a>

            {/* App Store — outlined + badge */}
            <div className="relative inline-flex">
              <span
                className="inline-flex items-center gap-3 border-2 border-gray-300 text-gray-400 rounded-2xl px-8 py-4 font-bold text-lg cursor-not-allowed min-w-[220px] justify-center"
                aria-disabled="true"
              >
                <AppleIcon />
                {t('store.appStore')}
              </span>
              <span className="absolute -top-3 -right-2 bg-calmika-gold-400 text-calmika-dark text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                {t('store.comingSoon')}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. QR code ── */}
      <section className="py-10 px-4 text-center">
        <div className="container mx-auto max-w-xs">
          {/* QR placeholder */}
          <div
            className="w-[200px] h-[200px] border-2 border-dashed border-calmika-teal-300 rounded-2xl mx-auto flex items-center justify-center text-calmika-teal-400 font-bold text-2xl tracking-widest bg-calmika-teal-50"
            aria-label="QR code placeholder"
          >
            QR
          </div>
          <p className="mt-4 text-gray-500 text-sm font-medium">{t('qr.label')}</p>
        </div>
      </section>

      {/* ── 4. How to get started — 3 steps ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-nunito text-3xl font-bold text-calmika-dark text-center mb-10">
            {t('steps.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4"
              >
                {/* Number badge */}
                <div className="w-10 h-10 rounded-full bg-calmika-teal-500 text-white font-bold font-nunito text-lg flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-calmika-teal-50 flex items-center justify-center">
                  {step.icon}
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-nunito font-bold text-calmika-dark text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. System requirements ── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-nunito text-3xl font-bold text-calmika-dark text-center mb-8">
            {t('requirements.title')}
          </h2>

          <div className="bg-calmika-teal-50 border border-calmika-teal-100 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-3 text-calmika-teal-800">
                <span className="text-calmika-teal-500 shrink-0">{req.icon}</span>
                <span className="font-medium text-sm">{req.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Beta APK accordion ── */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <BetaAccordion t={t} />
        </div>
      </section>

      {/* ── 7. Screenshot gallery placeholder ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-nunito text-3xl font-bold text-calmika-dark text-center mb-10">
            {t('screenshots.title')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-[120px] lg:w-full aspect-[9/16] max-h-[320px] rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-medium"
                aria-hidden="true"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">{t('screenshots.placeholder')}</p>
        </div>
      </section>

    </div>
  );
}
