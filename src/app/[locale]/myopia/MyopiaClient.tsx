'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollPageLayout, type ScrollSection } from '@/components/scroll';
import styles from './page.module.css';

export default function MyopiaClient() {
  const t = useTranslations('myopia');

  const SECTIONS: ScrollSection[] = [
    { id: 'myopia-cont1', hash: '#myopia-cont1', label: t('nav0'), dark: true },
    { id: 'myopia-cont2', hash: '#myopia-cont2', label: t('nav1') },
    { id: 'myopia-cont3', hash: '#myopia-cont3', label: t('nav2'), dark: true },
    { id: 'myopia-cont4', hash: '#myopia-cont4', label: t('nav3'), dark: true },
    { id: 'myopia-cont5', hash: '#myopia-cont5', label: t('nav4'), dark: true },
    { id: 'myopia-cont6', hash: '#myopia-cont6', label: t('nav5'), dark: true },
  ];

  const SAFETY_ITEMS = [
    {
      num: '01',
      title: 'Zero-Gap Targeting',
      desc: [t('sec8.safety0Desc1'), t('sec8.safety0Desc2')],
    },
    {
      num: '02',
      title: 'High-Density Barrier',
      desc: [t('sec8.safety1Desc1'), t('sec8.safety1Desc2')],
    },
    {
      num: '03',
      title: 'Long-term Retical Guard',
      desc: [t('sec8.safety2Desc1'), t('sec8.safety2Desc2'), t('sec8.safety2Desc3')],
    },
  ];

  const EQUIPMENT_SLIDES = [
    {
      img: '/img/myopia/equipment-01.png',
      tit: t('sec16.equip0Tit'),
      subtit: t('sec16.equip0Subtit'),
      texts: [t('sec16.equip0Text0'), t('sec16.equip0Text1'), t('sec16.equip0Text2')],
    },
    {
      img: '/img/myopia/equipment-02.png',
      tit: t('sec16.equip1Tit'),
      subtit: t('sec16.equip1Subtit'),
      texts: [t('sec16.equip1Text0'), t('sec16.equip1Text1'), t('sec16.equip1Text2')],
    },
    {
      img: '/img/myopia/equipment-03.png',
      tit: t('sec16.equip2Tit'),
      subtit: t('sec16.equip2Subtit'),
      texts: [t('sec16.equip2Text0'), t('sec16.equip2Text1'), t('sec16.equip2Text2')],
    },
  ];

  // Equipment swiper with loop clones
  const loopSlides = [
    EQUIPMENT_SLIDES[EQUIPMENT_SLIDES.length - 1],
    ...EQUIPMENT_SLIDES,
    EQUIPMENT_SLIDES[0],
  ];
  const [equipIdx, setEquipIdx] = useState(1); // 1 = first real slide
  const [equipTransition, setEquipTransition] = useState(true);
  const equipSlide = ((equipIdx - 1) % EQUIPMENT_SLIDES.length + EQUIPMENT_SLIDES.length) % EQUIPMENT_SLIDES.length;

  const goNext = () => {
    setEquipTransition(true);
    setEquipIdx((p) => p + 1);
  };
  const goPrev = () => {
    setEquipTransition(true);
    setEquipIdx((p) => p - 1);
  };

  useEffect(() => {
    if (equipIdx === 0) {
      const t = setTimeout(() => {
        setEquipTransition(false);
        setEquipIdx(EQUIPMENT_SLIDES.length);
      }, 800);
      return () => clearTimeout(t);
    }
    if (equipIdx === loopSlides.length - 1) {
      const t = setTimeout(() => {
        setEquipTransition(false);
        setEquipIdx(1);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [equipIdx, loopSlides.length]);

  // Safety items - active on scroll (matches PHP ScrollTrigger: item top enters center)
  const [activeSafety, setActiveSafety] = useState(0);
  useEffect(() => {
    const items = document.querySelectorAll('[data-safety-item]');
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.safetyItem);
            setActiveSafety(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollPageLayout sections={SECTIONS}>
      {/* myopia1-sec1: Hero */}
      <section id="myopia-cont1" className={styles.sec1}>
        <div className={styles.sec1Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec1TxtBox}>
            <h3>{t('hero.title1')}<br /><strong>{t('hero.title2')}</strong>{t('hero.title3')}</h3>
            <p>{t('hero.desc1')}<br />{t('hero.desc2')}</p>
          </div>
        </div>
      </section>

      {/* myopia1-sec2: Why Choose */}
      <section className={styles.sec2}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>
              <span className={styles.cBr}>{t('sec2.title1')}</span>{t('sec2.title2')}<br />{t('sec2.title3')}<span className={styles.cBr}>{t('sec2.title4')}</span>{t('sec2.title5')}
            </h3>
          </div>
          <div className={styles.myopiaList}>
            <div className={styles.myopiaListItem}>
              <div className={styles.myopiaListItemImgBox}>
                <img src="/img/myopia/myopia-sec2-img1.png" alt="" />
              </div>
              <div className={styles.myopiaListItemTxtBox}>
                <h4 className={styles.myopiaListItemTxtBoxH4}>{t('sec2.normalEye')}<span style={{ fontWeight: 400 }}>{t('sec2.normalEyeNote')}</span></h4>
              </div>
            </div>
            <div className={styles.myopiaListItem}>
              <div className={styles.myopiaListItemImgBox}>
                <img src="/img/myopia/myopia-sec2-img2.png" alt="" />
              </div>
              <div className={styles.myopiaListItemTxtBox}>
                <h4 className={styles.myopiaListItemTxtBoxH4}>{t('sec2.myopiaEye')}<span style={{ fontWeight: 400 }}>{t('sec2.myopiaEyeNote')}</span></h4>
              </div>
            </div>
          </div>
          <div className={styles.descBox}>
            <p className={styles.descBoxP}>
              {t('sec2.desc1')}<br />
              <span className={styles.cBr}>{t('sec2.desc2')}<br className={styles.mo} />{t('sec2.desc2b')}</span>{t('sec2.desc2c')}<br />
              {t('sec2.desc3')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec3: Complications */}
      <section id="myopia-cont2" className={styles.sec3}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>
              {t('sec3.title1')}<br className={styles.mo} />{t('sec3.title2')}<span className={styles.cNv}>{t('sec3.title3')}</span>{t('sec3.title4')}
            </h3>
          </div>
          <div className={styles.myopiaListType2}>
            {[
              { img: '/img/myopia/sec3-list-01.png', title: t('sec3.comp0Title'), desc: t('sec3.comp0Desc') },
              { img: '/img/myopia/sec3-list-02.png', title: t('sec3.comp1Title'), desc: t('sec3.comp1Desc') },
              { img: '/img/myopia/sec3-list-03.png', title: t('sec3.comp2Title'), desc: t('sec3.comp2Desc') },
            ].map((item, idx) => (
              <div key={idx} className={styles.myopiaListType2Item}>
                <div className={styles.myopiaListType2ImgBox}>
                  <img src={item.img} alt="" />
                </div>
                <div className={styles.myopiaListType2TxtBox}>
                  <h4 className={styles.myopiaListType2TxtBoxH4}>{item.title}</h4>
                  <p className={styles.myopiaListType2TxtBoxP}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={`${styles.descBoxP} ${styles.sec3DescTop}`}>
              {t('sec3.descTop1')}<span className={styles.sec3DescTopSpan}>{t('sec3.descTop2')}</span>{t('sec3.descTop3')}
            </p>
            <p className={styles.descBoxP}>
              {t('sec3.descBtm1')}<br className={styles.mo} /> <strong className={styles.descBoxStrong}>{t('sec3.descBtm2')}</strong>{t('sec3.descBtm3')}<br />
              {t('sec3.descBtm4')}<br className={styles.mo} />{t('sec3.descBtm5')}<br className={styles.mo} /> <span className={styles.descBoxSpan}>{t('sec3.descBtm6')}</span>{t('sec3.descBtm7')}
            </p>
          </div>
        </div>
      </section>

      {/* Banner: sec4-banner */}
      <div className={`${styles.bannerBox} ${styles.sec4Banner}`}>
        <div className={styles.bannerBoxInner} data-aos="fade-up" data-aos-duration="1000">
          <h3 className={styles.bannerH3}>
            {t('sec4banner.title')}
          </h3>
          <p className={styles.bannerP}>{t('sec4banner.desc')}</p>
        </div>
      </div>

      {/* myopia1-sec4: Glaucoma */}
      <section className={styles.sec4}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>
              {t('sec4.title1')}<br className={styles.mo} /> <span className={styles.cBr}>{t('sec4.title2')}</span>{t('sec4.title3')}
            </h3>
            <p className={styles.titGroupP}>
              {t('sec4.desc1')}<br className={styles.mo} />{t('sec4.desc2')}<br />
              {t('sec4.desc3')}
            </p>
          </div>
          <div className={styles.myopiaListType3}>
            {[
              { img: '/img/myopia/sec4-list-01.png', label: 'STEP 1', title: t('sec4.step0Title'), desc: t('sec4.step0Desc') },
              { img: '/img/myopia/sec4-list-02.png', label: 'STEP 2', title: t('sec4.step1Title'), desc: t('sec4.step1Desc') },
              { img: '/img/myopia/sec4-list-03.png', label: 'STEP 3', title: t('sec4.step2Title'), desc: t('sec4.step2Desc') },
            ].map((item, idx) => (
              <div key={idx} className={styles.myopiaListType3Item}>
                <div className={styles.myopiaListType3ImgBox}>
                  <img src={item.img} alt="" />
                </div>
                <div className={styles.myopiaListType3TxtBox}>
                  <span className={styles.myopiaListType3Label}>{item.label}</span>
                  <h4 className={styles.myopiaListType3H4}>{item.title}</h4>
                  <p className={styles.myopiaListType3P}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.descBoxP}>
              {t('sec4.btmDesc1')}<br className={styles.mo} />{t('sec4.btmDesc2')}<br />
              {t('sec4.btmDesc3')}<br className={styles.mo} />{t('sec4.btmDesc4')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec5: Analysis */}
      <section className={styles.sec5}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>
              {t('sec5.title1')}<span className={styles.cBr}>{t('sec5.title2')}</span>{t('sec5.title3')}<br className={styles.mo} />{t('sec5.title4')}<span className={styles.cBr}>{t('sec5.title5')}</span>{t('sec5.title6')}
            </h3>
            <p className={styles.titGroupP}>{t('sec5.desc')}<br className={styles.mo} />{t('sec5.descB')}</p>
          </div>
          <div className={styles.myopiaList}>
            {[
              { topTitle: t('sec5.item0TopTitle'), img: '/img/myopia/sec5-list-01.png', btmH3: t('sec5.item0BtmH3'), btmP: t('sec5.item0BtmP') },
              { topTitle: t('sec5.item1TopTitle'), img: '/img/myopia/sec5-list-02.png', btmH3: t('sec5.item1BtmH3'), btmP: t('sec5.item1BtmP') },
            ].map((item, idx) => (
              <div key={idx} className={`${styles.myopiaListItem} ${styles.myopiaListNoBorder}`} style={{ border: 0 }}>
                <div className={styles.myopiaListTopTxtBox}>
                  <h4 className={styles.myopiaListTopTxtBoxH4}>{item.topTitle}</h4>
                </div>
                <div className={styles.myopiaListNoBorderImgBox} style={{ padding: 0 }}>
                  <img src={item.img} alt="" style={{ width: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.myopiaListTxtBottom}>
                  <h3 className={styles.myopiaListTxtBottomH3}>{item.btmH3}</h3>
                  <p className={styles.myopiaListTxtBottomP}>{item.btmP}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.descBoxP}>
              {t('sec5.btmDesc1')}<strong className={styles.descBoxStrong}>{t('sec5.btmDesc2')}</strong>{t('sec5.btmDesc3')}<strong className={styles.descBoxStrong}>{t('sec5.btmDesc4')}</strong>{t('sec5.btmDesc5')}
            </p>
            <p className={styles.descBoxP}>
              {t('sec5.btmDesc6')}<span className={styles.cBr}>{t('sec5.btmDesc7')}</span>{t('sec5.btmDesc8')}<br />
              {t('sec5.btmDesc9')}<span className={styles.cBr}>{t('sec5.btmDesc10')}</span>{t('sec5.btmDesc11')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec6: Retina Intro */}
      <section id="myopia-cont3" className={styles.sec6}>
        <div className={styles.sec6Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec1TxtBox}>
            <h3>{t('sec6.title1')}<br /><strong>{t('sec6.title2')}</strong>{t('sec6.title3')}</h3>
            <p>{t('sec6.desc1')}<br />{t('sec6.desc2')}</p>
          </div>
        </div>
      </section>

      {/* myopia1-sec7: Retina Laser */}
      <section className={styles.sec7}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>
              {t('sec7.title1')}<br className={styles.mo} /><span className={styles.cBr}>{t('sec7.title2')}</span>
            </h3>
            <p className={styles.titGroupP}>{t('sec7.desc')}</p>
          </div>
          <div className={styles.myopiaList}>
            {[
              { topTitle: t('sec7.item0'), img: '/img/myopia/sec7-list-01.png' },
              { topTitle: t('sec7.item1'), img: '/img/myopia/sec7-list-02.png' },
            ].map((item, idx) => (
              <div key={idx} className={`${styles.myopiaListItem}`} style={{ border: 0 }}>
                <div className={styles.sec7TopTxtBox}>
                  <h4 className={styles.myopiaListTopTxtBoxH4} style={{ color: '#fff' }}>{item.topTitle}</h4>
                </div>
                <div style={{ padding: 0 }}>
                  <img src={item.img} alt="" style={{ width: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.descBoxP}>
              {t('sec7.btmDesc1')}<span className={styles.cBr}>{t('sec7.btmDesc2')}</span>{t('sec7.btmDesc3')}<br className={styles.mo} />{t('sec7.btmDesc4')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec15: Wide-scan */}
      <section className={styles.sec15}>
        <div className={styles.sec15Inner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3} style={{ color: '#fff', lineHeight: '120%' }}>
              {t('sec15.title1')}<br /><span style={{ color: '#042B48' }}>{t('sec15.title2')}</span>{t('sec15.title3')}
            </h3>
          </div>
          <div className={`${styles.myopiaList} ${styles.sec15MyopiaList}`} style={{ margin: '80px 0' }}>
            {[
              { topTitle: t('sec15.item0TopTitle'), img: '/img/myopia/sec15-list-01.png', btmH3: t('sec15.item0BtmH3') },
              { topTitle: t('sec15.item1TopTitle'), img: '/img/myopia/sec15-list-02.png', btmH3: t('sec15.item1BtmH3') },
            ].map((item, idx) => (
              <div key={idx} className={`${styles.myopiaListItem} ${styles.sec15MyopiaListItem}`} style={{ border: 0, background: 'transparent' }}>
                <div className={`${styles.myopiaListItemTxtBox} ${styles.sec15TxtBox}`} style={{ background: '#042B48', borderRadius: '20px 20px 0 0' }}>
                  <h4 className={styles.myopiaListTopTxtBoxH4} style={{ color: '#fff' }}>{item.topTitle}</h4>
                </div>
                <div className={styles.sec15ImgBox} style={{ padding: 0 }}>
                  <img src={item.img} alt="" style={{ width: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className={styles.sec15TxtBottomH3}>{item.btmH3}</h3>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.sec15DescP}>
              {t('sec15.btmDesc1')}<span className={styles.sec15DescSpan}>{t('sec15.btmDesc2')}</span>{t('sec15.btmDesc3')}<br />
              {t('sec15.btmDesc4')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec8: Safety Standards */}
      <section className={styles.sec8}>
        <div className={styles.sec8Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec8Title}>
            <h3 className={styles.sec8TitleH3}>
              {t('sec8.title1')}<br />{t('sec8.title2')}<br />
              <strong className={styles.sec8TitleStrong}>{t('sec8.title3')}</strong>
            </h3>
          </div>
          <div className={styles.safetyList}>
            {SAFETY_ITEMS.map((item, idx) => (
              <div key={idx} data-safety-item={idx} className={`${styles.safetyItem} ${activeSafety === idx ? styles.safetyItemActive : ''}`}>
                <h4 className={styles.safetyH4}>
                  <span className={styles.safetyLabel}>{item.num}</span>
                  {item.title}
                </h4>
                <p className={styles.safetyP}>
                  {item.desc.map((line, i) => (
                    <span key={i}>{line}{i < item.desc.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* myopia1-sec11: Cataract Intro */}
      <section id="myopia-cont4" className={styles.sec11}>
        <div className={styles.sec11Inner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.sec11H3}>&ldquo;{t('sec11.title1')}<br className={styles.mo} />{t('sec11.title2')}&rdquo;</h3>
            <p className={styles.sec11P}>
              {t('sec11.desc1')}<br />
              {t('sec11.desc2')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec9: Cataract Detail */}
      <section className={styles.sec9}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec9TitleBox}>
            <h3 className={styles.sec9H3}>{t('sec9.title1')}<br />{t('sec9.title2')}</h3>
            <p className={styles.sec9P}>
              {t('sec9.desc1')}<br className={styles.mo} />{t('sec9.desc2')}<br />
              {t('sec9.desc3')}<br className={styles.mo} />{t('sec9.desc4')}
            </p>
          </div>
          <div className={styles.differentList}>
            {[
              { img: '/img/myopia/sec9-list-01.png', h4: t('sec9.diff0H4'), p: t('sec9.diff0P') },
              { img: '/img/myopia/sec9-list-02.png', h4: t('sec9.diff1H4'), p: t('sec9.diff1P') },
              { img: '/img/myopia/sec9-list-03.png', h4: t('sec9.diff2H4'), p: t('sec9.diff2P') },
            ].map((item, idx) => (
              <div key={idx} className={styles.differentListItem}>
                <div><img src={item.img} alt="" /></div>
                <div style={{ textAlign: 'center' }}>
                  <h4 className={styles.differentListH4}>{item.h4}</h4>
                  <p className={styles.differentListP}>{item.p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.sec9DescP}>
              {t('sec9.btmDesc1')}<br className={styles.mo} />{t('sec9.btmDesc2')}<br className={styles.mo} />
              <strong className={styles.sec9DescStrong}>{t('sec9.btmDesc3')}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec10: Detail list */}
      <section className={styles.sec10}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec10List}>
            {/* POINT 01 */}
            <div className={styles.sec10Item}>
              <div>
                <h3 className={styles.sec10TitleH3}>{t('sec10.point0TitleH3')} <span className={styles.sec10TitleSpan}>(Calculation)</span></h3>
              </div>
              <div className={styles.sec10ContentBox}>
                <div>
                  <img src="/img/myopia/sec10-list-01.png" alt="" />
                </div>
                <div>
                  <h4 className={styles.sec10Tit}>{t('sec10.point0Tit')}</h4>
                  <strong className={styles.sec10Subtit}>&ldquo;{t('sec10.point0Subtit')}&rdquo;</strong>
                  <p className={styles.sec10TxtP}>{t('sec10.point0Text1')}</p>
                  <p className={styles.sec10TxtP}>{t('sec10.point0Text2')}</p>
                </div>
              </div>
            </div>
            {/* POINT 02 */}
            <div className={styles.sec10Item}>
              <div>
                <h3 className={styles.sec10TitleH3}>{t('sec10.point1TitleH3')} <span className={styles.sec10TitleSpan}>(Selection)</span></h3>
              </div>
              <div className={`${styles.sec10ContentBox} ${styles.sec10ContentBoxReverse}`}>
                <div>
                  <img src="/img/myopia/sec10-list-02.png" alt="" />
                </div>
                <div>
                  <h4 className={styles.sec10Tit}>{t('sec10.point1Tit')}</h4>
                  <strong className={styles.sec10Subtit}>&ldquo;{t('sec10.point1Subtit')}&rdquo;</strong>
                  <p className={styles.sec10TxtP}>{t('sec10.point1Text1')}<br />{t('sec10.point1Text2')}</p>
                </div>
              </div>
            </div>
            {/* POINT 03 */}
            <div className={styles.sec10Item}>
              <div>
                <h3 className={styles.sec10TitleH3}>{t('sec10.point2TitleH3')} <span className={styles.sec10TitleSpan}>(Safety)</span></h3>
              </div>
              <div className={styles.sec10ContentBox}>
                <div>
                  <img src="/img/myopia/sec10-list-03.png" alt="" />
                </div>
                <div>
                  <h4 className={styles.sec10Tit}>{t('sec10.point2Tit')}</h4>
                  <strong className={styles.sec10Subtit}>&ldquo;{t('sec10.point2Subtit')}&rdquo;</strong>
                  <p className={styles.sec10TxtP}>{t('sec10.point2Text1')}</p>
                  <p className={styles.sec10TxtP}>{t('sec10.point2Text2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner: sec12-banner */}
      <div id="myopia-cont5" className={`${styles.bannerBox} ${styles.sec12Banner}`}>
        <div className={`${styles.bannerBoxInner} ${styles.sec12BannerInner}`} data-aos="fade-up" data-aos-duration="1000">
          <h3 className={styles.bannerH3}>
            {t('sec12banner.title1')}<br className={styles.mo} /><strong className={styles.bannerStrong}>{t('sec12banner.title2')}<br />{t('sec12banner.title3')}</strong>{t('sec12banner.title4')}
          </h3>
          <p className={styles.bannerP}>{t('sec12banner.desc1')}<br />{t('sec12banner.desc2')}</p>
        </div>
      </div>

      {/* myopia1-sec12: ICL Lens */}
      <section className={styles.sec12}>
        <div className={styles.sec12Inner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3} style={{ color: '#fff', whiteSpace: 'nowrap' }}>
              {t('sec12.title1')}<br className={styles.mo} /> <span className={styles.cNv}>{t('sec12.title2')}</span>{t('sec12.title3')}<br className={styles.mo} /> <span className={styles.cNv}>{t('sec12.title4')}</span>{t('sec12.title5')}
            </h3>
          </div>
          <div className={`${styles.myopiaList} ${styles.sec12MyopiaList}`} style={{ margin: '80px 0' }}>
            {[
              { topTitle: t('sec12.item0'), img: '/img/myopia/sec12-list-01.png', btmH3: t('sec12.item0Btm') },
              { topTitle: t('sec12.item1'), img: '/img/myopia/sec12-list-02.png', btmH3: t('sec12.item1Btm') },
            ].map((item, idx) => (
              <div key={idx} className={`${styles.myopiaListItem} ${styles.sec12ListItem}`} style={{ border: 0, background: 'transparent' }}>
                <div className={styles.sec12TxtBox}>
                  <h4 className={styles.myopiaListTopTxtBoxH4} style={{ color: '#fff' }}>{item.topTitle}</h4>
                </div>
                <div className={styles.sec12ImgBox}>
                  <img src={item.img} alt="" />
                </div>
                <h3 className={styles.sec12TxtBottomH3}>{item.btmH3}</h3>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.sec12DescP}>
              {t('sec12.btmDesc1')}<span className={styles.sec12DescSpan}>{t('sec12.btmDesc2')}</span>{t('sec12.btmDesc3')}<br />
              {t('sec12.btmDesc4')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec13: ICL Process */}
      <section className={styles.sec13}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3} style={{ color: '#fff', lineHeight: '140%' }}>
              {t('sec13.title1')}<br />
              <span className={styles.sec13TitSpan}>{t('sec13.title2')}</span>{t('sec13.title3')}<br className={styles.mo} />{t('sec13.title4')}
            </h3>
          </div>
          <div className={`${styles.myopiaListType3} ${styles.sec13ListType3}`} style={{ margin: '80px 0' }}>
            {[
              { label: 'STEP 1', title: t('sec13.step0Title'), img: '/img/myopia/sec13-list-01.png', btmP: t('sec13.step0Btm') },
              { label: 'STEP 2', title: t('sec13.step1Title'), img: '/img/myopia/sec13-list-02.png', btmP: t('sec13.step1Btm') },
              { label: 'STEP 3', title: t('sec13.step2Title'), img: '/img/myopia/sec13-list-03.png', btmP: t('sec13.step2Btm') },
            ].map((item, idx) => (
              <div key={idx} className={styles.myopiaListType3Item}>
                <div className={styles.myopiaListType3TxtBox}>
                  <span className={styles.myopiaListType3Label}>{item.label}</span>
                  <h4 className={`${styles.myopiaListType3H4} ${styles.sec13ListType3H4}`} style={{ color: '#fff' }}>{item.title}</h4>
                </div>
                <div className={styles.myopiaListType3ImgBox}>
                  <img src={item.img} alt="" style={{ borderRadius: '10px 10px 0 0' }} />
                  <div className={styles.sec13TxtBottomP}>{item.btmP}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descBox}>
            <p className={styles.sec13DescP}>
              {t('sec13.btmDesc1')}<br />
              {t('sec13.btmDesc2')}
            </p>
          </div>
        </div>
      </section>

      {/* myopia1-sec14: EVO ICL */}
      <section className={styles.sec14}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>{t('sec14.title')}</h3>
          </div>
          <div className={styles.sec14ItemBox}>
            <img src="/img/myopia/sec14-item.png" alt="" />
          </div>
          <div className={styles.sec14DividerText}>
            <h4 className={styles.sec14DividerH4}>[ 3 KEY FEATURES ]</h4>
          </div>
          <div className={styles.sec14List}>
            <div className={styles.sec14ListItem}>
              <div className={styles.sec14TitBox}>
                <span className={styles.sec14Label}>POINT 01</span>
                <h4>&ldquo;{t('sec14.point0Title')}&rdquo;</h4>
              </div>
              <p className={styles.sec14TxtP}>{t('sec14.point0Desc')}</p>
            </div>
            <div className={styles.sec14ListItem}>
              <div className={styles.sec14TitBox}>
                <span className={styles.sec14Label}>POINT 02</span>
                <h4>&ldquo;{t('sec14.point1Title')}&rdquo;</h4>
              </div>
              <p className={styles.sec14TxtP}>{t('sec14.point1Desc')}</p>
            </div>
            <div className={styles.sec14ListItem}>
              <div className={styles.sec14TitBox}>
                <span className={styles.sec14Label}>POINT 03</span>
                <h4>&ldquo;{t('sec14.point2Title')}&rdquo;</h4>
              </div>
              <p className={styles.sec14TxtP}>{t('sec14.point2Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* myopia1-sec16: Equipment */}
      <section className={styles.sec16}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3}>{t('sec16.title')}</h3>
          </div>
          <div className={styles.sec16EquipSwiper}>
            {/* Slides track */}
            <div
              className={styles.sec16SwiperTrack}
              style={{
                transform: `translateX(calc(-${equipIdx * 100}% - ${equipIdx * 94}px))`,
                transition: equipTransition ? 'transform 0.8s ease' : 'none',
              }}
            >
              {loopSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`${styles.sec16SwiperSlide} ${idx === equipIdx ? styles.sec16SwiperSlideActive : ''}`}
                >
                  <div className={styles.sec16Item}>
                    <div className={styles.sec16ImgBox}>
                      <img src={slide.img} alt="" />
                    </div>
                    <div className={styles.sec16TxtBox}>
                      <h5 className={styles.sec16Tit}>{slide.tit}</h5>
                      <div className={styles.sec16Divider} />
                      <strong className={styles.sec16Subtit}>{slide.subtit}</strong>
                      <div>
                        {slide.texts.map((t, ti) => (
                          <p key={ti} className={styles.sec16TextP}>{t}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation */}
            <div className={styles.sec16FunctionArea}>
              <button className={styles.sec16NavBtn} onClick={goPrev} aria-label="Previous">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M9 1L1 8L9 15" stroke="#042B48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={styles.sec16Pagination}>
                {EQUIPMENT_SLIDES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.sec16PaginationBullet} ${equipSlide === idx ? styles.sec16PaginationBulletActive : ''}`}
                    onClick={() => { setEquipTransition(true); setEquipIdx(idx + 1); }}
                  />
                ))}
              </div>
              <button className={styles.sec16NavBtn} onClick={goNext} aria-label="Next">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M1 15L9 8L1 1" stroke="#042B48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Equip info list */}
          <div className={styles.equipInfoList}>
            <div className={styles.equipInfoTitle}>{t('sec16.infoTitle')}</div>
            {[
              { em: t('sec16.info0Em'), span: t('sec16.info0Span') },
              { em: t('sec16.info1Em'), span: t('sec16.info1Span') },
              { em: t('sec16.info2Em'), span: t('sec16.info2Span') },
            ].map((item, idx) => (
              <div key={idx} className={styles.equipInfoItem}>
                <div className={styles.equipInfoItemP}>
                  <em className={styles.equipInfoEm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="18" fill="#042B48"/>
                      <path d="M25 13L15.515 23L11 18.2398" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item.em}
                  </em>
                  <span className={styles.equipInfoSpan}>{item.span}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* myopia1-sec17: 5 Step */}
      <section id="myopia-cont6" className={styles.sec17}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div>
            <h3 className={styles.titGroupH3} style={{ color: '#fff' }}>
              {t('sec17.title1')}<br className={styles.mo} /> <span className={styles.sec17TitSpan}>5 STEP</span>{t('sec17.title3')}
            </h3>
          </div>
          <div className={styles.borTxtColumn}>
            <ul className={styles.borTxtColumnUl}>
              <li className={styles.borTxtColumnLi}>{t('sec17.step0')}</li>
              <li className={styles.borTxtColumnLi}>{t('sec17.step1')}</li>
              <li className={styles.borTxtColumnLi}>{t('sec17.step2')}</li>
              <li className={styles.borTxtColumnLi}>{t('sec17.step3')}</li>
              <li className={styles.borTxtColumnLi}>{t('sec17.step4')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* myopia1-sec18: Bottom CTA */}
      <section className={styles.sec18}>
        <div className={styles.sec18Inner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sec18LogoArea}>
            <img src="/img/myopia/btm-logo.png" alt="" />
          </div>
          <ul className={styles.sec18NavArea}>
            <li>
              <a href="/community/reservation" className={styles.sec18NavLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                  <path d="M9.57008 2.75C10.1442 2.75 10.6096 3.1762 10.6096 3.70193V5.62214C11.5316 5.60576 12.5651 5.60576 13.728 5.60576H19.272C20.4348 5.60576 21.4684 5.60576 22.3905 5.62214V3.70193C22.3905 3.1762 22.8558 2.75 23.4299 2.75C24.0041 2.75 24.4694 3.1762 24.4694 3.70193V5.70636C26.4643 5.85265 27.7739 6.21167 28.7361 7.09277C29.6982 7.97386 30.0902 9.17316 30.25 11V12.375H2.75V11C2.90975 9.17316 3.30179 7.97386 4.26393 7.09277C5.22609 6.21167 6.53569 5.85265 8.53058 5.70636V3.70193C8.53058 3.1762 8.99598 2.75 9.57008 2.75Z" fill="white"/>
                  <path opacity="0.8" d="M30.2499 19.25V16.5C30.2499 15.3464 30.2324 13.2897 30.2147 12.375H2.75796C2.74023 13.2897 2.75766 15.3464 2.75766 16.5V19.25C2.75766 24.4354 2.75766 27.0282 4.36811 28.6391C5.97858 30.25 8.57057 30.25 13.7546 30.25H19.2531C24.437 30.25 27.029 30.25 28.6395 28.6391C30.2499 27.0282 30.2499 24.4354 30.2499 19.25Z" fill="#67B5A9"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 18.2188C22.5695 18.2188 23.0312 18.6805 23.0312 19.25V20.9688H24.75C25.3195 20.9688 25.7812 21.4305 25.7812 22C25.7812 22.5695 25.3195 23.0312 24.75 23.0312H23.0312V24.75C23.0312 25.3195 22.5695 25.7812 22 25.7812C21.4305 25.7812 20.9688 25.3195 20.9688 24.75V23.0312H19.25C18.6805 23.0312 18.2188 22.5695 18.2188 22C18.2188 21.4305 18.6805 20.9688 19.25 20.9688H20.9688V19.25C20.9688 18.6805 21.4305 18.2188 22 18.2188Z" fill="white"/>
                </svg>
                <span>{t('sec18.quickReservation')}</span>
              </a>
            </li>
            <li className={styles.sec18NavDivider} />
            <li>
              <a href="/about/info" className={styles.sec18NavLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <g opacity="0.8">
                    <path d="M4.75 13.7897V26.6596C4.75 28.3119 4.75 29.1381 5.1983 29.7601C5.64659 30.3822 6.43038 30.6434 7.99792 31.1659L9.84214 31.7806C12.0067 32.5021 13.089 32.8629 14.1786 32.7169C14.2025 32.7138 14.2263 32.7104 14.25 32.7066V10.5402C14.0713 10.5669 13.8911 10.5834 13.7102 10.5896C12.8565 10.6187 12.0116 10.3371 10.3218 9.77383C8.10839 9.03605 7.00171 8.66714 6.15963 9.04176C5.86066 9.17476 5.5924 9.36812 5.37168 9.60969C4.75 10.2901 4.75 11.4566 4.75 13.7897Z" fill="#67B5A9"/>
                    <path d="M33.25 24.2103V11.3403C33.25 9.68797 33.25 8.86178 32.8018 8.2398C32.3534 7.61782 31.5696 7.35656 30.0021 6.83404L28.1578 6.21931C25.9933 5.49779 24.9111 5.13702 23.8214 5.28294C23.7975 5.28613 23.7737 5.28956 23.75 5.29322V27.4597C23.9288 27.433 24.1089 27.4165 24.2898 27.4103C25.1435 27.3812 25.9884 27.6629 27.6783 28.2261C29.8916 28.9639 30.9983 29.3328 31.8404 28.9582C32.1393 28.8252 32.4077 28.6319 32.6284 28.3903C33.25 27.7099 33.25 26.5433 33.25 24.2103Z" fill="#67B5A9"/>
                  </g>
                  <path d="M14.6408 10.4648C14.5116 10.4954 14.3812 10.5205 14.25 10.5401V32.7065C15.3103 32.543 16.2591 31.9104 18.1159 30.6724L20.3047 29.2132C21.7868 28.2252 22.5278 27.7312 23.3592 27.5347C23.4884 27.5042 23.6187 27.479 23.75 27.4595V5.29297C22.6898 5.45662 21.7409 6.08913 19.884 7.32708L17.6953 8.78624C16.2132 9.77429 15.4722 10.2683 14.6408 10.4648Z" fill="white"/>
                </svg>
                <span>{t('sec18.directions')}</span>
              </a>
            </li>
            <li className={styles.sec18NavDivider} />
            <li>
              <a href="tel:02-566-1215" className={styles.sec18NavLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M24.0833 16.9997C27.9953 16.9997 31.1667 13.8284 31.1667 9.91634C31.1667 6.00433 27.9953 2.83301 24.0833 2.83301C20.1714 2.83301 17 6.00433 17 9.91634C17 11.0494 17.266 12.1204 17.7391 13.0702C17.8649 13.3226 17.9067 13.6111 17.8339 13.8834L17.412 15.4602C17.2288 16.1447 17.855 16.7709 18.5395 16.5877L20.1162 16.1658C20.3887 16.093 20.6771 16.1348 20.9296 16.2606C21.8793 16.7336 22.9503 16.9997 24.0833 16.9997Z" fill="white"/>
                  <path opacity="0.8" d="M11.3868 10.3646L12.3062 12.0121C13.1359 13.4988 12.8028 15.4492 11.496 16.756C11.496 16.756 9.911 18.3413 12.7849 21.2153C15.6579 24.0883 17.2441 22.5042 17.2441 22.5042C18.551 21.1973 20.5013 20.8642 21.9881 21.694L23.6355 22.6134C25.8807 23.8663 26.1457 27.0147 24.1725 28.9881C22.9867 30.1739 21.5341 31.0965 19.9283 31.1573C17.2251 31.2599 12.6344 30.5758 8.02941 25.9708C3.42443 21.3657 2.7403 16.775 2.84278 14.0719C2.90365 12.4661 3.8263 11.0135 5.01206 9.82774C6.98541 7.8544 10.1338 8.11954 11.3868 10.3646Z" fill="#67B5A9"/>
                </svg>
                <span>{t('sec18.phoneConsult')}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </ScrollPageLayout>
  );
}
