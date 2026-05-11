import { getTranslations } from 'next-intl/server';
import NonCoveredClient from './NonCoveredClient';

export async function generateMetadata() {
  const t = await getTranslations('legal.nonCovered');
  return { title: t('heroTitle'), description: t('pageTitle') };
}

export default function NonCoveredPage() {
  return <NonCoveredClient />;
}
