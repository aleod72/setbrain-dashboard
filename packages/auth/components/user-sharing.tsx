'use client';

import { ProfilePictureList } from './profile-picture-list';
import { UserSharingDialog } from './user-sharing-dialog';
import { Button } from 'ui/components/button/Button';
import React from 'react';

interface UserSharingProps {
    profileIds: string[];
    onChange: (profileIds: string[]) => void;
    fullWidth?: boolean;
}

export const UserSharing = ({
    profileIds,
    onChange,
    fullWidth = false,
}: UserSharingProps) => {
    const [sharedProfiles, setSharedProfiles] =
        React.useState<string[]>(profileIds);
    const handleSubmit = (profileIds: string[]) => {
        setSharedProfiles(profileIds);
        onChange(profileIds);
    };

    return (
        <div
            className={`flex items-center ${
                fullWidth ? 'w-full justify-between' : 'w-fit'
            }`}
        >
            {profileIds.length > 0 ? (
                <span className="h-7 pl-2.5">
                    <ProfilePictureList
                        ids={sharedProfiles}
                    ></ProfilePictureList>
                </span>
            ) : (
                <p className="text-white-48">
                    Pas d&apos;utilisateurs partagés pour l&apos;instant
                </p>
            )}
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
