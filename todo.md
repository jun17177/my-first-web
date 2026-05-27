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

- [ ] lib/drivers.ts — Driver interface + 드라이버 20명 배열
- [ ] lib/teams.ts — Team interface + 팀 10개 배열
- [ ] lib/races.ts — Race interface + 2025 레이스 일정 배열
- [x] app/globals.css — @import "tailwindcss" 설정
- [x] app/layout.tsx — Header + main + Footer 공통 레이아웃
- [ ] components/Header.tsx — 검정 배경 nav + Link 5개
- [ ] components/Footer.tsx — 검정 배경 푸터

## 3단계: 카드 + 인터랙티브 컴포넌트 (Ch3~6 활용)

- [ ] components/DriverCard.tsx — 드라이버 카드 (팀 컬러 상단 라인)
- [ ] components/TeamCard.tsx — 팀 카드 (팀 컬러 상단 라인)
- [ ] components/DriverFilter.tsx — 팀별 필터 버튼 (useState)
- [ ] components/RaceTable.tsx — 레이스 테이블 + 필터 (useState)
- [ ] components/ReviewForm.tsx — 의견 폼 + 목록 (useState + useEffect + localStorage)

## 4단계: 페이지 구현 (Ch5~6 활용)

- [ ] app/page.tsx — 홈 (히어로 배너 + 드라이버 하이라이트)
- [ ] app/drivers/page.tsx — 드라이버 목록 + 팀 필터
- [ ] app/teams/page.tsx — 팀 목록
- [ ] app/calendar/page.tsx — 레이스 캘린더
- [ ] app/reviews/page.tsx — 경기 의견

## 5단계: 마무리 + 배포 (Ch1~2 활용)

- [ ] 반응형 확인 (모바일 1열 → 태블릿 2열 → 데스크톱 3열)
- [ ] DevTools 디바이스 모드 점검
- [ ] 콘솔 에러 없는지 확인
- [ ] 시맨틱 태그 사용 확인
- [ ] git push → Vercel 배포 확인
- [ ] 배포 URL 제출

## 진행률 (1~5단계 기준): 10/29 (34%) — Ch9~11 별도 완료

## Ch9: Supabase Auth

- [x] lib/auth.ts — signInWithEmail, signUpWithEmail, signOut
- [x] app/login/page.tsx
- [x] app/signup/page.tsx
- [x] contexts/AuthContext.tsx — AuthProvider + useAuth
- [x] components/HeaderNav.tsx — 헤더 로그인/로그아웃 UI
- [x] app/layout.tsx — AuthProvider 연결
- [x] proxy.ts — /posts/new 보호 라우트
- [x] npm run build 통과
- [x] 브라우저 시나리오 ②~⑥ 검증
- [x] Vercel 배포 확인

## Ch10: posts CRUD (Supabase 연동)

- [x] supabase/migrations/20260504045416_create_tables.sql — profiles + posts 테이블
- [x] lib/supabase/client.ts — Supabase 클라이언트
- [x] lib/supabase/posts.ts — getPosts, getPost, createPost, updatePost, deletePost
- [x] app/posts/page.tsx — 게시글 목록
- [x] app/posts/new/page.tsx — 게시글 작성
- [x] app/posts/[id]/page.tsx — 게시글 상세
- [x] app/posts/[id]/edit/page.tsx — 게시글 수정
- [x] app/posts/PostsList.tsx — 목록 컴포넌트 (작성자 UI 분기 포함)

## Ch11: RLS (Row Level Security)

- [x] npx supabase migration new add_posts_rls
- [x] supabase/migrations/20260520041529_add_posts_rls.sql — RLS SQL 작성
- [x] npx supabase db push — 원격 적용
- [x] 비로그인 사용자 게시글 조회 테스트 (성공)
- [x] 비로그인 /posts/new 접근 → 로그인 페이지 이동 (성공)
- [x] 사용자 A 글 작성 테스트 (성공)
- [x] 사용자 A 본인 글 수정 테스트 (성공)
- [x] 사용자 B가 A 글 수정/삭제 버튼 없음 확인 (성공)
- [x] 민감 키(service_role 등) 노출 grep 확인 (없음)
- [x] npm run build 통과
- [x] Vercel 배포 확인

## Ch12: 에러 처리 + 로딩 UX

- [x] app/error.tsx — 앱 전체 에러 안전망
- [x] app/loading.tsx — 앱 전체 로딩 스피너
- [x] app/posts/loading.tsx — 게시글 목록 스켈레톤
- [x] app/posts/[id]/loading.tsx — 게시글 상세 스켈레톤
- [x] app/posts/page.tsx — 빈 상태 처리
- [x] app/posts/[id]/page.tsx — 로딩 스켈레톤 추가
- [x] components/PostForm.tsx — 클라이언트 유효성 검증 (제목 2자↑, 내용 10자↑)
- [x] lib/error-message.ts — 에러 메시지 변환 유틸
- [x] app/login/page.tsx — getErrorMessage 적용
- [x] app/signup/page.tsx — getErrorMessage 적용
- [x] npm run build 통과
- [x] 브라우저 시나리오 검증 완료

## Ch13: E2E 테스트 + 코드리뷰 + 배포 검증

- [x] Playwright 설치 (npm init playwright@latest)
- [x] playwright.config.ts 설정 (baseURL, webServer, dotenv)
- [x] tests/auth-crud.spec.ts — 행복 경로 + 거절 경로 테스트
- [x] npx playwright test 통과 (2 passed)
- [x] 코드리뷰 수정: proxy.ts matcher, PostsList 삭제 오류 피드백, error-message.ts dead code
- [x] supabase/migrations/20260527045202_add_profile_trigger.sql — profiles 자동 생성 트리거
- [x] Vercel 환경변수 확인 (NEXT_PUBLIC_SUPABASE_URL, ANON_KEY — Production 포함 전 환경)
- [x] Vercel 배포 URL 수동 검증 6개 시나리오 통과
- [x] 검증 보고서 작성 (docs/report-ch13.md)