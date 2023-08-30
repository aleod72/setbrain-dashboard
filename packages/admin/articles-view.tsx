'use client';

import { Button } from 'ui/components/button/Button';
import { createArticle, getArticles } from '../utils/articles';
import { useSupabase } from 'auth/providers/supabase-provider';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';
import { ArticleCard } from './article-card';

interface ArticlesViewProps {
    projectId: string;
}

export const ArticlesView = ({ projectId }: ArticlesViewProps) => {
    const supabase = useSupabase().supabase;
    const router = useRouter();
    const { data } = use(getArticles(supabase));

    const handleCreateNewArticle = async () => {
        const { data } = await createArticle(projectId, supabase);

        if (!data) {
            throw 'No data returned from createArticle';
        }

        router.push(
            `/project/${data.project_id}/admin/articles/${data.id}/edit`
        );
    };

    return (
        <div className="flex flex-col gap-3 h-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-subtitle-sb">Articles</h1>

                <Button iconLeft="plus" onClick={handleCreateNewArticle}>
                    Ajouter
                </Button>
            </div>
            {data?.map((article) => <ArticleCard article={article} />)}
        </div>
    );
};
