# 02. 사이트 구조 및 라우팅 맵

## 네비게이션 메뉴 구조 (헤더)

```
├── 닥터 ICL (Doctor ICL)
│   ├── 닥터 ICL Vision           → /pages/intro1.php   → /about/vision
│   ├── 닥터 ICL 이동훈           → /pages/intro1.php   → /about/doctor
│   ├── 차별화 시스템              → /pages/intro5.php   → /about/system
│   ├── 첨단장비                   → /pages/intro3.php   → /about/equipment
│   ├── 진료 안내                  → /pages/intro2.php   → /about/info
│   └── 오시는 길                  → /pages/intro2.php#int-cont2 → /about/location
│
├── 마에스트로 ICL (Maestro ICL)
│   ├── ICL 마에스트로             → /pages/spec1.php    → /maestro
│   ├── 마에스트로 선택            → /pages/spec1.php#spec-cont1 → /maestro#selection
│   ├── 마에스트로 진단            → /pages/spec1.php#spec-cont2 → /maestro#diagnosis
│   ├── 마에스트로 수술            → /pages/spec1.php#spec-cont3 → /maestro#surgery
│   └── 마에스트로 후기            → /pages/spec1.php#spec-cont4 → /maestro#reviews
│
├── ICL 집중탐구 (ICL Deep Dive)
│   ├── ICL Evo+ICL               → /pages/icl4.php     → /icl/evo
│   ├── ICL 정의                   → /pages/icl3.php     → /icl/definition
│   ├── ICL 특장점                 → /pages/icl5.php     → /icl/advantages
│   └── ICL FAQ                   → /pages/faq.php      → /icl/faq
│
├── 고도근시 ICL (High Myopia ICL)
│   ├── 고도근시 클리닉            → /pages/myopia1.php  → /myopia/clinic
│   ├── 고도근시 녹내장            → /pages/myopia1.php#myopia-cont2 → /myopia/glaucoma
│   ├── 고도근시 망막              → /pages/myopia1.php#myopia-cont3 → /myopia/retina
│   ├── 고도근시 백내장            → /pages/myopia1.php#myopia-cont4 → /myopia/cataract
│   ├── 고도근시 렌즈삽입술(ICL)    → /pages/myopia1.php#myopia-cont5 → /myopia/lens
│   └── 고도근시 관리              → /pages/myopia1.php#myopia-cont6 → /myopia/care
│
├── 특수질환 ICL (Special Conditions)
│   ├── 라식 후 재수술              → /pages/disease1.php → /special/post-lasik
│   ├── 원추각막 ICL               → /pages/disease2.php → /special/keratoconus
│   └── 아벨리노 ICL              → /pages/disease3.php → /special/avellino
│
├── 노안교정 (Presbyopia)
│   ├── 비바 ICL                   → /pages/disease4.php → /presbyopia/viva-icl
│   └── 노안 · 백내장              → /pages/cataract_n.php → /presbyopia/cataract
│
└── 고객센터 (Community)
    ├── 닥터 ICL 칼럼              → /pages/community1.php?code=칼럼 → /community/column
    ├── 병원소식                    → /pages/community1.php?code=소식 → /community/news
    ├── 예약                       → /pages/community3.php → /community/reservation
    ├── 수술후기                    → /pages/community2.php → /community/reviews
    └── 유튜브                     → /pages/yutube.php → /community/youtube
```

## 페이지 유형 분류

### Type A: 원페이지 스크롤 (앵커 네비게이션)
메뉴에서 여러 항목이 같은 PHP 파일의 다른 앵커로 이동하는 페이지.
좌측 고정 내비게이션(Left Nav)으로 섹션 이동.

| 페이지 | PHP 파일 | 앵커 섹션 수 |
|--------|----------|-------------|
| 마에스트로 ICL | spec1.php | 5개 (#fast-facts ~ #spec-cont4) |
| 고도근시 ICL | myopia1.php | 6개 (#myopia-cont1 ~ #myopia-cont6) |
| 닥터 소개 | intro1.php | 다수 |
| 진료 안내 | intro2.php | 2개 (#int-cont1, #int-cont2) |

### Type B: 독립 상세 페이지
각각 별도 PHP 파일로 존재하는 단독 페이지.

- intro3.php (첨단장비)
- intro4.php (투어/갤러리)
- intro5.php (차별화 시스템)
- icl3.php, icl4.php, icl5.php (ICL 정보)
- disease1~4.php (특수질환)
- cataract.php, cataract_n.php (백내장)
- faq.php (FAQ)

### Type C: 동적 콘텐츠 페이지 (DB 연동)
GET 파라미터 또는 AJAX로 데이터를 불러오는 페이지.

- community1.php (`?code=칼럼|소식|블로그|이벤트`)
- community2.php (`?tab=1|2|3|4`)
- community1_view.php (게시글 상세)
- community2_view1~3.php (후기 상세)
- community3.php (예약 폼)
- yutube.php (유튜브)

### Type D: 인증/법적 페이지
- login.php, join.php, join_sns.php
- password_reset.php, id_reset.php
- termsofuse.php, obligations.php, obligations2.php, pay.php

## Next.js App Router 디렉토리 구조 (제안)

```
src/app/
├── [locale]/
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # 메인페이지 (리뉴얼)
│   ├── about/
│   │   ├── vision/page.tsx
│   │   ├── doctor/page.tsx
│   │   ├── system/page.tsx
│   │   ├── equipment/page.tsx
│   │   ├── info/page.tsx
│   │   └── location/page.tsx
│   ├── maestro/
│   │   └── page.tsx            # 원페이지 스크롤 (5섹션)
│   ├── icl/
│   │   ├── evo/page.tsx
│   │   ├── definition/page.tsx
│   │   ├── advantages/page.tsx
│   │   └── faq/page.tsx
│   ├── myopia/
│   │   └── page.tsx            # 원페이지 스크롤 (6섹션)
│   ├── special/
│   │   ├── post-lasik/page.tsx
│   │   ├── keratoconus/page.tsx
│   │   └── avellino/page.tsx
│   ├── presbyopia/
│   │   ├── viva-icl/page.tsx
│   │   └── cataract/page.tsx
│   ├── community/
│   │   ├── column/page.tsx
│   │   ├── news/page.tsx
│   │   ├── reservation/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── reviews/[id]/page.tsx
│   │   └── youtube/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── reset-password/page.tsx
│   └── legal/
│       ├── terms/page.tsx
│       ├── privacy/page.tsx
│       └── non-covered/page.tsx
```
