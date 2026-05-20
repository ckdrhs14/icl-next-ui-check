'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const PC_VIDEO = 'https://player.vimeo.com/progressive_redirect/playback/1071327780/rendition/720p/file.mp4?loc=external&signature=3518212c34764bad75352483befeb10f3453a5acbbbedb2da457d06fd1d1fd12';
const MO_VIDEO = 'https://player.vimeo.com/progressive_redirect/playback/1071327810/rendition/720p/file.mp4?loc=external&signature=a33b7b42f07961dee619c165e333187ab29d03ce8c8de54e986b43d25eadac39';

export function DoctorVideo() {
  const pcRef = useRef<HTMLVideoElement>(null);
  const moRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    pcRef.current?.play();
    moRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className={styles.videoWrapper}>
      {!playing && (
        <>
          <button className={`${styles.videoThumb} ${styles.thumbPc}`} onClick={handlePlay}>
            <Image src="/img/int/pc_250908.png" alt="영상 재생" fill style={{ objectFit: 'contain' }} />
            <span className={styles.playBtn}>▶</span>
          </button>
          <button className={`${styles.videoThumb} ${styles.thumbMo}`} onClick={handlePlay}>
            <Image src="/img/int/mo_250908.png" alt="영상 재생" fill style={{ objectFit: 'contain' }} />
            <span className={styles.playBtn}>▶</span>
          </button>
        </>
      )}
      <video
        ref={pcRef}
        src={PC_VIDEO}
        muted
        playsInline
        loop
        preload="none"
        className={`${styles.videoPc} ${playing ? styles.videoVisible : ''}`}
      />
      <video
        ref={moRef}
        src={MO_VIDEO}
        muted
        playsInline
        loop
        preload="none"
        className={`${styles.videoMo} ${playing ? styles.videoVisible : ''}`}
      />
    </div>
  );
}
