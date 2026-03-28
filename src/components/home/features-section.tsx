"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"
import { getScreenshots } from "@/lib/screenshots"

// ─── Wave SVG Divider ─────────────────────────────────────────────────────────

function WaveDivider({ flip = false, color = "#f9f9f7" }: { flip?: boolean; color?: string }) {
  return (
    <div
      className="w-full overflow-hidden leading-[0] pointer-events-none"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[48px] md:h-[60px]"
      >
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

// ─── Feature definitions ──────────────────────────────────────────────────────

interface FeatureItem {
  key: string
  href: string
  screenshot?: string
  screenshotAlt?: string
  icon: string
  /** bento grid span class */
  gridClass?: string
  /** calm corner special styling */
  isHighlight?: boolean
  badge?: string
  /** Card accent color (for background tint) */
  accentColor?: string
  /** No screenshot — use emoji icon display */
  noScreenshot?: boolean
}

function getFeatures(screenshots: ReturnType<typeof getScreenshots>): FeatureItem[] {
  return [
    {
      key: "aac",
      href: "/funkciok/aac",
      screenshot: screenshots.aac,
      screenshotAlt: "AAC kommunikációs tábla Fitzgerald Key színkódolással",
      icon: "💬",
      gridClass: "md:col-span-2",
      badge: "77K+ inflected forms",
      accentColor: "rgba(20,184,166,0.06)",
    },
    {
      key: "napirend",
      href: "/funkciok/napirend",
      screenshot: screenshots.schedule,
      screenshotAlt: "Vizuális napirend modul",
      icon: "📅",
      accentColor: "rgba(249,189,34,0.06)",
    },
    {
      key: "erzelmek",
      href: "/funkciok/erzelmek",
      screenshot: screenshots.emotions,
      screenshotAlt: "Érzelmek modul",
      icon: "🌈",
      accentColor: "rgba(239,68,68,0.05)",
    },
    {
      key: "zeneterpia",
      href: "/funkciok/zeneterpia",
      screenshot: screenshots.music,
      screenshotAlt: "Zeneterápia 4 almodul",
      icon: "🎵",
      accentColor: "rgba(139,92,246,0.06)",
    },
    {
      key: "kifesto",
      href: "/funkciok/kifesto",
      screenshot: screenshots.coloring,
      screenshotAlt: "Kifestő kategóriák",
      icon: "🎨",
      accentColor: "rgba(249,115,22,0.05)",
    },
    {
      key: "nyugi-sarok",
      href: "/funkciok/nyugi-sarok",
      icon: "🌿",
      isHighlight: true,
      badge: "ALWAYS FREE",
      noScreenshot: true,
    },
  ]
}

// ─── Card Components ───────────────────────────────────────────────────────────

interface CardProps {
  feature: FeatureItem
  name: string
  desc: string
}

function FeatureCard({ feature, name, desc }: CardProps) {
  const t = useTranslations("features")
  const isHighlight = feature.isHighlight

  if (isHighlight) {
    // Special calm corner card — gradient bg, no screenshot
    return (
      <Link
        href={feature.href}
        className="group relative flex flex-col rounded-[2rem] overflow-hidden h-full transition-all duration-500 hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #14b8a6 0%, #0e8a78 50%, #065f52 100%)",
          boxShadow: "0 40px 60px rgba(20,184,166,0.20)",
          minHeight: 280,
        }}
      >
        {/* Decorative blobs inside */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", filter: "blur(30px)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: "rgba(249,189,34,0.12)", filter: "blur(40px)" }}
          aria-hidden
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />

        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
          {/* Badge */}
          <span
            className="self-start text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ color: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {feature.badge}
          </span>

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            {feature.icon}
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-nunito font-bold text-2xl mb-2 text-white">
              {name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {desc}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1">
            {t("learnMore")} →
          </div>
        </div>
      </Link>
    )
  }

  // Normal card — responsive layout:
  // Mobile: flex-col (screenshot on top, centered, bigger 160×320)
  // Desktop: flex-row (text left, screenshot right)
  return (
    <Link
      href={feature.href}
      className={cn(
        "group relative flex flex-col md:flex-row md:items-center rounded-[2rem] overflow-hidden h-full",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
      )}
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: feature.accentColor
          ? `radial-gradient(circle at 80% 20%, ${feature.accentColor} 0%, transparent 60%)`
          : undefined,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Content */}
      <div className="relative p-6 flex flex-col gap-3 flex-1">
        {/* Badge */}
        {feature.badge && (
          <span
            className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ color: "#006b5f", backgroundColor: "rgba(20,184,166,0.12)" }}
          >
            {feature.badge}
          </span>
        )}

        {/* Icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: "#b9e9e0" }}
        >
          {feature.icon}
        </div>

        {/* Text */}
        <div>
          <h3
            className="font-nunito font-bold text-xl mb-1"
            style={{ color: "#1a1c1b" }}
          >
            {name}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#3c4947" }}
          >
            {desc}
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-sm font-semibold mt-auto pt-2 transition-all duration-300 group-hover:translate-x-1"
          style={{ color: "#006b5f" }}
        >
          {t("learnMore")} →
        </div>
      </div>

      {/* Screenshot in phone frame */}
      {feature.screenshot && (
        <div className="flex justify-center md:justify-end pt-2 pb-5 md:py-5 md:pr-5 md:pl-0 shrink-0">
          {/* Mobile: 160×320, Desktop: 120×240 */}
          <div
            className="relative overflow-hidden rounded-[1.2rem] w-[160px] h-[320px] md:w-[120px] md:h-[240px]"
            style={{
              backgroundColor: "#1a1c1b",
              padding: 4,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-white">
              <Image
                src={feature.screenshot}
                alt={feature.screenshotAlt ?? name}
                width={360}
                height={800}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  const t = useTranslations("features")
  const locale = useLocale()
  const FEATURES = getFeatures(getScreenshots(locale))

  return (
    <div className="relative">
      {/* Wave top divider */}
      <WaveDivider flip color="#f9f9f7" />

      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#f9f9f7" }}
      >
        {/* Subtle dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(20,184,166,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        {/* Radial gradient blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 10%, rgba(20,184,166,0.05) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 20% 90%, rgba(249,189,34,0.04) 0%, transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

          {/* Header */}
          <BlurFade delay={0}>
            <div className="mb-16 max-w-2xl">
              <span
                className="block text-xs font-bold uppercase tracking-[0.08em] mb-4"
                style={{ color: "#006b5f" }}
              >
                {t("overline")}
              </span>
              <h2
                className="font-nunito text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4"
                style={{ color: "#1a1c1b" }}
              >
                {t("sectionTitle")}
              </h2>
              {/* Decorative teal line */}
              <div
                className="rounded-full mb-6"
                style={{
                  width: 80,
                  height: 3,
                  background: "linear-gradient(90deg, #14b8a6 0%, #006b5f 100%)",
                }}
              />
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: "#3c4947" }}
              >
                {t("sectionSubtitle")}
              </p>
            </div>
          </BlurFade>

          {/* Bento Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            style={{
              gridTemplateRows: "auto",
            }}
          >
            {FEATURES.map((feature, index) => (
              <BlurFade
                key={feature.key}
                delay={0.05 * index}
                className={cn("flex flex-col", feature.gridClass)}
              >
                <FeatureCard
                  feature={feature}
                  name={t(`${feature.key}.name`)}
                  desc={t(`${feature.key}.desc`)}
                />
              </BlurFade>
            ))}
          </div>

          {/* Bottom CTA */}
          <BlurFade delay={0.4}>
            <div className="mt-20 text-center">
              <div
                className="inline-flex items-center gap-4 py-2 pl-6 pr-2 rounded-full"
                style={{
                  backgroundColor: "#eeeeec",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                <p className="text-sm font-medium" style={{ color: "#3c4947" }}>
                  {t("ctaLabel")}
                </p>
                <Link
                  href="/letoltes"
                  className="px-6 py-2 rounded-full font-bold text-sm text-white transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#006b5f" }}
                >
                  {t("ctaButton")}
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Wave bottom divider — before footer */}
      <WaveDivider color="#1a1c1b" />
    </div>
  )
}

export default FeaturesSection
