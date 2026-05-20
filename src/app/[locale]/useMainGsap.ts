'use client';

import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './page.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useMainGsap() {
  const timerRef = { current: null as ReturnType<typeof setTimeout> | null };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      initIntro();
      initExpertise();
      initTechnology();
      initMemo();
      initHeaderBg();
      initQuickMenu();
      initExperienceAutoplay();
      initNewsAutoplay();
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // pin-spacer 복원은 React DOM 정리 전에 동기적으로 실행되어야 함
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill(true));
      ScrollTrigger.clearMatchMedia();
      gsap.killTweensOf('*');
      document.querySelectorAll('[data-gsap]').forEach(el => {
        (el as HTMLElement).removeAttribute('style');
      });
    };
  }, []);
}

/* ========== INTRO ========== */
function initIntro() {
  const section = document.querySelector('[data-gsap="intro"]') as HTMLElement | null;
  if (!section) return;
  const container = section.querySelector('[data-gsap="intro-container"]') as HTMLElement;
  const imgList = section.querySelector('[data-gsap="intro-imglist"]') as HTMLElement;
  const stickyWrap = section.querySelector('[data-gsap="intro-sticky"]') as HTMLElement;
  if (!container || !imgList || !stickyWrap) return;

  const STEPS = [s.introStep1, s.introStep2, s.introStep3, s.introStep4];

  function updateHeight() {
    const h = imgList.offsetHeight * 2;
    container.style.setProperty('--section-height', h + 'px');
    imgList.querySelectorAll<HTMLElement>('[data-gsap="intro-img-item"]').forEach(item => {
      const img = item.querySelector<HTMLElement>('[data-gsap="intro-img"]');
      if (img) item.style.setProperty('--img-height', img.offsetHeight + 'px');
    });
    ScrollTrigger.refresh();
  }
  updateHeight();
  window.addEventListener('resize', updateHeight);

  ScrollTrigger.matchMedia({
    '(min-width: 769px)': () => {
      imgList.querySelectorAll<HTMLElement>('[data-gsap="intro-img-item"]').forEach((item, i) => {
        const deco = item.querySelector<HTMLElement>('[data-gsap="intro-deco"]');
        if (!deco) return;
        const isOdd = i % 2 === 0;
        gsap.fromTo(deco,
          { xPercent: isOdd ? 30 : -30, yPercent: 20 },
          { xPercent: isOdd ? 30 : -30, yPercent: -20, ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
          }
        );
      });
    },
  });

  let prevStep = -1;
  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    pin: stickyWrap,
    scrub: true,
    onUpdate(self) {
      const p = self.progress;
      const step = p < 0.2 ? 1 : p < 0.4 ? 2 : p < 0.6 ? 3 : 4;
      if (step !== prevStep) {
        STEPS.forEach(c => stickyWrap.classList.remove(c));
        stickyWrap.classList.add(STEPS[step - 1]);
        prevStep = step;
      }
    },
    onLeave() { STEPS.forEach(c => stickyWrap.classList.remove(c)); stickyWrap.classList.add('done'); },
    onLeaveBack() { stickyWrap.classList.remove('done'); },
    onEnterBack() { stickyWrap.classList.remove('done'); },
  });
}

