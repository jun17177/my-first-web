"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-xl font-semibold text-gray-800">문제가 발생했습니다</h2>
      <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={reset}
        className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        다시 시도
      </button>
    </div>
  );
}
