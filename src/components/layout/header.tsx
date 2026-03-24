'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { Menu, X, Star } from 'lucide-react';
import {
  MessageSquare, Calendar, Heart, Users, BookOpen,
  Music, Palette, CloudSun, Puzzle, Shield,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { features } from '@/lib/features-data';

const iconMap = {
  MessageSquare,
  Calendar,
  Heart,
  Users,
  BookOpen,
  Music,
  Palette,
  CloudSun,
  Puzzle,
  Shield,
} as const;

type IconName = keyof typeof iconMap;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: 'hu' | 'en') => {
    // Cast to any to handle dynamic routes like /funkciok/[module]
    router.replace(pathname as any, { locale: newLocale });
  };

  const navLinks = [
    { key: 'pricing', label: t('pricing'), href: '/arazas' as const },
    { key: 'therapists', label: t('therapists'), href: '/terapeutaknak' as const },
    { key: 'blog', label: t('blog'), href: '/blog' as const },
    { key: 'about', label: t('about'), href: '/rolunk' as const },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-calmika-teal-100 bg-white/80 backdrop-blur-lg transition-all duration-200 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Star className="h-7 w-7 text-calmika-teal-500 fill-calmika-teal-300" />
          <span className="font-nunito font-bold text-xl text-calmika-teal-600">
            Calmika
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Funkciók dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-calmika-teal-50 text-gray-700 font-medium">
                  {t('features')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-1 p-4 w-[480px]">
                    {features.map((feature) => {
                      const Icon = iconMap[feature.icon as IconName];
                      const name = locale === 'hu' ? feature.huName : feature.enName;
                      return (
                        <li key={feature.key}>
                          <Link
                            href={feature.href as any}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-calmika-teal-50 hover:text-calmika-teal-700 transition-colors"
                          >
                            {Icon && <Icon className="h-4 w-4 text-calmika-teal-500 shrink-0" />}
                            <span>{name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Other nav links */}
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.key}>
                  <Link
                    href={link.href as any}
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-calmika-teal-50 hover:text-calmika-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full border border-gray-200 overflow-hidden">
            <button
              onClick={() => switchLocale('hu')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                locale === 'hu'
                  ? 'bg-calmika-teal-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HU
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                locale === 'en'
                  ? 'bg-calmika-teal-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA Button */}
          <Link
            href="/letoltes"
            className="inline-flex items-center justify-center rounded-full bg-calmika-teal-500 text-white hover:bg-calmika-teal-600 px-6 py-2 text-sm font-semibold transition-colors"
          >
            {t('download')}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            aria-label="Menü megnyitása"
            className="lg:hidden p-2 text-gray-700 hover:text-calmika-teal-600 bg-transparent border-0"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[360px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-calmika-teal-500 fill-calmika-teal-300" />
                  <span className="font-nunito font-bold text-lg text-calmika-teal-600">
                    Calmika
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-1">
              {/* Funkciók section */}
              <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('features')}
              </p>
              {features.map((feature) => {
                const Icon = iconMap[feature.icon as IconName];
                const name = locale === 'hu' ? feature.huName : feature.enName;
                return (
                  <Link
                    key={feature.key}
                    href={feature.href as any}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-calmika-teal-50 hover:text-calmika-teal-700 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4 text-calmika-teal-500 shrink-0" />}
                    <span>{name}</span>
                  </Link>
                );
              })}

              <div className="my-2 h-px bg-gray-100" />

              {/* Main nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href as any}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-calmika-teal-50 hover:text-calmika-teal-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-gray-100" />

              {/* Language Switcher */}
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-sm text-gray-500">Nyelv:</span>
                <div className="flex items-center rounded-full border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => {
                      switchLocale('hu');
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      locale === 'hu'
                        ? 'bg-calmika-teal-500 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    HU
                  </button>
                  <button
                    onClick={() => {
                      switchLocale('en');
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      locale === 'en'
                        ? 'bg-calmika-teal-500 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-3 pt-2">
                <Link
                  href="/letoltes"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-full bg-calmika-teal-500 text-white hover:bg-calmika-teal-600 px-6 py-2.5 text-sm font-semibold transition-colors"
                >
                  {t('download')}
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
