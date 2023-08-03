'use client';

import React from 'react';
import { useSupabase } from 'auth/providers/supabase-provider';
import { UserSharing } from 'auth/components/user-sharing';

interface TaskUserSharingProps {
    taskId: string;
    profileIds: string[];
}

export const TaskUserSharing = ({
    profileIds,
    taskId,
}: TaskUserSharingProps) => {
    const supabase = useSupabase().supabase;
    const handleSubmit = async (profileIds: string[]) => {
        await supabase
            .from('tasks')
            .update({ assigned_users: profileIds })
            .match({ id: taskId });
    };

    return <UserSharing profileIds={profileIds} onChange={handleSubmit} />;
};
