import { getTranslations } from 'next-intl/server';
import VivaIclClient from './VivaIclClient';

export async function generateMetadata() {
  const t = await getTranslations('presbyopia.vivaIcl');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function VivaIclPage() {
  return <VivaIclClient />;
}
