export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 블로그 포스트",
    content: "블로그를 시작하며 느낀 점들을 적어봤습니다. 앞으로 다양한 주제로 글을 써볼 예정입니다.",
    author: "작성자",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "Next.js로 블로그 만들기",
    content: "Next.js App Router를 사용해 블로그를 직접 만들어보는 과정을 공유합니다.",
    author: "작성자",
    date: "2026-04-03",
  },
  {
    id: 3,
    title: "Tailwind CSS 기초",
    content: "Tailwind CSS를 처음 접하고 배운 것들을 정리했습니다. 유틸리티 클래스 방식이 매우 편리합니다.",
    author: "작성자",
    date: "2026-04-05",
  },
];
