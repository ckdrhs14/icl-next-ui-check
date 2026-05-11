import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import NewsClient from './NewsClient';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('community.news');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function NewsPage() {
  const t = await getTranslations('community.news');
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  return (
    <div className={styles.wrapper}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
          <p className={styles.heroSub}>{t('heroSub')}</p>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <NewsClient />
        </div>
      </section>
      <section className={styles.bottomSection}>
        <div className={styles.bottomBgLogo}><Image src="/img/common/snu_logo.png" alt="" width={406} height={421} /></div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000"><Image src={li('/img/etc/login_logo_w.png')} alt="" width={204} height={37} /></div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000">
          <Image src={li('/img/etc/mem_sub_com_text_n.png')} alt="" width={639} height={84} className="pc" />
          <Image src={li('/img/etc/mem_sub_com_text_mo_n.png')} alt="" width={286} height={74} className="mo" />
        </div>
      </section>
    </div>
  );
}
