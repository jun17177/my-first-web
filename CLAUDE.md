

## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.
- Data lives in `lib/` as static TypeScript arrays — no DB at this stage.

## Design Tokens

- Primary color: shadcn/ui --primary
- Background: --background (흰색)
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-6xl mx-auto (카드 그리드 — 3열 레이아웃 대응)
- 반응형: grid-cols-1 (모바일) → grid-cols-2 (md) → grid-cols-3 (lg)
- Header/Footer: bg-[#1a1a1a] + text-white
- Team color line: `<div className="h-1.5 rounded-t-lg" style={{ backgroundColor: teamColor }}>` (팀별 hex 색상, Tailwind 클래스로 표현 불가)

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용
- 팀 고유 컬러(hex)는 반드시 `style={{ backgroundColor: color }}` — Tailwind 클래스 사용 금지
- localStorage 접근은 반드시 `useEffect` 안에서 (SSR 환경에서 window 직접 접근 금지)

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.
- Do not use `tailwind.config.js`; Tailwind CSS 4 uses `@import "tailwindcss"` in globals.css.
- Do not use `const { id } = params`; use `const { id } = await params` (Next.js 15+).
- Do not access `localStorage` directly outside `useEffect`; it breaks SSR.