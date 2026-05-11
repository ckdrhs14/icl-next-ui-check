'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

const SECTIONS: ScrollSection[] = [
  { id: 'vision', hash: '#vision', label: 'VISION DECREASE' },
  { id: 'resurgery', hash: '#resurgery', label: 'RE-SURGERY' },
  { id: 'eyesight', hash: '#eyesight', label: "ICL'S EYESIGHT", dark: true },
];

const PREFER_REASON_KEYS = [
  'preferReason1',
  'preferReason2',
  'preferReason3',
  'preferReason4',
  'preferReason5',
] as const;

export default function PostLasikClient() {
  const t = useTranslations('special.postLasik');

  return (
    <ScrollPageLayout sections={SECTIONS}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image src="/img/plus/icl_bg.png" alt="" width={1920} height={1200} className="pc" />
        <Image src="/img/plus/icl_bg_mo.png" alt="" width={600} height={800} className="mo" />
      </div>

      {/* Section 1: 라식 수술 후 ICL로 시력 회복 (icl_sec1) */}
      <section id="vision" className={styles.sec1}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec1Title') }} />
          </div>
          <div className={styles.imgBox}>
            <Image src="/img/plus/icl_sec1_txt1.png" alt="" width={920} height={400} className="pc" />
            <Image src="/img/plus/icl_sec1_txt1_mo.png" alt="" width={600} height={400} className="mo" />
          </div>
          <div className={styles.imgBox}>
            <Image src="/img/plus/icl_sec1_txt2_mo.png" alt="" width={600} height={400} className="mo" />
          </div>
          <div className={styles.imgBox}>
            <Image src="/img/plus/icl_sec1_txt3_mo.png" alt="" width={600} height={400} className="mo" />
          </div>
        </div>
      </section>

      {/* Section 2: ICL을 선호하는 이유 (icl_sec2) */}
      <section id="resurgery" className={styles.sec2}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec2TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec2Title') }} />
            <p>{t('sec2Desc')}</p>
          </div>
          <div className={styles.sec2ContGroup}>
            {PREFER_REASON_KEYS.map((key, idx) => (
              <div key={idx} className={styles.sec2TxtBox}>
                <p>{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 라식 수술 후 ICL 수술의 특장점 (icl_sec3) */}
      <section id="eyesight" className={styles.sec3}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec3BgImg}>
            <Image src="/img/plus/icl_sec3_bg_img.png" alt="" width={750} height={500} />
          </div>
          <div className={styles.sec3TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec3Title') }} />
          </div>
          <div className={styles.sec3TxtBox}>
            <p>{t('sec3Desc1')}</p>
            <p>{t('sec3Desc2')}</p>
            <p>{t('sec3Desc3')}</p>
          </div>
        </div>
      </section>
    </ScrollPageLayout>
  );
}
