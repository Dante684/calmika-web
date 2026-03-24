'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CheckCircle, Clock, Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// ── Reddit icon (Lucide doesn't have it) ─────────────────────────────────────

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success';

// ── Contact Form ──────────────────────────────────────────────────────────────

function ContactForm({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');

    const mailSubject = encodeURIComponent(`[Calmika] ${form.subject} — ${form.name}`);
    const mailBody = encodeURIComponent(
      `Név: ${form.name}\nEmail: ${form.email}\nTárgy: ${form.subject}\n\n${form.message}`
    );
    window.location.href = `mailto:hello@calmika.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => setState('success'), 600);
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-14 w-14 text-calmika-teal-500" />
        <h3 className="font-nunito text-xl font-bold text-calmika-dark">{t('form.successTitle')}</h3>
        <p className="text-gray-500 max-w-sm text-sm">{t('form.successDesc')}</p>
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

      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.subject')} <span className="text-calmika-teal-500">*</span>
        </label>
        <select
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition bg-white"
        >
          <option value="">{t('form.subjectPlaceholder')}</option>
          <option value={t('form.subjectGeneral')}>{t('form.subjectGeneral')}</option>
          <option value={t('form.subjectBug')}>{t('form.subjectBug')}</option>
          <option value={t('form.subjectTherapist')}>{t('form.subjectTherapist')}</option>
          <option value={t('form.subjectPress')}>{t('form.subjectPress')}</option>
          <option value={t('form.subjectOther')}>{t('form.subjectOther')}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-calmika-dark mb-1.5">
          {t('form.message')} <span className="text-calmika-teal-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t('form.messagePlaceholder')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 transition resize-none"
        />
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
            <Send className="h-4 w-4" />
            {t('form.submit')}
          </>
        )}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function KapcsolatPage() {
  const t = useTranslations('contact');

  return (
    <>
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 text-center bg-gradient-to-b from-calmika-teal-50 to-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <span className="inline-block text-5xl mb-5" aria-hidden="true">
              <MessageSquare className="h-14 w-14 text-calmika-teal-500 mx-auto" />
            </span>
            <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl">
              {t('hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Main grid: form + info */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-5 gap-10">

              {/* Form — wider */}
              <div className="md:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-nunito text-xl font-bold text-calmika-dark mb-6">
                  {t('form.title')}
                </h2>
                <ContactForm t={t} />
              </div>

              {/* Info sidebar */}
              <div className="md:col-span-2 flex flex-col gap-6">

                {/* Response time */}
                <div className="bg-calmika-teal-50 rounded-2xl p-6 border border-calmika-teal-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-calmika-teal-600" />
                    <h3 className="font-semibold text-calmika-dark">{t('info.responseTitle')}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('info.responseText')}</p>
                </div>

                {/* Direct email */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-calmika-teal-600" />
                    <h3 className="font-semibold text-calmika-dark">{t('info.emailTitle')}</h3>
                  </div>
                  <a
                    href="mailto:hello@calmika.com"
                    className="text-calmika-teal-600 font-semibold hover:underline text-sm"
                  >
                    hello@calmika.com
                  </a>
                </div>

                {/* Social links */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-calmika-dark mb-4">{t('info.communityTitle')}</h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://www.facebook.com/calmika"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-calmika-teal-600 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#1877F2]" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                      Facebook
                    </a>
                    <a
                      href="https://www.reddit.com/r/calmika"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-calmika-teal-600 transition-colors"
                    >
                      <RedditIcon className="h-5 w-5 text-[#FF4500]" />
                      Reddit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaBottomSection />
      </main>
    </>
  );
}
