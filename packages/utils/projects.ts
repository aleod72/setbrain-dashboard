import { createClient } from './supabase-browser';
import { cache } from 'react';

const supabase = createClient();

export const getProjectById = cache(async (id: string) => {
    return supabase.from('projects').select('*').eq('id', id).single();
});

export const getAllProjectsIds = cache(async () => {
    return supabase.from('projects').select('id');
});
