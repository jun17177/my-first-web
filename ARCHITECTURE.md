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
├── layout.tsx              # 공통 레이아웃 — Header + main + Footer
├── page.tsx                # 홈 — Server Component
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
├── Footer.tsx              # 검정 배경 푸터 — Server Component
├── DriverCard.tsx          # 드라이버 카드 (팀 컬러 라인 prop) — Server Component
├── TeamCard.tsx            # 팀 카드 (팀 컬러 라인 prop) — Server Component
├── DriverFilter.tsx        # 팀별 필터 버튼 그룹 — Client Component (useState)
├── RaceTable.tsx           # 레이스 테이블 + 필터 — Client Component (useState)
└── ReviewForm.tsx          # 의견 작성 폼 + 목록 — Client Component (useState + useEffect)

lib/
├── drivers.ts              # 드라이버 20명 정적 데이터 배열
├── teams.ts                # 팀 10개 정적 데이터 배열
└── races.ts                # 2025 레이스 일정 정적 데이터 배열
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

## Supabase 업그레이드 계획 (Ch8 이후)

```
현재: localStorage.setItem / getItem  (ReviewForm.tsx)
↓ Ch8 이후
Supabase: reviews 테이블 insert / select
```

Review interface 구조를 미리 Supabase 테이블 구조와 동일하게 설계해두었으므로
ReviewForm.tsx의 저장/불러오기 로직만 교체하면 된다.
