'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../news/page.module.css';

const PER_PAGE = 6;

/* placeholder data – replace with API fetch */
const EVENT_ITEMS = [
  { seq: 101, title: 'ICL 렌즈삽입술 여름 이벤트', thumb: '', showed: true, startDate: '2025-05-01' },
  { seq: 102, title: '노안/백내장 상담 이벤트', thumb: '', showed: false, startDate: '2025-03-01' },
];

export default function EventListClient() {
  const t = useTranslations('community.eventList');
  const router = useRouter();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(EVENT_ITEMS.length / PER_PAGE));
  const visibleItems = EVENT_ITEMS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <p style={{ textAlign: 'center', color: '#555', fontSize: '16px', lineHeight: '1.7', padding: '40px 0 0' }}>
        {t('categoryDesc')}
      </p>

      <div className={styles.gridGroup}>
        {visibleItems.length === 0 ? (
          <p className={styles.emptyText}>{t('emptyEvent')}</p>
        ) : (
          visibleItems.map((item) => (
            <div key={item.seq} className={`${styles.gridItem} ${!item.showed ? styles.gridItemEnd : ''}`} onClick={() => router.push(`/community/event/${item.seq}`)}>
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
        <button className={styles.pagBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
        <div className={styles.pagCurrent}>{page} / {totalPages}</div>
        <button className={styles.pagBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&gt;</button>
      </div>
    </>
  );
}
