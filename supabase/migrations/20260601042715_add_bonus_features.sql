-- posts 테이블에 이미지 URL 컬럼 추가
alter table posts add column image_url text;

-- comments 테이블
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

alter table comments enable row level security;

create policy "누구나 댓글 조회 가능" on comments
  for select using (true);

create policy "로그인 사용자 댓글 작성" on comments
  for insert with check (auth.uid() = user_id);

create policy "본인 댓글 삭제" on comments
  for delete using (auth.uid() = user_id);

-- likes 테이블
create table likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (post_id, user_id)
);

alter table likes enable row level security;

create policy "누구나 좋아요 조회 가능" on likes
  for select using (true);

create policy "로그인 사용자 좋아요 추가" on likes
  for insert with check (auth.uid() = user_id);

create policy "본인 좋아요 취소" on likes
  for delete using (auth.uid() = user_id);

-- profiles RLS
alter table profiles enable row level security;

create policy "누구나 프로필 조회 가능" on profiles
  for select using (true);

create policy "본인 프로필 수정" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Supabase Storage: post-images 버킷 생성
insert into storage.buckets (id, name, public)
  values ('post-images', 'post-images', true)
  on conflict (id) do nothing;

create policy "누구나 이미지 조회" on storage.objects
  for select using (bucket_id = 'post-images');

create policy "로그인 사용자 이미지 업로드" on storage.objects
  for insert with check (
    bucket_id = 'post-images' and auth.uid() is not null
  );

create policy "본인 이미지 삭제" on storage.objects
  for delete using (
    bucket_id = 'post-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
