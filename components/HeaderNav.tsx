"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function HeaderNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
          내 블로그
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            홈
          </Link>
          <Link
            href="/posts"
            className="rounded-full px-4 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            블로그
          </Link>

          {loading ? (
            <span className="rounded-full px-4 py-2 text-gray-400">...</span>
          ) : user ? (
            <>
              <Link
                href="/posts/new"
                className="rounded-full px-4 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                새 글 쓰기
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-full bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
