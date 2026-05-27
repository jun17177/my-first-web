# ARCHITECTURE.md — F1 Fan Page

## 프로젝트 목표

2025 F1 시즌의 드라이버·팀·레이스 일정을 소개하고,
경기 후 드라이버에 대한 의견을 남길 수 있는 팬 사이트.
Next.js App Router + TypeScript + Tailwind CSS 4 기반.
라이트 테마, 검정 헤더/푸터, 팀별 포인트 컬러 카드 시스템.

---

## 페이지 맵

```
홈 (/)
├── 드라이버 소개 (/drivers)
├── 팀 소개 (/teams)
├── 레이스 캘린더 (/calendar)
└── 경기 의견 (/reviews)
```

| 페이지 | URL | 파일 경로 | 핵심 기능 |
|--------|-----|-----------|-----------|
| 홈 | `/` | `app/page.tsx` | 히어로 배너 + 상위 드라이버 하이라이트 |
| 드라이버 소개 | `/drivers` | `app/drivers/page.tsx` | 드라이버 카드 그리드 + 팀별 필터 |
| 팀 소개 | `/teams` | `app/teams/page.tsx` | 팀 카드 그리드 |
| 레이스 캘린더 | `/calendar` | `app/calendar/page.tsx` | 2025 레이스 일정 + 완료/예정 필터 |
| 경기 의견 | `/reviews` | `app/reviews/page.tsx` | 의견 작성 폼 + 저장 목록 (localStorage) |

---

## 유저 플로우

### 드라이버 정보 보기
```
홈 → nav "Drivers" → /drivers → 팀 필터 클릭(useState) → 원하는 드라이버 카드 확인
```

### 팀 정보 보기
```
홈 → nav "Teams" → /teams → 팀 카드 그리드 확인
```

### 레이스 일정 보기
```
홈 → nav "Calendar" → /calendar → 완료/예정 필터(useState) → 레이스 목록 확인
```

### 경기 의견 남기기
```
홈 → nav "Reviews" → /reviews
→ 경기 선택(드롭다운) → 드라이버 선택(드롭다운) → 별점 클릭(useState)
→ 의견 텍스트 입력(useState) → 저장 버튼 클릭
→ localStorage 저장(useEffect) → 의견 목록에 즉시 반영
```

---

## 컴포넌트 계층

```
app/
├── layout.tsx              # 공통 레이아웃 — Header + main + Footer + AuthProvider
├── page.tsx                # 홈 — Server Component
├── error.tsx               # 앱 전체 에러 안전망 — Client Component (reset() 버튼)
├── loading.tsx             # 앱 전체 로딩 스피너
├── login/
│   └── page.tsx            # 로그인 — Client Component (getErrorMessage 적용)
├── signup/
│   └── page.tsx            # 회원가입 — Client Component (getErrorMessage 적용)
├── posts/
│   ├── page.tsx            # 게시글 목록 — Client Component (Supabase select, 빈 상태 처리)
│   ├── loading.tsx         # 게시글 목록 스켈레톤 (animate-pulse 카드 3개)
│   ├── PostsList.tsx       # 목록 컴포넌트 (작성자 UI 분기)
│   ├── SearchBar.tsx       # 검색 컴포넌트
│   ├── new/
│   │   └── page.tsx        # 게시글 작성 — Client Component (Supabase insert)
│   └── [id]/
│       ├── page.tsx        # 게시글 상세 — Client Component (Supabase select, 스켈레톤)
│       ├── loading.tsx     # 게시글 상세 스켈레톤
│       └── edit/
│           └── page.tsx    # 게시글 수정 — Client Component (Supabase update)
├── drivers/
│   └── page.tsx            # 드라이버 목록 — Client Component (팀 필터 useState)
├── teams/
│   └── page.tsx            # 팀 목록 — Server Component
├── calendar/
│   └── page.tsx            # 캘린더 — Client Component (완료/예정 필터 useState)
└── reviews/
    └── page.tsx            # 경기 의견 — Client Component (폼 + localStorage)

components/
├── Header.tsx              # 검정 배경 nav, Link 5개 — Server Component
├── HeaderNav.tsx           # 로그인/로그아웃 UI — Client Component
├── Footer.tsx              # 검정 배경 푸터 — Server Component
├── PostForm.tsx            # 게시글 작성/수정 폼 — Client Component
├── DriverCard.tsx          # 드라이버 카드 (팀 컬러 라인 prop) — Server Component
├── TeamCard.tsx            # 팀 카드 (팀 컬러 라인 prop) — Server Component
├── DriverFilter.tsx        # 팀별 필터 버튼 그룹 — Client Component (useState)
├── RaceTable.tsx           # 레이스 테이블 + 필터 — Client Component (useState)
└── ReviewForm.tsx          # 의견 작성 폼 + 목록 — Client Component (useState + useEffect)

contexts/
└── AuthContext.tsx         # AuthProvider + useAuth — 세션 전역 공유

lib/
├── auth.ts                 # signInWithEmail, signUpWithEmail, signOut
├── error-message.ts        # getErrorMessage — Supabase/네트워크 에러 → 사용자 친화 메시지
├── supabase/
│   ├── client.ts           # createBrowserClient (anon key만 사용)
│   └── posts.ts            # getPosts, getPost, createPost, updatePost, deletePost
├── posts.ts                # Post 타입 정의
├── drivers.ts              # 드라이버 20명 정적 데이터 배열
├── teams.ts                # 팀 10개 정적 데이터 배열
└── races.ts                # 2025 레이스 일정 정적 데이터 배열

supabase/
└── migrations/
    ├── 20260504045416_create_tables.sql   # profiles + posts 테이블 생성
    └── 20260520041529_add_posts_rls.sql   # Ch11: posts RLS 정책 (적용 완료)

proxy.ts                    # /posts/new 보호 라우트 (Next.js 16 proxy)
```

