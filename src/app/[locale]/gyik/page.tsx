import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

// ------------------------------------------------------------------
// JSON-LD generator
// ------------------------------------------------------------------

function buildFaqJsonLd(categories: FaqCategory[]): string {
  const allItems = categories.flatMap((cat) => cat.items);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
  return JSON.stringify(schema);
}

// ------------------------------------------------------------------
// Page (Server Component)
// ------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.faq' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function GyikPage() {
  const t = useTranslations('faq');

  // Build category data from translations
  const categories: FaqCategory[] = [
    {
      id: 'altalanos',
      label: t('categories.general'),
      items: [
        { q: t('general.q1'), a: t('general.a1') },
        { q: t('general.q2'), a: t('general.a2') },
        { q: t('general.q3'), a: t('general.a3') },
        { q: t('general.q4'), a: t('general.a4') },
        { q: t('general.q5'), a: t('general.a5') },
      ],
    },
    {
      id: 'arazas',
      label: t('categories.pricing'),
      items: [
        { q: t('pricing.q1'), a: t('pricing.a1') },
        { q: t('pricing.q2'), a: t('pricing.a2') },
        { q: t('pricing.q3'), a: t('pricing.a3') },
        { q: t('pricing.q4'), a: t('pricing.a4') },
      ],
    },
    {
      id: 'terapeutaknak',
      label: t('categories.therapists'),
      items: [
        { q: t('therapists.q1'), a: t('therapists.a1') },
        { q: t('therapists.q2'), a: t('therapists.a2') },
      ],
    },
    {
      id: 'adatvedelem',
      label: t('categories.privacy'),
      items: [
        { q: t('privacy.q1'), a: t('privacy.a1') },
        { q: t('privacy.q2'), a: t('privacy.a2') },
      ],
    },
  ];

  const jsonLd = buildFaqJsonLd(categories);

  return (
    <>
      {/* JSON-LD structured data */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main>
        {/* ── Header ── */}
        <section className="pt-24 pb-12 text-center bg-gradient-to-b from-calmika-teal-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <span className="inline-block text-4xl mb-4" aria-hidden="true">
              💬
            </span>
            <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-4">
              {t('header.title')}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl">
              {t('header.subtitle')}
            </p>
          </div>
        </section>

        {/* ── Tabs + Accordions ── */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <Tabs defaultValue="altalanos" className="w-full">
              {/* Tab headers */}
              <TabsList className="flex flex-wrap h-auto gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex-1 min-w-[7rem] rounded-lg text-sm font-semibold data-[state=active]:bg-calmika-teal-500 data-[state=active]:text-white"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab content */}
              {categories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id}>
                  <Accordion className="w-full space-y-2">
                    {cat.items.map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`item-${idx}`}
                        className="border border-gray-200 rounded-xl px-2 shadow-sm"
                      >
                        <AccordionTrigger className="text-left font-semibold text-calmika-dark hover:text-calmika-teal-600 hover:no-underline py-5">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ── Bottom contact CTA ── */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4 max-w-xl">
            <p className="text-gray-500 text-lg mb-3">{t('contact.notFound')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 bg-calmika-teal-500 text-white font-semibold rounded-full px-7 py-3 hover:bg-calmika-teal-600 transition-colors duration-200"
              >
                {t('contact.contactLink')}
              </Link>
              <a
                href="mailto:hello@calmika.com"
                className="inline-flex items-center gap-2 border border-calmika-teal-400 text-calmika-teal-600 font-semibold rounded-full px-7 py-3 hover:bg-calmika-teal-50 transition-colors duration-200"
              >
                hello@calmika.com
              </a>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <CtaBottomSection />
      </main>
    </>
  );
}
