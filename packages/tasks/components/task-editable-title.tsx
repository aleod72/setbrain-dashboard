'use client';

import { useSupabase } from 'auth/providers/supabase-provider';
import React from 'react';

interface EditableTitleProps {
    taskId: string;
    defaultTile: string;
}
export const TaskEditableTitle = ({
    taskId,
    defaultTile,
}: EditableTitleProps) => {
    const [title, setTitle] = React.useState(defaultTile);
    const supabase = useSupabase().supabase;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };
    const handleBlur = async () => {
        await supabase.from('tasks').update({ title }).match({ id: taskId });
    };

    return (
        <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={title}
            placeholder="Ajoutez le titre pour la tâche"
            className="text-title-h3 font-bold font-body bg-transparent border-none outline-none w-full resize-none placeholder:text-white-48"
        ></textarea>
    );
};
