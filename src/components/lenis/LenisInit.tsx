'use client';

import { useEffect } from 'react';

/**
 * 뷰포트 높이 변수 설정 + 카카오 인앱 대응.
 * 스무스 스크롤은 GSAP ScrollTrigger pin/scrub과 충돌 가능하므로 제외.
 */
export function LenisInit() {
  useEffect(() => {
    const isKakao = navigator.userAgent.toLowerCase().includes('kakaotalk');

    function updateVh() {
      const height = window.visualViewport?.height || window.innerHeight;
      const vh = isKakao ? (height + 130) * 0.01 : height * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      if (isKakao) document.body.classList.add('kakao-webview');
    }
    updateVh();
    window.addEventListener('resize', updateVh);

    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, []);

  return null;
}
