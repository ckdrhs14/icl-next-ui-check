'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

const LEFT_NAV: ScrollSection[] = [
  { id: 'hero', hash: '#hero', label: 'HOME' },
  { id: 'video', hash: '#video', label: 'ABOUT' },
  { id: 'surgery-video', hash: '#surgery-video', label: 'WHY ICL?' },
  { id: 'selection', hash: '#selection', label: 'SOLUTION' },
  { id: 'diagnosis', hash: '#diagnosis', label: 'EVO+AQUA ICL' },
  { id: 'fast-facts', hash: '#fast-facts', label: 'DR. ICL' },
  { id: 'reviews', hash: '#reviews', label: 'MAESTRO' },
];

const EQUIPMENT_STATIC = [
  {
    btnImg: '/img/spec/spec1-sec10-btn1.png',
    gifSrc: '/img/spec/casia2.gif',
    isVideo: false,
    equip: 'CASIA2',
  },
  {
    btnImg: '/img/spec/spec1-sec10-btn3.png',
    gifSrc: '/img/spec/Konan.gif',
    isVideo: false,
    equip: 'CELLCHEK20',
  },
  {
    btnImg: '/img/spec/spec1-sec10-btn2.png',
    gifSrc: '/img/main/iTracer.mp4',
    isVideo: true,
    equip: 'i-Trace',
  },
];

const SELECTION_IMAGES = [
  '/img/spec/spec1-sec8-img1.png',
  '/img/spec/spec1-sec8-img2.png',
  '/img/spec/spec1-sec8-img3.png',
  '/img/spec/spec1-sec8-img4.png',
];

const REWARD_IMAGES = [
  '/img/main/dns2_sli1.png',
  '/img/main/dns2_sli2.png',
  '/img/main/dns2_sli3.png',
  '/img/main/dns2_sli4.png',
  '/img/main/dns2_sli5.png',
  '/img/main/dns2_sli6.png',
  '/img/main/dns2_sli7.png',
  '/img/main/dns2_sli8.png',
  '/img/main/dns2_sli9.png',
  '/img/main/dns2_sli10.png',
  '/img/main/dns2_sli11.png',
  '/img/main/dns2_sli12.png',
  '/img/main/dns2_sli13.png',
  '/img/main/dns2_sli14.png',
];

const DR_SLIDES = [
  '/img/spec/spec1-sec13-slide1_n.png',
  '/img/spec/spec1-sec13-slide2_n.png',
  '/img/spec/20250902.png',
];

