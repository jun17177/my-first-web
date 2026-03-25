# Copilot 지침

## 기술 스택

- **Next.js 16.2.1** — App Router 전용
- **React 19.2.4**
- **Tailwind CSS 4.x** (`@tailwindcss/postcss` 사용)
- **TypeScript 5.x**

## 코딩 규칙

- 모든 컴포넌트는 기본적으로 **서버 컴포넌트**로 작성; 이벤트 핸들러, 브라우저 API, 훅이 필요한 경우에만 `"use client"` 추가
- 스타일은 **Tailwind CSS만** 사용 — CSS 모듈, 인라인 스타일, 기타 CSS 라이브러리 금지

## AI가 자주 하는 실수

- **`next/router` 사용 금지** — 반드시 `next/navigation` 사용 (`useRouter`, `usePathname`, `useSearchParams`)
- **Pages Router 사용 금지** (`pages/` 디렉토리) — 이 프로젝트는 App Router (`app/` 디렉토리)만 사용
- **`params`는 반드시 await** — App Router에서 `params`와 `searchParams`는 Promise이므로 속성 접근 전 반드시 `await` 필요
