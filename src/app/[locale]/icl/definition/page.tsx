import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import DefinitionClient from './DefinitionClient';
import styles from './page.module.css';

const SECTIONS: ScrollSection[] = [
  { id: 'about', hash: '#about', label: 'ABOUT' },
  { id: 'technique', hash: '#technique', label: 'TECHNIQUE', dark: true },
  { id: 'evo-icl', hash: '#evo-icl', label: 'EVO+ ICL' },
  { id: 'lens-spec', hash: '#lens-spec', label: 'LENS SPEC' },
  { id: 'history', hash: '#history', label: 'HISTORY', dark: true },
  { id: 'surgery-process', hash: '#surgery-process', label: 'SURGERY PROCESS' },
  { id: 'until-surgery', hash: '#until-surgery', label: 'UNTIL SURGERY', dark: true },
  { id: 'merits-demerits', hash: '#merits-demerits', label: 'MERITS / DEMERITS' },
  { id: 'care-system', hash: '#care-system', label: 'CARE SYSTEM', dark: true },
];

export async function generateMetadata() {
  const t = await getTranslations('icl.definition');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function DefinitionPage() {
  const t = await getTranslations('icl.definition');
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  const HISTORY = [
    { year: '1990', color: '#67B5A9', text: t('history0') },
    { year: '1992', color: '#80BAAC', text: t('history1') },
    { year: '1994', color: '#8FBDAD', text: t('history2') },
    { year: '1997', color: '#9EBFAF', text: t('history3') },
    { year: '2002', color: '#B2C3B1', text: t('history4') },
    { year: '2003', color: '#BFC5B2', text: t('history5') },
    { year: '2005', color: '#CFC8B4', text: t('history6') },
    { year: '2011', color: '#DFCBB5', text: t('history7') },
    { year: '2013', color: '#D6C1A9', text: t('history8') },
    { year: '2014', color: '#D0B9A0', text: t('history9') },
    { year: '2017', color: '#C6AC92', text: t('history10') },
    { year: '2020', color: '#C0A68A', text: t('history11') },
    { year: '2020', color: '#B89C7E', text: t('history12') },
    { year: '2022', color: '#B19375', text: t('history13') },
    { year: '2022', color: '#A48362', text: t('history14') },
  ];

  const SURGERY_STEPS = [
    { label: t('surgery0Label'), title: t('surgery0Title'), desc: t('surgery0Desc'), desc2: t('surgery0Desc2') },
    { label: t('surgery1Label'), title: t('surgery1Title'), desc: t('surgery1Desc') },
    { label: t('surgery2Label'), title: t('surgery2Title'), desc: t('surgery2Desc') },
    { label: t('surgery3Label'), title: t('surgery3Title'), desc: t('surgery3Desc') },
  ];

  const UNTIL_SURGERY = [
    { title: t('until0Title'), detail: '' },
    { title: t('until1Title'), detail: '' },
    { title: t('until2Title'), detail: t('until2Detail') },
    { title: t('until3Title'), detail: t('until3Detail') },
    { title: t('until4Title'), detail: t('until4Detail') },
    { title: t('until5Title'), detail: t('until5Detail') },
    { title: t('until6Title'), detail: t('until6Detail') },
  ];

  const MERITS = [
    { title: t('merit0Title'), desc: t('merit0Desc') },
    { title: t('merit1Title'), desc: t('merit1Desc') },
    { title: t('merit2Title'), desc: t('merit2Desc') },
    { title: t('merit3Title'), desc: t('merit3Desc') },
    { title: t('merit4Title'), desc: t('merit4Desc') },
  ];

  const DEMERITS = [
    { title: t('demerit0Title'), desc: t('demerit0Desc') },
    { title: t('demerit1Title'), desc: t('demerit1Desc') },
    { title: t('demerit2Title'), desc: t('demerit2Desc') },
    { title: t('demerit3Title'), desc: t('demerit3Desc') },
    { title: t('demerit4Title'), desc: t('demerit4Desc') },
  ];

  return (
    <ScrollPageLayout sections={SECTIONS}>
    <div className={styles.wrapper}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image src="/img/plus/icl_bg.png" alt="" width={1920} height={1200} className="pc" />
        <Image src="/img/plus/icl_bg_mo.png" alt="" width={600} height={800} className="mo" />
      </div>

      {/* Section 1: ICL 이란? */}
      <section id="about" className={styles.sec1}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={styles.cBr}>{t('sec1Title')}</span></h3>
          </div>
          <div className={styles.contGroup}>
            <div className={styles.imgCenter}>
              <Image src="/img/plus/icl3_sec1_img1.png" alt="" width={800} height={400} />
            </div>
            <div className={styles.txtGroup}>
              <h5>{t('sec1Subtitle')}</h5>
              <p>{t('sec1P1')}</p>
              <p>{t('sec1P2')}</p>
              <p>{t('sec1P3')}</p>
            </div>
            <div className={styles.imgGroupRow}>
              <div className={styles.imgGroupItem}>
                <Image src="/img/plus/icl3_sec1_img2.png" alt={t('sec1Img1Caption')} width={400} height={300} />
                <p>{t('sec1Img1Caption')}</p>
              </div>
              <div className={styles.imgGroupItem}>
                <Image src="/img/plus/icl3_sec1_img3.png" alt={t('sec1Img2Caption')} width={400} height={300} />
                <p>{t('sec1Img2Caption')}</p>
              </div>
            </div>
            <div className={styles.tableBox}>
              <Image src="/img/plus/icl3_sec1_img4.png" alt="" width={920} height={300} />
            </div>
            <div className={styles.txtBox}>
              <p>{t('sec1BottomP')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: ICL 수술기법 */}
      <section id="technique" className={styles.sec2}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroupWhite}>
            <h3><span className={`${styles.cMt} ${styles.fzUp}`}>ICL</span>{t('sec2Title').replace('ICL', '')}</h3>
          </div>
          <div className={styles.contGroup}>
            <div className={styles.imgGroupRow}>
              <div><Image src={li('/img/plus/icl3_sec2_img2.png')} alt="" width={450} height={350} /></div>
              <div><Image src="/img/plus/icl3_sec2_img1.png" alt="" width={450} height={350} /></div>
            </div>
            <div className={styles.txtBoxWhite}>
              <p>{t('sec2P')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: EVO+ ICL 업그레이드 */}
      <section id="evo-icl" className={styles.sec3}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={`${styles.cBr} ${styles.fzUp}`}>EVO+ ICL</span> {t('sec3Title').replace('EVO+ ICL ', '')}</h3>
          </div>
          <div className={styles.contGroup}>
            <div className={styles.imgCenter}>
              <Image src="/img/plus/icl3_sec3_img1.png" alt="" width={800} height={500} className={styles.imgOffset} />
            </div>
            <div className={styles.txtBox69}>
              <p>{t('sec3P')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: ICL 렌즈 스펙 */}
      <section id="lens-spec" className={styles.sec4}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={`${styles.cBr} ${styles.fzUp}`}>ICL</span> {t('sec4Title').replace('ICL ', '')}</h3>
          </div>
          <div className={styles.contGroup}>
            <div className={styles.txtBox}>
              <p>{t('sec4P1')}</p>
            </div>
            <div className={styles.imgCenter}>
              <Image src={li('/img/plus/icl3_sec4_img1.png')} alt="" width={920} height={300} className="pc" />
              <Image src={li('/img/plus/icl3_sec4_img1_mo.png')} alt="" width={400} height={300} className="mo" />
            </div>
            <div className={styles.txtGroup}>
              <h5>{t('sec4Sub1')}</h5>
              <p>{t('sec4Sub1P')}</p>
            </div>
            <div className={styles.imgCenter48}>
              <Image src="/img/plus/icl3_sec4_img2.png" alt="" width={600} height={300} />
              <p>{t('sec4ImgCaption')}</p>
            </div>
            <div className={styles.imgCenter28}>
              <Image src={li('/img/plus/icl3_sec4_img3.png')} alt="" width={600} height={300} />
              <div className={styles.imgCaption2col}>
                <p>{t('sec4ImgCaption2a')}</p>
                <p>{t('sec4ImgCaption2b')}</p>
              </div>
            </div>
            <div className={styles.imgDesGroup}>
              <h5>{t('sec4Sub2')}</h5>
              <div className={styles.imgCenter}>
                <Image src={li('/img/plus/icl3_sec4_img4.png')} alt="" width={920} height={300} className="pc" />
                <Image src={li('/img/plus/icl3_sec4_img4_mo.png')} alt="" width={400} height={300} className="mo" />
              </div>
              <h5>{t('sec4Sub3')}</h5>
              <p>{t('sec4Sub3P')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 렌즈삽입수술의 역사 */}
      <section id="history" className={styles.sec5}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroupWhite}>
            <h3><span className={styles.cBr}>{t('sec5Title')}</span></h3>
          </div>
          <div className={styles.contGroup}>
            <div className={styles.txtBoxWhite}>
              <p>{t('sec5P1')}</p>
            </div>
            <div className={styles.imgCenter54}>
              <Image src="/img/plus/icl3_sec5_img1.png" alt="" width={800} height={400} />
            </div>
            <div className={styles.txtBoxWhite}>
              <p>{t('sec5P2')}</p>
              <p>{t('sec5P3')}</p>
            </div>
            <div className={styles.contTit}>
              <h5>{t('sec5Timeline')}</h5>
            </div>
            <div className={styles.dateHistory}>
              {HISTORY.map((h, i) => (
                <div key={i} className={styles.hisBox}>
                  <div className={styles.dateBox} style={{ backgroundColor: h.color }}>
                    <p>{h.year}</p>
                  </div>
                  <div className={styles.hisTxtBox}>
                    <p>{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: ICL 수술과정 (Swiper) */}
      <section id="surgery-process" className={styles.sec6}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={`${styles.cBr} ${styles.fzUp} ${styles.fzTr}`}>ICL</span> {t('sec6Title').replace('ICL ', '')}</h3>
          </div>
          <DefinitionClient steps={SURGERY_STEPS} />
        </div>
      </section>

      {/* Section 7: ICL 수술까지 */}
      <section id="until-surgery" className={styles.sec7}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroupWhite}>
            <h3><span className={`${styles.cNv} ${styles.fzUp}`}>ICL</span> {t('sec7Title').replace('ICL ', '')}</h3>
          </div>
          <div className={styles.untilGroup}>
            {UNTIL_SURGERY.map((item, i) => (
              <div key={i} className={styles.untilBox}>
                {item.detail && <div className={styles.untilBg} />}
                <div className={styles.untilTitle}>
                  <p>{item.title}</p>
                </div>
                {item.detail && (
                  <div className={styles.untilDetail}>
                    <p>{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: ICL의 장점 */}
      <section id="merits-demerits" className={styles.sec8}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={`${styles.cMt} ${styles.fzUp}`}>ICL</span>{t('sec8Title').replace('ICL', '')}</h3>
          </div>
          <div className={styles.meritGroup}>
            {MERITS.map((item, i) => (
              <div key={i} className={styles.meritBox}>
                <div className={styles.meritTit}><p>{item.title}</p></div>
                <div className={styles.meritDes}><p>{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: ICL의 단점 */}
      <section className={styles.sec9}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3><span className={`${styles.cBr} ${styles.fzUp}`}>ICL</span>{t('sec9Title').replace('ICL', '')}</h3>
          </div>
          <div className={styles.demeritGroup}>
            {DEMERITS.map((item, i) => (
              <div key={i} className={styles.demeritBox}>
                <div className={styles.demeritTit}><p>{item.title}</p></div>
                <div className={styles.demeritDes}><p>{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: 케어 시스템 */}
      <section id="care-system" className={styles.sec10}>
        <div className={styles.sec10BgImg}>
          <Image src="/img/plus/icl3_sec10_bg.png" alt="" width={800} height={600} />
        </div>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroupWhite}>
            <h3><span className={styles.cMt}>{t('sec10Title')}</span></h3>
          </div>
          <div className={styles.sec10Grid}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className={styles.sec10ImgBox}>
                <Image src={li(`/img/plus/icl3_sec10_img${n}.png`)} alt="" width={300} height={400} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </ScrollPageLayout>
  );
}
