'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const PER_PAGE = 6;

/* placeholder data – replace with API fetch */
const SPECIAL_REVIEWS = [
  {
    seq: 1, name: '김○○', title: 'ICL 수술 후 세상이 달라졌어요', method: 'EVO+ ICL',
    img: '', beforeRight: '0.04', beforeLeft: '0.06',
    beforeRightNear: '-8.50', beforeLeftNear: '-9.00',
    beforeRightAstig: '-1.25', beforeLeftAstig: '-0.75',
    afterRight: '1.2', afterLeft: '1.5',
  },
  {
    seq: 2, name: '이○○', title: '초고도근시 탈출 성공!', method: 'EVO+ Toric ICL',
    img: '', beforeRight: '0.02', beforeLeft: '0.03',
    beforeRightNear: '-12.00', beforeLeftNear: '-11.50',
    beforeRightAstig: '-2.50', beforeLeftAstig: '-1.75',
    afterRight: '1.0', afterLeft: '1.2',
  },
];

const CUSTOMER_REVIEWS = [
  { seq: 10, name: '박○○', method: 'EVO+ ICL', comment: '수술 후 다음 날부터 선명하게 보여서 감동받았습니다.', img: '' },
  { seq: 11, name: '최○○', method: 'EVO+ Toric ICL', comment: '20년간 안경을 쓰다가 해방되었습니다. 감사합니다.', img: '' },
];

const STAR_REVIEWS = [
  { seq: 20, name: '홍○○', job: '배우', title: '렌즈삽입술 체험기', method: 'EVO+ ICL', img: '' },
  { seq: 21, name: '정○○', job: '가수', title: '눈이 편해졌어요', method: 'EVO+ ICL', img: '' },
];

const VIDEO_REVIEWS = [
  { seq: 30, name: '강○○', videoUrl: 'https://www.youtube.com/watch?v=gz8TYlobMFI', img: '', beforeRight: '0.05', beforeLeft: '0.04', afterRight: '1.2', afterLeft: '1.0' },
];

function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const start = (page - 1) * perPage;
  const visible = items.slice(start, start + perPage);
  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));
  return { page, totalPages, visible, prev, next, setPage };
}

