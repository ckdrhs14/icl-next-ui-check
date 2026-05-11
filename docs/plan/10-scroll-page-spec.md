# 10. 원페이지 스크롤 페이지 상세 스펙

## 개요

원페이지 스크롤(Type A) 페이지는 하나의 URL에 여러 콘텐츠 섹션이 세로로 배치되며, 좌측 고정 내비게이션으로 섹션 간 이동한다. 기존 PHP 사이트에서 GSAP ScrollTrigger + ScrollToPlugin을 사용하며, 이를 Next.js로 이관한다.

### 대상 페이지

| 페이지 | 기존 파일 | Next.js 경로 | 섹션 수 | 좌측 네비 |
|--------|----------|-------------|---------|----------|
| 마에스트로 ICL | spec1.php | `/maestro` | 5 | O (5항목) |
| 고도근시 ICL | myopia1.php | `/myopia` | 6 | O (6항목) |
| 특수질환 - 라식후재수술 | disease1.php | `/special/post-lasik` | 5 | O (5항목) |
| 특수질환 - 원추각막 | disease2.php | `/special/keratoconus` | 4 | O (4항목) |
| 특수질환 - 노안ICL | disease4.php | `/presbyopia/viva-icl` | 4+ | O |

> `intro1.php`(닥터 소개)는 모바일에서만 네비게이션 버튼이 있고, `intro2.php`는 단순 2섹션이므로 별도 스크롤 로직 불필요.

---

## 1. 마에스트로 ICL (`/maestro`)

### 섹션 구조

| 순서 | 섹션 ID | 앵커 해시 | 좌측 네비 라벨 | 내용 |
|------|---------|----------|---------------|------|
| 1 | `#fast-facts` | `#facts` | ICL | 닥터 ICL 안과의 높은 신뢰도 — 빅데이터 기반 수술 통계 카운터 애니메이션 |
| 2 | `#spec-cont1` | `#selection` | 선택 | 마에스트로 선택 — 비디오 섹션, 개인별 맞춤 시스템 소개 |
| 3 | `#spec-cont2` | `#diagnosis` | 진단 | 마에스트로 진단 — MAESTRO 솔루션, 3개 장비 시스템(CASIA2, ANTERION 등) |
| 4 | `#spec-cont3` | `#surgery` | 수술 | 마에스트로 수술 — 수술 영상, 히알루론산 2층 기법 설명 |
| 5 | `#spec-cont4` | `#reviews` | 후기 | 스페셜 후기 — 수술 후기 목록 |

### CSS 클래스 매핑
- 섹션 마커: `.rc-sec` (각 섹션 최상위에 부여, ScrollTrigger trigger 대상)
- 우측 소형 네비: `.rc-sm-sec1` ~ `.rc-sm-sec5`
- 좌측 전체 네비: `.l_f .l_fix li` (7개: HOME, ABOUT, WHY ICL?, SOLUTION, EVO+AQUA ICL, DR. ICL, MAESTRO)
- 우측 섹션 네비: `.fix_rmc .l_fix li` (5개: 섹션별)

### 특수 인터랙션
- **카운터 애니메이션**: `#fast-facts` 섹션 진입 시 숫자가 0에서 목표값까지 증가 (GSAP Timeline + ScrollTrigger)
- **스티키 배경**: `.spec1-sec8 .bg_` 요소가 pin 처리 (`pin: true, pinSpacing: false`)
- **비디오 전환**: PC/모바일 별도 비디오 (`.pc`, `.mo` 클래스)

---

## 2. 고도근시 ICL (`/myopia`)

### 섹션 구조

| 순서 | 섹션 ID | 앵커 해시 | 좌측 네비 라벨 | 내용 |
|------|---------|----------|---------------|------|
| 1 | `#myopia-cont1` | `#clinic` | 고도근시 클리닉 | 두꺼운 안경 너머, 망막 건강까지 — 클리닉 소개 |
| 2 | `#myopia-cont2` | `#glaucoma` | 고도근시 녹내장 | 길어진 안구, 얇아진 조직 — 녹내장 합병증 |
| 3 | `#myopia-cont3` | `#retina` | 고도근시 망막 | 망막 건강 관리 — 망막 검사/치료 |
| 4 | `#myopia-cont4` | `#cataract` | 고도근시 백내장 | 백내장 수술, 시력 회복은 기본 — 백내장 연계 |
| 5 | `#myopia-cont5` | `#lens` | 고도근시 렌즈삽입술(ICL) | 더 안전한 기준이 중요 — ICL 배너 섹션 |
| 6 | `#myopia-cont6` | `#care` | 고도근시 관리 | 수술 전 검사부터 평생 관리까지, 5 STEP 시스템 |

