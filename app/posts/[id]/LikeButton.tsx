"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getLikes, addLike, removeLike } from "@/lib/supabase/likes";

export default function LikeButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLikes(postId).then(({ data }) => {
      if (!data) return;
      setCount(data.length);
      if (user) setLiked(data.some((l) => l.user_id === user.id));
    });
  }, [postId, user]);

  async function handleToggle() {
    if (!user || loading) return;
    setLoading(true);
    if (liked) {
      await removeLike(postId, user.id);
      setCount((n) => n - 1);
      setLiked(false);
    } else {
      await addLike(postId, user.id);
      setCount((n) => n + 1);
      setLiked(true);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={!user || loading}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        liked
          ? "border-red-400 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-gray-300 text-gray-500 hover:bg-gray-100"
      } disabled:opacity-50`}
      title={user ? undefined : "로그인 후 이용할 수 있습니다"}
    >
      {liked ? "♥" : "♡"} {count}
    </button>
  );
}
