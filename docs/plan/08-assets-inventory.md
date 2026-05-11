# 08. 에셋 인벤토리

## 이미지 에셋 (총 1,754+ 파일)

### 디렉토리별 분류

| 디렉토리 | 용도 | 마이그레이션 |
|----------|------|-------------|
| `/img/background/` | 풀페이지 배경 이미지 | 상세페이지에서 사용 |
| `/img/board/` | 커뮤니티/블로그 이미지 | DB 연동 시 참조 |
| `/img/cat/` | 카테고리/질환 아이콘 | 상세페이지에서 사용 |
| `/img/common/` | 공통 UI 아이콘 | 컴포넌트 에셋으로 이전 |
| `/img/dise/` | 질환 관련 이미지 | 상세페이지에서 사용 |
| `/img/equip/` | 의료장비 사진 | 장비 소개 페이지 |
| `/img/etc/` | 로고, 배너 등 | 선별 이전 |
| `/img/event/` | 이벤트 프로모션 | 선별적 |
| `/img/int/` | 원장 소개 섹션 | 소개 페이지 |
| `/img/main/` | 메인페이지 히어로/섹션 | 리뉴얼 시 교체 가능 |
| `/img/myopia/` | 고도근시 교육 자료 | 고도근시 페이지 |
| `/img/spec/` | 마에스트로 ICL 스펙 | 마에스트로 페이지 |
| `/img/youtube/` | 유튜브 썸네일 | 유튜브 페이지 |
| `/video/` | 비디오 에셋 | 선별적 |

### 로고 파일
- `logo_white.svg` - 다크 배경용
- `logo_color.svg` - 라이트 배경용

### 공통 아이콘 (variants: default, inv, br, nbr)
- `icon_cal.png` - 캘린더
- `icon_map.png` - 지도
- `icon_call.png` - 전화
- `icon_kakao.png` - 카카오톡
- `icon_naver.png` - 네이버

## 폰트 에셋

| 폰트 | 소스 | 비고 |
|------|------|------|
| Pretendard | CDN / npm | 본문 폰트, next/font 사용 가능 |
| Noto Serif KR | Google Fonts | next/font/google 사용 |
| Noto Serif | Google Fonts | next/font/google 사용 |
| Perpetua Titling MT | 로컬 (/font/) | public/fonts/로 복사 필요 |
| Silk Serif | 로컬 (/font/) | public/fonts/로 복사 필요 |

## 에셋 마이그레이션 전략

### Next.js public/ 디렉토리 구조 (제안)

```
public/
├── images/
│   ├── common/          # 공통 아이콘, 로고
│   ├── about/           # 소개 페이지
│   ├── maestro/         # 마에스트로 페이지
│   ├── icl/             # ICL 페이지
│   ├── myopia/          # 고도근시 페이지
│   ├── special/         # 특수질환 페이지
│   ├── presbyopia/      # 노안교정 페이지
│   ├── community/       # 커뮤니티 페이지
│   └── background/      # 배경 이미지
├── fonts/
│   ├── perpetua/        # Perpetua Titling MT
│   └── silk-serif/      # Silk Serif
└── videos/              # 비디오 에셋
```

### 이미지 최적화 방안
- `next/image` 컴포넌트 사용 (자동 최적화)
- WebP 변환 (Next.js 자동 처리)
- srcSet 자동 생성
- lazy loading 기본 적용
- SVG 아이콘은 React 컴포넌트로 변환 고려

## 외부 서비스 연동

| 서비스 | 용도 | URL/ID |
|--------|------|--------|
| YouTube | 영상 콘텐츠 | @driclno.1 |
| Kakao Talk | 상담 | pf.kakao.com/_rXGTG |
| Naver Blog | 블로그 | 네이버 블로그 |
| Instagram | SNS | @doctoricl |
| Kakao OAuth | 소셜 로그인 | config 파일 참조 |
| Naver OAuth | 소셜 로그인 | config 파일 참조 |
