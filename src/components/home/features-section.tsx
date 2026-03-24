"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

// ─── Feature definitions ──────────────────────────────────────────────────────

interface FeatureItem {
  key: string
  href: string
  screenshot: string
  screenshotAlt: string
  icon: string
  /** bento grid span class */
  gridClass?: string
  /** calm corner special styling */
  isHighlight?: boolean
  badge?: string
}

const FEATURES: FeatureItem[] = [
  {
    key: "aac",
    href: "/funkciok/aac",
    screenshot: "/images/screenshots/10-kommunikacio.png",
    screenshotAlt: "AAC kommunikációs tábla Fitzgerald Key színkódolással",
    icon: "💬",
    gridClass: "md:col-span-2",
    badge: "5000+ Words",
  },
  {
    key: "napirend",
    href: "/funkciok/napirend",
    screenshot: "/images/screenshots/16-napirend.png",
    screenshotAlt: "Vizuális napirend modul",
    icon: "📅",
  },
  {
    key: "erzelmek",
    href: "/funkciok/erzelmek",
    screenshot: "/images/screenshots/15-erzelmek.png",
    screenshotAlt: "Érzelmek modul",
    icon: "🌈",
  },
  {
    key: "zeneterpia",
    href: "/funkciok/zeneterpia",
    screenshot: "/images/screenshots/14-zene.png",
    screenshotAlt: "Zeneterápia 4 almodul",
    icon: "🎵",
  },
  {
    key: "kifesto",
    href: "/funkciok/kifesto",
    screenshot: "/images/screenshots/13-kifesto.png",
    screenshotAlt: "Kifestő kategóriák",
    icon: "🎨",
  },
  {
    key: "nyugi-sarok",
    href: "/funkciok/nyugi-sarok",
    screenshot: "/images/screenshots/01-home.png",
    screenshotAlt: "Calmika alkalmazás Nyugi Sarok",
    icon: "🌿",
    isHighlight: true,
    badge: "ALWAYS FREE",
  },
]

// ─── Card Components ───────────────────────────────────────────────────────────

interface CardProps {
  feature: FeatureItem
  name: string
  desc: string
}

function FeatureCard({ feature, name, desc }: CardProps) {
  const isHighlight = feature.isHighlight

  return (
    <Link
      href={feature.href}
      className={cn(
        "group relative flex flex-col rounded-[2rem] overflow-hidden h-full",
        "transition-all duration-500",
      )}
      style={{
        backgroundColor: isHighlight ? "#14b8a6" : "#ffffff",
        boxShadow: isHighlight
          ? "0 40px 60px rgba(20,184,166,0.15)"
          : "0 40px 60px rgba(0,0,0,0.03)",
      }}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <Image
          src={feature.screenshot}
          alt={feature.screenshotAlt}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: isHighlight
              ? "linear-gradient(to bottom, transparent 40%, rgba(20,184,166,0.85) 100%)"
              : "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative p-6 flex flex-col gap-3 flex-1">
        {/* Badge */}
        {feature.badge && (
          <span
            className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={
              isHighlight
                ? { color: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.2)" }
                : { color: "#006b5f", backgroundColor: "rgba(20,184,166,0.12)" }
            }
          >
            {feature.badge}
          </span>
        )}

        {/* Icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: isHighlight ? "rgba(255,255,255,0.2)" : "#b9e9e0" }}
        >
          {feature.icon}
        </div>

        {/* Text */}
        <div>
          <h3
            className="font-nunito font-bold text-xl mb-1"
            style={{ color: isHighlight ? "#ffffff" : "#1a1c1b" }}
          >
            {name}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: isHighlight ? "rgba(255,255,255,0.8)" : "#3c4947" }}
          >
            {desc}
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-sm font-semibold mt-auto pt-2 transition-all duration-300 group-hover:translate-x-1"
          style={{ color: isHighlight ? "#ffffff" : "#006b5f" }}
        >
          {isHighlight ? "Open Now" : "Learn more"} →
        </div>
      </div>
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  const t = useTranslations("features")

  return (
    <section className="py-24" style={{ backgroundColor: "#f9f9f7" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <BlurFade inView delay={0}>
          <div className="mb-16 max-w-2xl">
            <span
              className="block text-xs font-bold uppercase tracking-[0.08em] mb-4"
              style={{ color: "#006b5f" }}
            >
              {t("overline")}
            </span>
            <h2
              className="font-nunito text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{ color: "#1a1c1b" }}
            >
              {t("sectionTitle")}
            </h2>
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
              inView
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
        <BlurFade inView delay={0.4}>
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
  )
}

export default FeaturesSection
