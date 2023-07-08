'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import * as TipTap from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface EditorProps {
    content: string;
    className?: string;
    onBlur?: (props: { editor: TipTap.Editor; event: FocusEvent }) => void;
    placeholder?: string;
}

export const Editor = ({
    content,
    className,
    onBlur,
    placeholder,
}: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        content: content,
        onBlur: onBlur,
    });

    return <EditorContent editor={editor} className={className} />;
};
