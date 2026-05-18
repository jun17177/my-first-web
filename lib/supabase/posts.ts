import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/posts";

export async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data as Post[] | null, error };
}

export async function getPost(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  return { data: data as Post | null, error };
}

export async function createPost(title: string, content: string, userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, user_id: userId })
    .select()
    .single();
  return { data, error };
}

export async function updatePost(id: string, title: string, content: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deletePost(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return { error };
}