### 컴포넌트별 상세 설명

**Header.tsx** — Server Component
- `bg-[#1a1a1a]` 검정 배경, `text-white`
- 로고 텍스트 + `<Link>` 5개 (홈, Drivers, Teams, Calendar, Reviews)
- `flex justify-between items-center px-6 py-4`

**DriverCard.tsx** — Server Component
- props: `name`, `team`, `number`, `nationality`, `teamColor`
- 카드 상단 `<div className="h-1.5 rounded-t-lg" style={{ backgroundColor: teamColor }}>` — 팀 컬러 라인
- `rounded-lg border border-[#eee] bg-white hover:shadow-md transition`

**TeamCard.tsx** — Server Component
- props: `name`, `color`, `base`, `championships`, `drivers`
- 카드 상단 팀 컬러 라인 (DriverCard와 동일 패턴)
- 팀명, 본사, 챔피언십 횟수, 드라이버 2명 표시

**DriverFilter.tsx** — Client Component (`"use client"`)
- `useState`로 선택된 팀 상태 관리
- "전체" + 팀명 필터 버튼 → 선택 시 드라이버 목록 `.filter()`로 갱신

**RaceTable.tsx** — Client Component (`"use client"`)
- `useState`로 "전체 / 완료 / 예정" 필터 상태 관리
- `races.filter(r => filter === '전체' || r.status === filter)`
- 완료: 초록 배지, 예정: 주황 배지

**ReviewForm.tsx** — Client Component (`"use client"`)
- `useState`: 경기, 드라이버, 별점(1~5), 텍스트, 저장된 목록 상태
- `useEffect`: 마운트 시 `localStorage.getItem('f1-reviews')`로 기존 의견 불러오기
- 저장 버튼 → `localStorage.setItem('f1-reviews', ...)` → 목록 상태 업데이트
- 나중에 Supabase로 교체 예정 (localStorage → DB insert/select)

---

## 데이터 모델

### drivers.ts
```ts
interface Driver {
  id: number
  name: string        // "Max Verstappen"
  team: string        // "Red Bull Racing"
  number: number      // 1
  nationality: string // "NED"
  teamColor: string   // "#3671C6"
}
```

### teams.ts
```ts
interface Team {
  id: number
  name: string
  color: string         // "#3671C6"
  base: string          // "Milton Keynes, UK"
  championships: number
  drivers: string[]     // ["Max Verstappen", "Sergio Perez"]
}
```

### races.ts
```ts
interface Race {
  id: number
  round: number
  name: string          // "Bahrain Grand Prix"
  circuit: string
  country: string
  date: string          // "2025-03-16"
  status: "completed" | "upcoming"
}
```

### localStorage 의견 구조
```ts
interface Review {
  id: string            // Date.now().toString()
  raceId: number
  raceName: string
  driverName: string
  rating: number        // 1~5
  comment: string
  createdAt: string     // ISO string
}
// 저장 키: "f1-reviews"
// Ch8 Supabase 연동 시 이 구조 그대로 테이블로 전환
```

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|----|------|
| 페이지 배경 | `#ffffff` | 전체 배경 |
| 헤더/푸터 | `#1a1a1a` | nav, footer 배경 |
| 헤더 텍스트 | `#ffffff` | 로고, 메뉴 링크 |
| 본문 텍스트 | `#111111` | 카드 제목 |
| 보조 텍스트 | `#666666` | 팀명, 날짜, 설명 |
| 카드 배경 | `#ffffff` | 드라이버/팀 카드 |
| 카드 테두리 | `#eeeeee` | 카드 border |
| 섹션 배경 | `#f5f5f5` | 카드 그리드 섹션 |
| 최대 너비 | `max-w-6xl mx-auto px-4` | 전체 콘텐츠 영역 |