/* ========== EXPERTISE ========== */
function initExpertise() {
  const section = document.querySelector('[data-gsap="expertise"]') as HTMLElement | null;
  if (!section) return;
  const itemContainer = section.querySelector('[data-gsap="expertise-container"]') as HTMLElement;
  const rollerWrap = section.querySelector('[data-gsap="expertise-roller"]') as HTMLElement;
  const itemListWrap = section.querySelector('[data-gsap="expertise-list"]') as HTMLElement;
  const lastContent = section.querySelector('[data-gsap="expertise-dark"]') as HTMLElement;
  const decoTxt1 = section.querySelector('[data-gsap="deco-txt1"]') as HTMLElement;
  const decoTxt2 = section.querySelector('[data-gsap="deco-txt2"]') as HTMLElement;
  if (!itemContainer || !rollerWrap) return;
  const items = Array.from(itemContainer.querySelectorAll<HTMLElement>('[data-gsap="expertise-item"]'));
  if (!items.length) return;

  if (window.innerWidth < 1025) {
    items.forEach(item => gsap.set(item, { clearProps: 'height' }));
    if (lastContent) gsap.set(lastContent, { autoAlpha: 1, pointerEvents: 'auto' });
    if (decoTxt1) gsap.set(decoTxt1, { xPercent: 20 });
    if (decoTxt2) gsap.set(decoTxt2, { xPercent: -20 });
    if (lastContent && (decoTxt1 || decoTxt2)) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: lastContent, start: 'top bottom', end: 'top 35%', scrub: true, invalidateOnRefresh: true } });
      if (decoTxt1) tl.to(decoTxt1, { xPercent: 0, ease: 'none' }, 0);
      if (decoTxt2) tl.to(decoTxt2, { xPercent: 0, ease: 'none' }, 0);
    }
    return;
  }

  items.forEach(item => {
    const tit = item.querySelector('[data-gsap="expertise-tit"]') as HTMLElement;
    if (tit) {
      item.setAttribute('data-min-h', String(tit.offsetHeight + 40));
      item.setAttribute('data-max-h', String(item.offsetHeight));
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: itemContainer, start: 'top top', end: 'bottom bottom',
      pin: rollerWrap, pinSpacing: false, scrub: true, invalidateOnRefresh: true,
    }
  });

  items.slice(0, -1).forEach(item => {
    tl.to(item, { height: () => Number(item.getAttribute('data-min-h')), duration: 0.8 });
  });

  if (lastContent) {
    gsap.set(lastContent, { autoAlpha: 0, pointerEvents: 'none' });
    if (decoTxt1) gsap.set(decoTxt1, { xPercent: 20 });
    if (decoTxt2) gsap.set(decoTxt2, { xPercent: -20 });
    tl.to(lastContent, { autoAlpha: 1, pointerEvents: 'auto', duration: 1, ease: 'none' }, '>');
    tl.to(itemListWrap, { autoAlpha: 0, duration: 1, ease: 'none' }, '<');
    if (decoTxt1) tl.to(decoTxt1, { xPercent: 0, duration: 1, ease: 'none' }, '<');
    if (decoTxt2) tl.to(decoTxt2, { xPercent: 0, duration: 1, ease: 'none' }, '<');
  }
}

/* ========== TECHNOLOGY (pin + thumb expand + crossfade) ========== */
function initTechnology() {
  const section = document.querySelector('[data-gsap="technology"]') as HTMLElement | null;
  if (!section) return;
  const info2 = section.querySelector('[data-gsap="tech-info2"]') as HTMLElement;
  const inner1 = section.querySelector('[data-gsap="tech-info1"] .' + s.technologyInner) as HTMLElement;
  const thumb1 = section.querySelector('[data-gsap="tech-thumb1"]') as HTMLElement;
  const thumb1Img = section.querySelector('[data-gsap="tech-thumb1-img"]') as HTMLElement;
  if (!info2 || !inner1 || !thumb1 || !thumb1Img) return;

  if (window.innerWidth < 1025) return;

  info2.classList.remove(s.techInfo2Active);
  gsap.set(info2, { opacity: 0 });
  gsap.set(thumb1Img, { opacity: 1 });

  // 원본 main.js 그대로 이식
  function getThumbStart() {
    const parentRect = inner1.getBoundingClientRect();
    const thumbRect = thumb1.getBoundingClientRect();
    return {
      top: thumbRect.top - parentRect.top,
      left: thumbRect.left - parentRect.left,
      width: thumbRect.width,
      height: thumbRect.height,
    };
  }
  function getThumbEnd() {
    const secRect = section!.getBoundingClientRect();
    const parentRect = inner1.getBoundingClientRect();
    return {
      top: secRect.top - parentRect.top,
      left: secRect.left - parentRect.left,
      width: secRect.width,
      height: window.innerHeight,
    };
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      scrub: 0.85,
      invalidateOnRefresh: true,
      onUpdate(self) {
        info2.classList.toggle(s.techInfo2Active, self.progress > 0.62);
      },
    },
  });

  tl.fromTo(
    thumb1,
    {
      top: () => getThumbStart().top,
      left: () => getThumbStart().left,
      right: 'auto',
      width: () => getThumbStart().width,
      height: () => getThumbStart().height,
      borderRadius: 20,
    },
    {
      top: () => getThumbEnd().top,
      left: () => getThumbEnd().left,
      width: () => getThumbEnd().width,
      height: () => getThumbEnd().height,
      borderRadius: 0,
      ease: 'none',
      duration: 0.7,
    },
    0,
  );

  tl.fromTo(thumb1Img, { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.25 }, 0.15);
  tl.fromTo(info2, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0.45);
}

