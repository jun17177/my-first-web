-- 관리자(chj010917@gmail.com)는 모든 게시글/댓글/리뷰/대댓글 삭제 가능
create policy "관리자 게시글 삭제" on posts
  for delete using (auth.email() = 'chj010917@gmail.com');

create policy "관리자 댓글 삭제" on comments
  for delete using (auth.email() = 'chj010917@gmail.com');

create policy "관리자 리뷰 삭제" on reviews
  for delete using (auth.email() = 'chj010917@gmail.com');

create policy "관리자 대댓글 삭제" on review_replies
  for delete using (auth.email() = 'chj010917@gmail.com');
