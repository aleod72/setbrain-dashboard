'use client';

import { useSupabase } from '../providers/supabase-provider';
import React, { use, useContext } from 'react';
import { profileContext } from '../providers/profile-provider';
import { Dialog, DialogClose } from 'ui/components/dialog/Dialog';
import { Button } from 'ui/components/button/Button';
import { getAllProfiles } from 'utils/profiles';
import Image from 'next/image';

interface UserSharingDialogProps {
    children: React.ReactNode;
    selectedProfileIds: string[];
    onSubmit?: (profileIds: string[]) => void;
    singleSelect?: boolean;
}

export const UserSharingDialog = ({
    children,
    selectedProfileIds,
    onSubmit,
    singleSelect = false,
}: UserSharingDialogProps) => {
    const supabase = useSupabase().supabase;
    const data = use(getAllProfiles(supabase));
    const loggedUser = useContext(profileContext);
    const [finalSelectedProfiles, setFinalSelectedProfiles] =
        React.useState<string[]>(selectedProfileIds);

    const handleProfileClick = (profileId: string) => {
        if (
            profileId === loggedUser?.id &&
            singleSelect &&
            selectedProfileIds.length > 0
        ) {
            return;
        }
        if (finalSelectedProfiles.includes(profileId)) {
            setFinalSelectedProfiles(
                finalSelectedProfiles?.filter((id) => id !== profileId)
            );
        } else {
            if (singleSelect && finalSelectedProfiles.length > 0) return;
            setFinalSelectedProfiles([...finalSelectedProfiles, profileId]);
        }
    };

    return (
        <Dialog trigger={children}>
            <div className="w-[408px] min-h-[458px] px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex-col justify-between flex">
                <div className="flex flex-col gap-5">
                    <h1 className="text-white-100 text-subtitle-sb font-bold">
                        Selectionnez des utilisateurs
                    </h1>
                    <div className="flex gap-4">
                        {data.data?.map((profile, index) => (
                            <div
                                className={`flex flex-col items-center gap-2 min-w-[100px] h-fit cursor-pointer p-2 rounded-2xl ${
                                    finalSelectedProfiles.includes(profile.id)
                                        ? 'bg-blue-24'
                                        : 'border box-border border-lightgrey-100'
                                }`}
                                key={profile.lastname + index}
                                onClick={() => handleProfileClick(profile.id)}
                            >
                                <Image
                                    src={profile.avatar_url || ''}
                                    alt=""
                                    className="rounded-full w-16 h-16"
                                    width={64}
                                    height={64}
                                />
                                <p>{profile.firstname}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogClose className="w-full flex justify-end">
                    <Button onClick={() => onSubmit?.(finalSelectedProfiles)}>
                        Valider
                    </Button>
                </DialogClose>
            </div>
        </Dialog>
    );
};
