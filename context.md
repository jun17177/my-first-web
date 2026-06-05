# Context — my-f1-page 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-06-05
- 완료된 작업: Ch9~Ch13 전체 + Ch14 보너스 (댓글·좋아요·프로필·이미지업로드·검색·F1 팬페이지 전체)
- 진행 중: 없음
- 미착수: 없음

## 기술 결정 사항

- 프레임워크: Next.js App Router + TypeScript
- 스타일링: Tailwind CSS 4
- 정적 데이터: lib/ 폴더 (drivers, teams, races)
- 동적 데이터: Supabase PostgreSQL (posts 테이블, lib/supabase/ 경로)
- 인증: Supabase Auth (@supabase/ssr 쿠키 세션)
- 보안: posts 테이블 RLS 적용 완료
- 배포: Vercel (GitHub 연동 자동 배포)
- 테마: 라이트, 검정 헤더/푸터, 팀별 포인트 컬러 카드

## 해결된 이슈

- Next.js 16에서 middleware.ts deprecated → proxy.ts로 대체
- Supabase 클라이언트 SSR 환경 → @supabase/ssr + createBrowserClient 사용
- 브라우저 확장(비밀번호 관리자) hydration 경고 → body에 suppressHydrationWarning 추가

## 알게 된 점

- Tailwind CSS 4는 tailwind.config.js 불필요 → globals.css에 `@import "tailwindcss"` 한 줄
- 팀 고유 컬러(hex)는 Tailwind 클래스로 표현 불가 → `style={{ backgroundColor: color }}` 사용
- localStorage 접근은 반드시 useEffect 안에서 (SSR 환경 때문)
- Review interface를 미리 Supabase 테이블 구조와 맞춰 설계 → Ch8 이후 로직만 교체하면 됨

## Ch9 추가 사항 (2026-05-13)

- 인증: Supabase Auth 이메일/비밀번호 (소셜 로그인 없음)
- 세션: @supabase/ssr 쿠키 기반
- 보호 라우트: /posts/new → proxy.ts (Next.js 16 middleware → proxy 마이그레이션)
- Next.js 16에서 middleware.ts deprecated → proxy.ts + export function proxy() 사용
- Supabase 무료 플랜 7일 미사용 시 자동 일시 정지
- .env.local anon key 앞뒤 공백 주의
- 브라우저 확장(비밀번호 관리자) → body에 suppressHydrationWarning으로 경고 제거

## Ch10 추가 사항 (2026-05-20)

- posts CRUD 완료: 목록 조회, 상세 조회, 작성, 수정, 삭제
- lib/supabase/posts.ts — getPosts, getPost, createPost, updatePost, deletePost
- 작성자 UI 분기: user.id === post.user_id일 때만 수정/삭제 버튼 표시 (UX 전용, 보안 아님)
- 기존 마이그레이션: supabase/migrations/20260504045416_create_tables.sql (profiles + posts 테이블)

## Ch11 추가 사항 (2026-05-20 완료)

- posts 테이블 RLS 활성화 완료
- 적용 정책: SELECT 누구나, INSERT 로그인 본인, UPDATE 작성자, DELETE 작성자
- 마이그레이션 파일: supabase/migrations/20260520041529_add_posts_rls.sql
- 브라우저 우회 테스트 6개 시나리오 전부 통과
- npm run build 통과, Vercel 배포 완료
- service_role 키 노출 없음 (grep 확인)

## Ch12 추가 사항 (2026-05-27 완료)

- app/error.tsx — 앱 전체 에러 안전망 (reset() 버튼 포함)
- app/loading.tsx — 앱 전체 로딩 스피너
- app/posts/loading.tsx — 게시글 목록 스켈레톤 (animate-pulse 카드 3개)
- app/posts/[id]/loading.tsx — 게시글 상세 스켈레톤
- app/posts/page.tsx — 빈 상태 "아직 게시글이 없습니다." 처리
- app/posts/[id]/page.tsx — 로딩 스켈레톤 추가
- components/PostForm.tsx — 클라이언트 유효성 검증 (제목 2자↑, 내용 10자↑), 필드별 에러 표시
- lib/error-message.ts — Supabase/네트워크 에러 → 사용자 친화 메시지 변환 유틸
- app/login/page.tsx, app/signup/page.tsx — getErrorMessage 적용, 서버 에러 원문 console.error로 격리
- npm run build 통과, 브라우저 검증 완료

## Ch13 추가 사항 (2026-05-27 완료)

- Playwright E2E 테스트 2개 작성 (tests/auth-crud.spec.ts) — 행복/거절 경로 모두 통과
- playwright.config.ts: baseURL, webServer, dotenv(.env.local) 설정
- 코드리뷰 수정: proxy.ts matcher 보완, PostsList 삭제 오류 피드백, error-message.ts dead code 제거
- supabase/migrations/20260527045202_add_profile_trigger.sql — 신규 가입 시 profiles 자동 생성 트리거
- Vercel 배포 URL 수동 검증 6개 시나리오 전부 통과
- 검증 보고서: docs/report-ch13.md