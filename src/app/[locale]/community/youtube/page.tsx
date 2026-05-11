import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import YoutubeClient from './YoutubeClient';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('community.youtube');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function YoutubePage() {
  const t = await getTranslations('community.youtube');
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

      <section className={styles.featuredSection}>
        <div className={styles.featuredInner}>
          <h5 className={styles.featuredLabel} data-aos="fade-up" data-aos-duration="1000">DOCTOR ICL YOUTUBE</h5>
          <h3 className={styles.featuredTitle} data-aos="fade-up" data-aos-duration="1000">{t('featuredTitle')}</h3>
          <div className={styles.featuredVideoBox} data-aos="fade-up" data-aos-duration="1000">
            <iframe src="https://www.youtube.com/embed/gz8TYlobMFI?autoplay=1&mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <div className={styles.featuredBottom}>
            <div data-aos="fade-up" data-aos-duration="1000">
              <div className={styles.ytLogoBox}><Image src="/img/youtube/youtube_logo.svg" alt="YouTube" width={120} height={30} /></div>
              <p className={styles.featuredDesc}>
                {t('featuredDesc1')}<br className="mo" /> {t('featuredDesc2')}<br />
                <span className={styles.featuredDescBold}>{t('featuredDesc3')}</span>{t('featuredDesc4')}
              </p>
            </div>
            <a href="https://www.youtube.com/@driclno.1" target="_blank" rel="noopener noreferrer" className={styles.ytLink} data-aos="fade-up" data-aos-duration="1000">
              <p>{t('ytLinkText')}</p>
              <Image src="/img/youtube/icon.png" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
        <div className={styles.aniImgLeft} data-aos="fade-right"><Image src="/img/youtube/ani_left.png" alt="" width={300} height={400} /></div>
        <div className={styles.aniImgRight} data-aos="fade-left"><Image src="/img/youtube/right_ani.png" alt="" width={300} height={400} /></div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000"><YoutubeClient /></div>
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
