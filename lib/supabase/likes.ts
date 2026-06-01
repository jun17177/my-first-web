import { createBrowserClient } from "@supabase/ssr";

function getClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getLikes(postId: string) {
  const supabase = getClient();
  return supabase.from("likes").select("id, user_id").eq("post_id", postId);
}

export async function addLike(postId: string, userId: string) {
  const supabase = getClient();
  return supabase.from("likes").insert({ post_id: postId, user_id: userId });
}

export async function removeLike(postId: string, userId: string) {
  const supabase = getClient();
  return supabase.from("likes").delete().eq("post_id", postId).eq("user_id", userId);
}
