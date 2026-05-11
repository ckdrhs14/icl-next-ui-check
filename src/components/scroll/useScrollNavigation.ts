'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScrollSection {
  id: string;
  hash: string;
  label: string;
  /** true if section has dark background — nav text turns white */
  dark?: boolean;
}

export function useScrollNavigation(sections: ScrollSection[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const isScrollingRef = useRef(false);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.slice(1);
    const idx = sections.findIndex((s) => s.id === targetId || s.hash === hash);

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        isScrollingRef.current = true;
        if (idx !== -1) setActiveIndex(idx);
        el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sections]);

  useEffect(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionElements.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Observe dark sections to toggle nav color
    const darkSections = sections
      .filter((s) => s.dark)
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    let darkCount = 0;
    const darkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            darkCount++;
          } else {
            darkCount = Math.max(0, darkCount - 1);
          }
        });
        setIsInverted(darkCount > 0);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    darkSections.forEach((el) => darkObserver.observe(el));

    return () => {
      observer.disconnect();
      darkObserver.disconnect();
    };
  }, [sections]);

  const scrollTo = useCallback(
    (index: number) => {
      const section = sections[index];
      if (!section) return;

      const el = document.getElementById(section.id);
      if (!el) return;

      isScrollingRef.current = true;
      setActiveIndex(index);

      el.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    },
    [sections]
  );

  return { activeIndex, scrollTo, isInverted };
}
