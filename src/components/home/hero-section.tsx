"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"
import { getScreenshots } from "@/lib/screenshots"

// ─── Star Particles ───────────────────────────────────────────────────────────
const PARTICLES = [
  { top: "12%", left: "8%", scale: 1.4, opacity: 0.6 },
  { top: "22%", left: "82%", scale: 1.8, opacity: 0.5 },
  { top: "62%", left: "4%", scale: 0.9, opacity: 0.5 },
  { top: "82%", left: "42%", scale: 2.2, opacity: 0.4 },
  { top: "42%", left: "93%", scale: 1.3, opacity: 0.6 },
  { top: "8%", left: "48%", scale: 1.6, opacity: 0.5 },
  { top: "35%", left: "18%", scale: 1.0, opacity: 0.4 },
  { top: "70%", left: "75%", scale: 1.1, opacity: 0.35 },
  { top: "55%", left: "55%", scale: 0.7, opacity: 0.3 },
]

function StarParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#f9bd22]"
          style={{
            top: p.top,
            left: p.left,
            width: 6,
            height: 6,
            opacity: p.opacity,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
      {/* A few larger star shapes */}
      {[
        { top: "28%", left: "72%", size: 10, opacity: 0.18 },
        { top: "75%", left: "20%", size: 8, opacity: 0.15 },
        { top: "18%", left: "35%", size: 7, opacity: 0.12 },
      ].map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute pointer-events-none"
          style={{ top: s.top, left: s.left, opacity: s.opacity }}
        >
          <svg width={s.size * 2} height={s.size * 2} viewBox="0 0 20 20" fill="#f9bd22">
            <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
          </svg>
        </div>
      ))}
    </div>
  )
}

// ─── Phone Fan ────────────────────────────────────────────────────────────────

function PhoneFan() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const screenshots = getScreenshots(locale)

  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 380 }}>
      {/* Glow blob behind the fan */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(20,184,166,0.14) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-8 -right-8 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: "#f9bd22", filter: "blur(90px)", opacity: 0.2 }}
        aria-hidden
      />
      <div
        className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: "#14b8a6", filter: "blur(80px)", opacity: 0.15 }}
        aria-hidden
      />

      {/* Left phone — rotated -15deg, behind — hidden on mobile */}
      <div
        className="absolute hidden md:block"
        style={{
          transform: "rotate(-15deg) translateX(-60px) translateY(20px)",
          zIndex: 1,
          left: "50%",
          marginLeft: -100,
          top: 40,
        }}
      >
        <div
          className="relative p-2.5 rounded-[2rem] overflow-hidden"
          style={{
            backgroundColor: "#1a1c1b",
            boxShadow: "0 30px 60px rgba(0,0,0,0.28), 0 0 0 6px #2a2c2b",
            width: 160,
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-b-xl z-20"
            style={{ backgroundColor: "#1a1c1b" }}
          />
          <Image
            src={screenshots.aac}
            alt="AAC tábla"
            width={155}
            height={335}
            className="w-full rounded-[1.5rem] relative z-10"
            style={{ aspectRatio: "9/19.5", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Right phone — rotated +15deg, behind — hidden on mobile */}
      <div
        className="absolute hidden md:block"
        style={{
          transform: "rotate(15deg) translateX(60px) translateY(20px)",
          zIndex: 1,
          left: "50%",
          marginLeft: -60,
          top: 40,
        }}
      >
        <div
          className="relative p-2.5 rounded-[2rem] overflow-hidden"
          style={{
            backgroundColor: "#1a1c1b",
            boxShadow: "0 30px 60px rgba(0,0,0,0.28), 0 0 0 6px #2a2c2b",
            width: 160,
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-b-xl z-20"
            style={{ backgroundColor: "#1a1c1b" }}
          />
          <Image
            src={screenshots.music}
            alt="Zeneterápia"
            width={155}
            height={335}
            className="w-full rounded-[1.5rem] relative z-10"
            style={{ aspectRatio: "9/19.5", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Center phone — main, front */}
      <div className="relative z-10 mx-auto w-[180px] md:w-[220px]">
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
            src={screenshots.home}
            alt={t("mockupAlt")}
            width={204}
            height={441}
            className="w-full rounded-[2.25rem] relative z-10"
            style={{ aspectRatio: "9/19.5", objectFit: "cover" }}
            priority
          />
        </div>

        {/* Floating card – Progress — hidden on mobile */}
        <div
          className="absolute -left-16 top-1/4 hidden md:flex items-center gap-3 p-3.5 rounded-2xl"
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

        {/* Floating card – AAC — hidden on mobile */}
        <div
          className="absolute -right-10 bottom-1/4 hidden md:flex items-center gap-3 p-3.5 rounded-2xl"
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

      {/* Decorative background blobs */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,189,34,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(20,184,166,0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(20,184,166,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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

                {/* Secondary pill */}
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

              {/* Trusted by row */}
              <div
                className="flex items-center justify-center md:justify-start gap-2 mt-4"
                style={{ color: "#6c7a77" }}
              >
                <span className="text-base">👨‍👩‍👧</span>
                <span className="text-base">🧩</span>
                <span className="text-base">⭐</span>
                <span
                  className="text-sm font-semibold ml-1"
                  style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
                >
                  Trusted by 100+ families
                </span>
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

          {/* ── Right: Phone Fan ── */}
          <BlurFade delay={0.35} duration={0.7} direction="left" className="flex-1 w-full">
            <PhoneFan />
          </BlurFade>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
