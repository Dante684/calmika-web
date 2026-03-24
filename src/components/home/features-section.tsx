"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"

const iconMap = {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
} as const

type IconKey = keyof typeof iconMap

interface FeatureItem {
  key: string
  icon: IconKey
  href: string
  /** ha a nyugi-sarok → mindig ingyenes badge */
  badge?: string
}

const FEATURES: FeatureItem[] = [
  { key: "aac",        icon: "MessageSquare", href: "/funkciok/aac" },
  { key: "napirend",   icon: "Calendar",      href: "/funkciok/napirend" },
  { key: "erzelmek",   icon: "Heart",         href: "/funkciok/erzelmek" },
  { key: "szocialis",  icon: "Users",         href: "/funkciok/szocialis" },
  { key: "szotanulas", icon: "BookOpen",      href: "/funkciok/szotanulas" },
  { key: "zeneterpia", icon: "Music",         href: "/funkciok/zeneterpia" },
  { key: "kifesto",    icon: "Palette",       href: "/funkciok/kifesto" },
  { key: "nyugi-sarok", icon: "CloudSun",     href: "/funkciok/nyugi-sarok", badge: "FREE" },
]

interface FeatureCardProps {
  feature: FeatureItem
  name: string
  desc: string
  learnMore: string
}

function FeatureCard({ feature, name, desc, learnMore }: FeatureCardProps) {
  const Icon = iconMap[feature.icon]

  return (
    <Link
      href={feature.href}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-white p-6",
        "hover:shadow-lg transition-all duration-300",
        "dark:bg-zinc-900 dark:border-zinc-800 dark:hover:shadow-zinc-900/50",
        // teal accent border on hover
        "hover:border-teal-200 dark:hover:border-teal-800"
      )}
    >
      {/* FREE badge */}
      {feature.badge && (
        <span className="absolute top-4 right-4 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
          {feature.badge}
        </span>
      )}

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
      </div>

      {/* Text */}
      <h3 className="font-nunito text-lg font-bold text-zinc-900 dark:text-zinc-50">
        {name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 flex-1">
        {desc}
      </p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
        {learnMore}
        <ArrowRight className="h-4 w-4" />
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10" />
    </Link>
  )
}

export function FeaturesSection() {
  const t = useTranslations("features")

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <BlurFade inView delay={0}>
          <div className="mb-12 text-center">
            <h2 className="font-nunito text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {t("sectionTitle")}
            </h2>
            <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
              {t("sectionSubtitle")}
            </p>
          </div>
        </BlurFade>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <BlurFade key={feature.key} inView delay={0.05 * index}>
              <FeatureCard
                feature={feature}
                name={t(`${feature.key}.name`)}
                desc={t(`${feature.key}.desc`)}
                learnMore={t("learnMore")}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
