import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import EvoCarousel from './EvoCarousel';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('icl.evo');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function EvoPage() {
  const t = await getTranslations('icl.evo');
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  return (
    <div className={styles.wrapper}>
      {/* Video Section 1 (spec1-sec3) */}
      <section className={styles.videoSection}>
        <div className={`${styles.videoBox} pc`} data-aos="fade-up" data-aos-duration="1000">
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec3-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`${styles.videoBox} mo`} data-aos="fade-up" data-aos-duration="1000">
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec3-video-mo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Video Section 2 (spec1-sec4) */}
      <section className={styles.videoSection}>
        <div className={`${styles.videoBox} pc`}>
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec4-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`${styles.videoBox} mo`}>
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec4-video-mo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Video Section 3 (spec1-sec5) */}
      <section className={styles.videoSection}>
        <div className={`${styles.videoBox} pc`}>
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec5-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`${styles.videoBox} mo`}>
          <video playsInline loop autoPlay muted>
            <source src="/video/spec1-sec5-video-mo_2.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Surgery Process Section (spec1-sec6) */}
      <section className={styles.sec6}>
        <div className={styles.sec6Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec6TitGroup}>
            <h3 className={styles.sec6H3}>
              <span className={styles.cMt}>
                <span className={styles.fzTr}>EVO+ICL</span>
              </span>{' '}
              {t('sec6Title')}
            </h3>

            {/* Desktop text */}
            <div className={`${styles.sec6TextBox} ${styles.sec6TextDesktop}`}>
              <div className={styles.sec6TextImg}>
                <Image src="/img/plus/icl4_sec6_txt1.png" alt="EVO+ICL" width={104} height={29} />
              </div>
              <div className={styles.sec6PBox}>
                <p>{t('sec6Desc1pc')}<span className={styles.bold}>{t('sec6Desc2pc')}</span>{t('sec6Desc3pc')}</p>
                <p>{t('sec6Desc4pc')}<span className={styles.bold}>{t('sec6Desc5pc')}</span>{t('sec6Desc6pc')}</p>
              </div>
            </div>

            {/* Mobile text */}
            <div className={`${styles.sec6TextBox} ${styles.sec6TextMobile}`}>
              <div className={styles.sec6TextImg}>
                <Image src="/img/plus/icl4_sec6_txt1.png" alt="EVO+ICL" width={104} height={29} />
                <p>{t('sec6Desc1mo')}</p>
              </div>
              <div className={styles.sec6PBox}>
                <p>{t('sec6Desc2mo')}<span className={styles.bold}>{t('sec6Desc3mo')}</span>{t('sec6Desc4mo')}</p>
                <p>{t('sec6Desc5mo')}<span className={styles.bold}>{t('sec6Desc6mo')}</span>{t('sec6Desc7mo')}</p>
              </div>
            </div>
          </div>

          {/* Process Images */}
          <div className={styles.sec6ContGroup}>
            <div className={styles.sec6ContBox}>
              <div className={styles.sec6ImgBox}>
                <Image src="/img/spec/spec1-sec6-img1.png" alt="수술과정 1" width={345} height={231} />
              </div>
              <div className={styles.sec6ImgBox}>
                <Image src="/img/spec/spec1-sec6-img2.png" alt="수술과정 2" width={458} height={289} className={styles.glowImg} />
              </div>
              <div className={styles.sec6ImgBox}>
                <Image src="/img/spec/spec1-sec6-img3.png" alt="수술과정 3" width={346} height={232} />
              </div>
              <div className={styles.sec6ImgBox}>
                <Image src="/img/spec/spec1-sec6-img4.png" alt="수술과정 4" width={345} height={232} />
              </div>
            </div>
            <div className={styles.sec6BottomText}>
              <p>
                <span className={`${styles.bold} ${styles.cMt}`}>{t('sec6Bottom1')}</span> {t('sec6Bottom2')}{' '}
                <span className={`${styles.bold} ${styles.cMt}`}>
                  <br className="mo" />{t('sec6Bottom3')}
                </span>
                {t('sec6Bottom4')}
              </p>
              <p className={styles.sec6Des}>
                <span className={styles.bold}>{t('sec6BottomDesc1')}</span>{t('sec6BottomDesc2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVO+ ICL Uniqueness Section (spec1-sec7) */}
      <section className={styles.sec7}>
        <div className={styles.sec7Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec7TitGroup}>
            <h3 className={styles.sec7H3}>
              <span className={`${styles.fzTr} ${styles.cBr}`}>EVO+ ICL</span> {t('sec7Title').replace('EVO+ ICL ', '')}
            </h3>

            {/* Desktop subtitle */}
            <div className={`${styles.sec7TextBox} ${styles.sec7TextDesktop}`}>
              <p>{t('sec7Desc1pc')}</p>
              <div className={styles.sec7TextImgBox}>
                <Image src="/img/plus/icl4_sec6_txt1_b.png" alt="EVO+ ICL" width={104} height={29} />
              </div>
            </div>

            {/* Mobile subtitle */}
            <div className={`${styles.sec7TextBox} ${styles.sec7TextMobile}`}>
              <p>{t('sec7Desc1mo')}</p>
              <div className={styles.sec7TextImgBox}>
                <p>{t('sec7Desc2mo')}</p>
                <Image src="/img/plus/icl4_sec6_txt1_b.png" alt="EVO+ ICL" width={104} height={29} />
              </div>
            </div>
          </div>

          {/* Main content with rotating images */}
          <div className={styles.sec7ContGroup}>
            <div className={styles.sec7MainImg}>
              <Image src="/img/spec/spec1-sec7-cont1.png" alt="" width={1158} height={536} className="pc" />
              <Image src="/img/spec/spec1-sec7-cont1-mo.png" alt="" width={375} height={305} className="mo" />
            </div>
            <EvoCarousel />
          </div>

          {/* Mobile text images */}
          <div className={`${styles.sec7TextImgGroup} mo`}>
            <div>
              <Image src={li('/img/spec/spec1-sec7-textImg1.png')} alt="" width={630} height={301} />
            </div>
            <div>
              <Image src={li('/img/spec/spec1-sec7-textImg2.png')} alt="" width={630} height={361} />
            </div>
            <div>
              <Image src={li('/img/spec/spec1-sec7-textImg3.png')} alt="" width={1275} height={621} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
