'use client';

import { Select, SelectItem } from 'ui/components/select/Select';
import React from 'react';
import { useSupabase } from 'auth/providers/supabase-provider';

interface TagSelectorProps {
    taskId: string;
    defaultTag: string | undefined;
}

export const TagSelector = ({ taskId, defaultTag }: TagSelectorProps) => {
    const [tag, setTag] = React.useState(defaultTag);
    const supabase = useSupabase().supabase;
    const handleValueChange = async (value: string) => {
        setTag(value);
        await supabase
            .from('tasks')
            .update({ type: value })
            .match({ id: taskId });
    };

    return (
        <Select
            placeholder="Slectionnez un tag"
            value={tag}
            onValueChange={handleValueChange}
        >
            <SelectItem value="FIX">FIX</SelectItem>
            <SelectItem value="FEAT.">FEAT.</SelectItem>
        </Select>
    );
};
