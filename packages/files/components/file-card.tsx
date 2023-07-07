'use client';

import React, { use, useContext } from 'react';
import { getFile, getFileSharedUsers } from 'utils/files';
import { googleDriveContext } from '../providers/google-drive-provider';
import Image from 'next/image';
import {
    ProfilePictureList,
    ProfilePictureListSkeleton,
} from 'auth/components/profile-picture-list';
import prettyBytes from 'pretty-bytes';
import { drive_v3 } from 'types/drive';
import { useSupabase } from 'auth/providers/supabase-provider';
import { Tooltip } from 'ui/components/tooltip/Tooltip';
import Skeleton from 'react-loading-skeleton';
import { Popover } from 'ui/components/popover/Popover';

interface FileCardProps {
    driveFileId: string;
    menu?: React.ReactNode;
}

export const FileCard = ({ driveFileId, menu }: FileCardProps) => {
    const driveToken = useContext(googleDriveContext);
    const supabase = useSupabase().supabase;

    if (!driveToken) return <FileCardSkeleton />;

    const driveFile = use(
        getFile(driveFileId, driveToken)
    ) as drive_v3.Schema$File;
    const sharedUsers = use(getFileSharedUsers(driveFileId, supabase));

    console.log(sharedUsers);

    return (
        <div className="flex flex-col rounded-3xl overflow-hidden bg-darkgrey-100 border-2 border-darkgrey-48 w-fit">
            <div className="relative w-[325px] h-[170px] blur-[1px] ">
                <Image
                    className="opacity-50"
                    alt={driveFile.name || ''}
                    src={driveFile?.thumbnailLink || ''}
                    fill={true}
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                <Popover
                    trigger={
                        <i className="fi fi-rr-menu-dots-vertical absolute grid place-items-center top-4 right-4 rounded-full cursor-pointer h-7 w-7 hover:bg-white-24"></i>
                    }
                    align="end"
                >
                    {menu}
                </Popover>
            </div>
            <div className="flex px-[18px] py-2 justify-between items-center">
                <div className="flex flex-col gap-[6px]">
                    <Tooltip tooltipContent={driveFile.name}>
                        <span className="text-body-m max-w-[238px] text-ellipsis overflow-hidden whitespace-nowrap">
                            {driveFile.name}
                        </span>
                    </Tooltip>
                    <div
                        className={`flex h-6 w-fit ${
                            sharedUsers.length > 0 ? 'pl-[11px]' : ''
                        } gap-2`}
                    >
                        {sharedUsers.length > 0 && (
                            <span className="h-6">
                                <ProfilePictureList ids={sharedUsers} />
                            </span>
                        )}
                        <span className="min-w-[84px] text-white-72">
                            {!Number.isNaN(driveFile.size) &&
                                driveFile.size &&
                                prettyBytes(Number.parseInt(driveFile.size))}
                        </span>
                    </div>
                </div>
                {driveFile.webViewLink && (
                    <a
                        href={driveFile.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fi fi-rr-download text-2xl text-white-72"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export const FileCardSkeleton = () => {
    return (
        <div className="flex flex-col rounded-3xl overflow-hidden bg-darkgrey-100 border-2 border-darkgrey-48">
            <div className="relative w-[325px] h-[170px] blur-[1px] ">
                <Skeleton width={325} height={170} />
            </div>
            <div className="flex px-[18px] py-2 justify-between items-center">
                <div className="flex flex-col gap-[6px]">
                    <Skeleton width={200} height={24} />
                    <div className="flex h-6 w-fit pl-[11px] gap-6">
                        <ProfilePictureListSkeleton />
                        <Skeleton width={16} height={16} />
                    </div>
                </div>
                <Skeleton width={24} height={24} />
            </div>
        </div>
    );
};