### 팀별 포인트 컬러 (카드 상단 6px 라인)

| 팀 | 컬러 |
|----|------|
| Red Bull Racing | `#3671C6` |
| Ferrari | `#E8002D` |
| McLaren | `#FF8000` |
| Mercedes | `#27F4D2` |
| Aston Martin | `#229971` |
| Alpine | `#FF87BC` |
| Williams | `#64C4FF` |
| RB | `#6692FF` |
| Haas | `#B6BABD` |
| Sauber | `#52E252` |

---

## 배운 내용 연결 포인트 (평가 대비)

| 챕터 | 활용 위치 |
|------|-----------|
| Ch3 시맨틱 태그 | `<header>`, `<main>`, `<article>`, `<section>`, `<footer>` |
| Ch3 Flexbox | Header nav `flex justify-between items-center` |
| Ch3 Grid | 카드 그리드 `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Ch3 반응형 | 모바일 1열 → 태블릿 2열 → 데스크톱 3열 |
| Ch4 `.map()` | 드라이버/팀/레이스 데이터 배열 → 카드/행 렌더링 |
| Ch4 `.filter()` | 드라이버 팀 필터, 캘린더 상태 필터 |
| Ch5 App Router | 5개 페이지 파일 기반 라우팅 |
| Ch5 Link 컴포넌트 | Header nav 메뉴 링크 |
| Ch6 useState | 드라이버 필터, 캘린더 필터, 의견 폼 상태 |
| Ch6 useEffect | localStorage에서 저장된 의견 불러오기 |
| Ch6 Server/Client | 정적 카드는 Server, 상태 있는 컴포넌트만 Client |

---

## Supabase 데이터 모델 (Ch8 이후 실제 적용)

### profiles 테이블
```sql
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text,
  avatar_url text,
  role text not null default 'user',
  created_at timestamptz default now()
);
```

### posts 테이블
```sql
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  created_at timestamptz default now()
);
```

```ts
// lib/posts.ts
type Post = {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
}
```

---

## 보안 계층 (Ch11)

| 위치 | 예시 | 목적 |
|------|------|------|
| React UI | `user.id === post.user_id`일 때 수정/삭제 버튼 표시 | UX (편의) |
| Supabase RLS | `auth.uid() = user_id` 정책 | 보안 (강제) |

- 클라이언트 분기는 보안이 아님 — 버튼을 숨겨도 직접 요청으로 우회 가능
- RLS는 PostgreSQL이 직접 검사하므로 우회 불가
- service_role 키는 클라이언트 코드 어디에도 사용 금지

### posts 테이블 RLS 정책 (Ch11 적용 완료 — 2026-05-20)

| 작업 | 권한 | 조건 |
|------|------|------|
| SELECT | 누구나 | `true` |
| INSERT | 로그인 사용자만 | `WITH CHECK (auth.uid() = user_id)` |
| UPDATE | 작성자만 | `USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)` |
| DELETE | 작성자만 | `USING (auth.uid() = user_id)` |

---

## 인증 흐름 (Ch9)

```
사용자 → /login 또는 /signup
→ Supabase Auth (이메일/비밀번호)
→ @supabase/ssr 쿠키 세션 저장
→ contexts/AuthContext.tsx로 전역 공유
→ proxy.ts: /posts/new 미인증 접근 시 /login 리다이렉트
```

- Next.js 16에서 middleware.ts deprecated → proxy.ts + `export function proxy()` 사용
- 세션 쿠키: `@supabase/ssr` — SSR 환경에서 안전하게 관리
- 클라이언트에는 anon 키만 (NEXT_PUBLIC_SUPABASE_ANON_KEY)

---

## 패키지 버전

| 패키지 | 교재 기준 | 현재 설치 |
|--------|-----------|-----------|
| `next` | 16.2.1 | 16.2.1 |
| `react` | 19.2.4 | 19.2.4 |
| `@supabase/supabase-js` | 2.47.12 | ^2.105.1 |
| `@supabase/ssr` | 0.5.2 | ^0.10.2 |
| `tailwindcss` | 4 | ^4 |