export default function MaestroClient() {
  const t = useTranslations('maestro');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  const RIGHT_NAV: ScrollSection[] = [
    { id: 'fast-facts', hash: '#fast-facts', label: t('navIcl') },
    { id: 'selection', hash: '#selection', label: t('navSelection'), dark: true },
    { id: 'diagnosis', hash: '#diagnosis', label: t('navDiagnosis') },
    { id: 'surgery-video', hash: '#surgery-video', label: t('navSurgery'), dark: true },
    { id: 'reviews', hash: '#reviews', label: t('navReview') },
  ];

  const EQUIPMENT = EQUIPMENT_STATIC.map((eq, idx) => ({
    ...eq,
    nmText: t(`equip${idx + 1}Nm`),
    nm: t.raw(`equip${idx + 1}NmHtml`),
    des: t(`equip${idx + 1}Des`),
  }));

  const SELECTION_ITEMS = [
    { img: li(SELECTION_IMAGES[0]), title: t('selectionItem1Title'), des: t('selectionItem1Des') },
    { img: li(SELECTION_IMAGES[1]), title: t('selectionItem2Title'), des: t('selectionItem2Des') },
    { img: li(SELECTION_IMAGES[2]), title: t('selectionItem3Title'), des: t('selectionItem3Des') },
    { img: SELECTION_IMAGES[3], title: t('selectionItem4Title'), des: t('selectionItem4Des') },
  ];

  const REWARD_SLIDES = REWARD_IMAGES.map((img, idx) => ({
    img,
    text: t(`reward${idx + 1}`),
  }));

  // Equipment carousel state
  const [activeEquip, setActiveEquip] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveEquip((prev) => (prev + 1) % EQUIPMENT.length);
    }, 3000);
  }, [EQUIPMENT.length]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handleBtnHover = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveEquip(idx);
  };

  const handleBtnLeave = () => {
    startInterval();
  };

  // Dr slides carousel
  const [drSlide, setDrSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setDrSlide((prev) => (prev + 1) % DR_SLIDES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Reward swiper auto-slide (slidesPerView: 5, loop)
  const [rewardOffset, setRewardOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setRewardOffset((prev) => (prev + 1) % REWARD_SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [REWARD_SLIDES.length]);

  // ch-bgImg toggle
  const [chImg, setChImg] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setChImg((prev) => !prev);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Count-up animation for fast-facts
  const factsRef = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);
  const [countMin, setCountMin] = useState(0);
  const [countSec, setCountSec] = useState(0);
  const [countPercent, setCountPercent] = useState(0);

  useEffect(() => {
    if (!factsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          animateCount(0, 4, 3000, setCountMin);
          animateCount(0, 13, 3000, setCountSec);
          animateCount(0, 99, 3000, setCountPercent);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(factsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  function animateCount(
    from: number,
    to: number,
    duration: number,
    setter: (v: number) => void,
    decimals = 0
  ) {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setter(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <ScrollPageLayout sections={LEFT_NAV}>
      {/* Right Quick Nav */}
      <nav className={`${styles.rightQuickNav} ${locale === 'en' ? styles.rightQuickNavEn : ''}`}>
        <ul className={styles.rightQuickList}>
          {RIGHT_NAV.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(s.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section 1: Hero (spec1-sec1) */}
      <section id="hero" className={styles.hero}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.heroTopGroup}>
            <div>
              <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
            </div>
            <div className={styles.heroGradientText}>
              <p>MAESTRO<br className={styles.mo} /> ICL {t('navSurgery')}</p>
            </div>
          </div>
          <div>
            <p className={styles.heroBottomText}>
              {locale === 'ko' ? (
                <>ICL 렌즈삽입술 오직 한 길만 걸어온<br className={styles.mo} /> 22년차 안과전문의<br className={styles.mo} /> ICL 레퍼런스 닥터 <br className={styles.mo} />이동훈 대표원장</>
              ) : (
                t('heroBottomText')
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Video (spec1-sec2) */}
      <section id="video" className={styles.videoSection}>
        <video className={styles.pc} src={li('/img/spec/spec1_sec2.mp4')} playsInline loop muted autoPlay />
        <video className={styles.mo} src={li('/img/spec/spec1_sec2_mo.mp4')} playsInline loop muted autoPlay />
      </section>

      {/* Section 3: Surgery Video (spec1-sec9) */}
      <section id="surgery-video" className={styles.surgeryVideo}>
        <div className={`${styles.videoBox} ${styles.pc}`}>
          <video playsInline loop autoPlay muted style={{ width: '100%' }}>
            <source src="/video/spec1-sec9-video-3v_n2.mp4" />
          </video>
        </div>
        <div className={`${styles.videoBox} ${styles.mo}`}>
          <video playsInline loop autoPlay muted style={{ width: '100%' }}>
            <source src="/video/spec1-sec9-video-mo-crop_n2.mp4" />
          </video>
        </div>
      </section>

      {/* Section 4: Selection Criteria (spec1-sec8) */}
      <section id="selection" className={styles.selection}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.selectionTitGroup}>
            <div className={styles.selectionTitBox}>
              <h3 className={styles.selectionH3}>
                {locale === 'ko' ? (
                  <><span className={styles.cMt}>닥터 ICL 안과</span>의 개인별 맞춤 시스템<br className={styles.mo} /> 풍부한 집도 경험</>
                ) : (
                  <><span className={styles.cMt}>{t('selectionH3Highlight')}</span>{t('selectionH3')}</>
                )}
              </h3>
            </div>
            <div className={styles.selectionTextBox}>
              {locale === 'ko' ? (
                <p>ICL 렌즈삽입술을 고민하고 계신다면<br className={styles.mo} /> 반드시 고려해야할 중요 사항입니다.</p>
              ) : (
                <p>{t('selectionText')}</p>
              )}
            </div>
          </div>
          <div className={styles.selectionContGroup}>
            <div className={styles.selectionContBox}>
              {SELECTION_ITEMS.map((item, idx) => (
                <div key={idx} className={styles.selectionCard}>
                  <div className={styles.selectionCardImg}>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div>
                    <p className={styles.selectionCardTitle}>{item.title}</p>
                    <p className={styles.selectionCardDes}>{item.des}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Diagnosis / MAESTRO Solutions (spec1-sec10) */}
      <section id="diagnosis" className={styles.diagnosis}>
        <div className={styles.diagnosisInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.diagnosisTitBox}>
            <div className={`${styles.diagnosisTitLine} ${styles.pc}`} />
            <h3 className={styles.diagnosisH3}>{t('diagnosisH3')}</h3>
            <div className={`${styles.diagnosisTitLine} ${styles.pc}`} />
          </div>
          <div className={styles.diagnosisTextBox}>
            {locale === 'ko' ? (
              <p>닥터 ICL 안과의 마에스트로<br className={styles.mo} /> 수술 기법을 완성시키는 솔루션</p>
            ) : (
              <p>{t('diagnosisText')}</p>
            )}
          </div>
          <div className={styles.diagnosisContGroup}>
            <div className={styles.diagnosisContLeft}>
              <div className={styles.solBtns}>
                {EQUIPMENT.map((eq, idx) => (
                  <div
                    key={idx}
                    className={`${styles.btnBox} ${activeEquip === idx ? styles.btnBoxOn : ''}`}
                    onMouseEnter={() => handleBtnHover(idx)}
                    onMouseLeave={handleBtnLeave}
                  >
                    <img src={eq.btnImg} alt={eq.equip} />
                  </div>
                ))}
              </div>
              {/* Mobile gif */}
              <div className={`${styles.solGifMo} ${styles.mo}`}>
                {EQUIPMENT.map((eq, idx) => (
                  <div
                    key={idx}
                    className={`${styles.gifBox} ${activeEquip === idx ? styles.gifBoxOn : ''}`}
                    style={idx === 0 ? { position: 'relative' } : undefined}
                  >
                    {eq.isVideo ? (
                      <video playsInline loop autoPlay muted>
                        <source src={eq.gifSrc} />
                      </video>
                    ) : (
                      <img src={eq.gifSrc} alt={eq.equip} />
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.solDes}>
                {EQUIPMENT.map((eq, idx) => (
                  <div
                    key={idx}
                    className={`${idx === 0 ? styles.desBoxFirst : styles.desBox} ${activeEquip === idx ? styles.desBoxOn : ''}`}
                    style={idx === 0 ? { position: 'relative' } : undefined}
                  >
                    <div className={styles.equipLabel}>
                      <p>{eq.equip}</p>
                    </div>
                    <div className={styles.equipNm}>
                      <p>{eq.nmText}</p>
                    </div>
                    <div className={styles.equipDes}>
                      <p>{eq.des}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.diagnosisContRight} ${styles.pc}`}>
              <div className={styles.diagnosisContRightBox}>
                {EQUIPMENT.map((eq, idx) => (
                  <div
                    key={idx}
                    className={`${styles.gifBox} ${idx === 0 ? styles.gifBoxFirst : ''} ${activeEquip === idx ? styles.gifBoxOn : ''}`}
                  >
                    {eq.isVideo ? (
                      <video playsInline loop autoPlay muted>
                        <source src={eq.gifSrc} />
                      </video>
                    ) : (
                      <img src={eq.gifSrc} alt={eq.equip} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Fast Facts (spec1-sec11) */}
      <section id="fast-facts" className={styles.fastFacts}>
        <div className={styles.fastFactsInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.fastFactsTitBox}>
            <div className={`${styles.fastFactsTitLine} ${styles.pc}`} />
            <h3 className={styles.fastFactsH3}>
              {locale === 'ko' ? (
                <><span className={styles.cBr}>닥터 ICL 안과</span>의<br className={styles.mo} /> 높은 신뢰도</>
              ) : (
                <><span className={styles.cBr}>{t('fastFactsH3Highlight')}</span>{t('fastFactsH3Suffix')}</>
              )}
            </h3>
            <div className={`${styles.fastFactsTitLine} ${styles.pc}`} />
          </div>
          <div className={styles.fastFactsTextBox}>
            {locale === 'ko' ? (
              <p>20년간의 임상연구로 입증된<br className={styles.mo} /> 국내 최초 렌즈삽입술 전문 클리닉<br className={styles.mo} /> 닥터 ICL 안과만의 기술력</p>
            ) : (
              <p>{t('fastFactsText1')}</p>
            )}
            <p className={`${styles.bold} ${styles.fastFactsFzUp} ${styles.pc}`}>{t('fastFactsText2')}</p>
          </div>
          <div className={styles.contGroup} ref={factsRef}>
            {/* Surgery time */}
            <div className={styles.contTime1}>
              <div className={styles.timeBox}>
                <div className={styles.contWrap}>
                  <div>
                    <img src="/img/spec/watch.png" alt="watch" />
                  </div>
                  <div className={styles.numBox}>
                    <span className={styles.count}>{countMin}</span>
                    <span className={styles.numBoxEm}>{t('unitMin')}</span>
                    <span className={styles.count}>{countSec}</span>
                    <span className={styles.numBoxEm}>{t('unitSec')}</span>
                  </div>
                </div>
                <div className={styles.factsDesBox}>
                  {locale === 'ko' ? (
                    <p>평균 수술 시간<br className={styles.mo} />(단안기준)</p>
                  ) : (
                    <p>{t('avgSurgeryTime')}</p>
                  )}
                  <p className={styles.factsDesBoxSm}>{t('surgeryTimeDes')}</p>
                </div>
              </div>
            </div>
            {/* Bottom stats */}
            <div className={styles.contBot}>
              <div className={styles.contBotBox}>
                <div className={styles.timeBox}>
                  <div className={styles.contWrap} style={{ gap: '15px' }}>
                    <div>
                      <img src="/img/spec/kit.png" alt="kit" />
                    </div>
                    <div className={styles.contBotNumBox}>
                      <div className={styles.counterWrap}>
                        <span className={styles.contBotCount}>{countPercent}</span>
                        <span className={styles.contBotEm}>%</span>
                      </div>
                      <div className={styles.contBotDesBox}>
                        <p>{t('satisfaction')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Doctor Profile / Research (spec1-sec12) */}
      <section className={styles.doctorProfile}>
        <div className={`${styles.bgImg} ${styles.bgImgLeft}`}>
          <img src="/img/spec/spec1-sec12-bg-le.png" alt="" />
        </div>
        <div className={`${styles.bgImg} ${styles.bgImgRight} ${chImg ? styles.chImg : ''}`}>
          <img src="/img/spec/spec1-sec12-bg-ri1.png" alt="" />
          <img src="/img/spec/spec1-sec12-bg-ri2.png" alt="" />
        </div>
        <div className={`${styles.bgFilter} ${styles.filterLeft}`} />
        <div className={`${styles.bgFilter} ${styles.filterRight}`} />
        <div className={styles.doctorProfileInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.doctorLensImg}>
            <img src="/img/spec/spec1-sec12-lens.png" alt="" className={styles.pc} />
            <img src="/img/spec/250908_mo.png" alt="" className={styles.mo} />
          </div>
          <div className={`${styles.doctorTextBox} ${styles.mo}`} style={{ textAlign: 'center' }}>
            <p>{t('doctorText')}</p>
          </div>
          <div className={styles.doctorTextGroup}>
            <div className={`${styles.doctorImgMo} ${styles.mo}`}>
              <img src="/img/spec/spec1-sec12-img1-mo_2.png" alt="" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className={`${styles.doctorTextBox} ${styles.pc}`}>
              <p>{t('doctorText')}</p>
            </div>
            <div className={styles.doctorResearch}>
              <p>{t('doctorResearch1')}</p>
            </div>
            <div className={`${styles.bgImgMo} mo`}>
              <img src="/img/spec/spec1-sec12-bg-ri1-mo.png" alt="" className={!chImg ? styles.chImgVisible : styles.chImgHidden} />
              <img src="/img/spec/spec1-sec12-bg-ri2-mo.png" alt="" className={chImg ? styles.chImgVisible : styles.chImgHidden} />
            </div>
            <div className={styles.doctorResearch} style={{ textAlign: 'right' }}>
              <p>{t('doctorResearch2')}</p>
            </div>
          </div>
          <div className={styles.textImgBox}>
            <img src="/img/spec/250908_pc.png" alt="" className={styles.pc} style={{ margin: '0 auto' }} />
          </div>
        </div>
      </section>

      {/* Section 8: Dr. Lee (spec1-sec13) */}
      <section className={styles.drProfile}>
        <div className={styles.drProfileInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.drContGroup}>
            <div className={styles.drContLeft}>
              <div className={styles.drTextGroup}>
                <div>
                  <p className={styles.drName}>
                    <span className={styles.drNameLarge}>{t('drName')}</span>{t('drTitle')}
                  </p>
                  <p className={styles.drEng}>{t('drEng')}</p>
                  <p className={styles.drDes}>
                    {t('drDes')}
                  </p>
                </div>
              </div>
              {/* Reward swiper - PC */}
              <div className={`${styles.rewardGroup} ${styles.pc}`}>
                <div className={styles.rewardBox}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const slide = REWARD_SLIDES[(rewardOffset + i) % REWARD_SLIDES.length];
                    return (
                      <div key={`${rewardOffset}-${i}`} className={styles.rewardWrap}>
                        <div className={styles.rewardImgBox}>
                          <img src={slide.img} alt="" />
                        </div>
                        <p className={styles.rewardText}>{slide.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Right - activities */}
            <div className={`${styles.drContRight} ${styles.pc}`}>
              <div className={styles.activityGroup}>
                <h4 className={styles.activityTitle}>{t('activityTitle')}</h4>
                <ul className={styles.activityList}>
                  <li><strong>{t('activity1')}</strong> {t('activity1Des')}</li>
                  <li><strong>{t('activity2')}</strong> {t('activity2Des')}</li>
                  <li><strong>{t('activity3')}</strong> {t('activity3Des')}</li>
                  <li><strong>{t('activity4')}</strong> {t('activity4Des')}</li>
                  <li><strong>{t('activity5')}</strong> {t('activity5Des')}</li>
                  <li><strong>{t('activity6')}</strong> {t('activity6Des')}</li>
                  <li><strong>{t('activity7')}</strong> {t('activity7Des')}</li>
                  <li><strong>{t('activity8')}</strong> {t('activity8Des')}</li>
                </ul>
              </div>
            </div>
            {/* Mobile image */}
            <div className={styles.mo}>
              <div>
                <img src={li('/img/spec/spec1-sec13-img1-mo2.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Reviews (spec1-sec14) */}
      <section id="reviews" className={styles.reviews}>
        <div className={styles.reviewsInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.reviewsTitBox}>
            <div className={`${styles.reviewsTitLine} ${styles.pc}`} />
            <h3 className={styles.reviewsH3}>
              <span className={styles.cNv}>{t('reviewsH3')}</span>
            </h3>
            <div className={`${styles.reviewsTitLine} ${styles.pc}`} />
          </div>
          <div className={styles.reviewsTextBox}>
            <p className={styles.reviewsFzUp}>
              <span className={styles.bold}>{t('reviewsText1')}</span>{t('reviewsText2')}
            </p>
          </div>
          <div className={styles.reviewsContGroup}>
            <div className={styles.moreBtnBox}>
              <a href="/community/reviews">{t('reviewsMore')}</a>
            </div>
            <div className={styles.reviewGroup}>
              {/* placeholder review cards - replace with API data */}
              {[
                { name: '정○욱', job: '대표원장', company: '레디원 성형외과', methodNote: '스마일 후 시력 저하로', method: 'EVO+ICL', myopiaR: '-2.0', myopiaL: '-1.75', astigR: '-1.25', astigL: '-1.0', afterR: '😊', afterL: '😊' },
                { name: '신○석', job: '대표', company: '바이오 유니버스 및\n종합입시학원', methodNote: '', method: 'EVO+ICL', myopiaR: '-10.25', myopiaL: '-10.5', astigR: '-2.87', astigL: '-2.25', afterR: '😊', afterL: '😊' },
                { name: '김○은', job: '', company: '샤* 컬러 리스트', methodNote: '', method: 'EVO+ICL', myopiaR: '-4.75', myopiaL: '-4.0', astigR: '-0.75', astigL: '-0.62', afterR: '😊', afterL: '😊' },
                { name: '오○석', job: '', company: '변호사', methodNote: '', method: 'EVO+ICL', myopiaR: '-4.37', myopiaL: '-4.0', astigR: '-0.37', astigL: '-0.37', afterR: '😊', afterL: '😊' },
                { name: '이○은', job: '', company: 'IT 전략경영실', methodNote: '', method: 'EVO+ICL', myopiaR: '-8.87', myopiaL: '-8.0', astigR: '-1.75', astigL: '-2.75', afterR: '😊', afterL: '😊' },
              ].map((item, idx) => (
                <div key={idx} className={styles.reviewBox}>
                  <div className={styles.reviewPic}>
                    <div className={styles.reviewBadge}>{t('reviewBadge')}</div>
                    <div className={styles.reviewPicPlaceholder} />
                  </div>
                  <div className={styles.reviewText}>
                    <div className={styles.reviewNm}>
                      <p className={styles.reviewName}>{item.name} {item.job}</p>
                      <p className={styles.reviewCompany}>{item.company}</p>
                    </div>
                    <div className={styles.reviewCh}>
                      <div className={styles.chRow}>
                        <div className={`${styles.chLeft} ${styles.bgN1}`}>{t('reviewMethodLabel')}</div>
                        <div className={`${styles.chRight} ${styles.bgN2}`}>
                          {item.methodNote && <span className={styles.chMethodNote}>{item.methodNote} </span>}
                          {item.method}
                        </div>
                      </div>
                      <div className={styles.chRow}>
                        <div className={`${styles.chLeft} ${styles.bgG1}`}>{t('reviewPreLabel')}</div>
                        <div className={styles.chRightSplit}>
                          <div className={styles.bgG3}>{t('reviewLeftEye')}</div>
                          <div className={styles.bgG3}>{t('reviewRightEye')}</div>
                        </div>
                      </div>
                      <div className={styles.chRow}>
                        <div className={`${styles.chLeft} ${styles.bgG2}`}>{t('reviewMyopia')}</div>
                        <div className={styles.chRightSplit}>
                          <div className={styles.bgG4}>{item.myopiaR}</div>
                          <div className={styles.bgG4}>{item.myopiaL}</div>
                        </div>
                      </div>
                      <div className={styles.chRow}>
                        <div className={`${styles.chLeft} ${styles.bgG2}`}>{t('reviewAstig')}</div>
                        <div className={styles.chRightSplit}>
                          <div className={styles.bgG4}>{item.astigR}</div>
                          <div className={styles.bgG4}>{item.astigL}</div>
                        </div>
                      </div>
                      <div className={`${styles.chRow} ${styles.chBlur}`}>
                        <div className={`${styles.chLeft} ${styles.bgBr1}`}>{t('reviewResultLabel')}</div>
                        <div className={styles.chRightSplit}>
                          <div className={styles.bgBr2}>{item.afterR}</div>
                          <div className={styles.bgBr2}>{item.afterL}</div>
                        </div>
                      </div>
                    </div>
                    <a href="/community/reviews" className={styles.reviewMore}>{t('reviewMoreLink')}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollPageLayout>
  );
}
