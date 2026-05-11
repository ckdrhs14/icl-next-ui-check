import { getTranslations } from 'next-intl/server';
import RegisterClient from './RegisterClient';

export async function generateMetadata() {
  const t = await getTranslations('auth.register');
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function RegisterPage() {
  return <RegisterClient />;
}
