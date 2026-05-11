# 06. 메인페이지 CSS 참고 문서

> 메인페이지는 리뉴얼 예정이므로, 기존 CSS에서 참고할 핵심 요소만 정리합니다.

## 기존 메인페이지 CSS 파일
- `/css/main.css` - 주요 스타일
- `/css/main_new.css` - 대체 스타일
- `/css/layout/header.css` - 헤더
- `/css/layout/footer.css` - 푸터
- `/css/layout/layout.css` - 전역 레이아웃
- `/css/layout/reset.css` - 리셋
- `/css/layout/scroll.css` - 스크롤 효과

## 핵심 레이아웃 패턴

### 컨테이너
- 최대 너비: 명시적 max-width 없이 padding으로 조절
- 주요 섹션 패딩: 좌우 40~80px

### 헤더
- 높이: 약 80px
- position: fixed, z-index: 99999999
- 전환 효과: 배경색 투명 → #042B48 (스크롤 시)
- 로고 너비: 170px

### 메인 애니메이션 (참고용)
- GSAP ScrollSmoother: 데스크톱 부드러운 스크롤
- ScrollTrigger: 섹션별 진입/퇴장 애니메이션
- 커스텀 커서: 마우스 따라다니는 원형 커서
- 텍스트 split 애니메이션

### 폰트 사용 패턴
| 용도 | 폰트 | 스타일 |
|------|-------|--------|
| 영문 대제목 | Perpetua Titling MT | Bold, 대문자 |
| 한글 제목 | Noto Serif KR | 300~500 weight |
| 본문 | Pretendard | 400 weight |
| 강조 텍스트 | Silk Serif | Italic |

### 버튼 스타일 패턴
- 기본 CTA: 배경 #67B5A9, 텍스트 white, 라운드 없음
- 보조 CTA: 배경 transparent, 보더 #A48362, 텍스트 #A48362
- 퀵 메뉴: 배경 #a38361 또는 #3b3b3b

## JS 라이브러리 (유지 또는 대체 판단 필요)

| 기존 라이브러리 | Next.js 대응 |
|----------------|-------------|
| GSAP + ScrollTrigger | gsap (npm), 또는 framer-motion |
| Swiper | swiper (npm) |
| AOS | 자체 IntersectionObserver 또는 framer-motion |
| jQuery | 불필요 (React로 대체) |
| Masonry | CSS Grid 또는 react-masonry-css |
| Summernote | 별도 CMS 또는 react-quill |
