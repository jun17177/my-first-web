-- ============================================================
-- posts RLS
-- 실행 전: 기존 정책이 있으면 아래 DROP 라인을 먼저 실행할 것
-- 중복 생성 시 "policy already exists" 에러 발생
-- ============================================================

-- 기존 정책 제거 (재실행 시 필요)
drop policy if exists "posts_select_public"        on posts;
drop policy if exists "posts_insert_authenticated" on posts;
drop policy if exists "posts_update_own"           on posts;
drop policy if exists "posts_delete_own"           on posts;

-- RLS 활성화
alter table posts enable row level security;

-- SELECT: 누구나 읽기 가능
create policy "posts_select_public"
  on posts for select
  using (true);

-- INSERT: 로그인 사용자만, user_id는 반드시 본인 uid
create policy "posts_insert_authenticated"
  on posts for insert
  with check (auth.uid() = user_id);

-- UPDATE: 본인 글만, 수정 후에도 user_id는 본인 uid 유지
create policy "posts_update_own"
  on posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: 본인 글만
create policy "posts_delete_own"
  on posts for delete
  using (auth.uid() = user_id);
