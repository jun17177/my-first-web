"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/supabase/comments";

export default function Comments({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getComments(postId).then(({ data }) => {
      if (data) setComments(data as Comment[]);
    });
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) return;
    setSubmitting(true);
    setError("");
    const { error } = await createComment(postId, user.id, content.trim());
    if (error) {
      setError("댓글 작성에 실패했습니다.");
      setSubmitting(false);
      return;
    }
    const { data } = await getComments(postId);
    if (data) setComments(data as Comment[]);
    setContent("");
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        댓글 {comments.length > 0 && <span className="text-gray-400">({comments.length})</span>}
      </h2>

      <div className="space-y-4 mb-8">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {c.profiles?.username ?? "익명"}
                  <span className="ml-2 font-normal text-gray-400">
                    {new Date(c.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </p>
                <p className="text-sm text-gray-800">{c.content}</p>
              </div>
              {user?.id === c.user_id && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="shrink-0 text-xs text-red-400 hover:text-red-600 transition"
                >
                  삭제
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 transition"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400">댓글을 작성하려면 로그인하세요.</p>
      )}
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </section>
  );
}
