import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import { GallerySwiper } from './GallerySwiper';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('about.system');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function SystemPage() {
  const t = await getTranslations('about.system');
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  const GALLERY_SLIDES = [
    { src: '/img/plus02/slide_01.jpg', caption: t('galleryCaption1') },
    {
      src: '/img/plus02/slide_02.jpg',
      caption: t('galleryCaption2'),
    },
    {
      src: '/img/plus02/slide_03.jpg',
      caption: t('galleryCaption3'),
    },
    {
      src: '/img/plus02/slide_04.jpg',
      caption: t('galleryCaption4'),
    },
    { src: '/img/plus02/slide_05.jpg', caption: t('galleryCaption5') },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Section 1: Hero */}
      <section className={styles.heroSection}>
        <Image
          src="/img/plus02/sec01_bg.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          className="pc"
          priority
        />
        <Image
          src="/img/plus02/sec01_bg_mo.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          className="mo"
          priority
        />
        <div className={styles.heroContent} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.heroTitGroup}>
            <p className={styles.heroSub}>{t('heroTitle1')}</p>
            <h3 className={styles.heroTitle}>
              &ldquo;{t('heroTitle2')}
              <br className={styles.brMobile} /> {t('heroTitle3')}&rdquo;
            </h3>
          </div>
          <div className={styles.heroDivider} />
          <div className={styles.heroDes}>
            <p className={styles.heroDesc}>
              {t('heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: OCT Equipment */}
      <section className={styles.octSection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>
                <span className={styles.teal}>{t('octHighRes')}</span> {t('octTitle')}
              </h3>
            </div>
            <div className={styles.sectionDesc}>
              <p>
                {t('octDesc1')}
                <br className={styles.brMobile} /> {t('octDesc2')}
              </p>
            </div>
          </div>
          <div className={styles.octImages}>
            <Image
              src="/img/plus02/sec02_img01.png"
              alt={t('octImgAlt')}
              width={1120}
              height={349}
              className={`pc ${styles.octImgFirst}`}
            />
            <Image
              src="/img/plus02/sec02_img01_mo.png"
              alt={t('octImgAlt')}
              width={316}
              height={435}
              className={`mo ${styles.octImgFirst}`}
            />
            <Image
              src="/img/plus02/sec02_img02.png"
              alt={t('octResultAlt')}
              width={684}
              height={75}
              className={`pc ${styles.octImgSecond}`}
            />
            <Image
              src="/img/plus02/sec02_img02_mo.png"
              alt={t('octResultAlt')}
              width={323}
              height={75}
              className={`mo ${styles.octImgSecond}`}
            />
          </div>
          <div className={styles.octTextGroup}>
            <p className={styles.octTextPrimary}>
              {t('octTextPre')}{' '}
              <span className={styles.teal}>
                <strong>{t('octTextHighlight')}</strong>
              </span>
            </p>
            <p className={styles.octTextSecondary}>
              {t('octTextDesc')}{' '}
              <span className={styles.white}>
                {t('octTextConclusion')}
              </span>
              {t('octTextSuffix')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 3D Simulation Video */}
      <section className={styles.videoSection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>
                <span className={styles.teal}>{t('videoHighRes')}</span> {t('videoTitle')}
                <br className={styles.brMobile} />{' '}
                <span className={styles.teal}>{t('videoSub')}</span>
              </h3>
            </div>
            <div className={styles.sectionDesc}>
              <p>
                {t('videoDesc1')}
                <br className={styles.brMobile} /> {t('videoDesc2')}
              </p>
            </div>
          </div>
          <div className={styles.simulationVideo}>
            <video autoPlay playsInline muted loop preload="metadata">
              <source src="/video/casia2_2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Section 4: Gallery */}
      <section className={styles.gallerySection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionHeaderBlue}>
            <div>
              <h3 className={styles.sectionTitleBlue}>
                {t('galleryTitle1')}
                <br className={styles.brMobile} />{' '}
                <span className={styles.brown}>{t('galleryTitle2')}</span>
              </h3>
            </div>
            <div className={styles.sectionDescBlue}>
              <p>
                {t('galleryDesc')}
                <br className={styles.brMobile} /> {t('galleryDescSub')}
              </p>
            </div>
          </div>
          <GallerySwiper slides={GALLERY_SLIDES} />
          {/* Mobile image grid */}
          <div className={`${styles.mobileGrid} mo`}>
            {GALLERY_SLIDES.map((slide, idx) => (
              <div key={idx} className={styles.mobileGridItem}>
                <Image src={slide.src} alt={slide.caption} width={600} height={400} />
                <p>{slide.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: ICL Size Formula */}
      <section className={styles.formulaSection}>
        <Image
          src="/img/plus02/sec05_bg.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.formulaContent} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.formulaSectionTitle}>
                <span className={styles.teal}>
                  {t('formulaTitle1')}
                  <br className={styles.brMobile} /> {t('formulaTitle2')}
                </span>
                {t('formulaTitle3')}
                <br />
                {t('formulaTitle4')}
                <br className={styles.brMobile} /> {t('formulaTitle5')}
              </h3>
            </div>
          </div>
          <div className={styles.formulaImg}>
            <Image
              src="/img/plus02/sec05_img01.png"
              alt={t('formulaImgAlt')}
              width={1104}
              height={630}
              className="pc"
            />
            <Image
              src="/img/plus02/sec05_img01_mo.png"
              alt={t('formulaImgAlt')}
              width={369}
              height={737}
              className="mo"
            />
          </div>
        </div>
      </section>

      {/* Section 6: Single Surgeon */}
      <section className={styles.surgeonSection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionHeaderBlue}>
            <div>
              <h3 className={styles.sectionTitleBlue}>{t('surgeonTitle')}</h3>
            </div>
            <div className={styles.sectionDescBlue}>
              <p>
                {t('surgeonDesc1')}
                <br className={styles.brMobile} /> {t('surgeonDesc2')}
              </p>
            </div>
          </div>
          <div className={styles.surgeonGrid}>
            <div className={styles.surgeonItem}>
              <Image
                src={li('/img/plus02/sec06_img01.png')}
                alt={t('surgeonItem1')}
                width={451}
                height={244}
              />
              <p>{t('surgeonItem1')}</p>
            </div>
            <div className={styles.surgeonItem}>
              <Image
                src={li('/img/plus02/sec06_img02.png')}
                alt={t('surgeonItem2')}
                width={483}
                height={263}
              />
              <p>{t('surgeonItem2')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
