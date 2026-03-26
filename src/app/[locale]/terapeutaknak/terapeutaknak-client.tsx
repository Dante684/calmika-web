'use client';

import { useTranslations } from 'next-intl';
import {
  Wallet,
  Globe,
  WifiOff,
  BarChart3,
  CheckCircle2,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';
import { useState } from 'react';

// ─── Value Card ───────────────────────────────────────────────────────────────

const VALUE_ICONS = [Wallet, Globe, WifiOff, BarChart3] as const;

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-calmika-teal-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-start gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-calmika-teal-50">
        <Icon className="w-6 h-6 text-calmika-teal-500" />
      </div>
      <div>
        <h3 className="font-nunito font-bold text-calmika-dark text-base mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

const COMPETITORS = ['Proloquo2Go', 'TouchChat', 'PECS IV+'] as const;
const ROW_KEYS = ['price', 'platform', 'modules', 'hungarian', 'offline'] as const;

function ComparisonTable() {
  const t = useTranslations('therapists.comparison');

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {/* Empty first cell */}
            <th className="bg-gray-50 text-left px-5 py-4 font-semibold text-gray-500 w-32 md:w-40" />
            {/* Calmika — highlighted */}
            <th className="bg-calmika-teal-500 text-white px-5 py-4 text-center relative min-w-[160px]">
              <span className="block font-nunito font-bold text-base leading-tight">
                {t('colCalmika')}
              </span>
              <span className="block text-calmika-teal-100 text-xs font-medium mt-0.5">
                {t('colCalmikaSub')}
              </span>
              {/* Top badge */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-calmika-gold-400 text-calmika-dark text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow">
                {t('highlighted')}
              </span>
            </th>
            {COMPETITORS.map((name) => (
              <th
                key={name}
                className="bg-gray-50 text-gray-700 px-5 py-4 text-center font-semibold min-w-[130px]"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROW_KEYS.map((rowKey, rowIdx) => {
            const data = t.raw(`data.${rowKey}`) as string[];
            return (
              <tr
                key={rowKey}
                className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <td className="px-5 py-3.5 font-medium text-gray-600">
                  {t(`rows.${rowKey}`)}
                </td>
                {/* Calmika cell */}
                <td className="px-5 py-3.5 text-center bg-calmika-teal-50 font-semibold text-calmika-teal-700 border-x border-calmika-teal-100">
                  {data[0]}
                </td>
                {/* Competitor cells */}
                {data.slice(1).map((val, ci) => (
                  <td
                    key={COMPETITORS[ci]}
                    className="px-5 py-3.5 text-center text-gray-500"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── How It Works Step ────────────────────────────────────────────────────────

function HowItWorksStep({
  number,
  title,
  description,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-5">
      {/* Number circle */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-calmika-teal-500 text-white flex items-center justify-center font-nunito font-bold text-xl shadow-md z-10">
        {number}
      </div>
      {/* Connector line (vertical on mobile, hidden on md since flex-row has its own) */}
      {!isLast && (
        <span className="absolute left-7 top-14 w-0 h-12 border-l-2 border-dashed border-calmika-teal-200 md:hidden" />
      )}
      <div className="pt-1 pb-12 md:pb-0">
        <h3 className="font-nunito font-bold text-calmika-dark text-base mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{description}</p>
      </div>
    </div>
  );
}

// ─── Evidence Badge ───────────────────────────────────────────────────────────

function EvidenceBadge({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-calmika-teal-100 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <BookOpen className="w-5 h-5 text-calmika-teal-500 flex-shrink-0 mt-0.5" />
      <p className="text-gray-600 text-sm leading-relaxed italic">{text}</p>
    </div>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────

function RegistrationForm() {
  const t = useTranslations('therapists.form');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    message: '',
  });

  const ROLES = ['speech', 'special', 'dev', 'psychologist', 'other'] as const;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent('Calmika Pro hozzáférés igénylés');
    const body = encodeURIComponent(
      `Név: ${formData.name}\nEmail: ${formData.email}\nSzervezet: ${formData.organization}\nSzerep: ${formData.role}\n\nÜzenet:\n${formData.message}`
    );
    window.location.href = `mailto:hello@calmika.app?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-calmika-teal-200 bg-calmika-teal-50 p-10 text-center">
        <CheckCircle2 className="w-14 h-14 text-calmika-teal-500 mx-auto mb-4" />
        <h3 className="font-nunito font-bold text-calmika-dark text-xl mb-2">
          {t('successTitle')}
        </h3>
        <p className="text-gray-600 text-base">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm space-y-5"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            {t('fields.name')} <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={t('fields.namePlaceholder')}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            {t('fields.email')} <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t('fields.emailPlaceholder')}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Organization + Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="organization" className="text-sm font-semibold text-gray-700">
            {t('fields.organization')} <span className="text-red-400">*</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            value={formData.organization}
            onChange={handleChange}
            placeholder={t('fields.organizationPlaceholder')}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-semibold text-gray-700">
            {t('fields.role')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 focus:border-transparent transition bg-white pr-10"
            >
              <option value="" disabled>
                {t('fields.rolePlaceholder')}
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {t(`fields.roles.${r}`)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-gray-700">
          {t('fields.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('fields.messagePlaceholder')}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-calmika-teal-400 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-calmika-teal-500 hover:bg-calmika-teal-600 text-white font-semibold font-nunito rounded-full px-8 py-3 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          {t('submit')}
        </button>
        <p className="text-xs text-gray-400 mt-3">{t('disclaimer')}</p>
      </div>
    </form>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqAccordion({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-gray-50 transition-colors duration-150"
            aria-expanded={open === i}
          >
            <span className="font-nunito font-semibold text-calmika-dark text-sm md:text-base">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TerapeutaknaClient() {
  const t = useTranslations('therapists');

  const valueCardKeys = ['cost', 'dualLang', 'offline', 'reports'] as const;
  const steps = t.raw('howItWorks.steps') as Array<{
    number: string;
    title: string;
    description: string;
  }>;
  const evidenceBadges = t.raw('evidence.badges') as string[];
  const faqItems = t.raw('faq.items') as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <main className="bg-calmika-cream">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-calmika-teal-600 via-calmika-teal-500 to-teal-400 py-24 md:py-32 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative container mx-auto px-4 max-w-3xl">
          {/* Badge */}
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/30">
            {t('hero.badge')}
          </span>

          <h1 className="font-nunito text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {t('hero.title')}
          </h1>
          <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Scroll hint */}
          <a
            href="#form"
            className="inline-flex items-center gap-2 mt-10 bg-white text-calmika-teal-600 font-semibold font-nunito rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            {t('form.submit')}
          </a>
        </div>
      </section>

      {/* ── 2. Értékajánlat ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-12">
            {t('value.sectionTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCardKeys.map((key, i) => (
              <ValueCard
                key={key}
                icon={VALUE_ICONS[i]}
                title={t(`value.cards.${key}.title`)}
                description={t(`value.cards.${key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Összehasonlítás ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-3">
            {t('comparison.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-10 text-base max-w-xl mx-auto">
            {t('comparison.sectionSubtitle')}
          </p>
          <ComparisonTable />
        </div>
      </section>

      {/* ── 4. Hogyan működik ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-3">
            {t('howItWorks.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-12 text-base max-w-lg mx-auto">
            {t('howItWorks.sectionSubtitle')}
          </p>
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <HowItWorksStep
                key={i}
                number={step.number}
                title={step.title}
                description={step.description}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Kutatási hivatkozások ────────────────────────────────────────── */}
      <section className="py-20 bg-calmika-teal-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-3">
            {t('evidence.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-10 text-base max-w-xl mx-auto">
            {t('evidence.sectionSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceBadges.map((badge, i) => (
              <EvidenceBadge key={i} text={badge} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Regisztrációs form ───────────────────────────────────────────── */}
      <section id="form" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-3">
            {t('form.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-10 text-base max-w-lg mx-auto">
            {t('form.sectionSubtitle')}
          </p>
          <RegistrationForm />
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-calmika-dark text-center mb-10">
            {t('faq.sectionTitle')}
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ── 8. CTA Bottom ───────────────────────────────────────────────────── */}
      <CtaBottomSection />
    </main>
  );
}
