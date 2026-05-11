# 03. 디자인 토큰 및 CSS 변수 정의

## 상세페이지 CSS 변수화를 위한 디자인 토큰

### 색상 (Colors)

```css
:root {
  /* Primary */
  --color-navy:          #042B48;
  --color-navy-dark:     #1c2533;

  /* Accent - Teal */
  --color-teal:          #67B5A9;
  --color-teal-light:    #64C0A7;

  /* Accent - Warm */
  --color-tan:           #A48362;
  --color-tan-light:     #DFCBB5;
  --color-tan-warm:      #b79e8a;
  --color-tan-cream:     #e3cfbd;

  /* Neutral */
  --color-white:         #FFFFFF;
  --color-black:         #000000;
  --color-gray-dark:     #535353;
  --color-gray-medium:   #727272;
  --color-gray-border:   #BBBCBA;
  --color-gray-light:    #D9D9D9;

  /* Semantic */
  --color-text-primary:  #535353;
  --color-text-muted:    #727272;
  --color-bg-dark:       #042B48;
  --color-bg-light:      #FFFFFF;
  --color-border:        #BBBCBA;
}
```

### 그라디언트 (Gradients)

```css
:root {
  /* Gold/Brown gradient - 주요 배경 */
  --gradient-gold: linear-gradient(to bottom, #FFFFFF 16%, #DFCBB5 20%, #A48362 60%);

  /* Warm tone gradient - 버튼/카드 */
  --gradient-warm: linear-gradient(to top, #b79e8a, #e3cfbd);

  /* Dark navy gradient - 헤더/풀스크린 배경 */
  --gradient-navy: linear-gradient(180deg, #000 -15.07%, #042B48 11.86%, #042B48 87.95%, #000 115.25%);

  /* Header dropdown */
  --gradient-header-dropdown: linear-gradient(to bottom, #1c2533, #042B48);
}
```

### 타이포그래피 (Typography)

```css
:root {
  /* Font Families */
  --font-body:           'Pretendard', sans-serif;
  --font-serif-kr:       'Noto Serif KR', serif;
  --font-serif-en:       'Noto Serif', serif;
  --font-title-en:       'Perpetua Titling MT', serif;
  --font-accent:         'Silk Serif', serif;

  /* Font Sizes (기존 사이트 기준) */
  --text-xs:             12px;
  --text-sm:             14px;
  --text-base:           16px;
  --text-lg:             18px;
  --text-xl:             20px;
  --text-2xl:            24px;
  --text-3xl:            30px;
  --text-4xl:            36px;
  --text-5xl:            48px;
  --text-6xl:            60px;

  /* Font Weights */
  --font-light:          300;
  --font-regular:        400;
  --font-medium:         500;
  --font-semibold:       600;
  --font-bold:           700;

  /* Line Heights */
  --leading-tight:       1.2;
  --leading-normal:      1.5;
  --leading-relaxed:     1.8;
}
```

### 간격 (Spacing)

```css
:root {
  --spacing-xs:          4px;
  --spacing-sm:          8px;
  --spacing-md:          16px;
  --spacing-lg:          24px;
  --spacing-xl:          32px;
  --spacing-2xl:         48px;
  --spacing-3xl:         64px;
  --spacing-4xl:         80px;
  --spacing-5xl:         120px;

  /* 섹션 간격 */
  --section-padding-y:   120px;
  --section-padding-x:   40px;

  /* 컨테이너 */
  --container-max:       1400px;
  --container-narrow:    1200px;
}
```

### 반응형 브레이크포인트

```css
/* Tailwind 커스텀 확장 필요 */
:root {
  --bp-mobile:           500px;
  --bp-tablet:           768px;
  --bp-laptop:           1280px;
  --bp-desktop:          1350px;
  --bp-wide:             1600px;
}
```

| 브레이크포인트 | 값 | 변경사항 |
|---------------|------|---------|
| mobile-sm | 350px | 우측 사이드바 숨김 |
| mobile | 500px | 소형 모바일 조정 |
| tablet | 768px | 모바일 리다이렉트, 언어메뉴 조정 |
| laptop | 820px | 모바일 레이아웃, 푸터 스택 |
| desktop | 1280px | 햄버거 메뉴 표시, 좌/우 사이드바 숨김 |
| desktop-md | 1350px | 헤더 메뉴 너비 축소 |
| wide | 1600px | 헤더 패딩 조정 |

### 애니메이션 (Animation)

```css
:root {
  --transition-fast:     0.2s ease;
  --transition-normal:   0.3s ease;
  --transition-slow:     0.5s ease;
  --transition-smooth:   0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### Z-Index 레이어

```css
:root {
  --z-base:              1;
  --z-dropdown:          100;
  --z-sticky:            1000;
  --z-overlay:           10000;
  --z-modal:             100000;
  --z-header:            99999999;   /* 기존 사이트 값 */
  --z-cursor:            999999999;
}
```

### 퀵 액션 버튼 색상

```css
:root {
  --color-btn-quick-brown:  #a38361;
  --color-btn-quick-dark:   #3b3b3b;
}
```

## Tailwind CSS 확장 설정 (tailwind.config.ts 반영 필요)

```ts
// tailwind.config.ts 에 추가할 커스텀 색상
colors: {
  navy: { DEFAULT: '#042B48', dark: '#1c2533' },
  teal: { DEFAULT: '#67B5A9', light: '#64C0A7' },
  tan:  { DEFAULT: '#A48362', light: '#DFCBB5', warm: '#b79e8a', cream: '#e3cfbd' },
}

// 커스텀 폰트
fontFamily: {
  body: ['Pretendard', 'sans-serif'],
  'serif-kr': ['Noto Serif KR', 'serif'],
  'serif-en': ['Noto Serif', 'serif'],
  'title-en': ['Perpetua Titling MT', 'serif'],
  accent: ['Silk Serif', 'serif'],
}

// 커스텀 브레이크포인트
screens: {
  'xs': '350px',
  'sm': '500px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1350px',
  '3xl': '1600px',
}
```
