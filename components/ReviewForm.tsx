"use client";

import { useState, useEffect, useCallback } from "react";
import { races, type Race } from "@/lib/races";
import { drivers } from "@/lib/drivers";
import { useAuth } from "@/contexts/AuthContext";
import {
  getReviewsByRace, createReview, deleteReview,
  addReviewLike, removeReviewLike,
  createReply, deleteReply,
  type Review,
} from "@/lib/supabase/reviews";

export default function ReviewForm() {
  const [selected, setSelected] = useState<Race | null>(null);
  const [raceCounts, setRaceCounts] = useState<Record<number, number>>({});

  // 레이스 목록에서 의견 수를 한 번에 조회하는 건 복잡하므로
  // 선택된 레이스로 진입 시 카운트는 reviews 배열 길이로 갱신
  function handleSelectRace(race: Race) {
    setSelected(race);
  }

  function handleBack(count: number) {
    if (selected) setRaceCounts((prev) => ({ ...prev, [selected.id]: count }));
    setSelected(null);
  }

  if (selected) {
    return <RaceReviewPanel race={selected} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {races.map((race) => (
        <button
          key={race.id}
          onClick={() => handleSelectRace(race)}
          className="text-left rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-400 transition group"
        >
          <div className="flex items-start justify-between mb-2">
            <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
              race.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
            }`}>
              Round {race.round}
            </span>
            {raceCounts[race.id] > 0 && (
              <span className="text-xs text-gray-400">의견 {raceCounts[race.id]}개</span>
            )}
          </div>
          <p className="font-bold text-gray-900 text-sm leading-tight group-hover:text-black">{race.name}</p>
          <p className="mt-1 text-xs text-gray-500">{race.circuit}</p>
          <p className="mt-2 text-xs text-gray-400">
            {new Date(race.date).toLocaleDateString("ko-KR")}
          </p>
        </button>
      ))}
    </div>
  );
}

function RaceReviewPanel({ race, onBack }: { race: Race; onBack: (count: number) => void }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [driverName, setDriverName] = useState(drivers[0].name);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    const { data } = await getReviewsByRace(race.id);
    if (data) setReviews(data as Review[]);
    setLoading(false);
  }, [race.id]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) { setError("별점을 선택해주세요."); return; }
    if (comment.trim().length < 5) { setError("의견을 5자 이상 입력해주세요."); return; }
    setError("");
    setSubmitting(true);
    const { error: insertError } = await createReview(race.id, race.name, driverName, rating, comment.trim(), user.id);
    if (insertError) {
      setError("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
      return;
    }
    await fetchReviews();
    setComment("");
    setRating(0);
    setSubmitting(false);
  }

  async function handleDeleteReview(id: string) {
    await deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  async function handleToggleLike(reviewId: string) {
    if (!user) return;
    const review = reviews.find((r) => r.id === reviewId)!;
    const alreadyLiked = review.review_likes.some((l) => l.user_id === user.id);
    if (alreadyLiked) {
      await removeReviewLike(reviewId, user.id);
    } else {
      await addReviewLike(reviewId, user.id);
    }
    await fetchReviews();
  }

  async function handleAddReply(reviewId: string, content: string) {
    if (!user) return;
    await createReply(reviewId, user.id, content);
    await fetchReviews();
  }

  async function handleDeleteReply(replyId: string) {
    await deleteReply(replyId);
    await fetchReviews();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onBack(reviews.length)}
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
      {user ? (
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
                <button key={s} type="button" onClick={() => setRating(s)}
                  className={`text-2xl transition ${s <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}>
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
          <button type="submit" disabled={submitting}
            className="rounded-full bg-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50">
            {submitting ? "저장 중..." : "저장하기"}
          </button>
        </form>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-500">의견을 작성하려면 <a href="/login" className="text-gray-900 font-semibold underline">로그인</a>이 필요합니다.</p>
        </div>
      )}

      {/* 의견 목록 */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-full bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">의견 <span className="text-gray-400">({reviews.length})</span></h3>
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              currentUserId={user?.id}
              onDelete={() => handleDeleteReview(r.id)}
              onToggleLike={() => handleToggleLike(r.id)}
              onAddReply={(content) => handleAddReply(r.id, content)}
              onDeleteReply={handleDeleteReply}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">이 레이스에 아직 의견이 없습니다. 첫 의견을 남겨보세요!</p>
      )}
    </div>
  );
}

function ReviewCard({ review, currentUserId, onDelete, onToggleLike, onAddReply, onDeleteReply }: {
  review: Review;
  currentUserId?: string;
  onDelete: () => void;
  onToggleLike: () => void;
  onAddReply: (content: string) => void;
  onDeleteReply: (replyId: string) => void;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const liked = currentUserId ? review.review_likes.some((l) => l.user_id === currentUserId) : false;

  function handleReplySubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onAddReply(replyContent.trim());
    setReplyContent("");
    setShowReplyForm(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className="font-semibold text-gray-900 text-sm">
            {review.profiles?.username ?? "익명"}
          </span>
          <span className="ml-2 text-xs text-gray-400">
            {new Date(review.created_at).toLocaleDateString("ko-KR")}
          </span>
        </div>
        {currentUserId === review.user_id && (
          <button onClick={onDelete} className="text-xs text-red-400 hover:text-red-600 transition shrink-0">삭제</button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-1">{review.driver_name}</p>
      <div className="text-yellow-400 text-sm mb-3">
        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
      </div>
      <p className="text-sm text-gray-700 mb-4">{review.comment}</p>

      {/* 좋아요 + 대댓글 버튼 */}
      <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
        <button
          onClick={onToggleLike}
          disabled={!currentUserId}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
            liked
              ? "bg-red-50 text-red-500 border border-red-200"
              : "border border-gray-200 text-gray-500 hover:bg-gray-50"
          } disabled:opacity-40 disabled:cursor-default`}
          title={!currentUserId ? "로그인 후 이용 가능" : undefined}
        >
          {liked ? "♥" : "♡"} {review.review_likes.length}
        </button>
        <button
          onClick={() => setShowReplyForm((v) => !v)}
          disabled={!currentUserId}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-default"
          title={!currentUserId ? "로그인 후 이용 가능" : undefined}
        >
          💬 {review.review_replies.length > 0 ? `대댓글 ${review.review_replies.length}` : "대댓글"}
        </button>
      </div>

      {/* 대댓글 목록 */}
      {review.review_replies.length > 0 && (
        <div className="mt-3 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
          {review.review_replies.map((rep) => (
            <div key={rep.id} className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-medium text-gray-600">
                  {rep.profiles?.username ?? "익명"}
                </span>
                <p className="text-sm text-gray-700 mt-0.5">{rep.content}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(rep.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
              {currentUserId === rep.user_id && (
                <button onClick={() => onDeleteReply(rep.id)} className="text-xs text-red-400 hover:text-red-600 shrink-0">삭제</button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 대댓글 입력 폼 */}
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-3 ml-4 flex gap-2">
          <input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="대댓글을 입력하세요..."
            className="flex-1 rounded-xl border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-gray-900 transition"
          />
          <button type="submit" disabled={!replyContent.trim()}
            className="rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-700 disabled:opacity-50">
            등록
          </button>
        </form>
      )}
    </div>
  );
}
