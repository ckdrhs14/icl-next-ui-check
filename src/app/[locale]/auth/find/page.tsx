import { getTranslations } from 'next-intl/server';
import FindClient from './FindClient';

export async function generateMetadata() {
  const t = await getTranslations('auth.find');
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function FindPage() {
  return <FindClient />;
}
