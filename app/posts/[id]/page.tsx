import Link from "next/link";
import { posts } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = Number(id);
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">게시글을 찾을 수 없습니다</p>
          <Link
            href="/posts"
            className="mt-6 inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-6 flex items-center gap-3 text-sm text-gray-500">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>

        <div className="mt-8 space-y-4 text-base leading-7 text-gray-700">
          <p>{post.content}</p>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <Link
            href="/posts"
            className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}