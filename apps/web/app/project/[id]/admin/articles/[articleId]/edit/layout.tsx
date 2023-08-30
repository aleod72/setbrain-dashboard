import React from 'react';
import 'admin/styles/articles-preview.css';

interface ArticleEditLayoutProps {
    children: React.ReactNode;
}

export default function ArticleEditLayout({
    children,
}: ArticleEditLayoutProps) {
    return <>
    { children }
    </>;
}
