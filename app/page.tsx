import Link from "next/link";

const posts = [
  {
    slug: "first-post",
    title: "첫 번째 블로그 포스트",
    date: "2026-03-25",
    excerpt: "블로그를 시작하며 느낀 점들을 적어봤습니다.",
  },
  {
    slug: "second-post",
    title: "Next.js로 블로그 만들기",
    date: "2026-03-20",
    excerpt: "Next.js App Router를 사용해 블로그를 직접 만들어보는 과정을 공유합니다.",
  },
  {
    slug: "third-post",
    title: "Tailwind CSS 기초",
    date: "2026-03-15",
    excerpt: "Tailwind CSS를 처음 접하고 배운 것들을 정리했습니다.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">조현준의 블로그</h1>
          <p className="text-sm text-gray-500 mt-1">한신대학교 정보통신학부</p>
        </div>
      </header>

      {/* 포스트 목록 */}
      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow p-6">
            <p className="text-xs text-gray-400 mb-1">{post.date}</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm">{post.excerpt}</p>
          </article>
        ))}
      </main>
    </div>
  );
}
