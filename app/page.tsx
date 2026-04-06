import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">내 블로그</h1>
      <p className="text-gray-600 mb-6">안녕하세요, 내 블로그에 오신 것을 환영합니다.</p>
      <Link href="/posts" className="text-blue-600 hover:underline">
        게시글 목록 보기 →
      </Link>
    </div>
  );
}
