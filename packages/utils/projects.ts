import { createClient } from './supabase-browser';

const supabase = createClient();

export async function getProjectById(id: string) {
    return await supabase.from('projects').select('*').eq('id', id).single();
}

export async function getAllProjectsIds() {
    return await supabase.from('projects').select('id');
}
