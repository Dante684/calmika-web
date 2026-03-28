import type { Metadata } from 'next';
import { Nunito, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getSeoAlternates } from '@/lib/seo';
import '../globals.css';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      template: '%s — Calmika',
      default: 'Calmika — Autism-friendly educational app',
    },
    description: 'Calmika – Autism-friendly educational app for children',
    alternates: getSeoAlternates('/', locale),
    openGraph: {
      title: 'Calmika — Autism-friendly educational app',
      description: 'AAC communication, visual schedules, music therapy and 30+ modules for children with ASD.',
      url: 'https://calmika.com',
      siteName: 'Calmika',
      locale: 'hu_HU',
      type: 'website',
      images: [
        {
          url: 'https://calmika-web.vercel.app/hu/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Calmika — Autism-friendly educational app',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Calmika',
      description: 'AAC communication, visual schedules, music therapy and 30+ modules for children with ASD.',
      images: ['https://calmika-web.vercel.app/hu/opengraph-image'],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Érvénytelen locale → 404
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${nunito.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
