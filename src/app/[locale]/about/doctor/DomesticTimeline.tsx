'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export function DomesticTimeline({ items }: { items: TimelineItem[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.timelineWrap} ${expanded ? styles.timelineWrapExpanded : ''}`}>
      <div className={`${styles.timeline} ${expanded ? styles.timelineExpanded : ''}`}>
        <div className={styles.timelineList}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <p className={styles.timelineYear}>{item.year}</p>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h5 className={styles.timelineTitle}>{item.title}</h5>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!expanded && (
        <button className={styles.moreBtn} onClick={() => setExpanded(true)}>
          더보기
        </button>
      )}
    </div>
  );
}
