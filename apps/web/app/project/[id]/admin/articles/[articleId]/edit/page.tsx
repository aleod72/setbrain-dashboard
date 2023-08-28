import React from 'react';
import { BackHead } from '../../../../back-head';
import { ArticleEditor } from 'admin/article-editor';

interface TaskEditorPageProps {
    params: {
        articleId: string;
    };
}

export default function Page({ params: { articleId } }: TaskEditorPageProps) {
    return (
        <div className="flex flex-col h-full gap-6 p-8 md:p-0">
            <BackHead />
            <ArticleEditor articleId={articleId} />
        </div>
    );
}
