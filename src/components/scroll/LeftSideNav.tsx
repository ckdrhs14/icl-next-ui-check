'use client';

import type { ScrollSection } from './useScrollNavigation';
import styles from './LeftSideNav.module.css';

interface LeftSideNavProps {
  sections: ScrollSection[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  inverted?: boolean;
  ended?: boolean;
}

export function LeftSideNav({
  sections,
  activeIndex,
  onNavigate,
  inverted = false,
  ended = false,
}: LeftSideNavProps) {
  const navClass = [
    styles.nav,
    inverted ? styles.inverted : '',
    ended ? styles.ended : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClass} aria-label="페이지 섹션 네비게이션">
      <ul className={styles.list}>
        {sections.map((section, index) => (
          <li key={section.id} className={styles.item}>
            <button
              className={`${styles.button} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => onNavigate(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <em className={styles.label}>{section.label}</em>
              <span className={styles.dot} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
