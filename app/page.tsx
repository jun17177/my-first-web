import Link from "next/link";

const posts = [
  {
    slug: "first-post",
    title: "첫 번째 블로그 포스트",
    excerpt: "블로그를 시작하며 느낀 점들을 적어봤습니다.",
    author: "조현준",
    date: "2026-03-25",
  },
  {
    slug: "second-post",
    title: "Next.js로 블로그 만들기",
    excerpt: "Next.js App Router를 사용해 블로그를 직접 만들어보는 과정을 공유합니다.",
    author: "조현준",
    date: "2026-03-20",
  },
  {
    slug: "third-post",
    title: "Tailwind CSS 기초",
    excerpt: "Tailwind CSS를 처음 접하고 배운 것들을 정리했습니다.",
    author: "조현준",
    date: "2026-03-15",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">조현준의 블로그</h1>
          <nav>
            <ul className="flex gap-4 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900">홈</Link></li>
              <li><Link href="/about" className="hover:text-gray-900">소개</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 w-full space-y-6 flex-1">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-2">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <p className="text-sm text-gray-400">
              {post.author} · {post.date}
            </p>
          </article>
        ))}
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto p-4 text-center text-sm text-gray-400">
          © 2026 조현준 · 한신대학교 정보통신학부
        </div>
      </footer>
    </div>
  );
}
