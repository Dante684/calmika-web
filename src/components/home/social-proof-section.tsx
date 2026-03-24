"use client"

import { useTranslations } from "next-intl"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

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
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold"
        style={{ backgroundColor: "#b9e9e0", color: "#006b5f" }}
      >
        ✓
      </span>
    )
  }
  if (status === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
        style={{ backgroundColor: "#fff3cd", color: "#795900" }}
      >
        ⚠
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
      style={{ backgroundColor: "#fde8e8", color: "#c0392b" }}
    >
      ✕
    </span>
  )
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

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
          <div
            className="flex items-baseline gap-0.5 font-nunito font-extrabold text-4xl md:text-5xl"
            style={{ color: "#006b5f" }}
          >
            <NumberTicker
              value={value}
              className="font-nunito font-extrabold text-4xl md:text-5xl"
              style={{ color: "#006b5f" }}
            />
            {suffix && <span>{suffix}</span>}
          </div>
          <p className="text-sm mt-2 font-medium" style={{ color: "#6c7a77" }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

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
      <h3
        className="text-2xl font-bold text-center font-nunito mb-8"
        style={{ color: "#1a1c1b" }}
      >
        {t("title")}
      </h3>

      {/* Desktop table */}
      <div
        className="hidden md:block overflow-x-auto rounded-[1.5rem]"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#eeeeec" }}>
              <th
                className="text-left px-6 py-4 font-semibold rounded-tl-[1.5rem]"
                style={{ color: "#6c7a77" }}
              >
                {t("feature")}
              </th>
              {competitors.map((c, i) => (
                <th
                  key={c.name}
                  className={cn(
                    "px-6 py-4 text-center font-bold",
                    i === competitors.length - 1 ? "rounded-tr-[1.5rem]" : "",
                  )}
                  style={
                    c.isCalmika
                      ? { backgroundColor: "#006b5f", color: "#ffffff" }
                      : { color: "#6c7a77" }
                  }
                >
                  {c.name}
                  {c.isCalmika && (
                    <span
                      className="ml-1.5 text-xs rounded-full px-2 py-0.5"
                      style={{ backgroundColor: "#14b8a6", color: "#ffffff" }}
                    >
                      ★
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <TableRow label={t("price")} competitors={competitors} getValue={(c) => c.price} />
            {/* Platform */}
            <TableRow label={t("platform")} competitors={competitors} getValue={(c) => c.platform} small />
            {/* AAC Words */}
            <TableRow label={t("aacWords")} competitors={competitors} getValue={(c) => c.aacWords} bold />

            {/* Check features */}
            {checkFeatures.map(({ key, label }, idx) => (
              <tr
                key={key}
                className="transition-colors duration-200"
                style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f7" : "#ffffff" }}
              >
                <td className="px-6 py-4 font-medium" style={{ color: "#3c4947" }}>
                  {label}
                </td>
                {competitors.map((c) => (
                  <td
                    key={c.name}
                    className="px-6 py-4"
                    style={c.isCalmika ? { backgroundColor: "rgba(0,107,95,0.05)" } : {}}
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
            className="rounded-[1.5rem] p-5"
            style={
              c.isCalmika
                ? {
                    backgroundColor: "#006b5f",
                    boxShadow: "0 20px 40px rgba(0,107,95,0.25)",
                  }
                : {
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  }
            }
          >
            <div className="flex items-center justify-between mb-4">
              <h4
                className="text-lg font-bold font-nunito"
                style={{ color: c.isCalmika ? "#ffffff" : "#1a1c1b" }}
              >
                {c.name}
              </h4>
              {c.isCalmika && (
                <span
                  className="text-xs rounded-full px-2.5 py-1 font-bold"
                  style={{ backgroundColor: "#14b8a6", color: "#ffffff" }}
                >
                  Recommended
                </span>
              )}
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt style={{ color: c.isCalmika ? "rgba(255,255,255,0.7)" : "#6c7a77" }}>{t("price")}</dt>
                <dd className="font-semibold" style={{ color: c.isCalmika ? "#ffffff" : "#1a1c1b" }}>{c.price}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: c.isCalmika ? "rgba(255,255,255,0.7)" : "#6c7a77" }}>{t("platform")}</dt>
                <dd className="text-right max-w-[60%]" style={{ color: c.isCalmika ? "#ffffff" : "#3c4947" }}>{c.platform}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: c.isCalmika ? "rgba(255,255,255,0.7)" : "#6c7a77" }}>{t("aacWords")}</dt>
                <dd className="font-semibold" style={{ color: c.isCalmika ? "#ffffff" : "#1a1c1b" }}>{c.aacWords}</dd>
              </div>
              {checkFeatures.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center">
                  <dt style={{ color: c.isCalmika ? "rgba(255,255,255,0.7)" : "#6c7a77" }}>{label}</dt>
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

// Helper for table rows
function TableRow({
  label,
  competitors,
  getValue,
  small,
  bold,
}: {
  label: string
  competitors: CompetitorData[]
  getValue: (c: CompetitorData) => string
  small?: boolean
  bold?: boolean
}) {
  return (
    <tr style={{ backgroundColor: "#ffffff" }} className="transition-colors duration-200">
      <td className="px-6 py-4 font-medium" style={{ color: "#3c4947" }}>
        {label}
      </td>
      {competitors.map((c) => (
        <td
          key={c.name}
          className={cn(
            "px-6 py-4 text-center",
            small ? "text-xs" : "text-sm",
            bold ? "font-semibold" : "",
          )}
          style={
            c.isCalmika
              ? { backgroundColor: "rgba(0,107,95,0.05)", color: "#006b5f", fontWeight: 600 }
              : { color: "#3c4947" }
          }
        >
          {getValue(c)}
        </td>
      ))}
    </tr>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function SocialProofSection() {
  const t = useTranslations("socialProof")

  return (
    <section className="py-24" style={{ backgroundColor: "#f4f4f2" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-20">

        {/* Heading */}
        <BlurFade inView delay={0}>
          <div className="text-center">
            <span
              className="block text-xs font-bold uppercase tracking-[0.08em] mb-4"
              style={{ color: "#006b5f" }}
            >
              {t("overline")}
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold font-nunito"
              style={{ color: "#1a1c1b" }}
            >
              {t("sectionTitle")}
            </h2>
          </div>
        </BlurFade>

        {/* Stats */}
        <BlurFade inView delay={0.1}>
          <div
            className="rounded-[2rem] px-8 py-12"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 40px 60px rgba(0,0,0,0.04)",
            }}
          >
            <StatsRow />
          </div>
        </BlurFade>

        {/* Comparison */}
        <BlurFade inView delay={0.2}>
          <ComparisonTable />
        </BlurFade>

      </div>
    </section>
  )
}
