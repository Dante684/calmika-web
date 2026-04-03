'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';
import { CheckCircle, Clock, Loader2, Sparkles, Star } from 'lucide-react';

// ── Roadmap ──────────────────────────────────────────────────────────────────

interface Phase {
  label: string;
  status: 'done' | 'active' | 'todo';
  emoji: string;
}

function RoadmapSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const phases: Phase[] = [
    { label: t('roadmap.s1'), status: 'done',   emoji: '✅' },
    { label: t('roadmap.s2'), status: 'active', emoji: '🔄' },
    { label: t('roadmap.s3'), status: 'todo',   emoji: '⬜' },
    { label: t('roadmap.s4'), status: 'todo',   emoji: '⬜' },
  ];

  const doneCount = phases.filter((p) => p.status === 'done').length;
  const activeCount = phases.filter((p) => p.status === 'active').length;
  // progress: done phases full + active phase half
  const progress = ((doneCount + activeCount * 0.5) / phases.length) * 100;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark text-center mb-8">
          {t('roadmap.title')}
        </h2>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-calmika-teal-400 to-calmika-teal-600 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phases */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 text-center border-2 transition-all ${
                phase.status === 'done'
                  ? 'border-calmika-teal-400 bg-calmika-teal-50'
                  : phase.status === 'active'
                  ? 'border-calmika-teal-300 bg-teal-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <span className="text-2xl block mb-2">{phase.emoji}</span>
              <span
                className={`text-sm font-semibold ${
                  phase.status === 'todo' ? 'text-gray-400' : 'text-calmika-dark'
                }`}
              >
                {phase.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Perks ─────────────────────────────────────────────────────────────────────

function PerksSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const perks = [
    { icon: '🚀', title: t('perks.earlyAccess.title'), desc: t('perks.earlyAccess.desc') },
    { icon: '⭐', title: t('perks.proFree.title'),     desc: t('perks.proFree.desc') },
    { icon: '💬', title: t('perks.voice.title'),       desc: t('perks.voice.desc') },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark text-center mb-10">
          {t('perks.title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {perks.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
              <span className="text-4xl block mb-3">{p.icon}</span>
              <h3 className="font-nunito font-bold text-calmika-dark mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Registration Form ─────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function BetaForm({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    hasAsdChild: '',
    platform: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');

    // mailto fallback — until backend is wired up
    const subject = encodeURIComponent('Béta regisztráció');
    const body = encodeURIComponent(
      `Név: ${form.name}\nEmail: ${form.email}\nASD gyerek: ${form.hasAsdChild}\nPlatform: ${form.platform}`
    );
    window.location.href = `mailto:info@calmika.com?subject=${subject}&body=${body}`;

    // Optimistic success
    setTimeout(() => setState('success'), 600);
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <CheckCircle className="h-14 w-14 text-calmika-teal-500" />
        <h3 className="font-nunito text-2xl font-bold text-calmika-dark">{t('form.successTitle')}</h3>
        <p className="text-gray-500 text-center max-w-sm">{t('form.successDesc')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.name')} <span className="text-calmika-teal-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder={t('form.namePlaceholder')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.email')} <span className="text-calmika-teal-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder={t('form.emailPlaceholder')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition"
        />
      </div>

      {/* ASD child */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.asdChild')} <span className="text-calmika-teal-500">*</span>
        </label>
        <select
          name="hasAsdChild"
          required
          value={form.hasAsdChild}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition bg-white"
        >
          <option value="">{t('form.selectPlaceholder')}</option>
          <option value="yes">{t('form.asdYes')}</option>
          <option value="no">{t('form.asdNo')}</option>
        </select>
      </div>

      {/* Platform */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.platform')} <span className="text-calmika-teal-500">*</span>
        </label>
        <select
          name="platform"
          required
          value={form.platform}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition bg-white"
        >
          <option value="">{t('form.selectPlaceholder')}</option>
          <option value="android">{t('form.android')}</option>
          <option value="ios">{t('form.ios')}</option>
          <option value="both">{t('form.both')}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full bg-gradient-to-r from-calmika-teal-500 to-calmika-teal-600 text-white font-bold rounded-xl py-3.5 text-sm hover:from-calmika-teal-600 hover:to-calmika-teal-700 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('form.submitting')}
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {t('form.submit')}
          </>
        )}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BetaPage() {
  const t = useTranslations('beta');

  return (
    <>
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 text-center bg-gradient-to-b from-teal-600 via-calmika-teal-500 to-calmika-teal-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <span className="inline-block text-5xl mb-5" aria-hidden="true">🌟</span>
            <h1 className="font-nunito text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-teal-100 text-lg md:text-xl max-w-xl mx-auto mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-6 text-teal-100 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-calmika-gold-400 text-calmika-gold-400" />
                {t('hero.badge1')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {t('hero.badge2')}
              </span>
            </div>
          </div>
        </section>

        {/* Perks */}
        <PerksSection t={t} />

        {/* Roadmap */}
        <RoadmapSection t={t} />

        {/* Registration form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-lg">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="font-nunito text-2xl font-bold text-calmika-dark text-center mb-2">
                {t('form.title')}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-8">
                {t('form.subtitle')}
              </p>
              <BetaForm t={t} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaBottomSection />
      </main>
    </>
  );
}
