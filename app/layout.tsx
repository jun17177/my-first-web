import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "내 블로그입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
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
              <Link
                href="/posts/new"
                className="rounded-full bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
              >
                새 글 쓰기
              </Link>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-4xl px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 px-6 py-5 text-center text-sm text-gray-500">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
