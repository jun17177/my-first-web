"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, updatePost } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "@/components/PostForm";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    getPost(id).then(({ data }) => {
      if (!data || data.user_id !== user?.id) {
        router.push("/posts");
        return;
      }
      setInitialTitle(data.title);
      setInitialContent(data.content);
      setInitialImageUrl(data.image_url ?? null);
      setLoading(false);
    });
  }, [id, user, authLoading]);

  async function handleSubmit(title: string, content: string, imageUrl?: string | null) {
    setError("");
    setSaving(true);

    const { error: updateError } = await updatePost(id, title, content, imageUrl);
    if (updateError) {
      console.error(updateError);
      setError("잠시 후 다시 시도해주세요.");
      setSaving(false);
      return;
    }

    router.push(`/posts/${id}`);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-gray-500 text-sm">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">게시글 수정</h1>
      <PostForm
        initialTitle={initialTitle}
        initialContent={initialContent}
        initialImageUrl={initialImageUrl}
        onSubmit={handleSubmit}
        loading={saving}
        error={error}
        submitLabel="수정 완료"
        onCancel={() => router.push(`/posts/${id}`)}
      />
    </div>
  );
}
