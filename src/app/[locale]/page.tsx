import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('meta');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-nunito">
          {t('siteName')}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {t('siteDescription')}
        </p>
      </div>
    </main>
  );
}
