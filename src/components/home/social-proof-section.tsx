"use client"

import { useTranslations } from "next-intl"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckStatus = "yes" | "no" | "partial"

interface CompetitorData {
  name: string
  isCalmika?: boolean
  price: string
  platform: string
  aacWords: string
  education: CheckStatus
  dualLang: CheckStatus
  freeTier: CheckStatus
  hungarian: CheckStatus
}

// ─── Data ────────────────────────────────────────────────────────────────────

const competitors: CompetitorData[] = [
  {
    name: "Calmika",
    isCalmika: true,
    price: "€5,99",
    platform: "Android + iOS",
    aacWords: "5000+",
    education: "yes",
    dualLang: "yes",
    freeTier: "yes",
    hungarian: "yes",
  },
  {
    name: "Proloquo2Go",
    price: "$249 (once)",
    platform: "iOS only",
    aacWords: "27,000+",
    education: "no",
    dualLang: "no",
    freeTier: "no",
    hungarian: "no",
  },
  {
    name: "Otsimo",
    price: "€12,99",
    platform: "Android + iOS",
    aacWords: "~1,000",
    education: "partial",
    dualLang: "no",
    freeTier: "partial",
    hungarian: "partial",
  },
  {
    name: "Avaz",
    price: "$9,99",
    platform: "Android + iOS",
    aacWords: "10,000+",
    education: "no",
    dualLang: "partial",
    freeTier: "partial",
    hungarian: "yes",
  },
]

// ─── Check Icon ───────────────────────────────────────────────────────────────

function CheckIcon({ status }: { status: CheckStatus }) {
  if (status === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-calmika-teal-100 text-calmika-teal-600 text-sm font-bold">
        ✓
      </span>
    )
  }
  if (status === "partial") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm">
        ⚠
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 text-sm">
      ✕
    </span>
  )
}

// ─── Stats Row ─────────────────────────────────────────────────────────────────

function StatsRow() {
  const t = useTranslations("socialProof.stats")

  const stats = [
    { value: 5000, suffix: "+", label: t("words") },
    { value: 30, suffix: "+", label: t("modules") },
    { value: 7, suffix: "", label: t("languages") },
    { value: 0, suffix: "", label: t("ads") },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map(({ value, suffix, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-bold text-calmika-teal-600 font-nunito flex items-baseline gap-0.5">
            <NumberTicker
              value={value}
              className="text-4xl md:text-5xl font-bold text-calmika-teal-600"
            />
            {suffix && <span>{suffix}</span>}
          </div>
          <p className="text-sm text-gray-500 mt-2">{label}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Comparison Table ──────────────────────────────────────────────────────────

function ComparisonTable() {
  const t = useTranslations("socialProof.comparison")

  type FeatureKey = "education" | "dualLang" | "freeTier" | "hungarian"

  const checkFeatures: { key: FeatureKey; label: string }[] = [
    { key: "education", label: t("education") },
    { key: "dualLang", label: t("dualLang") },
    { key: "freeTier", label: t("freeTier") },
    { key: "hungarian", label: t("hungarian") },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-center font-nunito text-calmika-dark mb-8">
        {t("title")}
      </h3>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                {t("feature")}
              </th>
              {competitors.map((c) => (
                <th
                  key={c.name}
                  className={cn(
                    "px-6 py-4 text-center font-semibold",
                    c.isCalmika
                      ? "bg-calmika-teal-50 text-calmika-teal-700 border-x-2 border-calmika-teal-500"
                      : "text-gray-600"
                  )}
                >
                  {c.name}
                  {c.isCalmika && (
                    <span className="ml-1.5 text-xs bg-calmika-teal-500 text-white rounded-full px-2 py-0.5">
                      ★
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-700 font-medium">{t("price")}</td>
              {competitors.map((c) => (
                <td
                  key={c.name}
                  className={cn(
                    "px-6 py-4 text-center font-semibold",
                    c.isCalmika
                      ? "bg-calmika-teal-50 border-x-2 border-calmika-teal-500 text-calmika-teal-700"
                      : "text-gray-600"
                  )}
                >
                  {c.price}
                </td>
              ))}
            </tr>

            {/* Platform */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-700 font-medium">{t("platform")}</td>
              {competitors.map((c) => (
                <td
                  key={c.name}
                  className={cn(
                    "px-6 py-4 text-center text-xs",
                    c.isCalmika
                      ? "bg-calmika-teal-50 border-x-2 border-calmika-teal-500 text-calmika-teal-700 font-medium"
                      : "text-gray-500"
                  )}
                >
                  {c.platform}
                </td>
              ))}
            </tr>

            {/* AAC Words */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-700 font-medium">{t("aacWords")}</td>
              {competitors.map((c) => (
                <td
                  key={c.name}
                  className={cn(
                    "px-6 py-4 text-center",
                    c.isCalmika
                      ? "bg-calmika-teal-50 border-x-2 border-calmika-teal-500 text-calmika-teal-700 font-semibold"
                      : "text-gray-600"
                  )}
                >
                  {c.aacWords}
                </td>
              ))}
            </tr>

            {/* Check features */}
            {checkFeatures.map(({ key, label }) => (
              <tr
                key={key}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
              >
                <td className="px-6 py-4 text-gray-700 font-medium">{label}</td>
                {competitors.map((c) => (
                  <td
                    key={c.name}
                    className={cn(
                      "px-6 py-4 text-center",
                      c.isCalmika
                        ? "bg-calmika-teal-50 border-x-2 border-calmika-teal-500"
                        : ""
                    )}
                  >
                    <div className="flex justify-center">
                      <CheckIcon status={c[key]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {competitors.map((c) => (
          <div
            key={c.name}
            className={cn(
              "rounded-2xl border p-5 shadow-sm",
              c.isCalmika
                ? "bg-calmika-teal-50 border-calmika-teal-500 border-2"
                : "bg-white border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h4
                className={cn(
                  "text-lg font-bold font-nunito",
                  c.isCalmika ? "text-calmika-teal-700" : "text-calmika-dark"
                )}
              >
                {c.name}
              </h4>
              {c.isCalmika && (
                <span className="text-xs bg-calmika-teal-500 text-white rounded-full px-2 py-1">
                  Ajánlott
                </span>
              )}
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">{t("price")}</dt>
                <dd className="font-semibold text-gray-800">{c.price}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{t("platform")}</dt>
                <dd className="text-gray-700 text-right max-w-[60%]">{c.platform}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{t("aacWords")}</dt>
                <dd className="font-semibold text-gray-800">{c.aacWords}</dd>
              </div>
              {checkFeatures.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center">
                  <dt className="text-gray-500">{label}</dt>
                  <dd>
                    <CheckIcon status={c[key]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  const t = useTranslations("socialProof.testimonials")

  const placeholders = [0, 1, 2]

  return (
    <div>
      <h3 className="text-2xl font-bold text-center font-nunito text-calmika-dark mb-8">
        {t("title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {placeholders.map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center gap-4"
          >
            {/* Avatar placeholder */}
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            {/* Quote */}
            <blockquote className="text-gray-500 text-sm italic">
              &ldquo;{t("placeholder")}&rdquo;
            </blockquote>
            {/* Name */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {t("name")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function SocialProofSection() {
  const t = useTranslations("socialProof")

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 max-w-6xl space-y-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-nunito text-calmika-dark">
            {t("sectionTitle")}
          </h2>
        </div>

        {/* Stats */}
        <StatsRow />

        {/* Comparison */}
        <ComparisonTable />

        {/* Testimonials */}
        <Testimonials />
      </div>
    </section>
  )
}
