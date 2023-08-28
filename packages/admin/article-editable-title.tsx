'use client';

import { useSupabase } from 'auth/providers/supabase-provider';
import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

interface EditableTitleProps {
    articleId: string;
    defaultTile: string;
}
export const ArticleEditableTitle = ({
    articleId,
    defaultTile,
}: EditableTitleProps) => {
    const title = React.useRef(defaultTile);
    const supabase = useSupabase().supabase;
    const handleChange = (e: ContentEditableEvent) => {
        title.current = e.target.value;
    };
    const handleBlur = async () => {
        await supabase
            .from('articles')
            .update({ title: title.current })
            .match({ id: articleId });
    };

    return (
        // This is due to the bad typing of the library
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ContentEditable
            onChange={handleChange}
            onBlur={handleBlur}
            contentEditable={true}
            key={articleId}
            html={title.current}
            placeholder="Ajoutez le titre pour l'article"
            className="text-title-h3 font-bold font-body bg-transparent border-none outline-none p-2 md:p-0 w-full h-fit res placeholder:text-white-48"
        />
    );
};
