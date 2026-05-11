import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import AvellinoClient from './AvellinoClient';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('special.avellino');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function AvellinoPage() {
  return (
    <div className={styles.wrapper}>
      <AvellinoClient />
    </div>
  );
}
