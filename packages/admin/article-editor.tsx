import React from 'react';
import { getArticleById } from '../utils/articles';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ArticleEditableTitle } from './article-editable-title';
import { ArticleContentEditor } from './article-content-editor';

interface ArticleEditorProps {
    articleId: string;
}

export const ArticleEditor = (async ({ articleId }: ArticleEditorProps) => {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await getArticleById(articleId, supabase);

    if (error) return <div>Error loading article</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex gap-2 flex-col h-full">
            <ArticleEditableTitle
                articleId={articleId}
                defaultTile={data.title}
            />
            <ArticleContentEditor
                articleId={articleId}
                initialContent={data.content || ''}
            ></ArticleContentEditor>
        </div>
    );
}) as unknown as React.FC<ArticleEditorProps>;
