import { SupabaseClient } from '@supabase/supabase-js';

export async function getProfileById(id: string, supabase: SupabaseClient) {
  return await supabase.from('profiles').select('*').eq('id', id).single();
}
