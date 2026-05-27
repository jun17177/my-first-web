# Ch13 최종 검증 보고서

작성일: 2026-05-27

---

## 1. 테스트 환경

| 항목 | 내용 |
|------|------|
| 로컬 환경 | macOS, Next.js 16.2.1 dev server (localhost:3000) |
| 배포 환경 | Vercel Production |
| 배포 URL | https://my-first-9vyoi90h4-chj0917-7801s-projects.vercel.app |
| Supabase | chj0917-7801s-projects (PostgreSQL + Auth) |

---

## 2. Playwright E2E 테스트 결과

파일: `tests/auth-crud.spec.ts`

| 테스트 | 결과 |
|--------|------|
| 행복 경로: 로그인 → 글 작성 → 목록 확인 | ✅ PASSED |
| 거절 경로: 비로그인 `/posts/new` → `/login` 리다이렉트 | ✅ PASSED |

```
Running 2 tests using 1 worker
2 passed (8.4s)
```

---

## 3. Vercel 배포 URL 수동 검증 결과

| 시나리오 | 기대 결과 | 실제 결과 |
|----------|-----------|-----------|
| `/posts` 접속 | 게시글 목록 정상 로드 | ✅ 통과 |
| 로그인 | 성공 후 `/posts` 이동 | ✅ 통과 |
| 글 작성 | 저장 후 목록에 표시 | ✅ 통과 |
| 로그아웃 | 성공 | ✅ 통과 |
| 비로그인 `/posts/new` 직접 접속 | `/login` 리다이렉트 | ✅ 통과 |
| 다른 사용자 글 — 수정/삭제 버튼 없음 | 버튼 미표시 | ✅ 통과 |

---

## 4. 코드리뷰 수정 내역 (Ch13 Step ②)

| 항목 | 심각도 | 조치 |
|------|--------|------|
| `proxy.ts` matcher에 `/posts/:id/edit` 누락 | 높음 | ✅ 수정 완료 |
| `PostsList.tsx` 삭제 실패 시 피드백 없음 | 중간 | ✅ 수정 완료 |
| `profiles` 자동 생성 트리거 없음 | 중간 | ✅ 마이그레이션 추가 (`20260527045202_add_profile_trigger.sql`) |
| `lib/error-message.ts` dead code | 낮음 | ✅ 제거 완료 |

---

## 5. 확인 필요한 항목

| 항목 | 이유 |
|------|------|
| `AuthContext` 초기 로딩 중 오너 버튼 깜빡임 | 재현 빈도 낮고 보안 문제 없음 — 향후 개선 여지 |
| Playwright 테스트가 작성한 글 정리 | 테스트 실행마다 DB에 글이 누적됨 (teardown 미구현) |

---

## 6. 보안 최종 점검

| 항목 | 상태 |
|------|------|
| `service_role` 키 클라이언트 노출 | ✅ 없음 |
| RLS 전 작업(SELECT/INSERT/UPDATE/DELETE) 적용 | ✅ 완료 |
| `next/router` 사용 | ✅ 없음 |
| `dangerouslySetInnerHTML` 사용 | ✅ 없음 |
| 보호 라우트 (`/posts/new`, `/posts/:id/edit`) | ✅ proxy.ts 적용 |
