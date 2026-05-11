'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

const SECTIONS: ScrollSection[] = [
  { id: 'about', hash: '#about', label: 'ABOUT' },
  { id: 'flowchart', hash: '#flowchart', label: 'FLOWCHART', dark: true },
  { id: 'progress', hash: '#progress', label: 'PROGRESS' },
  { id: 'treatment', hash: '#treatment', label: 'TREATMENT', dark: true },
];

export default function KeratoconusClient() {
  const t = useTranslations('special.keratoconus');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const sec4Ref = useRef<HTMLElement>(null);
  const [sec4Visible, setSec4Visible] = useState(false);

  useEffect(() => {
    if (!sec4Ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSec4Visible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sec4Ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollPageLayout sections={SECTIONS}>
      {/* Fixed backgrounds */}
      <div className={`${styles.bgWrap} ${sec4Visible ? styles.bgHidden : ''}`}>
        <Image src="/img/plus/icl_bg.png" alt="" width={1920} height={1200} className="pc" />
        <Image src="/img/plus/icl_bg_mo.png" alt="" width={600} height={800} className="mo" />
      </div>
      <div className={`${styles.sec4Bg} ${sec4Visible ? styles.sec4BgVisible : ''}`}>
        <Image src="/img/plus/icl2_sec4_bg.png" alt="" width={1920} height={1200} className="pc" />
        <Image src="/img/plus/icl2_sec4_bg_mo.png" alt="" width={600} height={800} className="mo" />
      </div>

      {/* Section 1: 원추각막에서 ICL 수술 (icl_sec1) */}
      <section id="about" className={styles.sec1}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec1Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.imgCenter}>
              <Image src={li('/img/plus/icl2_sec1_img.png')} alt="" width={590} height={282} />
            </div>
            <div className={styles.txtGroup}>
              <h5>{t('sec1WhatIsTitle')}</h5>
              <p>{t('sec1WhatIsDesc1')}</p>
              <p>{t('sec1WhatIsDesc2')}</p>
              <p>{t('sec1WhatIsDesc3')}</p>
              <p>{t('sec1WhatIsDesc4')}</p>
              <p>{t('sec1WhatIsDesc5')}</p>
              <p>{t('sec1WhatIsDesc6')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 원추각막 치료 및 ICL 흐름도 (icl_sec2) */}
      <section id="flowchart" className={styles.sec2}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec2TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec2Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.sec2ImgBox}>
              <Image src="/img/plus/icl2_sec2_img.png" alt={t('sec2ImgAlt')} width={920} height={500} />
            </div>
            <div className={styles.sec2TxtBox}>
              <p>{t('sec2Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 원추각막의 정도 (icl_sec3) */}
      <section id="progress" className={styles.sec3}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec3TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec3Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.sec3ContBox}>
              {/* 약함 */}
              <div className={styles.sec3DesBox}>
                <div className={styles.sec3DesImgBox}>
                  <Image src="/img/plus/icl2_sec3_img1.png" alt={t('mildTitle')} width={60} height={60} />
                </div>
                <div className={styles.sec3DesTxtBox}>
                  <div className={styles.sec3DesTitBox}>
                    <p><span className={styles.bold}>{t('mildTitle')}</span> {t('mildSubtitle')}</p>
                  </div>
                  <div className={styles.sec3DesSmBox}>
                    <p>{t('mildDesc1')}</p>
                    <p>{t('mildDesc2')}</p>
                  </div>
                </div>
              </div>
              {/* 보통 */}
              <div className={styles.sec3DesBox}>
                <div className={styles.sec3DesImgBox}>
                  <Image src="/img/plus/icl2_sec3_img2.png" alt={t('moderateTitle')} width={60} height={60} />
                </div>
                <div className={styles.sec3DesTxtBox}>
                  <div className={styles.sec3DesTitBox}>
                    <p><span className={styles.bold}>{t('moderateTitle')}</span></p>
                  </div>
                  <div className={styles.sec3DesSmBox}>
                    <p>{t('moderateDesc1')}</p>
                    <p>{t('moderateDesc2')}</p>
                  </div>
                </div>
              </div>
              {/* 심함 */}
              <div className={styles.sec3DesBox}>
                <div className={styles.sec3DesImgBox}>
                  <Image src="/img/plus/icl2_sec3_img3.png" alt={t('severeTitle')} width={60} height={60} />
                </div>
                <div className={styles.sec3DesTxtBox}>
                  <div className={styles.sec3DesTitBox}>
                    <p><span className={styles.bold}>{t('severeTitle')}</span></p>
                  </div>
                  <div className={styles.sec3DesSmBox}>
                    <p>{t('severeDesc1')}</p>
                    <p>{t('severeDesc2')}</p>
                    <p>{t('severeDesc3')}</p>
                    <p>{t('severeDesc4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 원추각막 치료 (icl_sec4) */}
      <section id="treatment" className={styles.sec4} ref={sec4Ref}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec4TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec4Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.sec4ContBox}>
              <div className={styles.sec4DesBox}>
                <h5>{t('cxlTitle')}</h5>
                <p>{t('cxlDesc1')}</p>
                <p>{t('cxlDesc2')}</p>
                <p>{t('cxlDesc3')}</p>
                <p>{t('cxlDesc4')}</p>
                <p>{t('cxlDesc5')}</p>
              </div>
              <div className={styles.sec4ImgBox}>
                <Image src="/img/plus/icl2_sec4_img1.png" alt={t('cxlTitle')} width={600} height={300} />
              </div>
              <div className={styles.sec4DesBox}>
                <h5>{t('icrsTitle')}</h5>
                <p>{t('icrsDesc1')}</p>
                <p>{t('icrsDesc2')}</p>
                <p>{t('icrsDesc3')}</p>
                <p>{t('icrsDesc4')}</p>
              </div>
              <div className={styles.sec4ImgBox}>
                <Image src="/img/plus/icl2_sec4_img2.png" alt="ICRS" width={600} height={300} />
              </div>
              <div className={styles.sec4DesBox}>
                <h5>{t('iclTitle')}</h5>
                <p>{t('iclDesc1')}</p>
                <p>{t('iclDesc2')}</p>
                <p>{t('iclDesc3')}</p>
                <p>{t('iclDesc4')}</p>
                <p>{t('iclDesc5')}</p>
                <p>{t('iclDesc6')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollPageLayout>
  );
}
