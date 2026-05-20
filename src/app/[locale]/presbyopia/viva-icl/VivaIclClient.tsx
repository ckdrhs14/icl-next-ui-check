'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './page.module.css';

const LENS_CARD_KEYS = [
  {
    titleKey: 'lensRefractiveTitle' as const,
    img: '/img/dise/dis4_sec5_img1.png',
    textKeys: ['lensRefractiveDesc1', 'lensRefractiveDesc2'] as const,
  },
  {
    titleKey: 'lensSegmentalTitle' as const,
    img: '/img/dise/dis4_sec5_img2.png',
    textKeys: ['lensSegmentalDesc'] as const,
  },
  {
    titleKey: 'lensDiffractiveTitle' as const,
    img: '/img/dise/dis4_sec5_img3.png',
    textKeys: ['lensDiffractiveDesc'] as const,
  },
  {
    titleKey: 'lensEdofTitle' as const,
    img: '/img/dise/dis4_sec5_img4.png',
    textKeys: ['lensEdofDesc'] as const,
  },
];

export default function VivaIclClient() {
  const t = useTranslations('presbyopia.vivaIcl');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const lensSwiperRef = useRef<any>(null);

  return (
    <div className={`${styles.pagesWrapper} ${styles.diseWrapper}`}>
      <div className={styles.sectionWrap}>
        <div className={styles.bg}>
          <Image
            src="/img/plus/icl_bg.png"
            alt=""
            className="pc"
            width={1920}
            height={800}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
          <Image
            src="/img/plus/icl_bg_mo.png"
            alt=""
            className="mo"
            width={768}
            height={600}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>

        {/* dise_sec1 - 노안이란 */}
        <section className={styles.diseSec1}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec1Title') }} />
            </div>
            <div className={styles.contGroup}>
              <div className={styles.txtGroup}>
                <p>{t('sec1Desc')}</p>
              </div>
              <div className={`${styles.imgBoxWrap} ${styles.imgBox1}`}>
                <div className={styles.imgRel}>
                  <Image
                    src={li('/img/dise/dis4_sec1_img1.png')}
                    alt=""
                    className={styles.none768}
                    width={800}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Image
                    src={li('/img/dise/dis4_sec1_img1_m.png')}
                    alt=""
                    className={styles.block768}
                    width={400}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* dise_sec2 - 노안증상과 진행 */}
        <section className={styles.diseSec2}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec2Title') }} />
              <p className={styles.hwPointColor}>{t('sec2Subtitle')}</p>
            </div>
            <div className={styles.contGroup}>
              <div className={styles.sec2ImgBox}>
                <Image
                  src={li('/img/dise/dis4_sec2_img1.png')}
                  className={styles.none768}
                  alt=""
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Image
                  src={li('/img/dise/dis4_sec2_img1_m.png')}
                  className={styles.block768}
                  alt=""
                  width={400}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.txtGroup}>
                <p>{t('sec2Desc1')}</p>
                <p>{t('sec2Desc2')}</p>
              </div>
              <div className={styles.sec2ImgBox2}>
                <Image
                  src="/img/dise/dis4_sec2_img2.png"
                  alt=""
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.txtGroup}>
                <p>{t('sec2Desc3')}</p>
              </div>
              <div className={styles.sec2ImgBox2}>
                <Image
                  src={li('/img/dise/dis4_sec2_img3.png')}
                  alt=""
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* dise_sec3 - 노안 보충제 및 노안치료 */}
        <section className={styles.diseSec3}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec3Title') }} />
            </div>
            <div className={styles.contGroup}>
              <div className={styles.txtGroup}>
                <h5>{t('sec3SupplementTitle')}</h5>
                <div className={styles.txtBox}>
                  <p>{t('sec3SupplementDesc1')}</p>
                  <p>{t('sec3SupplementDesc2')}</p>
                </div>
              </div>
              <div className={styles.txtGroup}>
                <h5>{t('sec3TreatmentTitle')}</h5>
                <div className={styles.txtBox}>
                  <p>{t('sec3TreatmentDesc')}</p>
                  <p className={styles.hwText}>{t('sec3TreatmentNote')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* dise_sec3 (2nd) - 노안 교정 수술이란? */}
        <section className={styles.diseSec3}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec4Title') }} />
            </div>
            <div className={styles.contGroup}>
              <div className={styles.txtGroup}>
                <h5>{t('sec4SubTitle')}</h5>
                <div className={styles.txtBox}>
                  <p>{t('sec4Desc')}</p>
                </div>
                <ul className={styles.imgList}>
                  <li>
                    <div>
                      <Image
                        src="/img/dise/dis4_sec4_img1.png"
                        alt=""
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <p>{t('sec4NormalVision')}</p>
                  </li>
                  <li>
                    <div>
                      <Image
                        src="/img/dise/dis4_sec4_img2.png"
                        alt=""
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <p>{t('sec4PresbVision')}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* dise_sec4 - 대표적인 다초점 렌즈의 특징 */}
        <section className={styles.diseSec4}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec5Title') }} />
              <p>{t('sec5Subtitle')}</p>
            </div>
          </div>
          <div className={styles.swiperArea}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1.2}
              centeredSlides
              spaceBetween={20}
              speed={1000}
              initialSlide={5}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ el: `.${styles.swiperPagination}`, clickable: true, renderBullet: (_: number, className: string) => `<span class="${className}"></span>` }}
              navigation={{
                prevEl: `.${styles.swiperBtnPrev}`,
                nextEl: `.${styles.swiperBtnNext}`,
              }}
              breakpoints={{ 768: { slidesPerView: 1.6 } }}
              onSwiper={(swiper) => { lensSwiperRef.current = swiper; }}
              className={styles.lensSwiper}
            >
              {/* 슬라이드 5번 반복하여 유사 loop 효과 */}
              {Array.from({ length: 5 }).flatMap((_, rep) =>
                LENS_CARD_KEYS.map((card, idx) => (
                  <SwiperSlide key={`${rep}-${idx}`}>
                    <div className={styles.cardBox}>
                      <h3 className={styles.cardTitle}>{t(card.titleKey)}</h3>
                      <div className={styles.cardImgBox}>
                        <Image src={card.img} alt={t(card.titleKey)} width={300} height={200} style={{ height: 'auto' }} />
                      </div>
                      <div className={styles.cardText}>
                        {card.textKeys.map((tk, ti) => (
                          <p key={ti}>{t(tk)}</p>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            <div className={styles.swiperBtnBox}>
              <button className={styles.swiperBtnPrev} aria-label="Previous">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M9 1L1 8L9 15" stroke="#042B48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className={styles.swiperPagination} />
              <button className={styles.swiperBtnNext} aria-label="Next">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M1 15L9 8L1 1" stroke="#042B48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* dise_sec5 - 단초점 안내 콘택트 렌즈와 다초점 안내 렌즈의 차이 */}
        <section className={styles.diseSec5}>
          <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec6Title1') }} />
              <p>{t('sec6Subtitle')}</p>
            </div>
            <div className={styles.contGroup}>
              <ul className={styles.list}>
                <li>
                  <h4>
                    {t('sec6MonofocalTitle')}
                  </h4>
                  <div className={styles.listImgBox}>
                    <Image
                      src={li('/img/dise/n_dis4_sec6_img1.png')}
                      alt={t('sec6MonofocalTitle')}
                      width={800}
                      height={400}
                      style={{ maxWidth: '90%', height: 'auto' }}
                    />
                  </div>
                </li>
                <li>
                  <h4>
                    {t('sec6EdofTitle')}
                  </h4>
                  <div className={styles.listImgBox}>
                    <Image
                      src={li('/img/dise/n_dis4_sec6_img2.png')}
                      alt={t('sec6EdofTitle')}
                      width={800}
                      height={400}
                      style={{ maxWidth: '90%', height: 'auto' }}
                    />
                  </div>
                </li>
                <li>
                  <h4>
                    {t('sec6TrifocalTitle')}
                  </h4>
                  <div className={styles.listImgBox}>
                    <Image
                      src={li('/img/dise/n_dis4_sec6_img3.png')}
                      alt={t('sec6TrifocalTitle')}
                      width={800}
                      height={400}
                      style={{ maxWidth: '90%', height: 'auto' }}
                    />
                  </div>
                </li>
              </ul>
              <div className={styles.titGroup}>
                <h3 dangerouslySetInnerHTML={{ __html: t.raw('sec6Title2') }} />
              </div>
              <div className={styles.sec5TxtBox}>
                <p>{t('sec6Desc1')}</p>
                <p>{t('sec6Desc2')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
