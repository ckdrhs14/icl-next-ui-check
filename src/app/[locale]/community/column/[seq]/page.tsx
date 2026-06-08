import { getTranslations } from 'next-intl/server';
import ColumnDetailClient from './ColumnDetailClient';

export async function generateMetadata() {
  const t = await getTranslations('community.column');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function ColumnDetailPage({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  return <ColumnDetailClient seq={seq} />;
}
