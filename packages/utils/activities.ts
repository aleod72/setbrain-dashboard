import { createClient } from './supabase-browser';
import { cache } from 'react';

const supabase = createClient();

export const getActivityById = cache(async (id: number) => {
    return supabase.from('activities').select('*').eq('id', id).single();
});

export const getAllActivitiesIds = cache(async () => {
    return supabase.from('activities').select('id');
});

export const getAllActivitiesIdsByProject = cache(async (projectId: string) => {
    return supabase
        .from('activities')
        .select('id')
        .eq('project_id', projectId);
});
