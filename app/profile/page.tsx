"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile, updateProfile, type Profile } from "@/lib/supabase/profiles";
import { getPosts } from "@/lib/supabase/posts";
import type { Post } from "@/lib/posts";
import { getErrorMessage } from "@/lib/error-message";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    getProfile(user.id).then(({ data }) => {
      if (data) {
        setProfile(data);
        setUsername(data.username ?? "");
      }
    });
    getPosts().then(({ data }) => {
      if (data) setPosts((data as Post[]).filter((p) => p.user_id === user.id));
    });
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    const { data, error } = await updateProfile(user.id, { username: username.trim() || null });
    if (error) {
      setError(getErrorMessage(error));
      setSaving(false);
      return;
    }
    if (data) setProfile(data as Profile);
    setEditing(false);
    setSuccess(true);
    setSaving(false);
  }

  if (authLoading || !user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">내 프로필</h1>

      <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
            {(profile?.username ?? user.email ?? "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {profile?.username ?? "닉네임 없음"}
            </p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임 입력"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 transition"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
            >
              저장
            </button>
            <button
              onClick={() => { setEditing(false); setUsername(profile?.username ?? ""); }}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
          >
            닉네임 수정
          </button>
        )}

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-600">저장되었습니다.</p>}

        <p className="mt-4 text-xs text-gray-400">
          가입일: {new Date(user.created_at).toLocaleDateString("ko-KR")}
        </p>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        내 게시글 <span className="text-gray-400">({posts.length})</span>
      </h2>

      {posts.length === 0 ? (
        <p className="text-sm text-gray-400">아직 작성한 글이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md"
            >
              <p className="font-medium text-gray-900">{post.title}</p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(post.created_at).toLocaleDateString("ko-KR")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
