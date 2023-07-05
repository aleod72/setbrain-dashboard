'use client';

import { UserSharingDialog } from 'auth/components/user-sharing-dialog';
import React from 'react';
import { ProfileTag } from 'auth/components/profile-tag';
import { useSupabase } from 'auth/providers/supabase-provider';

interface TaskUserAssignementProps {
    taskId: string;
    assignedProfile: string;
}

export const TaskUserAssignement = ({
    taskId,
    assignedProfile,
}: TaskUserAssignementProps) => {
    const [selectedProfile, setSelectedProfile] =
        React.useState<string>(assignedProfile);
    const supabase = useSupabase().supabase;
    const handleSubmit = async (profileIds: string[]) => {
        setSelectedProfile(profileIds[0]);
        await supabase
            .from('tasks')
            .update({ assigned_check: profileIds })
            .match({ id: taskId });
    };

    return (
        <UserSharingDialog
            selectedProfileIds={[selectedProfile]}
            singleSelect={true}
            onSubmit={handleSubmit}
        >
            <button className="w-fit">
                <ProfileTag id={selectedProfile}></ProfileTag>
            </button>
        </UserSharingDialog>
    );
};
