# PHP to Next.js QA/QC 진단 및 개선 보고서

> 작성일: 2026-04-28
> 비교 대상: PHP 원본 (doctoricl.com) vs Next.js (icl-next)

---

## 1. 완료된 개선 사항

### 1-1. AOS (Animate On Scroll) 시스템 구축

PHP 원본은 AOS 2.3.1 라이브러리를 사용하여 거의 모든 섹션에 `data-aos="fade-up" data-aos-duration="1000"` 스크롤 애니메이션을 적용하고 있었으나, Next.js에는 **스크롤 애니메이션이 전혀 없었음**.

**구현 내용:**

- `src/components/aos/AosInit.tsx` - IntersectionObserver 기반 AOS 구현체 생성
    - 페이지 네비게이션 시 자동 재초기화 (usePathname 연동)
    - `data-aos-delay` 지원
    - threshold 0.05, rootMargin `-50px` 하단 설정
- `src/app/globals.css` - AOS 애니메이션 CSS 추가
    - `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade`, `zoom-in` 6종 지원
    - `data-aos-duration` 속성으로 개별 duration 제어 (400~1500ms)
    - 기본 duration: 800ms
- `src/app/[locale]/layout.tsx` - AosInit 컴포넌트 전역 등록

### 1-2. 전 페이지 data-aos 적용

PHP 원본과 동일하게 각 섹션의 `cont-inner` (내부 콘텐츠 래퍼)에 `data-aos="fade-up" data-aos-duration="1000"` 적용:

| 페이지              | 적용 개수 | PHP 원본 개수   |
| ------------------- | --------- | --------------- |
| about/info          | 1         | 8               |
| about/doctor        | 1         | 1               |
| about/equipment     | 3         | 5               |
| about/vision        | 3         | 0 (없었음)      |
| about/location      | 6         | 6               |
| about/system        | 6         | N/A (새 페이지) |
| icl/definition      | 6         | 10              |
| icl/advantages      | 5         | 4               |
| icl/evo             | 5         | 0 (없었음)      |
| icl/faq             | 3         | 3               |
| maestro             | 7         | 8               |
| myopia              | 21        | 21              |
| special/post-lasik  | 3         | 3               |
| special/keratoconus | 4         | 4               |
| special/avellino    | 5         | 5               |
| presbyopia/cataract | 17        | 25              |
| presbyopia/viva-icl | 6         | N/A             |

### 1-3. CSS Hover 효과 및 Transition 추가

PHP 원본의 sh.css에 있던 hover 효과/transition이 Next.js CSS 모듈에 거의 없었음. 다음을 추가:

**maestro/page.module.css:**

- `.selectionCard` - hover lift (translateY -8px) + box-shadow
- `.gifBox` - opacity transition 0.4s
- `.moreBtnBox` - hover opacity 0.8
- `.reviewBox` 모바일 hover 해제 (max-width: 1250px)
- `@keyframes filterAnime` 추가 (장비 이미지 glow 효과)

**myopia/page.module.css:**

- `.myopiaListItem` - hover lift + shadow
- `.sec16NavBtn` - hover opacity
- `.sec16PaginationBullet` - transition 추가
- `.sec18NavLink` - hover color (teal)
- `.myopiaListType3Item` - hover lift

**icl/definition/page.module.css:**

- `.stepCard` - hover lift + shadow
- `.candidateItem` - hover background
- `.safetyCard` - hover lift

**icl/advantages/page.module.css:**

- `.advCard` - 비활성화된 hover를 실제 lift + shadow로 교체
- `.statCard` - 동일하게 교체
- `.compTable tbody tr` - hover row highlight

**icl/evo/page.module.css:**

- `.featureCard` - hover lift + shadow (비활성 hover 교체)

**special/avellino/page.module.css:**

- `.keyPointCard` - hover lift + shadow
- `.dangerStep` - hover lift
- `@keyframes opaAnime` 추가 (오버레이 깜빡임 효과)

**presbyopia/cataract/page.module.css:**

- `.txtFrame ul li` - card hover lift
- `.wrapList4Img` - card hover lift
- `.symptomListBox` - card hover lift
- `.borTxtBox ul li` - card hover lift
- `.cirBox` - hover scale(1.05)

**about/doctor/page.module.css:**

- `.slideActive` - transition 추가 (scale 변환 시 부드러운 전환)
- `.swiperNav button` - hover opacity
- `.videoThumb` - hover scale(1.02)
- `.timelineItem` - hover background transition

**about/equipment/page.module.css:**

- `.equipBox` - hover lift + shadow
- `.equipImgBox` - hover scale(1.03)

**about/vision/page.module.css:**

- `.contentBox` - hover lift + shadow
- `.commentImg` - hover scale(1.03)

**about/location/page.module.css:**

- `.btnBox` - hover lift + shadow
- `.imgBox` - hover scale(1.02)

---

## 2. 남은 부족한 부분 (추가 작업 필요)

### 2-1. GSAP ScrollTrigger 기반 기능 (우선순위: 높음)

PHP 원본에서 GSAP ScrollTrigger로 구현된 다음 기능들은 아직 미구현:

