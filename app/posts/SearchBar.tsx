"use client";

type Props = {
  query: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ query, onSearch }: Props) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="게시글 검색..."
      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900"
    />
  );
}
