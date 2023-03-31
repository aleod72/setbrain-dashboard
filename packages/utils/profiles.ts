import { createClient } from "./supabase-browser";

export async function getProfileById(id: string, supabase: ReturnType<typeof createClient>) {
  return await supabase.from('profiles').select('*').eq('id', id).single();
}
