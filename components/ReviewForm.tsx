"use client";

import { useState, useEffect } from "react";
import { races } from "@/lib/races";
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
  const [raceId, setRaceId] = useState<number>(races[0].id);
  const [driverName, setDriverName] = useState(drivers[0].name);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setReviews(JSON.parse(stored));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("별점을 선택해주세요."); return; }
    if (comment.trim().length < 5) { setError("의견을 5자 이상 입력해주세요."); return; }
    setError("");

    const race = races.find((r) => r.id === raceId)!;
    const newReview: Review = {
      id: Date.now().toString(),
      raceId,
      raceName: race.name,
      driverName,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setComment("");
    setRating(0);
  }

  function handleDelete(id: string) {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-gray-900">의견 작성</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">레이스</label>
            <select
              value={raceId}
              onChange={(e) => setRaceId(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900 transition"
            >
              {races.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">드라이버</label>
            <select
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900 transition"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
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
            placeholder="경기 또는 드라이버에 대한 의견을 남겨주세요..."
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

      {reviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">저장된 의견 ({reviews.length})</h2>
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.driverName}</p>
                  <p className="text-xs text-gray-400">{r.raceName}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-yellow-400 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
