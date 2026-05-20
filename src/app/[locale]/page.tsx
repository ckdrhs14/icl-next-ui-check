import { getTranslations } from 'next-intl/server';
import HomeClient from './HomeClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });
  return {
    title: t('siteTitle'),
    description: t('siteDesc'),
  };
}

export default function HomePage() {
  return <HomeClient />;
}
