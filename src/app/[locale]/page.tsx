import { getTranslations } from 'next-intl/server';
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import SocialProofSection from "@/components/home/social-proof-section"
import { StorySection } from "@/components/home/story-section"
import { CtaBottomSection } from "@/components/shared/cta-bottom-section"
import { JsonLd } from "@/components/seo/JsonLd"
import { getSeoAlternates } from '@/lib/seo';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Calmika',
  url: 'https://calmika-web.vercel.app',
  logo: 'https://calmika-web.vercel.app/images/logo.png',
  description: 'Autism-friendly educational app for children with ASD',
  email: 'hello@calmika.com',
  sameAs: [] as string[],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Calmika',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'AAC communication, visual schedules, music therapy and 30+ modules for children with autism',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteDescription'),
    description: t('siteDescription'),
    alternates: getSeoAlternates('/', locale),
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <StorySection />
      <CtaBottomSection />
    </>
  )
}
