"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/drivers", label: "드라이버" },
  { href: "/teams", label: "팀" },
  { href: "/calendar", label: "캘린더" },
  { href: "/reviews", label: "리뷰" },
  { href: "/posts", label: "게시물" },
];

export default function HeaderNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white hover:opacity-80 transition">
          F1<span className="text-red-500">·</span>FAN
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                pathname.startsWith(href)
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm font-medium">
          {loading ? (
            <span className="text-gray-500 text-xs">...</span>
          ) : user ? (
            <>
              <Link
                href="/posts/new"
                className="hidden sm:block rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition"
              >
                새 글 쓰기
              </Link>
              <Link
                href="/profile"
                className="hidden sm:block rounded-full px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition"
              >
                프로필
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-full border border-gray-600 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 모바일 nav */}
      <div className="sm:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              pathname.startsWith(href)
                ? "bg-white/20 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
