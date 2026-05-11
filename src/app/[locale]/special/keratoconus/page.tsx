import { getTranslations } from 'next-intl/server';
import KeratoconusClient from './KeratoconusClient';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('special.keratoconus');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function KeratoconusPage() {
  return (
    <div className={styles.wrapper}>
      <KeratoconusClient />
    </div>
  );
}
