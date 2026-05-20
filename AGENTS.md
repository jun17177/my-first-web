## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)
- Supabase (Auth + PostgreSQL)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Design Tokens

- Primary color: shadcn/ui --primary (어두운 파란색 계열)
- Background: --background (흰색)
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-6xl mx-auto (카드 그리드 — 3열 레이아웃 대응)
- 반응형: grid-cols-1 (모바일) → grid-cols-2 (md) → grid-cols-3 (lg)

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용
- 팀 고유 컬러(hex)는 반드시 `style={{ backgroundColor: color }}` — Tailwind 클래스 사용 금지

## Security Rules (Ch11 이후)

- 보안은 클라이언트 if문이 아니라 RLS로 강제한다
  - React UI 분기(`user.id === post.user_id`)는 UX 편의용이지 보안이 아님
  - 실제 INSERT/UPDATE/DELETE 제한은 Supabase RLS 정책이 담당
- RLS SQL은 반드시 마이그레이션 파일로 남긴다
  - SQL Editor 직접 실행 금지
  - `npx supabase migration new` → 파일 편집 → `npx supabase db push`
- service_role 키는 클라이언트 코드에서 절대 사용 금지
  - 클라이언트에는 NEXT_PUBLIC_SUPABASE_ANON_KEY(anon 키)만 사용
- INSERT 정책에는 반드시 WITH CHECK 포함 (auth.uid() = user_id)
- UPDATE 정책에는 USING과 WITH CHECK 둘 다 포함

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.
- Do not use `tailwind.config.js`; Tailwind CSS 4 uses `@import "tailwindcss"` in globals.css.
- Do not use `const { id } = params`; use `const { id } = await params` (Next.js 15+).
- Do not access `localStorage` directly outside `useEffect`; it breaks SSR.
- Do not use `middleware.ts`; this project uses `proxy.ts` (Next.js 16).
- Do not use `auth.signIn()`; use `signInWithPassword()` from @supabase/supabase-js v2.
- Do not create Supabase client with `createClient` from `@supabase/supabase-js` directly in browser; use `lib/supabase/client.ts` which wraps `createBrowserClient`.
- Do not run RLS SQL directly in SQL Editor; always use CLI migration.
- Do not use `service_role` key in any client-side code.
