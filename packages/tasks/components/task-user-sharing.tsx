'use client';

import React, { use, useContext } from 'react';
import { ProfilePictureList } from 'auth/components/profile-picture-list';
import { Button } from 'ui/components/button/Button';
import { useSupabase } from 'auth/providers/supabase-provider';
import { UserSharingDialog } from 'auth/components/user-sharing-dialog';
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
