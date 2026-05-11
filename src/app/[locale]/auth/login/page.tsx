import { getTranslations } from 'next-intl/server';
import LoginClient from './LoginClient';

export async function generateMetadata() {
  const t = await getTranslations('auth.login');
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function LoginPage() {
  return <LoginClient />;
}
