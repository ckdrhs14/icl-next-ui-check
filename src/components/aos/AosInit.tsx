'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * AOS (Animate On Scroll) initializer using IntersectionObserver.
 * Replicates the PHP site's AOS 2.3.1 behavior.
 * Re-initializes on route changes for Next.js client navigation.
 */
export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initAos = () => {
      // Reset all previously initialized elements so they re-animate on navigation
      document.querySelectorAll<HTMLElement>('[data-aos].aos-init').forEach((el) => {
        el.classList.remove('aos-init', 'aos-animate');
      });

      const elements = document.querySelectorAll<HTMLElement>('[data-aos]');
      if (elements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = el.dataset.aosDelay;
              if (delay) {
                setTimeout(() => {
                  el.classList.add('aos-animate');
                }, parseInt(delay, 10));
              } else {
                el.classList.add('aos-animate');
              }
              observer?.unobserve(el);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      elements.forEach((el) => {
        el.classList.add('aos-init');
        observer!.observe(el);
      });
    };

    // Initial delay for DOM ready after hydration/navigation
    const timer = setTimeout(() => {
      initAos();
    }, 150);

    // Also re-init after dynamic content loads (images, etc.)
    const mutationTimer = setTimeout(() => {
      const newEls = document.querySelectorAll<HTMLElement>('[data-aos]:not(.aos-init)');
      if (newEls.length > 0) initAos();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(mutationTimer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
