import { createBrowserClient } from "@supabase/ssr";

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

function getClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getProfile(userId: string) {
  const supabase = getClient();
  return supabase.from("profiles").select("*").eq("id", userId).single();
}

export async function updateProfile(userId: string, updates: { username?: string | null; avatar_url?: string | null }) {
  const supabase = getClient();
  return supabase.from("profiles").upsert({ id: userId, ...updates }).select().single();
}
