"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/lib/posts";
import { getPosts } from "@/lib/supabase/posts";
import PostsList from "./PostsList";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(({ data }) => {
      if (data) setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">게시글 목록</h1>
      {loading ? (
        <p className="text-gray-500 text-sm">불러오는 중...</p>
      ) : (
        <PostsList initialPosts={posts} />
      )}
    </div>
  );
}