### 특수 인터랙션
- **장비 Swiper**: 3슬라이드 캐러셀 (TOMEY CASIA2, OPTOS-Daytona, Spectralis OCT) — navigation + pagination
- **섹션별 활성화**: `sec8Items`에 ScrollTrigger `onEnter`/`onEnterBack` 콜백으로 아이템 활성 상태 전환
- **overflow 설정**: 페이지 래퍼에 `overflow: visible` 필수 (스티키 포지셔닝 동작을 위해)

---

## 3. 특수질환 페이지

### disease1.php → `/special/post-lasik` (라식 후 재수술)

| 순서 | 앵커 해시 | 좌측 네비 라벨 | 내용 |
|------|----------|---------------|------|
| 1 | `#vision` | VISION DECREASE | 시력 저하 원인 |
| 2 | `#resurgery` | RE-SURGERY | 재수술 방법 |
| 3 | `#eyesight` | ICL'S EYESIGHT | ICL 시력 교정 |
| 4 | `#why-icl` | WHY ICL | ICL 선택 이유 |
| 5 | `#point` | POINT | 핵심 포인트 |

### disease2.php → `/special/keratoconus` (원추각막 ICL)

| 순서 | 앵커 해시 | 좌측 네비 라벨 | 내용 |
|------|----------|---------------|------|
| 1 | `#about` | ABOUT | 원추각막 정의 |
| 2 | `#flowchart` | FLOWCHART | 진행 과정도 |
| 3 | `#progress` | PROGRESS | 진행 단계 |
| 4 | `#treatment` | TREATMENT | 치료 방법 |

### disease4.php → `/presbyopia/viva-icl` (노안 ICL)

| 순서 | 앵커 해시 | 좌측 네비 라벨 | 내용 |
|------|----------|---------------|------|
| 1 | `#section1` | (라벨 확인 필요) | 노안 ICL 소개 |
| 2 | `#section2` | (라벨 확인 필요) | 단초점/다초점 렌즈 비교 |
| 3 | `#section3` | (라벨 확인 필요) | 수술 과정 |
| 4 | `#section4` | (라벨 확인 필요) | 수술 후기/결과 |

---

## 4. 공통 스크롤 아키텍처

### HTML 래퍼 구조 (기존)
```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <section class="rc-sec" id="section-1">...</section>
    <section class="rc-sec" id="section-2">...</section>
    ...
  </div>
</div>
```

> 기존 GSAP ScrollSmoother는 현재 **비활성화**(주석 처리) 상태. 네이티브 스크롤 사용 중.

### Next.js 구현 구조

```
src/components/scroll/
├── ScrollPageLayout.tsx      # 스크롤 페이지 공통 래퍼
├── ScrollSection.tsx         # 개별 섹션 컴포넌트
├── LeftSideNav.tsx           # 좌측 고정 내비게이션
├── useScrollNavigation.ts    # 스크롤 네비게이션 커스텀 훅
└── useScrollTrigger.ts       # ScrollTrigger 래퍼 훅
```

### ScrollPageLayout 컴포넌트

```tsx
interface ScrollPageLayoutProps {
  sections: {
    id: string;           // 섹션 HTML id
    hash: string;         // URL 해시 (#selection)
    label: string;        // 좌측 네비 라벨
    component: ReactNode; // 섹션 콘텐츠
  }[];
  className?: string;
}
```

### LeftSideNav 동작 스펙

| 항목 | 스펙 |
|------|------|
| 위치 | `position: fixed`, 좌측 중앙 정렬 |
| 표시 조건 | 데스크톱(>820px)에서만 표시 |
| 활성 상태 | 현재 뷰포트 중앙에 있는 섹션의 네비 항목에 `.on` 클래스 |
| 클릭 동작 | 해당 섹션으로 smooth scroll (`duration: 1s, ease: power2.inOut`) |
| 색상 반전 | 밝은 배경 섹션 → 어두운 텍스트, 어두운 배경 섹션 → 밝은 텍스트 (`.nv` 클래스 토글) |

---

## 5. GSAP ScrollTrigger 패턴

### 패턴 1: 네비게이션 하이라이트

각 `.rc-sec`에 ScrollTrigger를 생성하여, 해당 섹션이 뷰포트 중앙에 들어오면 좌측 네비의 대응 항목에 `on` 클래스를 토글한다.

```javascript
// 기존 코드 (sub.js + 각 페이지)
document.querySelectorAll('.rc-sec').forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    toggleClass: {
      targets: navItems[index],
      className: 'on'
    }
  });
});
```

**Next.js 전환**: `useScrollNavigation` 훅에서 IntersectionObserver 또는 GSAP ScrollTrigger로 구현.

### 패턴 2: 클릭 → 스크롤 이동

