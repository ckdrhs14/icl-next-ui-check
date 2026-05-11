'use client';

import { useState } from 'react';
import styles from './page.module.css';

/* placeholder data – replace with API fetch */
const PLACEHOLDER_VIDEOS = [
  { seq: 1, url: 'gz8TYlobMFI', title: '고도근시 렌즈삽입술 수술과정 A to Z', startDate: '2025-03-15' },
  { seq: 2, url: 'gz8TYlobMFI', title: 'ICL 수술 후 주의사항 총정리', startDate: '2025-03-01' },
  { seq: 3, url: 'gz8TYlobMFI', title: '라식 vs ICL, 어떤 수술이 나에게 맞을까?', startDate: '2025-02-20' },
  { seq: 4, url: 'gz8TYlobMFI', title: '닥터ICL 안과 3차원 안구공간 정밀검사실 소개', startDate: '2025-02-10' },
  { seq: 5, url: 'gz8TYlobMFI', title: 'EVO+ ICL 렌즈의 특징과 장점', startDate: '2025-01-28' },
  { seq: 6, url: 'gz8TYlobMFI', title: '고도근시 환자의 망막 관리가 중요한 이유', startDate: '2025-01-15' },
];

const PER_PAGE = 6;

export default function YoutubeClient() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(PLACEHOLDER_VIDEOS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = PLACEHOLDER_VIDEOS.slice(start, start + PER_PAGE);

  return (
    <>
      <div className={styles.gridBox}>
        {visible.map((item) => (
          <div key={item.seq} className={styles.videoBox}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${item.url}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={styles.videoTxt}>
              <div className={styles.videoTit}>
                <h5>{item.title}</h5>
              </div>
              <div className={styles.videoDate}>
                <p>{item.startDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pagBtn}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          &lt;
        </button>
        <div className={styles.pagCurrent}>
          {page} / {totalPages || 1}
        </div>
        <button
          className={styles.pagBtn}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
