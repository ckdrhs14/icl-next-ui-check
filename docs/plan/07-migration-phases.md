# 07. 마이그레이션 단계 계획

## Phase 1: 기반 환경 구축 (현재 완료)
- [x] Next.js 프로젝트 생성 (App Router, TypeScript, Tailwind)
- [x] next-intl 설치
- [ ] i18n 설정 (config, middleware, messages 구조)
- [ ] Tailwind 커스텀 설정 (디자인 토큰 반영)
- [ ] 폰트 설정 (Pretendard, Noto Serif KR, Perpetua, Silk Serif)
- [ ] 글로벌 CSS 변수 정의
- [ ] 공통 레이아웃 (Header, Footer)

## Phase 2: 레이아웃 및 공통 컴포넌트
- [ ] Header 컴포넌트 (데스크톱 + 모바일)
- [ ] Footer 컴포넌트
- [ ] 좌측 네비게이션 (원페이지 스크롤용)
- [ ] 우측 퀵 메뉴
- [ ] 공통 UI 컴포넌트 (Button, SectionTitle, Card 등)
- [ ] 언어 전환 컴포넌트

## Phase 3: 메인페이지 (리뉴얼)
- [ ] 새 디자인 기반 메인페이지 구현
- [ ] 반응형 처리
- [ ] 애니메이션 적용

## Phase 4: 상세 페이지 - 닥터 ICL 소개
- [ ] /about/vision
- [ ] /about/doctor
- [ ] /about/system
- [ ] /about/equipment
- [ ] /about/info
- [ ] /about/location

## Phase 5: 상세 페이지 - 마에스트로 & ICL
- [ ] /maestro (원페이지 스크롤 5섹션)
- [ ] /icl/evo
- [ ] /icl/definition
- [ ] /icl/advantages
- [ ] /icl/faq

## Phase 6: 상세 페이지 - 고도근시 & 특수질환
- [ ] /myopia (원페이지 스크롤 6섹션)
- [ ] /special/post-lasik
- [ ] /special/keratoconus
- [ ] /special/avellino

## Phase 7: 상세 페이지 - 노안교정
- [ ] /presbyopia/viva-icl
- [ ] /presbyopia/cataract

## Phase 8: 고객센터 (DB 연동 필요)
- [ ] /community/column (게시판)
- [ ] /community/news
- [ ] /community/reviews (탭 구조)
- [ ] /community/reservation (폼)
- [ ] /community/youtube

## Phase 9: 인증 & 법적 페이지
- [ ] 로그인 / 회원가입
- [ ] 약관, 개인정보처리방침
- [ ] 비급여항목

## Phase 10: 최적화 & QA
- [ ] SEO 메타데이터
- [ ] 이미지 최적화 (next/image)
- [ ] 성능 최적화 (코드 스플리팅, lazy loading)
- [ ] 크로스 브라우저 테스트
- [ ] 반응형 QA

## 참고: DB 관련 결정 사항
기존 PHP 사이트는 MySQL(AWS RDS)을 직접 조회합니다.
Next.js에서는 아래 중 선택 필요:
1. **API Routes** (Next.js Route Handlers) + DB 직접 연결
2. **외부 API 서버** 별도 구축
3. **Headless CMS** (게시판 콘텐츠용)

이 결정은 Phase 8 전까지 확정 필요.