/* ========== MEMO ========== */
function initMemo() {
  const target = document.querySelector('[data-gsap="memo"]') as HTMLElement | null;
  if (!target) return;
  ScrollTrigger.create({
    trigger: target, start: 'top center',
    onEnter() {
      target.classList.add(s.memoTitVisible, s.memoListVisible);
      target.querySelectorAll<HTMLElement>('[class*="memoItem"]').forEach(el => el.classList.add(s.memoItemVisible));
    },
    onLeaveBack() {
      target.classList.remove(s.memoTitVisible, s.memoListVisible);
      target.querySelectorAll<HTMLElement>('[class*="memoItem"]').forEach(el => el.classList.remove(s.memoItemVisible));
    },
  });
}

/* ========== HEADER BG ========== */
function initHeaderBg() {
  const header = document.querySelector('.header') as HTMLElement | null;
  if (!header) return;
  document.querySelectorAll<HTMLElement>('[data-header-bg="white"]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top top', end: 'bottom top',
      onEnter: () => header.classList.add('headerWhiteBg'),
      onLeave: () => header.classList.remove('headerWhiteBg'),
      onEnterBack: () => header.classList.add('headerWhiteBg'),
      onLeaveBack: () => header.classList.remove('headerWhiteBg'),
    });
  });
}

/* ========== QUICK MENU (footer 진입 시 숨김) ========== */
function initQuickMenu() {
  const footer = document.querySelector('footer');
  const quick = document.querySelector('[class*="quickMenu"], [class*="QuickMenu"], [class*="quick-menu"]') as HTMLElement | null;
  if (!footer || !quick) return;
  ScrollTrigger.create({
    trigger: footer, start: 'top bottom', end: 'bottom bottom',
    onEnter: () => { quick.style.opacity = '0'; quick.style.pointerEvents = 'none'; },
    onLeaveBack: () => { quick.style.opacity = '1'; quick.style.pointerEvents = 'auto'; },
  });
}

/* ========== EXPERIENCE SWIPER AUTOPLAY (뷰포트 진입 시 시작) ========== */
function initExperienceAutoplay() {
  const el = document.querySelector('[data-gsap="experience-swiper"]') as HTMLElement | null;
  if (!el) return;
  // Swiper 인스턴스 접근: swiper-container의 swiper 속성
  ScrollTrigger.create({
    trigger: el, start: 'top 80%',
    onEnter() { el.setAttribute('data-autoplay', 'true'); },
    onLeaveBack() { el.setAttribute('data-autoplay', 'false'); },
  });
}

/* ========== NEWS SWIPER AUTOPLAY (뷰포트 진입 시 시작) ========== */
function initNewsAutoplay() {
  const el = document.querySelector('[data-gsap="news-swiper"]') as HTMLElement | null;
  if (!el) return;
  ScrollTrigger.create({
    trigger: el, start: 'top 80%',
    onEnter() { el.setAttribute('data-autoplay', 'true'); },
    onLeaveBack() { el.setAttribute('data-autoplay', 'false'); },
  });
}
