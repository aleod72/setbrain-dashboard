import { cache } from 'react';
import { createClient } from './supabase-server';

const supabase = createClient();

export const getSupportMessages = cache(async () => {
    const { data, error } = await supabase
        .from('support-messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

    if (error) {
        throw error;
    }
    return data;
});