export default function ReviewsClient() {
  const t = useTranslations('community.reviews');
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || '1';
  const [activeTab, setActiveTab] = useState(initialTab);

  const TABS = [
    { key: '1', label: t('tabSpecial') },
    { key: '2', label: t('tabCustomer') },
    { key: '3', label: t('tabStar') },
    { key: '4', label: t('tabVideo') },
  ];

  const specialPag = usePagination(SPECIAL_REVIEWS, PER_PAGE);
  const customerPag = usePagination(CUSTOMER_REVIEWS, PER_PAGE);
  const starPag = usePagination(STAR_REVIEWS, PER_PAGE);
  const videoPag = usePagination(VIDEO_REVIEWS, PER_PAGE);

  return (
    <>
      {/* Tab Navigation */}
      <div className={styles.commNav} data-aos="fade-up" data-aos-duration="1000">
        <ul className={styles.commNavUl}>
          {TABS.map((tab) => (
            <li
              key={tab.key}
              className={`${styles.commNavLi} ${activeTab === tab.key ? styles.commNavLiOn : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Tab 1: 스페셜후기 */}
      {activeTab === '1' && (
        <section className={styles.tabSection}>
          <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3><span className={styles.cNv}>{t('titleSpecial')}</span></h3>
            </div>
            <div className={styles.reviewGroup}>
              {specialPag.visible.map((item) => (
                <div key={item.seq} className={styles.reviewBox}>
                  <div className={styles.reviewPic}>
                    <div className={styles.reviewPicInner}>
                      {item.img ? (
                        <img src={`/img/board/op_ex/${item.img}`} alt="" />
                      ) : (
                        <div className={styles.reviewPicPlaceholder} />
                      )}
                    </div>
                  </div>
                  <div className={styles.reviewText}>
                    <div className={styles.reviewNm}>
                      <p className={styles.reviewName}>{item.name}</p>
                      <p className={styles.reviewTitle}>{item.title}</p>
                    </div>
                    <div className={styles.reviewCh}>
                      <table className={styles.reviewTable}>
                        <tbody>
                          <tr>
                            <td className={styles.bgN1}>{t('method')}</td>
                            <td colSpan={2} className={styles.bgN2}>{item.method}</td>
                          </tr>
                          <tr>
                            <td className={styles.bgG1}>{t('preSurgery')}</td>
                            <td className={styles.bgG3}>{t('rightEye')}</td>
                            <td className={styles.bgG3}>{t('leftEye')}</td>
                          </tr>
                          <tr>
                            <td className={styles.bgG2}>{t('vision')}</td>
                            <td className={styles.bgG5}>{item.beforeRight}</td>
                            <td className={styles.bgG5}>{item.beforeLeft}</td>
                          </tr>
                          <tr>
                            <td className={styles.bgG2}>{t('myopia')}</td>
                            <td className={styles.bgG5}>{item.beforeRightNear}</td>
                            <td className={styles.bgG5}>{item.beforeLeftNear}</td>
                          </tr>
                          <tr>
                            <td className={styles.bgG2}>{t('astigmatism')}</td>
                            <td className={styles.bgG5}>{item.beforeRightAstig}</td>
                            <td className={styles.bgG5}>{item.beforeLeftAstig}</td>
                          </tr>
                          <tr>
                            <td className={styles.bgB1}>{t('postSurgery')}</td>
                            <td className={styles.bgB2}>{item.afterRight}</td>
                            <td className={styles.bgB2}>{item.afterLeft}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button className={styles.pagBtn} onClick={specialPag.prev} disabled={specialPag.page === 1}>&lt;</button>
              <div className={styles.pagCurrent}>{specialPag.page} / {specialPag.totalPages}</div>
              <button className={styles.pagBtn} onClick={specialPag.next} disabled={specialPag.page === specialPag.totalPages}>&gt;</button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: 고객후기 */}
      {activeTab === '2' && (
        <section className={styles.tabSection}>
          <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3><span className={styles.cNv}>{t('titleCustomer')}</span></h3>
            </div>
            <div className={styles.customerGrid}>
              {customerPag.visible.map((item) => (
                <div key={item.seq} className={styles.customerCard}>
                  <div className={styles.customerPic}>
                    {item.img ? (
                      <img src={`/img/board/op_ex/${item.img}`} alt="" />
                    ) : (
                      <div className={styles.reviewPicPlaceholder} />
                    )}
                  </div>
                  <div className={styles.customerInfo}>
                    <p className={styles.customerName}>{item.name}</p>
                    <p className={styles.customerMethod}>{item.method}</p>
                    <p className={styles.customerComment}>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button className={styles.pagBtn} onClick={customerPag.prev} disabled={customerPag.page === 1}>&lt;</button>
              <div className={styles.pagCurrent}>{customerPag.page} / {customerPag.totalPages}</div>
              <button className={styles.pagBtn} onClick={customerPag.next} disabled={customerPag.page === customerPag.totalPages}>&gt;</button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: 스타후기 */}
      {activeTab === '3' && (
        <section className={styles.tabSection}>
          <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3><span className={styles.cNv}>{t('titleStar')}</span></h3>
            </div>
            <div className={styles.starGrid}>
              {starPag.visible.map((item) => (
                <div key={item.seq} className={styles.starCard}>
                  <div className={styles.starImg}>
                    {item.img ? (
                      <img src={`/img/board/op_ex/${item.img}`} alt="" />
                    ) : (
                      <div className={styles.reviewPicPlaceholder} />
                    )}
                    <div className={styles.starOverlay}>
                      <p className={styles.starName}>{item.name}</p>
                      <p className={styles.starJob}>{item.job}</p>
                      <p className={styles.starTitle}>{item.title}</p>
                      <p className={styles.starMethod}>{item.method}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button className={styles.pagBtn} onClick={starPag.prev} disabled={starPag.page === 1}>&lt;</button>
              <div className={styles.pagCurrent}>{starPag.page} / {starPag.totalPages}</div>
              <button className={styles.pagBtn} onClick={starPag.next} disabled={starPag.page === starPag.totalPages}>&gt;</button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 4: 영상후기 */}
      {activeTab === '4' && (
        <section className={styles.tabSection}>
          <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
            <div className={styles.titGroup}>
              <h3><span className={styles.cNv}>{t('titleVideo')}</span></h3>
            </div>
            <div className={styles.videoGrid}>
              {videoPag.visible.map((item) => (
                <a
                  key={item.seq}
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.videoCard}
                >
                  <div className={styles.videoThumb}>
                    {item.img ? (
                      <img src={`/img/board/op_ex/${item.img}`} alt="" />
                    ) : (
                      <div className={styles.videoThumbPlaceholder}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.5)" />
                          <path d="M20 16L34 24L20 32V16Z" fill="#fff" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={styles.videoInfo}>
                    <p className={styles.videoName}>{item.name}{t('reviewSuffix')}</p>
                    <div className={styles.videoVision}>
                      <span>{t('preVision')} {t('rightEye')} {item.beforeRight} / {t('leftEye')} {item.beforeLeft}</span>
                      <span>{t('postVision')} {t('rightEye')} {item.afterRight} / {t('leftEye')} {item.afterLeft}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className={styles.pagination}>
              <button className={styles.pagBtn} onClick={videoPag.prev} disabled={videoPag.page === 1}>&lt;</button>
              <div className={styles.pagCurrent}>{videoPag.page} / {videoPag.totalPages}</div>
              <button className={styles.pagBtn} onClick={videoPag.next} disabled={videoPag.page === videoPag.totalPages}>&gt;</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
