"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(title: string, content: string) {
    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }
    setError("");
    setLoading(true);

    const { error: postError } = await createPost(title, content, user.id);
    if (postError) {
      setError(postError.message);
      setLoading(false);
      return;
    }

    router.push("/posts");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">새 게시글 작성</h1>
      <PostForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="저장하기"
      />
    </div>
  );
}
