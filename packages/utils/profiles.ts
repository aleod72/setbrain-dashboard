import { SupabaseClient } from '@supabase/supabase-js';

export async function getProfileById(id: string, supabase: SupabaseClient) {
  return await supabase.from('profiles').select('*').eq('id', id).single();
}

export async function getProfilePictureLinkById(id: string, supabase: SupabaseClient) {
  const {data} = await supabase.from('profiles').select('avatar_url').eq('id', id).single();
  if(!data) throw new Error('No profile found for this user.');
  return data.avatar_url;
}
