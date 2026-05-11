# 09. SEO 전략 및 URL 리다이렉트

## 기존 사이트 SEO 현황

### 도메인 구조
- 한국어: `https://doctoricl.com/`
- 영어: `https://en.doctoricl.com/` (서브도메인)
- 마이그레이션 후: `https://doctoricl.com/ko/...`, `https://doctoricl.com/en/...`

### 검색엔진 등록 현황
- **Naver**: site-verification `c515fcd626ac35f2bfb5475c5c27123d8f32f556`
- **Google**: GTM `GTM-P8M6Z82L`, Google Ads `AW-11442225205`
- **robots.txt**: `Allow: /` + `Sitemap: https://doctoricl.com/sitemap.xml`
- **sitemap.xml**: 34개 URL 등록 (2024-11-22 기준)

---

## 페이지별 메타데이터 매핑

기존 `_head.php`에서 URL 기반으로 동적 생성되는 메타데이터를 Next.js `metadata` 또는 `generateMetadata()`로 이관한다.

### 메인 페이지

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/` | 강남 닥터ICL안과의원 - 강남안과,렌즈삽입술,안내렌즈삽입술 | 강남안과, 강남역안과 1번출구, 렌즈삽입술, ICL, 노안백내장, ICL 렌즈삽입술부터 백내장 인공수정체 삽입술까지, 20년 동안 렌즈삽입술에 전념해 온 안과 전문의 이동훈 대표원장, 레퍼런스 닥터, ICL 엑스퍼트 인스트럭터, 닥터아이씨엘안과 | 1.00 |

### About 섹션

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/about/vision` | 닥터 ICL Vision - 닥터ICL안과의원 | 렌즈삽입술에 최적화된 시설을 갖춘 후방렌즈 ICL 전문 클리닉, 닥터ICL 이동훈 원장 | 0.80 |
| `/about/info` | 진료안내 - 닥터ICL안과의원 | 강남역 2호선 1번 출구, 2번 출구에서 가까운 닥터ICL안과의원, 스타벅스 건물 주차장 발렛파킹가능 | 0.80 |
| `/about/equipment` | 첨단장비소개 - 닥터ICL안과의원 | 최신 장비들과 오랜 수술 경험을 통해서 고객 개개인에게 가장 안전하며, 정확한 결과가 나올 수 있는 수술장비와 수술방법, 안전한 수술, CASIA2, CELLCHEK20, i-Trace | 0.80 |
| `/about/system` | 차별화 시스템 - 닥터ICL안과의원 | 3차원 안구공간 정밀 검사실, 고해상도 전안부 OCT 단층촬영기, CASIA2, ANTERION, 안구공간측정 오차를 허용하지 않겠다는 본원의 의지 | 0.80 |

### 마에스트로 / ICL

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/maestro` | ICL 마에스트로 - 닥터ICL안과의원 | 마에스트로 기법(밀도가 다른 히알루론산을 하단과 상단에 2층으로 넣어 렌즈가 부드럽게 잘 펴져서 정확한 위치로 들어가는 기법)으로 각막의 내피세포 손상이 없는 더욱 안전한 렌즈삽입술 | 0.80 |
| `/icl/evo` | ICL Evo+ICL - 닥터ICL안과의원 | 유연한 콜라머 재질을 사용한 Evo+ ICL 렌즈, FDA 임상기준을 통과한 유일한 후방렌즈삽입술 | 0.80 |
| `/icl/definition` | ICL 정의 - 닥터ICL안과의원 | Implantable Contact Lens의 약자로, '삽입이 가능하다'는 뜻으로 유지보수가 필요 없고 장기간 양호한 상태를 유지할 수 있기 때문에 반영구적인 콘택트렌즈 | 0.80 |
| `/icl/faq` | ICL FAQ - 닥터ICL안과의원 | ICL, 렌즈삽입술 궁금한 질문에 대한 답변으로 궁금하신 것이 있다면 편하게 예약 상담으로 문의 주세요. | 0.64 |

### 특수질환 / 노안

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/special/post-lasik` | 라식 후 재수술 - 닥터ICL안과의원 | 라식 이후 시력이 떨어져 다시 수술이 필요한 경우 떨어진 시력을 기준으로 도수를 결정해 수술이 가능합니다. | 0.80 |
| `/special/keratoconus` | 원추각막 ICL - 닥터ICL안과의원 | 각막이 얇아지고 모양이 뒤틀려 근시와 난시가 심해지는 원추각막은 치료 이후에 렌즈삽입술이 가능합니다. | 0.64 |
| `/special/avellino` | 아벨리노 ICL - 닥터ICL안과의원 | 아벨리노 각막이영양증으로 콘택트 렌즈 착용이 어려운 경우 눈에 손상이 없는 ICL 렌즈삽입술을 받는 편을 권장합니다. | 0.64 |
| `/presbyopia/viva-icl` | 노안 ICL - 닥터ICL안과의원 | 원거리와 가까운 거리를 잘 보이도록 교정하는 단초점 안내 콘택트 렌즈, 모든 거리를 잘 보이도록 교정하는 다초점 안내 렌즈 로 교정하는 노안 ICL | 0.64 |
| `/presbyopia/cataract` | 백내장 - 닥터ICL안과의원 | (기존 cataract.php 메타 데이터 사용) | 0.80 |

