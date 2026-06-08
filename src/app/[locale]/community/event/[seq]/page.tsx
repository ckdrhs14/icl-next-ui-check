import { getTranslations } from 'next-intl/server';
import EventDetailClient from '../../news/event/[seq]/EventDetailClient';

export async function generateMetadata() {
  const t = await getTranslations('community.event');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function EventDetailPage({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  return <EventDetailClient seq={seq} />;
}
