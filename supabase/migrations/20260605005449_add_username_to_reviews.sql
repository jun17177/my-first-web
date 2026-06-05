-- reviews, review_replies에 username 컬럼 추가
-- profiles 조인 없이 작성자 이름을 직접 저장
alter table reviews add column username text;
alter table review_replies add column username text;
