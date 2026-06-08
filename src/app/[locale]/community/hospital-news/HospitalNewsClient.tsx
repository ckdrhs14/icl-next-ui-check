'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from '../news/page.module.css';

const PER_PAGE = 6;

/* placeholder data – replace with API fetch */
const NEWS_ITEMS = [
  { seq: 5, title: '닥터ICL 안과 진료시간 변경 안내', img: '', url: '', startDate: '2025-04-01' },
  { seq: 6, title: '2025년 설 연휴 진료 안내', img: '', url: '', startDate: '2025-01-20' },
];

export default function HospitalNewsClient() {
  const t = useTranslations('community.hospitalNews');
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(NEWS_ITEMS.length / PER_PAGE));
  const visibleItems = NEWS_ITEMS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <p style={{ textAlign: 'center', color: '#555', fontSize: '16px', lineHeight: '1.7', padding: '40px 0 0' }}>
        {t('categoryDesc')}
      </p>

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
  );
}