1. **배경 핀 고정 (Parallax Pin)**
    - `icl/definition`: `.section_wrap .bg_`와 `.icl_sec2 .bg_` 핀 고정
    - `special/post-lasik`: `.section_wrap .bg_` 핀 고정
    - `special/keratoconus`: `.section_wrap .bg_`와 `.icl_sec4 .bg_` 핀 고정
    - `special/avellino`: `.section_wrap .bg_`와 `.dise_sec4 .bg_` 핀 고정
    - `maestro`: `.spec1-sec8 .bg_` 핀 고정
    - 구현 방안: CSS `position: sticky` 또는 GSAP npm 패키지 도입

2. **숫자 카운트업 애니메이션**
    - `maestro` sec11: 6개 숫자 (6, 59 등) ScrollTrigger 진입 시 카운트업
    - `about/location` sec6: `.count` 요소 카운트업
    - 구현 방안: IntersectionObserver + requestAnimationFrame 기반 카운터 구현

3. **헤더 색상 전환 (inv\_ 섹션 기반)**
    - PHP에서는 `.inv_` 클래스 섹션 진입 시 헤더와 quick_group 배경색이 토글됨
    - ScrollTrigger `toggleClass` 사용
    - 구현 방안: IntersectionObserver로 섹션 진입 감지하여 헤더 상태 변경

### 2-2. Swiper 관련 디테일 (우선순위: 중간)

1. **about/info**: 수상/인증 Swiper (autoplay 2500ms, pagination, navigation)
2. **about/location**: 갤러리 Swiper (autoplay 2500ms, loop)
3. **icl/definition**: 동기화된 듀얼 Swiper (synced swiper1 + swiper2)
4. **maestro sec13**: 수상 Swiper (slidesPerView 5, autoplay 4000ms)
5. 각 Swiper의 `transition` 세부 설정 (slide opacity 0.5~0.7 기본, active 1.0)

### 2-3. 이미지 자동 전환 효과 (우선순위: 중간)

1. **maestro**: 배경 이미지 3초 간격 토글 (ch-img / ch-img-mo)
2. **icl/advantages**: 이미지 2초 간격 순환 (ch-img1, ch-img2, ch-img3)
3. 구현 방안: setInterval 기반 클래스 토글 + CSS opacity transition

### 2-4. CSS 디테일 (우선순위: 낮음)

1. **about/info 페이지**: PHP 원본에 8개 AOS가 있지만 Next.js 구조가 달라 1개만 적용. 섹션 구조 세분화 필요
2. **cataract 페이지**: PHP에 25개 AOS가 있지만 17개만 적용. 일부 서브 콘텐츠 블록(이미지, 텍스트 박스)에 추가 필요
3. **커스텀 커서**: PHP 메인 페이지에서 사용하는 원형 따라다니는 커서 (cursor.js)
4. **ScrollSmoother**: 데스크톱 부드러운 스크롤 (GSAP 플러그인) - 성능 고려 필요

### 2-5. 폰트 관련 (우선순위: 낮음)

1. **Perpetua Titling MT**: PHP 영문 대제목에 사용. 웹폰트로 사용 불가 시 대체폰트 필요
2. **Silk Serif**: PHP 강조 텍스트에 사용. 동일하게 웹폰트 확인 필요

### 2-6. 모바일 반응형 (우선순위: 확인 필요)

1. PHP 원본의 모바일 전용 인덱스 파일(index_mobile.php)이 별도로 존재
2. 모바일에서 hover 효과 비활성화 처리 확인 필요 (카드 lift 등)
3. 모바일 전용 이미지 전환(ch-bgImgMo) 등 반응형 처리

---

## 3. 구조적 차이점 (참고)

| 항목           | PHP 원본                      | Next.js                   |
| -------------- | ----------------------------- | ------------------------- |
| AOS 라이브러리 | AOS 2.3.1 (CDN)               | 자체 IntersectionObserver |
| 스크롤 엔진    | GSAP ScrollSmoother           | 브라우저 기본             |
| 핀 고정        | GSAP ScrollTrigger pin        | 미구현 (CSS sticky 가능)  |
| 카운터         | GSAP timeline + ScrollTrigger | 미구현                    |
| 슬라이더       | Swiper 8.4.4                  | Swiper (npm)              |
| jQuery         | 3.6.0                         | 불필요 (React)            |
| 라우팅         | PHP 직접 include              | Next.js App Router        |
| i18n           | 별도 en/ 디렉토리             | next-intl                 |

---

## 4. 권장 다음 단계

1. **1단계**: 숫자 카운트업 애니메이션 구현 (maestro, location)
2. **2단계**: CSS `position: sticky`로 배경 핀 고정 효과 구현
3. **3단계**: 이미지 자동 전환 효과 추가 (maestro, advantages)
4. **4단계**: about/info 페이지 AOS 세분화 (섹션 분리)
5. **5단계**: cataract 페이지 AOS 추가 (서브 콘텐츠 블록)
6. **6단계**: 모바일 반응형 hover 비활성화 전체 점검
