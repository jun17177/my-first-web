# Context — my-f1-page 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-04-29
- 완료된 작업: 설계 문서 작성 (ARCHITECTURE.md, CLAUDE.md, todo.md, context.md)
- 진행 중: 없음 (구현 시작 전)
- 미착수: 전체 구현 (todo.md 1단계부터)

## 기술 결정 사항

- 프레임워크: Next.js App Router + TypeScript
- 스타일링: Tailwind CSS 4
- 데이터: 정적 TypeScript 배열 (lib/ 폴더) — DB 없음
- 의견 저장: localStorage → 나중에 Supabase로 교체 예정
- 배포: Vercel (GitHub 연동 자동 배포)
- 테마: 라이트, 검정 헤더/푸터, 팀별 포인트 컬러 카드

## 해결된 이슈

- 없음 (구현 시작 전)

## 알게 된 점

- Tailwind CSS 4는 tailwind.config.js 불필요 → globals.css에 `@import "tailwindcss"` 한 줄
- 팀 고유 컬러(hex)는 Tailwind 클래스로 표현 불가 → `style={{ backgroundColor: color }}` 사용
- localStorage 접근은 반드시 useEffect 안에서 (SSR 환경 때문)
- Review interface를 미리 Supabase 테이블 구조와 맞춰 설계 → Ch8 이후 로직만 교체하면 됨