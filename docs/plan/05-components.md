# 05. 컴포넌트 구조 계획

## Layout 컴포넌트

```
src/components/
├── layout/
│   ├── Header/
│   │   ├── Header.tsx              # 메인 헤더 컨테이너
│   │   ├── DesktopNav.tsx          # 데스크톱 네비게이션 (7개 메뉴)
│   │   ├── MobileNav.tsx           # 모바일 햄버거 메뉴
│   │   ├── DropdownMenu.tsx        # 호버 드롭다운 (서브메뉴)
│   │   ├── LanguageSwitcher.tsx    # KR/EN 전환
│   │   └── QuickActions.tsx        # 우측 퀵 액션 (예약, 전화 등)
│   ├── Footer/
│   │   ├── Footer.tsx              # 푸터 컨테이너
│   │   ├── FooterInfo.tsx          # 병원 정보
│   │   └── FooterLinks.tsx         # 하단 링크 (약관, 개인정보 등)
│   ├── Sidebar/
│   │   ├── LeftNav.tsx             # 좌측 섹션 네비게이션 (원페이지 스크롤용)
│   │   └── RightQuickMenu.tsx      # 우측 퀵 메뉴 (예약, 길찾기 등)
│   └── PageLayout.tsx              # 공통 페이지 래퍼
```

## 공통 UI 컴포넌트

```
├── ui/
│   ├── Button.tsx                  # 공통 버튼
│   ├── SectionTitle.tsx            # 섹션 제목 (영문+한글 조합)
│   ├── Card.tsx                    # 카드 컴포넌트
│   ├── Modal.tsx                   # 모달/팝업
│   ├── Breadcrumb.tsx              # 경로 표시
│   ├── ScrollSection.tsx           # 스크롤 트리거 섹션 래퍼
│   ├── AnimatedText.tsx            # GSAP 텍스트 애니메이션
│   └── ImageWithFallback.tsx       # 이미지 + 로딩 처리
```

## 페이지별 컴포넌트

```
├── pages/
│   ├── main/                       # 메인페이지 (리뉴얼)
│   │   ├── HeroSection.tsx
│   │   ├── NewsSection.tsx
│   │   └── ...
│   │
│   ├── about/                      # 닥터 ICL 소개
│   │   ├── VisionSection.tsx
│   │   ├── DoctorProfile.tsx
│   │   ├── EquipmentGrid.tsx
│   │   ├── ClinicInfo.tsx
│   │   └── LocationMap.tsx
│   │
│   ├── maestro/                    # 마에스트로 ICL (원페이지 5섹션)
│   │   ├── FastFacts.tsx
│   │   ├── SelectionSection.tsx
│   │   ├── DiagnosisSection.tsx
│   │   ├── SurgerySection.tsx
│   │   └── ReviewsSection.tsx
│   │
│   ├── icl/                        # ICL 집중탐구
│   │   ├── EvoComparison.tsx
│   │   ├── DefinitionSection.tsx
│   │   ├── AdvantagesSection.tsx
│   │   └── FaqAccordion.tsx
│   │
│   ├── myopia/                     # 고도근시 (원페이지 6섹션)
│   │   ├── ClinicSection.tsx
│   │   ├── GlaucomaSection.tsx
│   │   ├── RetinaSection.tsx
│   │   ├── CataractSection.tsx
│   │   ├── LensSection.tsx
│   │   └── CareSection.tsx
│   │
│   ├── special/                    # 특수질환
│   │   ├── PostLasikSection.tsx
│   │   ├── KeratoconusSection.tsx
│   │   └── AvellinoSection.tsx
│   │
│   ├── presbyopia/                 # 노안교정
│   │   ├── VivaIclSection.tsx
│   │   └── CataractSection.tsx
│   │
│   └── community/                  # 고객센터
│       ├── PostList.tsx            # 게시글 목록
│       ├── PostDetail.tsx          # 게시글 상세
│       ├── ReviewCard.tsx          # 후기 카드
│       ├── ReviewTabs.tsx          # 후기 탭 (특수/고객/스타/영상)
│       ├── ReservationForm.tsx     # 예약 폼
│       └── YoutubeGrid.tsx         # 유튜브 영상 그리드
```

## 헤더 동작 사양

| 상태 | 배경색 | 로고 | 텍스트 색상 |
|------|--------|------|------------|
| 상단 (기본) | transparent | 흰색 로고 | white |
| 스크롤 후 (>150px) | #042B48 | 흰색 로고 | white |
| 모바일 메뉴 열림 | white | 컬러 로고 | dark |

## 원페이지 스크롤 컴포넌트 패턴

Maestro, Myopia 등 원페이지 스크롤 페이지에 사용:

```tsx
// ScrollPage 패턴
<ScrollPageLayout sections={sections}>
  <ScrollSection id="section-1" title="...">
    <Content />
  </ScrollSection>
  <ScrollSection id="section-2" title="...">
    <Content />
  </ScrollSection>
</ScrollPageLayout>

// LeftNav가 현재 스크롤 위치에 따라 활성 섹션 표시
// IntersectionObserver 또는 GSAP ScrollTrigger 사용
```

## 퀵 액션 버튼 (우측 사이드바)

데스크톱에서 항상 표시 (1280px 이하에서 숨김):

| 버튼 | 색상 | 링크 |
|------|------|------|
| 빠른 예약 | #a38361 | /community/reservation |
| 오시는 길 | #a38361 | /about/location |
| 전화상담 | #a38361 | tel:025661215 |
| 카톡상담 | #a38361 | 외부 카카오 링크 |
| 네이버예약 | #a38361 | 외부 네이버 링크 |
