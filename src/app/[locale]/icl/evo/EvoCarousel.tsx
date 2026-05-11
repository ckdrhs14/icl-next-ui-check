'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const CLASS_CYCLE = ['chImg1', 'chImg2', 'chImg3', 'chImg2'] as const;

export default function EvoCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % CLASS_CYCLE.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const active = CLASS_CYCLE[idx];

  return (
    <div className={`${styles.chImgWrap} pc`}>
      <div className={`${styles.chImgItem} ${active === 'chImg1' ? styles.chImgVisible : ''}`}>
        <Image src="/img/spec/spec1-sec7-img1.png" alt="" width={601} height={601} />
      </div>
      <div className={`${styles.chImgItem} ${active === 'chImg2' ? styles.chImgVisible : ''}`}>
        <Image src="/img/spec/spec1-sec7-img2.png" alt="" width={601} height={601} />
      </div>
      <div className={`${styles.chImgItem} ${active === 'chImg3' ? styles.chImgVisible : ''}`}>
        <Image src="/img/spec/spec1-sec7-img3.png" alt="" width={601} height={601} />
      </div>
    </div>
  );
}
