# 04. 다국어(i18n) 설정 계획

## 라이브러리: next-intl

### 지원 언어
- **ko** (한국어) - 기본 언어
- **en** (영어)

### 기존 PHP 사이트의 i18n 방식
- 한국어: 루트 `/` 에서 서비스
- 영어: `/en/` 서브디렉토리에 별도 PHP 파일
- 도메인 분리: `doctoricl.com` (KR) / `en.doctoricl.com` (EN)
- 언어 전환: 헤더 우측 KR/EN 토글

### Next.js i18n 구조

```
src/
├── i18n/
│   ├── config.ts           # locale 설정
│   ├── request.ts          # next-intl request config
│   └── routing.ts          # routing configuration
├── messages/
│   ├── ko/
│   │   ├── common.json     # 공통 (헤더, 푸터, 버튼)
│   │   ├── main.json       # 메인페이지
│   │   ├── about.json      # 닥터 ICL 소개
│   │   ├── maestro.json    # 마에스트로 ICL
│   │   ├── icl.json        # ICL 집중탐구
│   │   ├── myopia.json     # 고도근시
│   │   ├── special.json    # 특수질환
│   │   ├── presbyopia.json # 노안교정
│   │   └── community.json  # 고객센터
│   └── en/
│       ├── common.json
│       ├── main.json
│       └── ... (동일 구조)
├── middleware.ts            # locale 감지 & 리다이렉트
└── app/
    └── [locale]/            # locale 동적 라우트
        ├── layout.tsx
        └── ...
```

### 미들웨어 동작

```
사용자 접속 → middleware.ts
  1. URL에 locale prefix 확인
  2. 없으면 Accept-Language 헤더 또는 쿠키에서 locale 감지
  3. 기본값: ko
  4. /{locale}/... 으로 리다이렉트
```

### URL 패턴
| 한국어 | 영어 |
|--------|------|
| `/ko` | `/en` |
| `/ko/about/vision` | `/en/about/vision` |
| `/ko/maestro` | `/en/maestro` |
| `/ko/community/column` | `/en/community/column` |

### 번역 키 구조 예시 (common.json)

```json
{
  "header": {
    "menu": {
      "doctorIcl": "닥터 ICL",
      "maestroIcl": "마에스트로 ICL",
      "iclDeepDive": "ICL 집중탐구",
      "highMyopia": "고도근시 ICL",
      "specialConditions": "특수질환 ICL",
      "presbyopia": "노안교정",
      "community": "고객센터"
    },
    "quickMenu": {
      "reservation": "빠른 예약",
      "location": "오시는 길",
      "phone": "전화상담",
      "kakao": "카톡상담",
      "naver": "네이버예약"
    }
  },
  "footer": {
    "address": "서울특별시 강남구 강남대로 390, 20층(역삼동, 미진프라자)",
    "director": "대표원장: 이동훈",
    "phone": "02.566.1215",
    "copyright": "COPYRIGHT 2023 닥터 ICL 안과 All RIGHTS RESERVED"
  }
}
```

### 참고: 영어 페이지 범위
기존 사이트에서 영어 페이지는 제한적으로 존재 (index, header 정도).
마이그레이션 시 영어 번역 범위는 별도 정의 필요.
