'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

const SECTIONS: ScrollSection[] = [
  { id: 'about', hash: '#about', label: 'ABOUT' },
  { id: 'diagnosis', hash: '#diagnosis', label: 'DIAGNOSIS', dark: true },
  { id: 'therapy', hash: '#therapy', label: 'THERAPY' },
  { id: 'warning', hash: '#warning', label: 'WARNING' },
  { id: 'prognosis', hash: '#prognosis', label: 'PROGNOSIS', dark: true },
];

export default function AvellinoClient() {
  const t = useTranslations('special.avellino');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  return (
    <ScrollPageLayout sections={SECTIONS}>
      {/* Background */}
      <div className={styles.bgWrap}>
        <Image src="/img/plus/icl_bg.png" alt="" width={1920} height={1200} className="pc" />
        <Image src="/img/plus/icl_bg_mo.png" alt="" width={600} height={800} className="mo" />
      </div>

      {/* ===== Section 1: 아벨리노 각막이영양증이란 (dise_sec1) ===== */}
      <section id="about" className={styles.sec1}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec1Title') }} />
          </div>
          <div className={styles.contGroup}>
            {/* 정의 */}
            <div className={styles.txtGroup}>
              <h5>{t('definitionTitle')}</h5>
              <p>{t('definitionDesc1')}</p>
              <p>{t('definitionDesc2')}</p>
            </div>

            {/* 이탈리아 지도 이미지 */}
            <div className={styles.imgBox1}>
              <div className={styles.imgRel}>
                <Image src={li('/img/dise/dis1_sec1_img1.png')} alt="" width={723} height={843} className="pc" />
                <Image src={li('/img/dise/dis1_sec1_img1_mo.png')} alt="" width={400} height={467} className="mo" />
              </div>
            </div>

            {/* 중증도와 시력저하의 관계 */}
            <div className={styles.txtGroup}>
              <h5>{t('severityTitle')}</h5>
              <p>{t('severityDesc')}</p>
            </div>

            {/* 4개 케이스 이미지 */}
            <div className={styles.imgDesGroup}>
              <div className={styles.imgDesBox}>
                <div className={styles.imgDesImgBox}>
                  <Image src="/img/dise/dis1_sec1_img2.png" alt="" width={450} height={300} className="pc" />
                  <Image src="/img/dise/dis1_sec1_img2_mo.png" alt="" width={400} height={300} className="mo" />
                  <div className={styles.imgDesTxtBox}>
                    <p dangerouslySetInnerHTML={{ __html: t.raw('case1Desc') }} />
                  </div>
                </div>
              </div>
              <div className={styles.imgDesBox}>
                <div className={styles.imgDesImgBox}>
                  <Image src="/img/dise/dis1_sec1_img3.png" alt="" width={450} height={300} className="pc" />
                  <Image src="/img/dise/dis1_sec1_img3_mo.png" alt="" width={400} height={300} className="mo" />
                  <div className={styles.imgDesTxtBox}>
                    <p dangerouslySetInnerHTML={{ __html: t.raw('case2Desc') }} />
                  </div>
                </div>
              </div>
              <div className={styles.imgDesBox}>
                <div className={`${styles.imgDesImgBox} ${styles.imgDesImgBoxHalf}`}>
                  <Image src="/img/dise/dis1_sec1_img4.png" alt="" width={460} height={300} />
                  <div className={styles.imgDesTxtBox}>
                    <p dangerouslySetInnerHTML={{ __html: t.raw('case3Desc') }} />
                  </div>
                </div>
              </div>
              <div className={styles.imgDesBox}>
                <div className={styles.imgDesImgBox}>
                  <Image src="/img/dise/dis1_sec1_img5.png" alt="" width={450} height={300} className="pc" />
                  <Image src="/img/dise/dis1_sec1_img5_mo.png" alt="" width={400} height={300} className="mo" />
                  <div className={styles.imgDesTxtBox}>
                    <p dangerouslySetInnerHTML={{ __html: t.raw('case4Desc') }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 빈도 */}
            <div className={styles.txtGroup}>
              <h5>{t('frequencyTitle')}<span>{t('frequencySubtitle')}</span></h5>
              <p>{t('frequencyDesc')}</p>
            </div>

            {/* 유전양상과 위험요소 */}
            <div className={styles.txtGroup}>
              <h5>{t('inheritanceTitle')}</h5>
              <p>{t('inheritanceDesc')}</p>
            </div>

            {/* 유전 이미지 2장 */}
            <div className={styles.imgDesGroup2}>
              <div className={styles.imgDesBox2}>
                <Image src={li('/img/dise/dis1_sec1_img6.png')} alt="" width={906} height={1297} style={{ width: '100%', height: 'auto' }} />
                <div className={styles.imgDesTxtBox}>
                  <p>{t('heteroLabel')}</p>
                </div>
              </div>
              <div className={styles.imgDesBox2}>
                <Image src={li('/img/dise/dis1_sec1_img7.png')} alt="" width={906} height={1297} style={{ width: '100%', height: 'auto' }} />
                <div className={styles.imgDesTxtBox}>
                  <p>{t('homoLabel')}</p>
                </div>
              </div>
            </div>

            {/* 이형접합체 설명 */}
            <div className={styles.txtGroup}>
              <p>{t('inheritanceDetailDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: 아벨리노의 진단 (dise_sec2) ===== */}
      <section id="diagnosis" className={styles.sec2}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec2TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec2Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.txtGroupWhite}>
              <p>{t('sec2Desc1')}</p>
            </div>

            {/* 병기 분류 이미지 5장 */}
            <div className={styles.sec2ImgWrap}>
              <p>{t('sec2StageDesc')}</p>
              <div className={styles.sec2ImgRow}>
                {[1,2,3,4,5].map(n => (
                  <div key={n} className={styles.sec2ImgItem}>
                    <Image src={`/img/dise/dis1_sec2_img${n}.png`} alt="" width={180} height={180} />
                  </div>
                ))}
              </div>
            </div>

            {/* 분류표 이미지 */}
            <div className={`${styles.imgBoxCenter} ${styles.sec2ImgBox1}`}>
              <Image src="/img/dise/dis1_sec2_img6.png" alt="" width={920} height={300} className="pc" />
              <Image src="/img/dise/dis1_sec2_img6_mo.png" alt="" width={400} height={300} className="mo" />
            </div>

            <div className={styles.txtGroupWhite}>
              <p>{t('sec2Desc2')}</p>
              <p>{t('sec2Desc3')}</p>
            </div>

            {/* 진행도 이미지 3장 */}
            <div className={styles.sec2ImgRow3}>
              {[7,8,9].map(n => (
                <div key={n} className={styles.sec2ImgItem}>
                  <Image src={`/img/dise/dis1_sec2_img${n}.png`} alt="" width={280} height={200} />
                </div>
              ))}
            </div>

            <div className={styles.txtGroupWhite}>
              <h5>{t('sec2ProgressTitle')}</h5>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sec2ProgressDesc') }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: 아벨리노의 치료 및 관리 (dise_sec3) ===== */}
      <section id="therapy" className={styles.sec3}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec3Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.txtGroup}>
              <h5>{t('sec3SymptomTitle')}</h5>
              <p>{t('sec3SymptomDesc1')}</p>
              <p>{t('sec3SymptomDesc2')}</p>
            </div>
            <div className={styles.txtGroup}>
              <h5>{t('sec3AdvancedTitle')}</h5>
              <p>{t('sec3AdvancedDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: 레이저 시력교정수술에 대한 경고 (dise_sec4) ===== */}
      <section id="warning" className={styles.sec4}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec4TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec4Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.sec4ContBox}>
              {/* 주의사항 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4WarningTitle')}</p></div>
                <div className={styles.sec4ContDes}>
                  <p dangerouslySetInnerHTML={{ __html: t.raw('sec4WarningDesc1') }} />
                  <p>{t('sec4WarningDesc2')}</p>
                </div>
              </div>

              {/* 레이저 수술 이전 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4PreLaserTitle')}</p></div>
                <div className={styles.sec4ContDes}>
                  <div className={styles.sec4ImgBox}>
                    <Image src="/img/dise/dis1_sec4_img1.png" alt="" width={600} height={300} />
                  </div>
                  <p>{t('sec4PreLaserDesc1')}</p>
                  <p>{t('sec4PreLaserDesc2')}</p>
                  <p>{t('sec4PreLaserDesc3')}</p>
                </div>
              </div>

              {/* 20대 환자 케이스 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4Case20Title')}</p></div>
                <div className={styles.sec4ContDes}>
                  <div className={styles.sec4ImgSmGroup}>
                    <div className={styles.sec4ImgSm}>
                      <Image src={li('/img/dise/dis1_sec4_img2.png')} alt="" width={400} height={300} />
                      <div className={styles.sec4ImgTitBox}>
                        <strong>{t('sec4Case20LeftLabel')}</strong>
                        <p dangerouslySetInnerHTML={{ __html: t.raw('sec4Case20LeftSubtitle') }} />
                      </div>
                      <p>{t('sec4Case20LeftDesc')}</p>
                    </div>
                    <div className={styles.sec4ImgSm}>
                      <Image src={li('/img/dise/dis1_sec4_img3.png')} alt="" width={400} height={300} />
                      <div className={styles.sec4ImgTitBox}>
                        <strong>{t('sec4Case20RightLabel')}</strong>
                        <p dangerouslySetInnerHTML={{ __html: t.raw('sec4Case20RightSubtitle') }} />
                      </div>
                      <p>{t('sec4Case20RightDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 44세 환자 케이스 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4Case44Title')}</p></div>
                <div className={styles.sec4ContDes}>
                  <div className={styles.sec4ImgBoxFull}>
                    <Image src="/img/dise/dis1_sec4_img4.png" alt="" width={600} height={300} />
                  </div>
                  <p>{t('sec4Case44Desc1')}</p>
                  <div className={styles.sec4ImgBoxFull}>
                    <Image src="/img/dise/dis1_sec4_img5.png" alt="" width={600} height={300} />
                  </div>
                  <p>{t('sec4Case44Desc2')}</p>
                </div>
              </div>

              {/* ICL 선택 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4IclChoiceTitle')}</p></div>
                <div className={styles.sec4ContDes}>
                  <p dangerouslySetInnerHTML={{ __html: t.raw('sec4IclChoiceDesc1') }} />
                  <p>{t('sec4IclChoiceDesc2')}</p>
                </div>
              </div>

              {/* 35세 환자 성공 케이스 */}
              <div className={styles.sec4DesBox}>
                <div className={styles.sec4ContTit}><p>{t('sec4Case35Title')}</p></div>
                <div className={styles.sec4ContDes}>
                  <div className={styles.sec4ImgBox}>
                    <Image src="/img/dise/dis1_sec4_img6.png" alt="" width={600} height={300} />
                  </div>
                  <p>{t('sec4Case35Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 예후 (dise_sec5) ===== */}
      <section id="prognosis" className={styles.sec5}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec5TitGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec5Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.sec5TxtBox}>
              <p>{t('sec5Desc1')}</p>
              <p>{t('sec5Desc2')}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sec5Desc3') }} />
            </div>
          </div>
        </div>
      </section>
    </ScrollPageLayout>
  );
}
