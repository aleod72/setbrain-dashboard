'use client';

import React from 'react';
import { Editor } from 'ui/components/editor/Editor';
import { useSupabase } from 'auth/providers/supabase-provider';

interface TaskDescriptionEditorProps {
    taskId: string;
    description: string;
}

export const TaskDescriptionEditor = ({
    taskId,
    description,
}: TaskDescriptionEditorProps) => {
    const supabase = useSupabase().supabase;
    const handleBlur = async (content: string) => {
        await supabase
            .from('tasks')
            .update({ description: content })
            .match({ id: taskId });
    };

    return (
        <Editor
            content={description}
            placeholder="Ajoutez la description de la tâche"
            className="mt-8"
            onBlur={(props) => handleBlur(props.editor.getHTML())}
        />
    );
};
