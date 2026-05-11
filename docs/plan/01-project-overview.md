# 01. 프로젝트 개요 - ICL PHP to Next.js Migration

## 원본 프로젝트
- **사이트**: Doctor ICL 안과 (doctoricl.com)
- **스택**: PHP + MySQL (mysqli), jQuery, GSAP, Swiper, AOS
- **소스 위치**: `C:\Users\owner\Desktop\nginx_html\html`

## 마이그레이션 대상 (Next.js)
- **프레임워크**: Next.js (App Router, TypeScript, Tailwind CSS)
- **i18n**: next-intl (ko / en)
- **타겟 위치**: `C:\Users\owner\Desktop\icl-next`

## 핵심 요구사항
1. **다국어(i18n)**: `next-intl` 기반 locale 라우팅 (`/ko/...`, `/en/...`)
2. **미들웨어**: locale 감지 및 리다이렉트
3. **컴포넌트화**: 페이지별 섹션 컴포넌트 분리
4. **메인페이지**: 리뉴얼 디자인 적용 (기존 CSS/구조 참고만)
5. **상세페이지**: 기존 디자인 유지, CSS 변수화

## 기존 기술 스택
| 구분 | 기술 |
|------|------|
| Backend | PHP (mysqli), MySQL (AWS RDS) |
| Frontend | HTML5, CSS3, jQuery 3.6.0 |
| Animation | GSAP 3.10.4, ScrollTrigger, ScrollSmoother |
| Slider | Swiper 8.4.4 |
| Scroll Animation | AOS 2.3.1 |
| Editor | Summernote |
| Fonts | Pretendard, Noto Serif KR, Perpetua Titling MT, Silk Serif |
