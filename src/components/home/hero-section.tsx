"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

// ─── Star Particles ───────────────────────────────────────────────────────────
const PARTICLES = [
  { top: "15%", left: "10%", scale: 0.8 },
  { top: "25%", left: "85%", scale: 1.2 },
  { top: "65%", left: "5%", scale: 0.5 },
  { top: "85%", left: "45%", scale: 1.5 },
  { top: "45%", left: "95%", scale: 0.9 },
  { top: "10%", left: "50%", scale: 1.1 },
]

function StarParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#f9bd22] opacity-40"
          style={{ top: p.top, left: p.left, transform: `scale(${p.scale})` }}
        />
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#f9f9f7" }}
    >
      <StarParticles />

      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          backgroundColor: "#f9bd22",
          filter: "blur(100px)",
          opacity: 0.12,
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          backgroundColor: "#14b8a6",
          filter: "blur(100px)",
          opacity: 0.08,
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-14 lg:gap-24">

          {/* ── Left: Text ── */}
          <div className="flex-1 space-y-8 text-center md:text-left">

            {/* Overline badge */}
            <BlurFade delay={0} duration={0.5}>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: "#b9e9e0", color: "#006b5f" }}>
                {t("badge")}
              </div>
            </BlurFade>

            {/* Headline */}
            <BlurFade delay={0.1} duration={0.7} blur="14px">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tighter font-nunito"
                style={{ color: "#1a1c1b" }}
              >
                {t("titleLine1")}{" "}
                <br className="hidden md:block" />
                <span style={{ color: "#006b5f" }} className="italic">
                  {t("titleLine2")}
                </span>
              </h1>
            </BlurFade>

            {/* Subtitle */}
            <BlurFade delay={0.2} duration={0.6}>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0"
                style={{ color: "#3c4947", fontFamily: "var(--font-inter, Inter, sans-serif)" }}
              >
                {t("subtitle")}
              </p>
            </BlurFade>

            {/* CTA Buttons */}
            <BlurFade delay={0.3} duration={0.5}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                {/* Primary pill */}
                <Link
                  href="/letoltes"
                  className={cn(
                    "w-full sm:w-auto px-8 py-4 rounded-full font-nunito font-bold text-lg text-white",
                    "transition-all duration-300 hover:scale-105 active:scale-95",
                  )}
                  style={{
                    background: "linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)",
                    boxShadow: "0 20px 40px rgba(20,184,166,0.25)",
                  }}
                >
                  {t("ctaPrimary")}
                </Link>

                {/* Secondary pill — no border, tonal bg */}
                <Link
                  href="/funkciok"
                  className={cn(
                    "w-full sm:w-auto px-8 py-4 rounded-full font-nunito font-bold text-lg",
                    "transition-all duration-300 hover:opacity-80",
                  )}
                  style={{
                    backgroundColor: "#eeeeec",
                    color: "#3c4947",
                  }}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </BlurFade>

            {/* Trust badges */}
            <BlurFade delay={0.4} duration={0.5}>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#3c4947", fontFamily: "var(--font-inter, Inter, sans-serif)" }}
                  >
                    {t("trustRated")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#3c4947", fontFamily: "var(--font-inter, Inter, sans-serif)" }}
                  >
                    {t("trustValidated")}
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* ── Right: Phone Mockup ── */}
          <BlurFade delay={0.4} duration={0.7} direction="left" className="flex-1 relative">
            {/* Yellow blob behind phone */}
            <div
              className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
              style={{ backgroundColor: "#f9bd22", filter: "blur(80px)", opacity: 0.18 }}
              aria-hidden
            />
            <div
              className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full pointer-events-none"
              style={{ backgroundColor: "#14b8a6", filter: "blur(80px)", opacity: 0.12 }}
              aria-hidden
            />

            <div className="relative z-10 mx-auto" style={{ maxWidth: 320 }}>
              {/* Phone frame */}
              <div
                className="relative p-3 rounded-[3rem] overflow-hidden"
                style={{
                  backgroundColor: "#1a1c1b",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 8px #1a1c1b",
                }}
              >
                {/* Notch */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 rounded-b-2xl z-20"
                  style={{ backgroundColor: "#1a1c1b" }}
                />
                <Image
                  src="/images/screenshots/01-home.png"
                  alt={t("mockupAlt")}
                  width={294}
                  height={636}
                  className="w-full rounded-[2.25rem] relative z-10"
                  style={{ aspectRatio: "9/19.5", objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Floating card – Progress */}
              <div
                className="absolute -left-12 top-1/4 flex items-center gap-3 p-3.5 rounded-2xl"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.10)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                  style={{ backgroundColor: "#b9e9e0" }}
                >
                  ❤️
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#6c7a77" }}>
                    Progress
                  </p>
                  <p className="text-xs font-bold" style={{ color: "#1a1c1b" }}>
                    New milestone!
                  </p>
                </div>
              </div>

              {/* Floating card – AAC */}
              <div
                className="absolute -right-8 bottom-1/4 flex items-center gap-3 p-3.5 rounded-2xl"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.10)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                  style={{ backgroundColor: "#f9bd22" }}
                >
                  💬
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#6c7a77" }}>
                    AAC Tool
                  </p>
                  <p className="text-xs font-bold" style={{ color: "#1a1c1b" }}>
                    &ldquo;I want juice&rdquo;
                  </p>
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
