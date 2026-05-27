"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { deletePost } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "./SearchBar";

type Props = {
  initialPosts: Post[];
};

export default function PostsList({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const { user } = useAuth();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  async function handleDelete(id: string) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setDeleteError("");
    const { error } = await deletePost(id);
    if (error) {
      setDeleteError("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <div>
      {deleteError && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{deleteError}</p>
      )}
      <div className="mb-6">
        <SearchBar query={query} onSearch={setQuery} />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:shadow-md transition flex items-start justify-between gap-4"
            >
              <Link href={`/posts/${post.id}`} className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.content}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </p>
              </Link>
              {user?.id === post.user_id && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 transition"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
