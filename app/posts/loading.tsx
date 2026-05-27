export default function PostsLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-gray-100" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
