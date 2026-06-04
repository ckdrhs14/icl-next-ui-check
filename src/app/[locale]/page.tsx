import { getTranslations } from 'next-intl/server';
import HomeClient from './HomeClient';
import { fetchLatestVideos } from '@/utils/youtube';
import { fetchLatestPosts } from '@/utils/instagram';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });
  return {
    title: t('siteTitle'),
    description: t('siteDesc'),
  };
}

export default async function HomePage() {
  const [ytVideos, instaPosts] = await Promise.all([
    fetchLatestVideos(5),
    fetchLatestPosts(4),
  ]);
  return <HomeClient ytVideos={ytVideos} instaPosts={instaPosts} />;
}
