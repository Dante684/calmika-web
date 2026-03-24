import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Check, X, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CtaBottomSection } from '@/components/shared/cta-bottom-section';

// Feature comparison data
const comparisonRows = [
  { key: 'aac', free: '80 core', pro: '5000+' },
  { key: 'coloring', free: '3 kép', pro: '110+' },
  { key: 'vocab', free: '5 szó', pro: '757' },
  { key: 'music', free: 'Alap', pro: '6 almodul, 15 hangszer' },
  { key: 'schedule', free: 'Alap', pro: 'Teljes + sablonok' },
  { key: 'emotions', free: null, pro: true },
  { key: 'social', free: null, pro: true },
  { key: 'cognitive', free: null, pro: true },
  { key: 'printable', free: null, pro: '86 sablon' },
  { key: 'reports', free: null, pro: true },
  { key: 'dualLang', free: null, pro: '✅ 7 nyelv' },
  { key: 'offline', free: true, pro: true },
] as const;

function FeatureCell({ value }: { value: string | boolean | null }) {
  if (value === null || value === false) {
    return (
      <TableCell className="text-center">
        <X className="h-4 w-4 text-gray-300 mx-auto" />
      </TableCell>
    );
  }
  if (value === true) {
    return (
      <TableCell className="text-center">
        <Check className="h-4 w-4 text-calmika-teal-500 mx-auto" />
      </TableCell>
    );
  }
  return (
    <TableCell className="text-center text-sm text-gray-700">
      {value}
    </TableCell>
  );
}

export default function ArazasPage() {
  const t = useTranslations('pricing');

  return (
    <main className="min-h-screen bg-calmika-cream">
      {/* ── 1. Hero header ── */}
      <section className="py-20 text-center bg-gradient-to-b from-calmika-teal-50 to-calmika-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-nunito text-4xl md:text-5xl font-bold text-calmika-dark mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── 2. Pricing cards ── */}
      <section className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Card 1 — Free */}
          <Card className="relative flex flex-col border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-nunito text-xl font-bold text-calmika-dark">
                  {t('free.name')}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-4xl font-nunito font-extrabold text-calmika-dark">
                  {t('free.price')}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{t('free.period')}</p>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {(t.raw('free.features') as string[]).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-calmika-teal-400 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button variant="outline" className="w-full rounded-full border-calmika-teal-500 text-calmika-teal-600 hover:bg-calmika-teal-50">
                {t('free.cta')}
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2 — Pro Monthly (featured) */}
          <Card className="relative flex flex-col border-2 border-calmika-teal-500 shadow-xl scale-105 bg-white z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-calmika-teal-500 text-white px-4 py-1 text-sm font-semibold rounded-full shadow">
                {t('pro_monthly.badge')}
              </Badge>
            </div>

            <CardHeader className="pb-4 pt-8">
              <span className="font-nunito text-xl font-bold text-calmika-dark">
                {t('pro_monthly.name')}
              </span>
              <div className="mt-2 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-nunito font-extrabold text-calmika-teal-600">
                    🇭🇺 {t('pro_monthly.price_hu')}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  🇪🇺 {t('pro_monthly.price_eu')} &nbsp;·&nbsp; 🇺🇸 {t('pro_monthly.price_us')}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {(t.raw('pro_monthly.features') as string[]).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-calmika-teal-500 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full rounded-full bg-calmika-teal-500 hover:bg-calmika-teal-600 text-white font-semibold">
                {t('pro_monthly.cta')}
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3 — Pro Yearly */}
          <Card className="relative flex flex-col border border-gray-200 shadow-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Badge variant="secondary" className="bg-calmika-gold-400 text-calmika-dark px-3 py-1 text-xs font-semibold rounded-full shadow whitespace-nowrap">
                {t('pro_yearly.badge')}
              </Badge>
              <Badge variant="secondary" className="bg-calmika-teal-100 text-calmika-teal-700 px-3 py-1 text-xs font-semibold rounded-full shadow whitespace-nowrap">
                {t('pro_yearly.savings')}
              </Badge>
            </div>

            <CardHeader className="pb-4 pt-8">
              <span className="font-nunito text-xl font-bold text-calmika-dark">
                {t('pro_yearly.name')}
              </span>
              <div className="mt-2 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-nunito font-extrabold text-calmika-dark">
                    🇭🇺 {t('pro_yearly.price_hu')}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  🇪🇺 {t('pro_yearly.price_eu')} &nbsp;·&nbsp; 🇺🇸 {t('pro_yearly.price_us')}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {(t.raw('pro_yearly.features') as string[]).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-calmika-teal-500 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button variant="outline" className="w-full rounded-full border-calmika-teal-500 text-calmika-teal-600 hover:bg-calmika-teal-50">
                {t('pro_yearly.cta')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── 3. Feature comparison table ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-20">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark text-center mb-8">
          {t('comparison.title')}
        </h2>
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-calmika-teal-50">
                <TableHead className="font-semibold text-calmika-dark w-1/2">
                  {t('comparison.feature')}
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-600">
                  {t('comparison.free')}
                </TableHead>
                <TableHead className="text-center font-semibold text-calmika-teal-600">
                  {t('comparison.pro')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row, i) => (
                <TableRow
                  key={row.key}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
                >
                  <TableCell className="font-medium text-sm text-calmika-dark">
                    {t(`comparison.rows.${row.key}`)}
                  </TableCell>
                  <FeatureCell value={row.free} />
                  <FeatureCell value={row.pro} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* ── 4. Ethics highlight ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-16">
        <div className="bg-calmika-teal-50 border border-calmika-teal-200 rounded-xl p-6 text-center">
          <p className="text-calmika-teal-800 font-semibold text-base leading-relaxed">
            {t('ethics.text')}
          </p>
        </div>
      </section>

      {/* ── 5. Therapist & School tier placeholder ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-16">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 text-center">
          <div className="text-4xl mb-4">🏫</div>
          <h2 className="font-nunito text-2xl font-bold text-calmika-dark mb-3">
            {t('therapists.title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('therapists.subtitle')}</p>
          <Link href="/terapeutaknak">
            <Button variant="outline" className="rounded-full border-calmika-teal-500 text-calmika-teal-600 hover:bg-calmika-teal-50 inline-flex items-center gap-2">
              {t('therapists.cta')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="container mx-auto px-4 max-w-2xl pb-24">
        <h2 className="font-nunito text-2xl font-bold text-calmika-dark text-center mb-8">
          {t('faq.title')}
        </h2>
        <Accordion className="w-full space-y-2">
          {(['q1', 'q2', 'q3', 'q4'] as const).map((qKey) => {
            const aKey = qKey.replace('q', 'a') as 'a1' | 'a2' | 'a3' | 'a4';
            return (
              <AccordionItem
                key={qKey}
                className="border border-gray-200 rounded-xl px-4 bg-white shadow-sm"
              >
                <AccordionTrigger className="font-semibold text-calmika-dark text-left py-4">
                  {t(`faq.${qKey}`)}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {t(`faq.${aKey}`)}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* ── Bottom CTA ── */}
      <CtaBottomSection />
    </main>
  );
}
