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

export async function uploadPostImage(file: File, userId: string): Promise<string | null> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("post-images").upload(path, file);
  if (error) return null;
  const { data } = supabase.storage.from("post-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function createPost(title: string, content: string, userId: string, imageUrl?: string | null) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, user_id: userId, image_url: imageUrl ?? null })
    .select()
    .single();
  return { data, error };
}

export async function updatePost(id: string, title: string, content: string, imageUrl?: string | null) {
  const supabase = createClient();
  const update: Record<string, unknown> = { title, content };
  if (imageUrl !== undefined) update.image_url = imageUrl;
  const { data, error } = await supabase
    .from("posts")
    .update(update)
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
