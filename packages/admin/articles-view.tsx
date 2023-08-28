'use client';

import { Button } from 'ui/components/button/Button';
import { createArticle } from '../utils/articles';
import { useSupabase } from 'auth/providers/supabase-provider';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ArticlesViewProps {
    projectId: string;
}

export const ArticlesView = ({ projectId }: ArticlesViewProps) => {
    const supabase = useSupabase().supabase;
    const router = useRouter();

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
        <div className="flex h-full flex-wrap gap-5 px-5">
            <Button iconLeft="plus" onClick={handleCreateNewArticle}>
                Ajouter
            </Button>
        </div>
    );
};
