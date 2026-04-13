import { Post } from "@/lib/posts";
import PostsList from "./PostsList";

type JSONPlaceholderPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const data: JSONPlaceholderPost[] = await res.json();

  const posts: Post[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.body,
    author: `User ${item.userId}`,
    date: "—",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">게시글 목록</h1>
      <PostsList initialPosts={posts} />
    </div>
  );
}
