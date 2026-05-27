export default function PostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mb-4 h-9 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
