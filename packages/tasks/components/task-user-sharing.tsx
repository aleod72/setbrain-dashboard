'use client';

import React, { use, useContext } from 'react';
import { ProfilePictureList } from 'auth/components/profile-picture-list';
import { Button } from 'ui/components/button/Button';
import { useSupabase } from 'auth/providers/supabase-provider';
import { UserSharingDialog } from 'auth/components/user-sharing-dialog';

interface TaskUserSharingProps {
    taskId: string;
    profileIds: string[];
}

export const TaskUserSharing = ({
    profileIds,
    taskId,
}: TaskUserSharingProps) => {
    const [sharedProfiles, setSharedProfiles] =
        React.useState<string[]>(profileIds);
    const supabase = useSupabase().supabase;
    const handleSubmit = async (profileIds: string[]) => {
        setSharedProfiles(profileIds);
        await supabase
            .from('tasks')
            .update({ assigned_users: profileIds })
            .match({ id: taskId });
    };

    return (
        <div className="flex items-center">
            <span className="h-7 pl-2.5">
                <ProfilePictureList ids={sharedProfiles}></ProfilePictureList>
            </span>
            <UserSharingDialog
                selectedProfileIds={sharedProfiles}
                onSubmit={handleSubmit}
            >
                <Button intent="backgroundless" iconRight="plus">
                    Ajouter
                </Button>
            </UserSharingDialog>
        </div>
    );
};
