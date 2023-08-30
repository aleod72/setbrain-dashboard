import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleContentPreviewProps {
    content: string;
}

export const ArticleContentPreview = ({
    content,
}: ArticleContentPreviewProps) => {
    return (
        <div className="flex flex-col gap-5">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};
