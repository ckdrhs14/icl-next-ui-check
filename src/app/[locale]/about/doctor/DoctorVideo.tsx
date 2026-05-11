'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export function DoctorVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const videoSrc = isMobile
    ? 'https://player.vimeo.com/progressive_redirect/playback/1071327810/rendition/720p/file.mp4?loc=external&signature=a33b7b42f07961dee619c165e333187ab29d03ce8c8de54e986b43d25eadac39'
    : 'https://player.vimeo.com/progressive_redirect/playback/1071327780/rendition/720p/file.mp4?loc=external&signature=3518212c34764bad75352483befeb10f3453a5acbbbedb2da457d06fd1d1fd12';

  const thumbSrc = isMobile ? '/img/int/mo_250908.png' : '/img/int/pc_250908.png';

  return (
    <div className={styles.videoWrapper}>
      {!playing && (
        <button className={styles.videoThumb} onClick={handlePlay}>
          <Image src={thumbSrc} alt="영상 재생" fill style={{ objectFit: 'contain' }} />
          <span className={styles.playBtn}>▶</span>
        </button>
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        preload="none"
        className={`${styles.video} ${playing ? styles.videoVisible : ''}`}
      />
    </div>
  );
}
