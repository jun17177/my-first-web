# TODO — f1-fan-page

## 1단계: 프로젝트 세팅 (Ch7)

- [x] ARCHITECTURE.md 작성
- [x] CLAUDE.md 작성
- [x] context.md 작성
- [x] todo.md 작성
- [ ] npx create-next-app@latest 프로젝트 생성
- [ ] 설계 문서 4종 프로젝트 루트에 복사
- [ ] GitHub 저장소 생성 + 연결
- [ ] Vercel 연동

## 2단계: 데이터 + 공통 컴포넌트 (Ch7~8)

- [ ] lib/drivers.ts — Driver interface + 드라이버 20명 배열
- [ ] lib/teams.ts — Team interface + 팀 10개 배열
- [ ] lib/races.ts — Race interface + 2025 레이스 일정 배열
- [ ] app/globals.css — @import "tailwindcss" 설정
- [ ] app/layout.tsx — Header + main + Footer 공통 레이아웃
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

## 진행률: 4/29 (14%)