import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Noto_Serif_KR, Noto_Serif } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AosInit } from '@/components/aos/AosInit';
import { LenisInit } from '@/components/lenis/LenisInit';

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

export async function generateMetadata() {
  const t = await getTranslations('layout');
  return {
    title: {
      default: t('siteTitle'),
      template: `%s - ${t('siteTitle')}`,
    },
    description: t('siteDesc'),
    keywords: t('siteKeywords'),
    robots: 'index, follow',
    authors: [{ name: 'WACUS' }],
    openGraph: {
      type: 'website' as const,
      siteName: t('siteTitle'),
      title: t('siteTitle'),
      description: t('siteDesc'),
      url: 'https://doctoricl.com/',
      images: [{ url: 'https://doctoricl.com/img/ogImage.png' }],
    },
    other: {
      'naver-site-verification': 'c515fcd626ac35f2bfb5475c5c27123d8f32f556',
      'theme-color': '#ffffff',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': t('siteTitle'),
      'application-name': t('siteTitle'),
      'msapplication-TileColor': '#ffffff',
      'format-detection': 'telephone=no',
      googlebot: 'index, follow',
      'revisit-after': '7 days',
      language: 'Korean',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div className={`${notoSerifKr.variable} ${notoSerif.variable}`} lang={locale}>
      {/* Hidden SEO headings (원본 PHP 동일) */}
      <div style={{ position: 'absolute', top: -54, overflow: 'hidden', height: 1, width: 1 }}>
        <h1>강남 닥터ICL안과의원 - 강남안과,렌즈삽입술,안내렌즈삽입술</h1>
      </div>
      <div style={{ position: 'absolute', top: -54, overflow: 'hidden', height: 1, width: 1 }}>
        <h2>강남 안과</h2>
      </div>
      <NextIntlClientProvider messages={messages}>
        <LenisInit />
        <AosInit />
        <Header />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
