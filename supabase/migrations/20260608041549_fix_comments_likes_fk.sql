-- comments.user_id FK: profiles(id) → auth.users(id)
alter table comments drop constraint comments_user_id_fkey;
alter table comments add constraint comments_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;

-- comments에 username 컬럼 추가 (profiles 조인 없이 작성자 이름 직접 저장)
alter table comments add column if not exists username text;

-- likes.user_id FK: profiles(id) → auth.users(id)
alter table likes drop constraint likes_user_id_fkey;
alter table likes add constraint likes_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
