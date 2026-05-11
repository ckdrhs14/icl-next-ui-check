# 11. Next.js 16 마이그레이션 이슈

## 주요 Breaking Changes

### 1. middleware.ts → proxy.ts 리네이밍
- Next.js 16에서 `middleware.ts`가 `proxy.ts`로 변경됨
- `export function middleware()` → `export function proxy()`
- Edge Runtime 제거, Node.js 런타임만 지원
- **next-intl 호환성 확인 필요** — next-intl이 proxy.ts를 인식하는지 확인 후 적용

### 2. Async Request APIs
- `params`, `searchParams`가 Promise로 변경 → 반드시 `await` 필요
```typescript
// Next.js 16
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
}
```

### 3. Turbopack 기본값
- Turbopack이 기본 빌드 도구로 전환
- 커스텀 webpack 설정 사용 시 빌드 실패
- Sass tilde import(`~`) 미지원 → 직접 경로 사용

### 4. 스크롤 동작 변경
- `scroll-behavior: smooth`를 더 이상 자동 적용하지 않음
- 필요 시 `<html data-scroll-behavior="smooth">` 추가

### 5. Image 컴포넌트 변경
- `images.domains` deprecated → `remotePatterns` 사용
- `minimumCacheTTL` 기본값 60s → 14400s (4시간)
- `next/legacy/image` deprecated

### 6. parallel route default.tsx 필수
- 모든 슬롯에 `default.tsx` 파일 필요

## 대응 방안

| 이슈 | 대응 |
|------|------|
| proxy.ts | next-intl 호환 확인 후 proxy.ts 또는 middleware.ts 사용 |
| async params | 모든 동적 라우트에서 `await params` 적용 |
| Turbopack | 커스텀 webpack 미사용, Tailwind/PostCSS만 사용 |
| Image | `remotePatterns` 설정, next/image 사용 |
| CSS Modules | 정상 지원 — page.module.css 사용 가능 |
