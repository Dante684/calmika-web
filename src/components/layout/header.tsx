'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
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
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundColor: 'rgba(249,249,247,0.70)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled
          ? '0 20px 40px rgba(0,0,0,0.04)'
          : '0 1px 0 rgba(0,0,0,0.04)',
        paddingTop: scrolled ? '0.5rem' : '0.875rem',
        paddingBottom: scrolled ? '0.5rem' : '0.875rem',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles
            className="h-6 w-6"
            style={{ color: '#14b8a6', fill: 'rgba(20,184,166,0.3)' }}
          />
          <span
            className="font-nunito font-bold text-xl tracking-tighter"
            style={{ color: '#006b5f' }}
          >
            Calmika
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Funkciók dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ backgroundColor: 'transparent', color: '#3c4947' }}
                >
                  {t('features')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className="grid grid-cols-2 gap-1 p-4 w-[480px] rounded-2xl"
                    style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.10)' }}
                  >
                    {features.map((feature) => {
                      const Icon = iconMap[feature.icon as IconName];
                      const name = locale === 'hu' ? feature.huName : feature.enName;
                      return (
                        <li key={feature.key}>
                          <Link
                            href={feature.href as any}
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200"
                            style={{ color: '#3c4947' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f4f4f2';
                              e.currentTarget.style.color = '#006b5f';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#3c4947';
                            }}
                          >
                            {Icon && (
                              <Icon
                                className="h-4 w-4 shrink-0"
                                style={{ color: '#14b8a6' }}
                              />
                            )}
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
                    className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: '#6c7a77' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#006b5f';
                      e.currentTarget.style.backgroundColor = '#f4f4f2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6c7a77';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
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
          {/* Language Switcher — pill shaped */}
          <div
            className="flex items-center rounded-full overflow-hidden"
            style={{ backgroundColor: '#eeeeec' }}
          >
            <button
              onClick={() => switchLocale('hu')}
              className="px-3.5 py-1.5 text-sm font-semibold transition-all duration-200"
              style={
                locale === 'hu'
                  ? { backgroundColor: '#006b5f', color: '#ffffff', borderRadius: '9999px' }
                  : { color: '#6c7a77' }
              }
            >
              HU
            </button>
            <button
              onClick={() => switchLocale('en')}
              className="px-3.5 py-1.5 text-sm font-semibold transition-all duration-200"
              style={
                locale === 'en'
                  ? { backgroundColor: '#006b5f', color: '#ffffff', borderRadius: '9999px' }
                  : { color: '#6c7a77' }
              }
            >
              EN
            </button>
          </div>

          {/* CTA Button — pill shaped, teal gradient */}
          <Link
            href="/letoltes"
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)',
              boxShadow: '0 8px 20px rgba(20,184,166,0.30)',
            }}
          >
            {t('download')}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            aria-label="Menü megnyitása"
            className="lg:hidden p-2 rounded-full transition-colors duration-200"
            style={{ color: '#3c4947', backgroundColor: 'transparent' }}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[360px] overflow-y-auto"
            style={{ backgroundColor: '#f9f9f7' }}
          >
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Sparkles
                    className="h-6 w-6"
                    style={{ color: '#14b8a6', fill: 'rgba(20,184,166,0.3)' }}
                  />
                  <span
                    className="font-nunito font-bold text-lg tracking-tighter"
                    style={{ color: '#006b5f' }}
                  >
                    Calmika
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-1">
              {/* Funkciók section */}
              <p
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ color: '#6c7a77' }}
              >
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
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200"
                    style={{ color: '#3c4947' }}
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 shrink-0" style={{ color: '#14b8a6' }} />
                    )}
                    <span>{name}</span>
                  </Link>
                );
              })}

              <div className="my-2 h-px" style={{ backgroundColor: '#eeeeec' }} />

              {/* Main nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href as any}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200"
                  style={{ color: '#3c4947' }}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px" style={{ backgroundColor: '#eeeeec' }} />

              {/* Language Switcher */}
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-sm" style={{ color: '#6c7a77' }}>
                  {t('language')}:
                </span>
                <div
                  className="flex items-center rounded-full overflow-hidden"
                  style={{ backgroundColor: '#eeeeec' }}
                >
                  <button
                    onClick={() => { switchLocale('hu'); setMobileOpen(false); }}
                    className="px-3.5 py-1.5 text-sm font-semibold transition-all duration-200"
                    style={
                      locale === 'hu'
                        ? { backgroundColor: '#006b5f', color: '#ffffff', borderRadius: '9999px' }
                        : { color: '#6c7a77' }
                    }
                  >
                    HU
                  </button>
                  <button
                    onClick={() => { switchLocale('en'); setMobileOpen(false); }}
                    className="px-3.5 py-1.5 text-sm font-semibold transition-all duration-200"
                    style={
                      locale === 'en'
                        ? { backgroundColor: '#006b5f', color: '#ffffff', borderRadius: '9999px' }
                        : { color: '#6c7a77' }
                    }
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
                  className="flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #006b5f 0%, #14b8a6 100%)',
                    boxShadow: '0 8px 20px rgba(20,184,166,0.25)',
                  }}
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
