import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

const SECTIONS: ScrollSection[] = [
  { id: 'cat-about', hash: '#cat-about', label: 'ABOUT' },
  { id: 'cat-diagnosis', hash: '#cat-diagnosis', label: 'DIAGNOSIS' },
  { id: 'cat-therapy', hash: '#cat-therapy', label: 'THERAPY', dark: true },
  { id: 'cat-warning', hash: '#cat-warning', label: 'WARNING' },
];

export async function generateMetadata() {
  const t = await getTranslations('presbyopia.cataract');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function CataractPage() {
  const t = await getTranslations('presbyopia.cataract');
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  return (
    <ScrollPageLayout sections={SECTIONS}>
    <div className={`${styles.pagesWrapper} ${styles.catWrapper}`}>
      {/* cat_sec10 - 닥터 ICL 안과 확인 */}
      <div className={`${styles.catSec10} ${styles.catBImg3}`}>
        <div className={`${styles.titGroup} ${styles.white}`} data-aos="fade-up" data-aos-duration="1000">
          <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec10Title') }} />
          <p>{t('sec10Desc')}</p>
        </div>

        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.cWrap}>
            <ul>
              <li>
                <div className={styles.cirBox}>
                  <p>{t('precisionExam')}</p>
                </div>
                <p className={`${styles.cirBoxTxt} ${styles.cirBoxTxt1}`}>
                  {t('precisionExamDesc')}
                </p>
              </li>
              <li>
                <div className={`${styles.cirBox} ${styles.cirBoxCenter}`}>
                  <p>{t('doctorConsult')}</p>
                </div>
                <p className={`${styles.cirBoxTxt} ${styles.cirBoxTxt2}`}>
                  {t('doctorConsultDesc')}
                </p>
              </li>
              <li>
                <div className={styles.cirBox}>
                  <p>{t('surgeryProceed')}</p>
                </div>
                <p className={`${styles.cirBoxTxt} ${styles.cirBoxTxt3}`}>
                  {t('surgeryProceedDesc')}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* cat_sec10_1 */}
      <div className={styles.catSec10_1}>
        <div className={`${styles.titGroup} ${styles.white} ${styles.titGroup2}`} data-aos="fade-up" data-aos-duration="1000">
          <p>{t('sec10_1Desc')}</p>
        </div>
      </div>

      {/* cat_sec15 csh - 교과서 저자 */}
      <div className={`${styles.catSec15} ${styles.csh}`}>
        <div className={styles.w1430} data-aos="fade-up" data-aos-duration="1000">
          <h3 className={styles.bigTitle}>
            {t('sec15Title')}
          </h3>
          <div className={styles.cont1}>
            <div className={styles.cont1ImgBox}>
              <Image
                src="/img/cat/cat_sec11_img_2.png"
                alt=""
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={styles.cont1TextBox}>
              <div>
                <p dangerouslySetInnerHTML={{ __html: t.raw('sec15Desc1') }} />
                <p dangerouslySetInnerHTML={{ __html: t.raw('sec15Desc2') }} />
                <p>{t('sec15Desc3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* cat_sec1 - 백내장이란 */}
      <div id="cat-about" className={`${styles.catSec1} ${styles.padTb} ${styles.catBImg}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec1Title') }} />
          </div>
          <div className={styles.contGroup}>
            <div className={styles.wrapTxtBox}>
              <p>{t('sec1Desc')}</p>
            </div>
            <div className={styles.imgBox}>
              <ul>
                <li>
                  <div className={styles.catImgTxt}>
                    <p>{t('normalEye')}</p>
                  </div>
                  <div>
                    <Image
                      src={li('/img/cat/cat_s1_1.png')}
                      alt={t('normalEye')}
                      width={460}
                      height={300}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </li>
                <li>
                  <div className={styles.catImgTxt}>
                    <p>{t('cataractEye')}</p>
                  </div>
                  <div>
                    <Image
                      src={li('/img/cat/cat_s1_2.png')}
                      alt={t('cataractEye')}
                      width={460}
                      height={300}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* cat_sec2 - 백내장의 원인 */}
      <div className={`${styles.catSec2} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec2Title') }} />
          </div>
          <div className={styles.txtFrame}>
            <ul>
              <li className={styles.txtFrameB1}>
                <div className={`${styles.txtFrameNum} ${styles.none768}`}>
                  <Image src="/img/cat/cat_s2_1.png" alt="1" width={80} height={80} />
                </div>
                <div className={styles.txtFrameBox}>
                  <h5>
                    <span>1</span>{t('senileCataractTitle')}
                  </h5>
                  <p>{t('senileCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.txtFrameB2}>
                <div className={`${styles.txtFrameNum} ${styles.none768}`}>
                  <Image src="/img/cat/cat_s2_2.png" alt="2" width={80} height={80} />
                </div>
                <div className={styles.txtFrameBox}>
                  <h5>
                    <span>2</span>{t('congenitalCataractTitle')}
                  </h5>
                  <p>{t('congenitalCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.txtFrameB3}>
                <div className={`${styles.txtFrameNum} ${styles.none768}`}>
                  <Image src="/img/cat/cat_s2_3.png" alt="3" width={80} height={80} />
                </div>
                <div className={styles.txtFrameBox}>
                  <h5>
                    <span>3</span>{t('complicatedCataractTitle')}
                  </h5>
                  <p>{t('complicatedCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.txtFrameB4}>
                <div className={`${styles.txtFrameNum} ${styles.none768}`}>
                  <Image src="/img/cat/cat_s2_4.png" alt="4" width={80} height={80} />
                </div>
                <div className={styles.txtFrameBox}>
                  <h5>
                    <span>4</span>{t('traumaticCataractTitle')}
                  </h5>
                  <p>{t('traumaticCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.txtFrameB5}>
                <div className={`${styles.txtFrameNum} ${styles.none768}`}>
                  <Image src="/img/cat/cat_s2_5.png" alt="5" width={80} height={80} />
                </div>
                <div className={styles.txtFrameBox}>
                  <h5>
                    <span>5</span>{t('pcoTitle')}
                  </h5>
                  <p>{t('pcoDesc')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* cat_sec3 - 백내장의 진단 */}
      <div id="cat-diagnosis" className={`${styles.catSec3} ${styles.secBG} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec3Title') }} />
          </div>
          <div className={`${styles.wrapTxtBox} ${styles.catSec3WrapTxtBox}`}>
            <p>{t('sec3Desc')}</p>
          </div>
        </div>
      </div>

      {/* cat_sec11 - 차별화 시스템 */}
      <div className={`${styles.catSec11} ${styles.catBImg2} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.wrapList2}>
            <div className={`${styles.wrapList3Tit} ${styles.brown}`}>
              <h4>&lt;{t('sec11DiffTitle')}&gt;</h4>
            </div>
            <div className={`${styles.titGroup} ${styles.white}`}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec11Title1') }} />
            </div>
            <div className={styles.wrapTxtBox}>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sec11Desc1') }} />
            </div>
          </div>
        </div>

        <div className={styles.maxWd1420} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.wrapList1}>
            <div className={styles.wrapList1ImgBox}>
              <Image
                src="/img/cat/cat_s11_1.png"
                alt="ANTERION"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <span>&lt;&lt;ANTERION&gt;&gt;</span>
            </div>
            <div className={styles.wrapList1ImgBox}>
              <Image
                src="/img/cat/cat_s11_2.png"
                alt="CASIA 2"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <span>&lt;&lt;CASIA 2&gt;&gt;</span>
            </div>
          </div>
          <div className={styles.wrapList1}>
            <div className={styles.wrapList1ImgBox}>
              <Image
                src="/img/cat/cat_s11_3.png"
                alt={t('sec11Fig1')}
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <span>{t('sec11Fig1')}</span>
            </div>
            <div className={styles.wrapList1ImgBox}>
              <Image
                src="/img/cat/cat_s11_4.png"
                alt={t('sec11Fig2')}
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <span>{t('sec11Fig2')}</span>
            </div>
          </div>

          <div className={styles.catSec11Cont1}>
            <div className={styles.wrapTxtBox}>
              <h4>
                <span className={styles.bold}>
                  {t('sec11AnterionTitle')}
                </span>{' '}
                <br />
                {t('sec11AnterionSubtitle')}
              </h4>
              <p>{t('sec11AnterionDesc')}</p>
            </div>
            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s11_5.png"
                alt=""
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <div className={styles.catSec11Cont1}>
            <div className={styles.wrapTxtBox}>
              <h4>
                <span className={styles.bold}>
                  {t('sec11Casia2Title')}
                </span>
              </h4>
              <p>{t('sec11Casia2Desc')}</p>
            </div>
            <div className={styles.wrapList1}>
              <div className={styles.wrapList1ImgBox}>
                <Image
                  src="/img/cat/cat_s11_6.png"
                  alt=""
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.wrapList1ImgBox}>
                <Image
                  src="/img/cat/cat_s11_7.png"
                  alt=""
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className={styles.wrapTxtBox}>
              <h4>
                <span className={styles.bold}>
                  &lt;{t('sec11CtTitle')}&gt;
                </span>
              </h4>
              <p>{t('sec11CtDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* cat_sec4 - 백내장 분류 */}
      <div className={`${styles.catSec4} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec4CatTitle') }} />
          </div>
          <div className={styles.wrapList4}>
            <ul>
              <li className={styles.wrapList4Item}>
                <h5>{t('anteriorSubcapsularTitle')}</h5>
                <div className={styles.wrapList4Img}>
                  <Image
                    src="/img/cat/cat_s4_1.png"
                    alt={t('anteriorSubcapsularTitle')}
                    width={400}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p>{t('anteriorSubcapsularDesc')}</p>
                </div>
              </li>
              <li className={styles.wrapList4Item}>
                <h5>{t('corticalCataractTitle')}</h5>
                <div className={styles.wrapList4Img}>
                  <Image
                    src="/img/cat/cat_s4_2.png"
                    alt={t('corticalCataractTitle')}
                    width={400}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p>{t('corticalCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.wrapList4Item}>
                <h5>{t('nuclearCataractTitle')}</h5>
                <div className={styles.wrapList4Img}>
                  <Image
                    src="/img/cat/cat_s4_3.png"
                    alt={t('nuclearCataractTitle')}
                    width={400}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p>{t('nuclearCataractDesc')}</p>
                </div>
              </li>
              <li className={styles.wrapList4Item}>
                <h5>{t('posteriorSubcapsularTitle')}</h5>
                <div className={styles.wrapList4Img}>
                  <Image
                    src="/img/cat/cat_s4_4.png"
                    alt={t('posteriorSubcapsularTitle')}
                    width={400}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p>{t('posteriorSubcapsularDesc')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.maxWd1420} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.catSec4FullItem}>
            <h5>{t('posteriorSubcapsularCaseTitle')}</h5>
            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s11_8.png"
                alt={t('posteriorSubcapsularCaseTitle')}
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
          <div className={`${styles.wrapTxtBox} ${styles.black} ${styles.catSec4FullTxt}`}>
            <h4>
              <span className={styles.bold}>
                &lt;{t('posteriorSubcapsularCtTitle')}&gt;
              </span>
            </h4>
            <p>{t('posteriorSubcapsularCtDesc')}</p>
          </div>
        </div>
      </div>

      {/* cat_sec12 - 백내장일까? 노안일까? */}
      <div className={`${styles.catSec12} ${styles.catBImg2} ${styles.pad160}`}>
        <div className={styles.contInner2} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.wrapList2}>
            <div className={`${styles.wrapList3Tit} ${styles.brown}`}>
              <h4>{t('sec12DiffTitle')}</h4>
            </div>
            <div className={`${styles.titGroup} ${styles.white}`}>
              <h3>{t('sec12Title')}</h3>
            </div>
            <div className={styles.wrapTxtBox}>
              <p>{t('sec12Desc1')}</p>
            </div>

            <div className={styles.wrapList1}>
              <div className={styles.wrapList1ImgBox}>
                <Image
                  src="/img/cat/cat_s12_1.png"
                  alt="i-trace"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
                <span>&lt;&lt;i-trace&gt;&gt;</span>
              </div>
            </div>
            <div className={styles.wrapList1}>
              <video
                playsInline
                autoPlay
                muted
                loop
                src="/img/video/cat_sec12_video.webm"
                className={styles.wrapList1Video}
              />
            </div>
            <div className={styles.wrapTxtBox}>
              <h4>
                <span className={styles.bold}>
                  {t('sec12Desc2')}
                </span>
              </h4>
            </div>

            <div className={styles.borTxtBox}>
              <ul>
                <li>{t('sec12Ray1')}</li>
                <li>{t('sec12Ray2')}</li>
              </ul>
            </div>

            <div className={styles.borTxtColumn}>
              <ul>
                <li>{t('sec12Feature1')}</li>
                <li>{t('sec12Feature2')}</li>
                <li>{t('sec12Feature3')}</li>
                <li>{t('sec12Feature4')}</li>
                <li>{t('sec12Feature5')}</li>
                <li>{t('sec12Feature6')}</li>
              </ul>
            </div>

            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s12_3.png"
                alt=""
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s12_4.png"
                alt=""
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s12_5.png"
                alt=""
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={styles.catSec11ImgBox}>
              <Image
                src="/img/cat/cat_s12_6.png"
                alt=""
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div className={styles.wrapTxtBox}>
              <h4>
                &lt; {t('sec12CaseTitle')} &gt;
              </h4>
              <p>{t('sec12CaseDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* cat_sec5 - 백내장의 증상 */}
      <div className={`${styles.catSec5} ${styles.secBDb} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={`${styles.titGroup} ${styles.white}`}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec5Title') }} />
          </div>
          <div className={styles.symptomList}>
            <ul>
              <li className={styles.symptomListBox}>
                <div className={styles.symptomImg}>
                  <Image
                    src="/img/cat/cat_s5_1.png"
                    alt={t('visionLossTitle')}
                    width={336}
                    height={336}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className={styles.symptomTxt}>
                  <h5>{t('visionLossTitle')}</h5>
                  <p>{t('visionLossDesc')}</p>
                </div>
              </li>
              <li className={styles.symptomListBox}>
                <div className={styles.symptomImg}>
                  <Image
                    src="/img/cat/cat_s5_2.png"
                    alt={t('pupilOpacityTitle')}
                    width={336}
                    height={336}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className={styles.symptomTxt}>
                  <h5>{t('pupilOpacityTitle')}</h5>
                  <p>{t('pupilOpacityDesc')}</p>
                </div>
              </li>
              <li className={styles.symptomListBox}>
                <div className={styles.symptomImg}>
                  <Image
                    src="/img/cat/cat_s5_3.png"
                    alt={t('monocularDiplopiaTitle')}
                    width={336}
                    height={336}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className={styles.symptomTxt}>
                  <h5>{t('monocularDiplopiaTitle')}</h5>
                  <p>{t('monocularDiplopiaDesc')}</p>
                </div>
              </li>
              <li className={styles.symptomListBox}>
                <div className={styles.symptomImg}>
                  <Image
                    src="/img/cat/cat_s5_4.png"
                    alt={t('glareTitle')}
                    width={336}
                    height={336}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className={styles.symptomTxt}>
                  <h5>{t('glareTitle')}</h5>
                  <p>{t('glareDesc')}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.symptomTxtBottom}>
            <p>{t('sec5BottomDesc')}</p>
          </div>
        </div>
      </div>

      {/* cat_sec6 - 백내장의 예방 및 치료 */}
      <div id="cat-therapy" className={`${styles.catSec6} ${styles.catBImg1} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={`${styles.titGroup} ${styles.white}`}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec6Title') }} />
          </div>

          <div className={styles.wrapList3}>
            <div className={styles.wrapList3Tit}>
              <h4>{t('preventionTitle')}</h4>
            </div>
            <div className={styles.wrapList3Img}>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_1.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_1_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_2.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_2_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_3.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_3_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className={styles.wrapList3Txt}>
              <p>{t('preventionDesc')}</p>
            </div>
          </div>

          <div className={styles.wrapList3}>
            <div className={styles.wrapList3Tit}>
              <h4>{t('treatmentTitle')}</h4>
              <p>{t('treatmentSubtitle')}</p>
            </div>
            <div className={styles.wrapList3Img}>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_4.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_4_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_5.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_5_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div>
                <Image
                  className={styles.none900}
                  src="/img/cat/cat_s6_6.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ height: 'auto' }}
                />
                <Image
                  className={styles.block900}
                  src="/img/cat/cat_s6_6_m.png"
                  alt=""
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className={styles.wrapList3Txt}>
              <p>{t('treatmentDesc')}</p>
            </div>
          </div>

          <div className={styles.txtBottom}>
            <p>{t('treatmentBottomDesc')}</p>
          </div>
        </div>
      </div>

      {/* cat_sec7 - 인공수정체의 종류와 특성 */}
      <div className={`${styles.catSec7} ${styles.catBImg2} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={`${styles.titGroup} ${styles.white}`}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec7Title') }} />
          </div>

          <div className={styles.wrapList2}>
            <div className={`${styles.wrapList3Tit} ${styles.brown}`}>
              <h4>{t('multifocalMonofocalTitle')}</h4>
            </div>
            <div className={styles.wrapTxtBox}>
              <p>{t('multifocalMonofocalDesc')}</p>
            </div>
            <div className={styles.imgBox}>
              <ul>
                <li>
                  <div className={styles.catImgTxt}>
                    <p>{t('multifocalLens')}</p>
                  </div>
                  <div>
                    <Image
                      src={li('/img/cat/cat_s7_1.png')}
                      alt={t('multifocalLens')}
                      width={460}
                      height={300}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </li>
                <li>
                  <div className={styles.catImgTxt}>
                    <p>{t('monofocalLens')}</p>
                  </div>
                  <div>
                    <Image
                      src={li('/img/cat/cat_s7_2.png')}
                      alt={t('monofocalLens')}
                      width={460}
                      height={300}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.wrapTxtBox}>
              <p>{t('multifocalMonofocalDesc2')}</p>
            </div>
          </div>

          <div>
            <div className={`${styles.wrapList3Tit} ${styles.brown} ${styles.padB40}`}>
              <h4>{t('multifocalIolTitle')}</h4>
            </div>
            <div className={`${styles.txtFrame} ${styles.catSec7TxtFrame}`}>
              <ul>
                <li className={styles.txtFrameB1}>
                  <div className={styles.txtFrameNum}>
                    <Image
                      src="/img/cat/cat_s7_3.png"
                      alt="alcon"
                      width={120}
                      height={60}
                      style={{ maxWidth: 'max-content', height: 'auto' }}
                    />
                  </div>
                  <div className={styles.txtFrameBox}>
                    <h5>Clareon Panoptix</h5>
                    <p>{t('clareonDesc')}</p>
                  </div>
                </li>
                <li className={styles.txtFrameB2}>
                  <div className={styles.txtFrameNum}>
                    <Image
                      src="/img/cat/cat_s7_4.png"
                      alt="hoya"
                      width={120}
                      height={60}
                      style={{ maxWidth: 'max-content', height: 'auto' }}
                    />
                  </div>
                  <div className={styles.txtFrameBox}>
                    <h5>Vivinex Gemetric</h5>
                    <p>{t('vivinexDesc')}</p>
                  </div>
                </li>
                <li className={styles.txtFrameB3}>
                  <div className={styles.txtFrameNum}>
                    <Image
                      src="/img/cat/cat_s7_5.png"
                      alt="zeiss"
                      width={120}
                      height={60}
                      style={{ maxWidth: 'max-content', height: 'auto' }}
                    />
                  </div>
                  <div className={styles.txtFrameBox}>
                    <h5>Lisa-Tri</h5>
                    <p>{t('lisaTriDesc')}</p>
                  </div>
                </li>
                <li className={styles.txtFrameB4}>
                  <div className={styles.txtFrameNum}>
                    <Image
                      src="/img/cat/cat_s7_6.png"
                      alt="johnson"
                      width={120}
                      height={60}
                      style={{ maxWidth: 'max-content', height: 'auto' }}
                    />
                  </div>
                  <div className={styles.txtFrameBox}>
                    <h5>Tecnis Eyhance</h5>
                    <p>{t('tecnisDesc')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* cat_sec8 - 백내장 수술 방법 */}
      <div className={`${styles.catSec8} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec8Title') }} />
          </div>
          <div className={styles.wrapTxtBox}>
            <p>{t('sec8Desc')}</p>
          </div>
          <div className={styles.catSec8WrapList4}>
            <ul>
              <li className={styles.wrapList4Item}>
                <h5>step 1</h5>
                <div className={styles.catSec8WrapList4Img}>
                  <Image
                    src="/img/cat/cat_s8_1.png"
                    alt="step 1"
                    width={400}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </li>
              <li className={styles.wrapList4Item}>
                <h5>step 2</h5>
                <div className={styles.catSec8WrapList4Img}>
                  <Image
                    src="/img/cat/cat_s8_2.png"
                    alt="step 2"
                    width={400}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </li>
              <li className={styles.wrapList4Item}>
                <h5>step 3</h5>
                <div className={styles.catSec8WrapList4Img}>
                  <Image
                    src="/img/cat/cat_s8_3.png"
                    alt="step 3"
                    width={400}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* cat_sec9 - 수술 후 치료, 경과 */}
      <div id="cat-warning" className={`${styles.catSec9} ${styles.secBG} ${styles.pad160}`}>
        <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec9PostOpTitle') }} />
          </div>
          <div className={`${styles.wrapTxtBox} ${styles.catSec9WrapTxtBox}`}>
            <p>{t('sec9PostOpDesc')}</p>
          </div>
          <div className={styles.titGroup}>
            <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec9ProgressTitle') }} />
          </div>
          <div className={`${styles.wrapTxtBox} ${styles.catSec9WrapTxtBox}`}>
            <p>{t('sec9ProgressDesc')}</p>
          </div>
        </div>
      </div>
    </div>
    </ScrollPageLayout>
  );
}
