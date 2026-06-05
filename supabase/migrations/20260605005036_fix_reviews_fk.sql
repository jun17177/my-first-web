-- reviews, review_likes, review_replies의 user_id FK를
-- profiles(id) → auth.users(id) 로 변경
-- 프로필 행이 없는 사용자도 리뷰/좋아요/대댓글 작성 가능하도록 수정

alter table reviews
  drop constraint reviews_user_id_fkey,
  add constraint reviews_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade;

alter table review_likes
  drop constraint review_likes_user_id_fkey,
  add constraint review_likes_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade;

alter table review_replies
  drop constraint review_replies_user_id_fkey,
  add constraint review_replies_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade;
