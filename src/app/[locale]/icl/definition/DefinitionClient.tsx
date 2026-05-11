'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

interface Step {
  label: string;
  title: string;
  desc: string;
  desc2?: string;
}

export default function DefinitionClient({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  const goPrev = () => setActive((p) => Math.max(0, p - 1));
  const goNext = () => setActive((p) => Math.min(steps.length - 1, p + 1));

  return (
    <div className={styles.swiperSection}>
      {/* Image swiper */}
      <div className={styles.swiperImgBox}>
        <Image
          src={`/img/plus/icl3_sec6_img${active + 1}.png`}
          alt={steps[active].title}
          width={800}
          height={500}
          className={styles.swiperImg}
        />
        <button className={styles.swiperPrev} onClick={goPrev} aria-label="Previous">
          <Image src="/img/plus/icl3_sec6_arr_prev.png" alt="" width={63} height={55} />
        </button>
        <button className={styles.swiperNext} onClick={goNext} aria-label="Next">
          <Image src="/img/plus/icl3_sec6_arr_next.png" alt="" width={63} height={55} />
        </button>
        <div className={styles.swiperPagination}>
          {steps.map((_, i) => (
            <span
              key={i}
              className={`${styles.swiperBullet} ${active === i ? styles.swiperBulletActive : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className={styles.swiperDesBox}>
        <div className={styles.slideTit}>
          <span className={styles.slideLabel}>{steps[active].label}</span>
          <p>{steps[active].title}</p>
        </div>
        <div className={styles.slideDes}>
          <p>{steps[active].desc}</p>
          {steps[active].desc2 && <p>{steps[active].desc2}</p>}
        </div>
      </div>
    </div>
  );
}
