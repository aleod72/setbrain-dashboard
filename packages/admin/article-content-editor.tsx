'use client';

import { useTextAreaMarkdownEditor } from 'react-headless-mde';
import { useSupabase } from 'auth/providers/supabase-provider';
import { Tabs } from 'ui/components/tabs/Tabs';
import { ArticleContentPreview } from './article-content-preview';
import React from 'react';

interface ArticleContentEditorProps {
    articleId: string;
    initialContent: string;
}

export const ArticleContentEditor = ({
    articleId,
    initialContent,
}: ArticleContentEditorProps) => {
    const supabase = useSupabase().supabase;
    const [content, setContent] = React.useState(initialContent);
    const { ref } = useTextAreaMarkdownEditor({
        commandMap: {},
    });
    const handleBlur = async () => {
        await supabase
            .from('articles')
            .update({ content: content })
            .match({ id: articleId });
    };

    return (
        <Tabs
            tabs={[
                {
                    label: 'Edition',
                    content: (
                        <textarea
                            placeholder="Commencez à rédiger votre article"
                            ref={ref}
                            value={content}
                            defaultValue={initialContent}
                            onChange={(e) =>
                                setContent(
                                    (e.target as HTMLTextAreaElement)?.value ||
                                        ''
                                )
                            }
                            onBlur={handleBlur}
                            className="bg-transparent w-full h-full outline-none resize-none"
                        ></textarea>
                    ),
                },
                {
                    label: 'Preview',
                    content: <ArticleContentPreview content={content} />,
                },
            ]}
            defaultTab={'Edition'}
        />
    );
};
