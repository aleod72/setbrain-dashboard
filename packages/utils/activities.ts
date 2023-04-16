import { createClient } from "./supabase-browser";

const supabase = createClient();

export async function getActiviyById(id: number) {
    return await supabase.from('activities').select('*').eq('id', id).single();
}

export async function getAllActivitiesIds() {
    return await supabase.from('activities').select('id');
}