```javascript
// 기존 코드
gsap.to(window, {
  scrollTo: { y: targetSection, offsetY: 0 },
  duration: 1,
  ease: 'power2.inOut'
});
```

**Next.js 전환**: GSAP ScrollToPlugin 유지하거나, `scrollIntoView({ behavior: 'smooth' })` + CSS `scroll-behavior: smooth`로 대체 가능.

### 패턴 3: 스타일 반전 (밝은/어두운 섹션)

네비게이션과 헤더가 어두운 배경 섹션 위에서는 밝은 색으로, 밝은 배경에서는 어두운 색으로 전환된다.

```javascript
// 기존 코드
ScrollTrigger.create({
  trigger: section,
  start: 'top center',
  end: 'bottom center',
  onEnter: () => navElement.classList.add('inv'),
  onLeave: () => navElement.classList.remove('inv'),
  onEnterBack: () => navElement.classList.add('inv'),
  onLeaveBack: () => navElement.classList.remove('inv')
});
```

**구현 방법**: 각 섹션에 `data-theme="dark" | "light"` 속성을 부여하고, 훅에서 현재 섹션의 테마를 감지하여 네비/헤더 스타일을 전환한다.

---

## 6. 반응형 동작

### 브레이크포인트별 차이

| 항목 | 데스크톱 (>820px) | 모바일 (≤820px) |
|------|-------------------|-----------------|
| 좌측 네비 | 표시 (fixed) | 숨김 |
| 헤더 배경 | 투명 → 네이비 (스크롤 시) | 항상 `#042B48` |
| 로고 | 흰색 → 컬러 (스크롤 시) | 상황에 따라 전환 |
| 비디오 | PC 버전 재생 (`.pc`) | 모바일 버전 (`.mo`) 또는 정지 이미지 |
| ScrollSmoother | 비활성 (주석 처리됨) | 비활성 |
| 섹션 레이아웃 | 넓은 여백, 다단 구성 | 단일 칼럼, 축소된 여백 |

### 모바일 네비게이션 대안
- `intro1.php`에서 사용하는 패턴: `.cont-nav-btn .nav-btn-box` 버튼 그룹
- 상단에 가로 스크롤 가능한 탭 바로 구현하거나, 모바일에서는 순차적 스크롤만 지원

---

## 7. 헤더 연동

스크롤 페이지에서 헤더는 스크롤 위치에 따라 상태가 변한다.

### 상태 전이 (sub.js 기준)

```
데스크톱 (>821px):
  ┌─────────────────┐
  │ 최상단           │ → 투명 배경, 흰색 로고/텍스트
  │ .inv_ 섹션 통과  │ → 배경 전환 트리거
  │ 스크롤 다운       │ → 네이비 배경 (#042B48), 흰색 로고
  └─────────────────┘

모바일 (≤820px):
  ┌─────────────────┐
  │ 항상             │ → 네이비 배경 (#042B48) 고정
  └─────────────────┘
```

### ScrollTrigger 매칭 미디어

```javascript
// 기존 sub.js
ScrollTrigger.matchMedia({
  "(min-width: 821px)": function() {
    ScrollTrigger.create({
      trigger: ".inv_",
      start: "top top",
      endTrigger: '.footer',
      end: 'top top',
      toggleClass: { targets: ".header", className: "on" },
    });
  },
  "(max-width: 820px)": function() {
    // 모바일: 헤더 항상 on 상태
  }
});
```

---

## 8. 애니메이션 라이브러리 결정

| 기능 | 기존 | Next.js 권장 | 비고 |
|------|------|-------------|------|
| 스크롤 트리거 | GSAP ScrollTrigger | GSAP ScrollTrigger 유지 | 복잡한 pin/toggle 로직이 많아 대체 비용이 높음 |
| 스크롤 이동 | GSAP ScrollToPlugin | GSAP ScrollToPlugin 유지 | `scrollIntoView`로 대체 가능하나 easing 제어가 제한적 |
| 카운터 애니메이션 | GSAP Timeline | GSAP 유지 | 단순 구현은 CSS로도 가능 |
| 텍스트 등장 | AOS | IntersectionObserver + CSS | AOS 제거, 경량화 |
| 캐러셀/슬라이더 | Swiper 8.4.4 | Swiper React 유지 | Swiper는 React 래퍼 지원 |
| ScrollSmoother | GSAP (비활성) | 미사용 | 이미 비활성 상태이므로 이관하지 않음 |

### GSAP 설치

```bash
npm install gsap @gsap/react
```

### GSAP React 사용 패턴

```tsx
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function ScrollSection({ id, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ScrollTrigger 설정
  }, { scope: sectionRef });

  return <section ref={sectionRef} id={id}>{children}</section>;
}
```
