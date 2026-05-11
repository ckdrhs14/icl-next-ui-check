import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Noto_Serif_KR, Noto_Serif } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AosInit } from '@/components/aos/AosInit';
import '../globals.css';

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
    openGraph: {
      type: 'website' as const,
      siteName: t('siteTitle'),
      images: [{ url: '/img/ogImage.png' }],
    },
    other: {
      'naver-site-verification': 'c515fcd626ac35f2bfb5475c5c27123d8f32f556',
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
    <html
      lang={locale}
      className={`${notoSerifKr.variable} ${notoSerif.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AosInit />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
