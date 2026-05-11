import { getTranslations } from 'next-intl/server';
import MaestroClient from './MaestroClient';

export async function generateMetadata() {
  const t = await getTranslations('maestro');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function MaestroPage() {
  return <MaestroClient />;
}
