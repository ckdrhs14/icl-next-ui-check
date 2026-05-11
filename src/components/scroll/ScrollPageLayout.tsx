'use client';

import type { ReactNode } from 'react';
import { LeftSideNav } from './LeftSideNav';
import { useScrollNavigation, type ScrollSection } from './useScrollNavigation';

interface ScrollPageLayoutProps {
  sections: ScrollSection[];
  children: ReactNode;
  inverted?: boolean;
}

export function ScrollPageLayout({
  sections,
  children,
  inverted,
}: ScrollPageLayoutProps) {
  const { activeIndex, scrollTo, isInverted } = useScrollNavigation(sections);

  return (
    <div style={{ position: 'relative' }}>
      <LeftSideNav
        sections={sections}
        activeIndex={activeIndex}
        onNavigate={scrollTo}
        inverted={inverted || isInverted}
      />
      {children}
    </div>
  );
}
