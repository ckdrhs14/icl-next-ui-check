'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const PER_PAGE = 6;

/* placeholder data – replace with API fetch */
const PLACEHOLDER_ITEMS = [
  { seq: 1, code: '칼럼', title: '렌즈삽입술 전 꼭 알아야 할 검사 항목', img: '', url: '', startDate: '2025-04-10' },
  { seq: 2, code: '칼럼', title: 'ICL 수술 후 일상복귀는 언제부터 가능한가요?', img: '', url: '', startDate: '2025-03-25' },
  { seq: 3, code: '칼럼', title: '고도근시와 녹내장의 관계', img: '', url: '', startDate: '2025-03-10' },
  { seq: 4, code: '칼럼', title: 'EVO+ ICL이란 무엇인가?', img: '', url: '', startDate: '2025-02-20' },
  { seq: 5, code: '병원소식', title: '닥터ICL 안과 진료시간 변경 안내', img: '', url: '', startDate: '2025-04-01' },
  { seq: 6, code: '병원소식', title: '2025년 설 연휴 진료 안내', img: '', url: '', startDate: '2025-01-20' },
];

const EVENT_ITEMS = [
  { seq: 101, title: 'ICL 렌즈삽입술 여름 이벤트', thumb: '', showed: true, startDate: '2025-05-01' },
  { seq: 102, title: '노안/백내장 상담 이벤트', thumb: '', showed: false, startDate: '2025-03-01' },
];

export default function NewsClient() {
  const t = useTranslations('community.news');
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('code') || 'column';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [page, setPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);

  const filtered = PLACEHOLDER_ITEMS.filter((item) => {
    if (activeTab === 'column') return item.code === '칼럼';
    return item.code === '병원소식' || item.code === '언론보도' || item.code === 'SNS';
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visibleItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const eventTotalPages = Math.max(1, Math.ceil(EVENT_ITEMS.length / PER_PAGE));
  const visibleEvents = EVENT_ITEMS.slice((eventPage - 1) * PER_PAGE, eventPage * PER_PAGE);

  const handleTabChange = (key: string) => { setActiveTab(key); setPage(1); setEventPage(1); };

  const TABS = [
    { key: 'column', label: t('tabColumn') },
    { key: 'news', label: t('tabNews') },
    { key: 'event', label: t('tabEvent') },
  ];

  return (
    <>
      <div className={styles.tagGroup}>
        {TABS.map((tab) => (
          <button key={tab.key} className={`${styles.tagItem} ${activeTab === tab.key ? styles.tagItemOn : ''}`} onClick={() => handleTabChange(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab !== 'event' && (
        <>
          <div className={styles.gridGroup}>
            {visibleItems.length === 0 ? (
              <p className={styles.emptyText}>{t('emptyPost')}</p>
            ) : (
              visibleItems.map((item) => (
                <div key={item.seq} className={styles.gridItem} onClick={() => { if (item.url) window.open(item.url); }}>
                  <div className={styles.gridItemImg}>
                    {item.img ? (
                      <Image src={`/img/board/notice/${item.img}`} alt="" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    ) : (
                      <Image src="/img/logo_color.svg" alt="" width={200} height={60} style={{ width: '80%', height: 'auto', margin: 'auto' }} />
                    )}
                  </div>
                  <div className={styles.gridItemTxt}>
                    <div className={styles.gridItemTitle}>{item.title}</div>
                    <div className={styles.gridItemDate}><p>{item.startDate}</p></div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.pagination}>
            <button className={styles.pagBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
            <div className={styles.pagCurrent}>{page} / {totalPages}</div>
            <button className={styles.pagBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&gt;</button>
          </div>
        </>
      )}

      {activeTab === 'event' && (
        <>
          <div className={styles.gridGroup}>
            {visibleEvents.length === 0 ? (
              <p className={styles.emptyText}>{t('emptyEvent')}</p>
            ) : (
              visibleEvents.map((item) => (
                <div key={item.seq} className={`${styles.gridItem} ${!item.showed ? styles.gridItemEnd : ''}`} onClick={() => router.push(`/community/news/event/${item.seq}`)}>
                  <div className={styles.gridItemImg}>
                    {item.thumb ? (
                      <Image src={`/img/board/event/${item.thumb}`} alt="" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    ) : (
                      <Image src="/img/logo_color.svg" alt="" width={200} height={60} style={{ width: '80%', height: 'auto', margin: 'auto' }} />
                    )}
                    <div className={`${styles.eventCurr} ${item.showed ? styles.eventCurrActive : styles.eventCurrEnd}`}>
                      {item.showed ? t('eventOngoing') : t('eventEnded')}
                    </div>
                  </div>
                  <div className={styles.gridItemTxt}>
                    <div className={styles.gridItemTitle}>{item.title}</div>
                    <div className={styles.gridItemDate}><p>{item.startDate}</p></div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.pagination}>
            <button className={styles.pagBtn} onClick={() => setEventPage((p) => Math.max(1, p - 1))} disabled={eventPage === 1}>&lt;</button>
            <div className={styles.pagCurrent}>{eventPage} / {eventTotalPages}</div>
            <button className={styles.pagBtn} onClick={() => setEventPage((p) => Math.min(eventTotalPages, p + 1))} disabled={eventPage === eventTotalPages}>&gt;</button>
          </div>
        </>
      )}
    </>
  );
}
