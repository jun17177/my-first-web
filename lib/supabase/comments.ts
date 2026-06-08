import { createBrowserClient } from "@supabase/ssr";

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  username: string | null;
  content: string;
  created_at: string;
}

function getClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getComments(postId: string) {
  const supabase = getClient();
  return supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
}

export async function createComment(postId: string, userId: string, username: string | null, content: string) {
  const supabase = getClient();
  return supabase.from("comments").insert({ post_id: postId, user_id: userId, username, content });
}

export async function deleteComment(id: string) {
  const supabase = getClient();
  return supabase.from("comments").delete().eq("id", id);
}
