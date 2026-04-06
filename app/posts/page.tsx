import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">게시글 목록</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.content}</p>
              <p className="text-gray-400 text-xs">
                {post.author} · {post.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