### 고도근시

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/myopia` | 고도근시 클리닉 - 닥터ICL안과의원 | 고도근시 전문 클리닉, 녹내장·망막·백내장 합병증 관리부터 ICL 렌즈삽입술까지 | 0.80 |

### 커뮤니티

| Next.js 경로 | title | description | priority |
|--------------|-------|-------------|----------|
| `/community/news` | 병원소식 - 닥터ICL안과의원 | 병원 일정, 이동훈 원장 수상, 기사 등 닥터ICL의원 관련 내용으로 소식을 전달드립니다. | 0.80 |
| `/community/events` | 이벤트 - 닥터ICL안과의원 | 할인, 증정품 혜택을 누릴 수 있는 이벤트 소식을 알려드립니다. | 0.64 |
| `/community/reservation` | 온라인 예약 - 닥터ICL안과의원 | 20년간 ICL 렌즈삽입술 오직 한 길로만 걸어온 닥터 ICL 안과 예약으로 풍부한 수술경험을 데이터 분석한 10,000건이 넘는 집도 경험으로 개인별 특징에 맞는 최적의 시력을 선사드립니다. | 0.80 |
| `/community/youtube` | YOUTUBE 유튜브 - 닥터ICL안과의원 | 렌즈삽입술, 노안/백내장 수술 등 다양한 안질환. 정밀한 차별화된 검사. 국내 최초 렌즈삽입술 전문 클리닉 닥터 ICL 유튜브에서 확인해 보세요! | 0.64 |

---

## 공통 메타 태그

모든 페이지에 적용할 정적 메타 태그. `src/app/[locale]/layout.tsx`에서 설정한다.

```typescript
// 공통 keywords
const COMMON_KEYWORDS = "강남안과, 강남역안과, 렌즈삽입술, ICL, 이동훈, 닥터아이씨엘안과, 예약 상담안내 강남안과";

