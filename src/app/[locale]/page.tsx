import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import SocialProofSection from "@/components/home/social-proof-section"
import { StorySection } from "@/components/home/story-section"
import { CtaBottomSection } from "@/components/shared/cta-bottom-section"

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
