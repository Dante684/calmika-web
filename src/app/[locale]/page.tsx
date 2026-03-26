import { getTranslations } from 'next-intl/server';
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import SocialProofSection from "@/components/home/social-proof-section"
import { StorySection } from "@/components/home/story-section"
import { CtaBottomSection } from "@/components/shared/cta-bottom-section"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: `${t('siteName')} — ${t('siteDescription')}`,
    description: t('siteDescription'),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <StorySection />
      <CtaBottomSection />
    </>
  )
}