// 공통 metadata
export const metadata: Metadata = {
  robots: "index, follow",
  authors: [{ name: "Doctor ICL" }],
  other: {
    "revisit-after": "7 days",
    "format-detection": "telephone=no",
  },
  openGraph: {
    type: "website",
    images: [{ url: "/img/ogImage.png" }],
    siteName: "닥터ICL안과의원",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
```

---

## 구조화 데이터 (JSON-LD)

기존 Organization 스키마를 유지하고, 페이지별로 추가 스키마를 삽입한다.

### Organization (전역)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "doctorICL 닥터ICL",
  "url": "https://doctoricl.com/",
  "sameAs": [
    "https://blog.naver.com/kngehsvtko",
    "https://www.youtube.com/@driclno.1",
    "https://www.instagram.com/doctoricl"
  ]
}
```

### MedicalClinic (추가 권장)
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "닥터ICL안과의원",
  "medicalSpecialty": "Ophthalmology",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "서울특별시 강남구"
  },
  "telephone": "(진료안내 번호)"
}
```

### FAQ 페이지
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

---

## 301 리다이렉트 매핑

기존 PHP URL → Next.js URL 리다이렉트. `next.config.ts`의 `redirects()`에서 처리한다.

```typescript
async redirects() {
  return [
    // === 메인 ===
    { source: '/index.php', destination: '/ko', permanent: true },

    // === About ===
    { source: '/pages/intro1.php', destination: '/ko/about/vision', permanent: true },
    { source: '/pages/intro2.php', destination: '/ko/about/info', permanent: true },
    { source: '/pages/intro3.php', destination: '/ko/about/equipment', permanent: true },
    { source: '/pages/intro5.php', destination: '/ko/about/system', permanent: true },

    // === 마에스트로 ===
    { source: '/pages/spec1.php', destination: '/ko/maestro', permanent: true },

    // === ICL ===
    { source: '/pages/icl3.php', destination: '/ko/icl/definition', permanent: true },
    { source: '/pages/icl4.php', destination: '/ko/icl/evo', permanent: true },
    { source: '/pages/icl5.php', destination: '/ko/icl/advantages', permanent: true },
    { source: '/pages/faq.php', destination: '/ko/icl/faq', permanent: true },

    // === 고도근시 ===
    { source: '/pages/myopia1.php', destination: '/ko/myopia', permanent: true },

    // === 특수질환 ===
    { source: '/pages/disease1.php', destination: '/ko/special/post-lasik', permanent: true },
    { source: '/pages/disease2.php', destination: '/ko/special/keratoconus', permanent: true },
    { source: '/pages/disease3.php', destination: '/ko/special/avellino', permanent: true },

    // === 노안/백내장 ===
    { source: '/pages/disease4.php', destination: '/ko/presbyopia/viva-icl', permanent: true },
    { source: '/pages/cataract.php', destination: '/ko/presbyopia/cataract', permanent: true },
    { source: '/pages/cataract_n.php', destination: '/ko/presbyopia/cataract', permanent: true },

    // === 커뮤니티 ===
    { source: '/pages/community1.php', destination: '/ko/community/news', permanent: true },
    { source: '/pages/community1_e.php', destination: '/ko/community/events', permanent: true },
    { source: '/pages/community3.php', destination: '/ko/community/reservation', permanent: true },
    { source: '/pages/community2.php', destination: '/ko/community/reviews', permanent: true },
    { source: '/pages/yutube.php', destination: '/ko/community/youtube', permanent: true },

    // === 인증/법적 ===
    { source: '/pages/login.php', destination: '/ko/auth/login', permanent: true },
    { source: '/pages/join.php', destination: '/ko/auth/register', permanent: true },
    { source: '/pages/termsofuse.php', destination: '/ko/legal/terms', permanent: true },
    { source: '/pages/obligations.php', destination: '/ko/legal/privacy', permanent: true },

    // === 영문 서브도메인 대응 ===
    // en.doctoricl.com → doctoricl.com/en 리다이렉트는 DNS/nginx 레벨에서 처리
  ];
}
```

### 쿼리 파라미터가 있는 URL

`next.config.ts` `redirects`는 쿼리 파라미터 매칭을 지원하지 않으므로, `middleware.ts`에서 처리한다.

```
/pages/community1.php?code=칼럼  → /ko/community/column
/pages/community1.php?code=소식  → /ko/community/news
/pages/community1.php?code=이벤트 → /ko/community/events
/pages/community1_view.php?seq=N → /ko/community/news/N
/pages/community2.php?tab=N      → /ko/community/reviews
```

---

## sitemap.xml 생성

Next.js App Router의 `sitemap.ts`를 사용하여 동적으로 생성한다.

```
src/app/sitemap.ts
```

### 포함 페이지 목록
- 메인: `/ko`, `/en`
- 정적 페이지: about/*, maestro, icl/*, myopia, special/*, presbyopia/* (각 locale)
- 동적 페이지: community/news/[id], community/reviews/[id] (DB 조회)
- 우선도: 메인 1.0, 주요 페이지 0.8, 서브 페이지 0.64

### changefreq 가이드
- 메인/커뮤니티: `weekly`
- 정적 페이지: `monthly`
- 법적 페이지: `yearly`

---

## robots.txt

```
src/app/robots.ts
```

```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://doctoricl.com/sitemap.xml',
  };
}
```

---

## 분석/추적 코드

기존 추적 코드를 Next.js로 이전한다.

| 서비스 | ID | 구현 방식 |
|--------|-----|----------|
| Google Tag Manager | GTM-P8M6Z82L | `@next/third-parties` 또는 Script 컴포넌트 |
| Google Ads | AW-11442225205 | GTM 내부에서 관리 |
| Naver Search Advisor | c515fcd626ac35f2bfb5475c5c27123d8f32f556 | `<meta>` 태그 유지 |

---

## Canonical URL 전략

- 각 페이지의 canonical URL은 현재 locale 경로 포함 (`/ko/maestro`, `/en/maestro`)
- `hreflang` 태그로 언어 대안 명시:
  ```html
  <link rel="alternate" hreflang="ko" href="https://doctoricl.com/ko/maestro" />
  <link rel="alternate" hreflang="en" href="https://doctoricl.com/en/maestro" />
  <link rel="alternate" hreflang="x-default" href="https://doctoricl.com/ko/maestro" />
  ```
