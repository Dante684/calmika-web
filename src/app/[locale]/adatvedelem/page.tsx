import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Shield } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

// ── Prose helpers ─────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-nunito text-xl font-bold text-calmika-dark mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-calmika-teal-50 border-l-4 border-calmika-teal-500 rounded-r-xl px-5 py-4 my-4">
      <p className="text-calmika-dark font-semibold text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdatvedelemPage() {
  const t = useTranslations('privacy');

  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-12 text-center bg-gradient-to-b from-calmika-teal-50 to-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Shield className="h-14 w-14 text-calmika-teal-500 mx-auto mb-5" />
          <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
          <p className="text-xs text-gray-400 mt-3">{t('lastUpdated')}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* 1. Bevezetés */}
          <Section title={t('s1.title')}>
            <p>{t('s1.p1')}</p>
            <p>{t('s1.p2')}</p>
          </Section>

          {/* 2. Milyen adatokat gyűjtünk */}
          <Section title={t('s2.title')}>
            <p>{t('s2.p1')}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>{t('s2.item1')}</li>
              <li>{t('s2.item2')}</li>
            </ul>
            <p>{t('s2.p2')}</p>
          </Section>

          {/* 3. Gyerekek adatai — KIEMELT */}
          <Section title={t('s3.title')}>
            <Highlight>{t('s3.highlight')}</Highlight>
            <p>{t('s3.p1')}</p>
            <p>{t('s3.p2')}</p>
          </Section>

          {/* 4. Sütik */}
          <Section title={t('s4.title')}>
            <p>{t('s4.p1')}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>{t('s4.item1')}</li>
              <li>{t('s4.item2')}</li>
            </ul>
          </Section>

          {/* 5. Harmadik felek */}
          <Section title={t('s5.title')}>
            <p>{t('s5.p1')}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>{t('s5.item1')}</li>
              <li>{t('s5.item2')}</li>
            </ul>
            <p>{t('s5.p2')}</p>
          </Section>

          {/* 6. Adatok törlése */}
          <Section title={t('s6.title')}>
            <p>{t('s6.p1')}</p>
            <p>
              <a
                href="mailto:hello@calmika.com"
                className="text-calmika-teal-600 hover:underline font-semibold"
              >
                hello@calmika.com
              </a>
            </p>
          </Section>

          {/* 7. Kapcsolat */}
          <Section title={t('s7.title')}>
            <p>{t('s7.p1')}</p>
            <p>
              <a
                href="mailto:hello@calmika.com"
                className="text-calmika-teal-600 hover:underline font-semibold"
              >
                hello@calmika.com
              </a>
            </p>
          </Section>

          {/* 8. Módosítások */}
          <Section title={t('s8.title')}>
            <p>{t('s8.p1')}</p>
          </Section>

        </div>
      </section>
    </main>
  );
}
