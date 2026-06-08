-- profiles INSERT 정책 추가 (본인 row만 생성 가능)
create policy "본인 프로필 생성" on profiles
  for insert with check (auth.uid() = id);
