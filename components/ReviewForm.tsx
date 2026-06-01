"use client";

import { useState, useEffect } from "react";
import { races, type Race } from "@/lib/races";
import { drivers } from "@/lib/drivers";

interface Review {
  id: string;
  raceId: number;
  raceName: string;
  driverName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const STORAGE_KEY = "f1-reviews";

export default function ReviewForm() {
  const [selected, setSelected] = useState<Race | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setReviews(JSON.parse(stored));
  }, []);

  function saveReviews(updated: Review[]) {
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  if (selected) {
    return (
      <RaceReviewPanel
        race={selected}
        reviews={reviews.filter((r) => r.raceId === selected.id)}
        onBack={() => setSelected(null)}
        onAdd={(review) => saveReviews([review, ...reviews])}
        onDelete={(id) => saveReviews(reviews.filter((r) => r.id !== id))}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {races.map((race) => {
          const count = reviews.filter((r) => r.raceId === race.id).length;
          return (
            <button
              key={race.id}
              onClick={() => setSelected(race)}
              className="text-left rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-400 transition group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                  race.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}>
                  Round {race.round}
                </span>
                {count > 0 && (
                  <span className="text-xs text-gray-400">의견 {count}개</span>
                )}
              </div>
              <p className="font-bold text-gray-900 text-sm leading-tight group-hover:text-black">
                {race.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">{race.circuit}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(race.date).toLocaleDateString("ko-KR")}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RaceReviewPanel({
  race,
  reviews,
  onBack,
  onAdd,
  onDelete,
}: {
  race: Race;
  reviews: Review[];
  onBack: () => void;
  onAdd: (review: Review) => void;
  onDelete: (id: string) => void;
}) {
  const [driverName, setDriverName] = useState(drivers[0].name);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("별점을 선택해주세요."); return; }
    if (comment.trim().length < 5) { setError("의견을 5자 이상 입력해주세요."); return; }
    setError("");
    onAdd({
      id: Date.now().toString(),
      raceId: race.id,
      raceName: race.name,
      driverName,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    });
    setComment("");
    setRating(0);
  }

  return (
    <div className="space-y-8">
      {/* 선택된 레이스 헤더 */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          ← 목록
        </button>
        <div>
          <p className="text-xs text-gray-400">Round {race.round} · {race.country}</p>
          <h2 className="text-xl font-black text-gray-900">{race.name}</h2>
          <p className="text-sm text-gray-500">{race.circuit} · {new Date(race.date).toLocaleDateString("ko-KR")}</p>
        </div>
      </div>

      {/* 의견 작성 폼 */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
        <h3 className="font-semibold text-gray-900">의견 작성</h3>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">드라이버</label>
          <select
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900 transition"
          >
            {drivers.map((d) => (
              <option key={d.id} value={d.name}>{d.name} ({d.team})</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">별점</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={`text-2xl transition ${s <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">의견</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="이 레이스에 대한 의견을 남겨주세요..."
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 transition"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="rounded-full bg-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          저장하기
        </button>
      </form>

      {/* 이 레이스 의견 목록 */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            이 레이스 의견 <span className="text-gray-400">({reviews.length})</span>
          </h3>
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.driverName}</p>
                  <span className="text-yellow-400 text-sm">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <button
                  onClick={() => onDelete(r.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition shrink-0"
                >
                  삭제
                </button>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">이 레이스에 아직 의견이 없습니다. 첫 의견을 남겨보세요!</p>
      )}
    </div>
  );
}
