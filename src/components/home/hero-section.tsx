"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Particles } from "@/components/magicui/particles"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ShinyButton } from "@/components/magicui/shiny-button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
      {/* Teal particles background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        staticity={60}
        ease={70}
        size={0.5}
        color="#14b8a6"
      />
      {/* Gold accent particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={30}
        staticity={80}
        ease={90}
        size={0.8}
        color="#f59e0b"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left / Top: Text content */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <BlurFade delay={0} duration={0.5}>
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full",
                  "border border-teal-400/40 bg-teal-950/50 backdrop-blur-sm",
                  "px-4 py-1.5 text-sm font-medium text-teal-300"
                )}
              >
                {t("badge")}
              </span>
            </BlurFade>

            {/* Headline with blur-fade animation */}
            <BlurFade delay={0.1} duration={0.7} blur="14px">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-nunito">
                {t("title")}
              </h1>
            </BlurFade>

            {/* Subtitle */}
            <BlurFade delay={0.2} duration={0.6}>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                {t("subtitle")}
              </p>
            </BlurFade>

            {/* CTA buttons */}
            <BlurFade delay={0.3} duration={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">

                {/* Primary: ShinyButton wrapped in Link */}
                <ShinyButton
                  onClick={() => { window.location.href = "/letoltes" }}
                  className={cn(
                    "bg-teal-500 border-teal-400 text-white",
                    "hover:bg-teal-400",
                    "px-8 py-3 text-base font-semibold rounded-xl normal-case",
                    "[--primary:#14b8a6]"
                  )}
                >
                  {t("ctaPrimary")}
                </ShinyButton>

                {/* Secondary: outlined link-styled button */}
                <Link
                  href="/funkciok"
                  className={cn(
                    "inline-flex items-center justify-center",
                    "rounded-xl border border-slate-500 px-8 py-3",
                    "text-base font-semibold text-slate-200",
                    "transition-colors duration-200",
                    "hover:bg-slate-800 hover:text-white hover:border-teal-400"
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Right / Bottom: App mockup placeholder */}
          <BlurFade delay={0.4} duration={0.7} direction="left">
            <div className="flex justify-center md:justify-end">
              <div
                className={cn(
                  "w-[300px] h-[600px]",
                  "rounded-3xl border border-teal-500/30",
                  "shadow-2xl shadow-teal-500/20",
                  "bg-gradient-to-b from-teal-600/30 via-teal-800/40 to-slate-900/60",
                  "backdrop-blur-sm",
                  "flex items-center justify-center",
                  "relative overflow-hidden"
                )}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-amber-400/5 rounded-3xl" />
                <div className="relative z-10 text-center px-6">
                  <div className="text-5xl mb-4">📱</div>
                  <p className="text-teal-300/70 text-sm font-medium">App screenshot</p>
                  <p className="text-slate-500 text-xs mt-1">hamarosan</p>
                </div>
              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
