import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/database';
import { cache } from 'react';

export const createArticle = (
    projectId: string,
    supabase: SupabaseClient<Database>
) => {
    return supabase
        .from('articles')
        .insert({ project_id: projectId })
        .select('*')
        .single();
};

export const getArticleById = (
    articleId: string,
    supabase: SupabaseClient<Database>
) => {
    return supabase.from('articles').select('*').eq('id', articleId).single();
};

export const getArticles = cache((supabase: SupabaseClient<Database>) => {
    return supabase.from('articles').select('*');
});
