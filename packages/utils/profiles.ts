import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/database';
import { cache } from 'react';

export const getProfileById = cache(async (
    id: string,
    supabase: SupabaseClient<Database>
) => {
    return await supabase.from('profiles').select('*').eq('id', id).single();
});

export const getProfilePictureLinkById = cache(async (
    id: string,
    supabase: SupabaseClient<Database>
) => {
    const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', id)
        .single();

    if (!data) throw new Error('No profile found for this user.');
    return data.avatar_url;
});
