import { createClient } from "@/lib/supabase/client";

export interface ReviewReply {
  id: string;
  review_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: { username: string | null } | null;
}

export interface Review {
  id: string;
  race_id: number;
  race_name: string;
  driver_name: string;
  rating: number;
  comment: string;
  user_id: string;
  created_at: string;
  profiles: { username: string | null } | null;
  review_likes: { id: string; user_id: string }[];
  review_replies: ReviewReply[];
}

export async function getReviewsByRace(raceId: number) {
  const supabase = createClient();
  return supabase
    .from("reviews")
    .select("*, profiles(username), review_likes(id, user_id), review_replies(*, profiles(username))")
    .eq("race_id", raceId)
    .order("created_at", { ascending: false });
}

export async function createReview(
  raceId: number,
  raceName: string,
  driverName: string,
  rating: number,
  comment: string,
  userId: string
) {
  const supabase = createClient();
  return supabase.from("reviews").insert({
    race_id: raceId,
    race_name: raceName,
    driver_name: driverName,
    rating,
    comment,
    user_id: userId,
  });
}

export async function deleteReview(id: string) {
  const supabase = createClient();
  return supabase.from("reviews").delete().eq("id", id);
}

export async function addReviewLike(reviewId: string, userId: string) {
  const supabase = createClient();
  return supabase.from("review_likes").insert({ review_id: reviewId, user_id: userId });
}

export async function removeReviewLike(reviewId: string, userId: string) {
  const supabase = createClient();
  return supabase.from("review_likes").delete().eq("review_id", reviewId).eq("user_id", userId);
}

export async function createReply(reviewId: string, userId: string, content: string) {
  const supabase = createClient();
  return supabase.from("review_replies").insert({ review_id: reviewId, user_id: userId, content });
}

export async function deleteReply(id: string) {
  const supabase = createClient();
  return supabase.from("review_replies").delete().eq("id", id);
}
