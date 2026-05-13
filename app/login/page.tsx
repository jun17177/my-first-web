"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmail } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signInWithEmail(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/posts");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">로그인</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="비밀번호를 입력하세요"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-medium text-gray-900 underline underline-offset-2">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
