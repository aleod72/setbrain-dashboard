import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/database';

export async function getProfileById(id: string, supabase: SupabaseClient<Database>) {
  return await supabase.from('profiles').select('*').eq('id', id).single();
}

export async function getProfilePictureLinkById(id: string, supabase: SupabaseClient<Database>) {
  const {data} = await supabase.from('profiles').select('avatar_url').eq('id', id).single();
  if(!data) throw new Error('No profile found for this user.');
  return data.avatar_url;
}
