import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleContentPreviewProps {
    content: string;
}

export const ArticleContentPreview = ({
    content,
}: ArticleContentPreviewProps) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
};
