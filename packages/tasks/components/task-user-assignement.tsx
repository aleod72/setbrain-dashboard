'use client';

import { UserSharingDialog } from 'auth/components/user-sharing-dialog';
import React from 'react';
import { ProfileTag } from 'auth/components/profile-tag';
import { useSupabase } from 'auth/providers/supabase-provider';

interface TaskUserAssignementProps {
    taskId: string;
    assignedProfile: string | undefined;
}

export const TaskUserAssignement = ({
    taskId,
    assignedProfile,
}: TaskUserAssignementProps) => {
    const [selectedProfile, setSelectedProfile] = React.useState<
        string | undefined
    >(assignedProfile);
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
            selectedProfileIds={selectedProfile ? [selectedProfile] : []}
            singleSelect={true}
            onSubmit={handleSubmit}
        >
            <button className="w-fit">
                {selectedProfile ? (
                    <ProfileTag id={selectedProfile}></ProfileTag>
                ) : (
                    <span className="text-white p-2 border-2 border-white-24 rounded-xl">
                        Selectionner un utilisateur
                    </span>
                )}
            </button>
        </UserSharingDialog>
    );
};
