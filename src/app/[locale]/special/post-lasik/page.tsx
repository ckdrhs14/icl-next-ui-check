import { getTranslations } from 'next-intl/server';
import PostLasikClient from './PostLasikClient';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('special.postLasik');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default function PostLasikPage() {
  return (
    <div className={styles.wrapper}>
      <PostLasikClient />
    </div>
  );
}
