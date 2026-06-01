-- reviews 테이블
create table reviews (
  id uuid default gen_random_uuid() primary key,
  race_id integer not null,
  race_name text not null,
  driver_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create policy "누구나 리뷰 조회" on reviews
  for select using (true);

create policy "로그인 사용자 리뷰 작성" on reviews
  for insert with check (auth.uid() = user_id);

create policy "본인 리뷰 삭제" on reviews
  for delete using (auth.uid() = user_id);

-- review_likes 테이블
create table review_likes (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (review_id, user_id)
);

alter table review_likes enable row level security;

create policy "누구나 좋아요 조회" on review_likes
  for select using (true);

create policy "로그인 사용자 좋아요 추가" on review_likes
  for insert with check (auth.uid() = user_id);

create policy "본인 좋아요 취소" on review_likes
  for delete using (auth.uid() = user_id);

-- review_replies 테이블
create table review_replies (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

alter table review_replies enable row level security;

create policy "누구나 대댓글 조회" on review_replies
  for select using (true);

create policy "로그인 사용자 대댓글 작성" on review_replies
  for insert with check (auth.uid() = user_id);

create policy "본인 대댓글 삭제" on review_replies
  for delete using (auth.uid() = user_id);
