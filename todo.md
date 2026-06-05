# TODO — f1-fan-page

## 1단계: 프로젝트 세팅 (Ch7)

- [x] ARCHITECTURE.md 작성
- [x] CLAUDE.md 작성
- [x] context.md 작성
- [x] todo.md 작성
- [x] npx create-next-app@latest 프로젝트 생성
- [x] 설계 문서 4종 프로젝트 루트에 복사
- [x] GitHub 저장소 생성 + 연결
- [x] Vercel 연동

## 2단계: 데이터 + 공통 컴포넌트 (Ch7~8)

- [x] lib/drivers.ts — Driver interface + 드라이버 20명 배열
- [x] lib/teams.ts — Team interface + 팀 10개 배열 (역사·창단연도 포함)
- [x] lib/races.ts — Race interface + 2026 레이스 일정 배열
- [x] app/globals.css — @import "tailwindcss" 설정
- [x] app/layout.tsx — F1 다크 헤더/푸터 + AuthProvider 공통 레이아웃
- [x] components/HeaderNav.tsx — 다크 배경 nav + F1 링크 5개 + 인증 UI

## 3단계: 카드 + 인터랙티브 컴포넌트 (Ch3~6 활용)

- [x] components/DriverCard.tsx — 드라이버 카드 (팀 컬러 상단 라인)
- [x] components/TeamCard.tsx — 팀 카드 (팀 컬러 라인, 클릭 시 상세 이동)
- [x] components/DriverFilter.tsx — 팀별 필터 버튼 (useState)
- [x] components/RaceTable.tsx — 레이스 테이블 + 완료/예정 필터 (useState)
- [x] components/ReviewForm.tsx — 레이스 선택 → 의견 폼 (Supabase, 좋아요·대댓글·익명 선택)

## 4단계: 페이지 구현 (Ch5~6 활용)

- [x] app/page.tsx — 홈 (히어로 배너 + 시즌 통계 + 드라이버 하이라이트 + 다음 레이스)
- [x] app/drivers/page.tsx — 드라이버 목록 + 팀 필터
- [x] app/teams/page.tsx — 팀 목록
- [x] app/teams/[id]/page.tsx — 팀 상세 (역사·드라이버 소개)
- [x] app/calendar/page.tsx — 레이스 캘린더
- [x] app/reviews/page.tsx — 경기 의견 (Supabase 기반 공유)
- [x] app/profile/page.tsx — 프로필 (닉네임 수정, 내 게시글)

## 5단계: 마무리 + 배포

- [x] 반응형 확인 (모바일 1열 → 태블릿 2열 → 데스크톱 3열)
- [x] git push → Vercel 배포 확인
- [x] 배포 URL 정상 작동 확인

## 진행률: 완료 ✅

## Ch9: Supabase Auth

- [x] lib/auth.ts — signInWithEmail, signUpWithEmail, signOut
- [x] app/login/page.tsx
- [x] app/signup/page.tsx
- [x] contexts/AuthContext.tsx — AuthProvider + useAuth
- [x] components/HeaderNav.tsx — 헤더 로그인/로그아웃 UI
- [x] app/layout.tsx — AuthProvider 연결
- [x] middleware.ts — /posts/new, /posts/:id/edit 보호 라우트
- [x] npm run build 통과
- [x] 브라우저 시나리오 검증
- [x] Vercel 배포 확인

## Ch10: posts CRUD (Supabase 연동)

- [x] supabase/migrations/20260504045416_create_tables.sql — profiles + posts 테이블
- [x] lib/supabase/client.ts — Supabase 클라이언트
- [x] lib/supabase/posts.ts — getPosts, getPost, createPost, updatePost, deletePost, uploadPostImage
- [x] app/posts/page.tsx — 게시글 목록 (새 글 쓰기 버튼 포함)
- [x] app/posts/new/page.tsx — 게시글 작성
- [x] app/posts/[id]/page.tsx — 게시글 상세 (이미지·좋아요·댓글)
- [x] app/posts/[id]/edit/page.tsx — 게시글 수정
- [x] app/posts/PostsList.tsx — 목록 컴포넌트 (검색·작성자 UI 분기)

## Ch11: RLS (Row Level Security)

- [x] supabase/migrations/20260520041529_add_posts_rls.sql — RLS SQL 작성
- [x] npx supabase db push — 원격 적용
- [x] 비로그인 사용자 게시글 조회 테스트 (성공)
- [x] 비로그인 /posts/new 접근 → 로그인 페이지 이동 (성공)
- [x] 사용자 A 글 작성/수정 테스트 (성공)
- [x] 사용자 B가 A 글 수정/삭제 버튼 없음 확인 (성공)
- [x] service_role 키 노출 없음 확인
- [x] npm run build 통과
- [x] Vercel 배포 확인

## Ch12: 에러 처리 + 로딩 UX

- [x] app/error.tsx — 앱 전체 에러 안전망 ("use client", reset())
- [x] app/loading.tsx — 앱 전체 로딩 스피너
- [x] app/posts/loading.tsx — 게시글 목록 스켈레톤
- [x] app/posts/[id]/loading.tsx — 게시글 상세 스켈레톤
- [x] app/posts/page.tsx — 빈 상태 처리
- [x] components/PostForm.tsx — 유효성 검증 (제목 2자↑, 내용 10자↑) + 이미지 업로드
- [x] lib/error-message.ts — 에러 메시지 변환 유틸
- [x] app/login/page.tsx — getErrorMessage 적용
- [x] app/signup/page.tsx — getErrorMessage 적용
- [x] npm run build 통과

## Ch13: E2E 테스트 + 코드리뷰 + 배포 검증

- [x] Playwright 설치
- [x] playwright.config.ts 설정 (baseURL, webServer, dotenv)
- [x] tests/auth-crud.spec.ts — 행복 경로 + 거절 경로 테스트
- [x] npx playwright test 통과 (2 passed)
- [x] supabase/migrations/20260527045202_add_profile_trigger.sql — profiles 자동 생성 트리거
- [x] Vercel 배포 URL 수동 검증 통과
- [x] 검증 보고서 작성 (docs/report-ch13.md)

## Ch14: 보너스 기능 + F1 팬 페이지 완성

- [x] supabase/migrations/20260601042715_add_bonus_features.sql — comments, likes, profiles RLS, Storage
- [x] app/posts/[id]/Comments.tsx — 게시글 댓글 (G1)
- [x] app/posts/[id]/LikeButton.tsx — 게시글 좋아요 (G2)
- [x] app/profile/page.tsx — 프로필 페이지 (G3)
- [x] PostForm 이미지 업로드 + Supabase Storage (G4)
- [x] SearchBar.tsx — 게시글 검색 (G5)
- [x] 반응형 레이아웃 — Tailwind grid 반응형 (G7)
- [x] lib/drivers.ts, lib/teams.ts, lib/races.ts — F1 정적 데이터
- [x] DriverCard, TeamCard, DriverFilter, RaceTable 컴포넌트
- [x] app/teams/[id]/page.tsx — 팀 상세 + 역사 페이지
- [x] ReviewForm — Supabase 전환 (좋아요·대댓글·익명 선택 포함)
- [x] supabase/migrations/20260601050326_add_reviews_tables.sql — reviews RLS
- [x] middleware.ts — proxy.ts에서 이름 변경 (평가기준 A7 대응)
- [x] npm run build 통과
- [x] Vercel 배포 확인
