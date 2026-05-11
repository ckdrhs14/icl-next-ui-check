import { getTranslations } from 'next-intl/server';
import MyopiaClient from './MyopiaClient';

export async function generateMetadata() {
  const t = await getTranslations('myopia');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function MyopiaPage() {
  return <MyopiaClient />;
}
