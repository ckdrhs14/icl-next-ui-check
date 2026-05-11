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
  const visibleItems = expanded ? items : items.slice(0, 6);

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineList}>
        {visibleItems.map((item, idx) => (
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
      {!expanded && items.length > 6 && (
        <button className={styles.moreBtn} onClick={() => setExpanded(true)}>
          더보기
        </button>
      )}
    </div>
  );
}
