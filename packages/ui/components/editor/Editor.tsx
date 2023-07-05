'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import * as TipTap from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
    content: string;
    className?: string;
    onBlur?: (props: { editor: TipTap.Editor; event: FocusEvent }) => void;
}

export const Editor = ({ content, className, onBlur }: EditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onBlur: onBlur,
    });

    return <EditorContent editor={editor} className={className} />;
};
