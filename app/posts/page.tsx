"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getPosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import PostsList from "./PostsList";

export default function PostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(({ data }) => {
      if (data) setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">게시글 목록</h1>
        <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-gray-100" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
        {user && (
          <Link
            href="/posts/new"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            새 글 쓰기
          </Link>
        )}
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500 text-sm">아직 게시글이 없습니다.</p>
      ) : (
        <PostsList initialPosts={posts} />
      )}
    </div>
  );
}
