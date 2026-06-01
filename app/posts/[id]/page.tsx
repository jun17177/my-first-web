"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getPost, deletePost } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    getPost(id).then(({ data }) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await deletePost(id);
    if (error) {
      setDeleteError("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    router.push("/posts");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-6 h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mb-4 h-9 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) return notFound();

  // isOwner는 UI 표시 분기용입니다. 실제 데이터 접근 보안은 Ch11 RLS에서 처리합니다.
  const isOwner = user?.id === post.user_id;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString("ko-KR")}
          </span>
          {isOwner && (
            <div className="flex items-center gap-2">
              <Link
                href={`/posts/${post.id}/edit`}
                className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                className="rounded-full border border-red-300 px-4 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>

        {post.image_url && (
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
            <img src={post.image_url} alt="게시글 이미지" className="w-full object-cover max-h-96" />
          </div>
        )}

        <div className="mt-8 space-y-4 text-base leading-7 text-gray-700">
          <p>{post.content}</p>
        </div>

        {deleteError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{deleteError}</p>
        )}

        <div className="mt-8 flex items-center gap-4">
          <LikeButton postId={post.id} />
        </div>

        <Comments postId={post.id} />

        <div className="mt-10 border-t border-gray-200 pt-6">
          <Link
            href="/posts"
            className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
