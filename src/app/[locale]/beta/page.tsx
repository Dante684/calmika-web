import BetaClient from './beta-client';
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isHu = locale === 'hu';
  return {
    title: `${isHu ? 'Béta program' : locale === 'pl' ? 'Program beta' : 'Beta program'}`,
    description: isHu
      ? 'Légy az elsők között — korai hozzáférés + ingyenes Pro előfizetés béta tesztelőknek.'
      : locale === 'pl'
      ? 'Bądź wśród pierwszych — wczesny dostęp + bezpłatna subskrypcja Pro dla testerów beta.'
      : 'Be among the first — early access + free Pro subscription for beta testers.',
    alternates: getSeoAlternates('/beta', locale),
  };
}

export default function BetaPage() {
  return <BetaClient />;
}
