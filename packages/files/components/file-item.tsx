import React, { use } from 'react';
import { File } from 'types/database';
import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import { Skeleton } from 'ui/components/skeleton/Skeleton';
import { getFileSharedUsers } from 'utils/files';
import { useSupabase } from 'auth/providers/supabase-provider';
import { ProfilePictureList } from 'auth/components/profile-picture-list';

interface FileItemProps {
    file: File;
    onDoubleClick?: (fileId: string) => void;
}

const FileExtensionToIcon = {
    'docx': 'fi-rr-file-word',
    'doc': 'fi-rr-poll-h',
    'xlsx': 'fi-rr-file-excel',
    'xls': 'fi-rr-file-excel',
    'pptx': 'fi-rr-file-powerpoint',
    'ppt': 'fi-rr-file-powerpoint',
    'pdf': 'fi-rr-file-pdf',
    'zip': 'fi-rr-file-zip',
    'rar': 'fi-rr-file-zip',
    '7z': 'fi-rr-file-zip',
    'mp3': 'fi-rr-file-audio',
    'mp4': 'fi-rr-file-video',
    'png': 'fi-rr-picture',
    'jpg': 'fi-rr-picture',
    'jpeg': 'fi-rr-picture',
    'gif': 'fi-rr-gif',
    'svg': 'fi-rr-svg',
    'txt': 'fi-rr-document',
    '': 'fi-rr-file'
};

const GoogleAppsToIcon = {
    'application/vnd.google-apps.document': 'fi-rr-poll-h',
    'application/vnd.google-apps.spreadsheet': 'fi-rr-file-spreadsheet',
    'application/vnd.google-apps.presentation': 'fi-rr-file-powerpoint',
    'application/vnd.google-apps.form': 'fi-rr-file-form',
    'application/vnd.google-apps.script': 'fi-rr-file-script',
    '': 'fi-rr-file'
};

export const FileItem = ({ file, onDoubleClick }: FileItemProps) => {
    const supabase = useSupabase().supabase;
    const isFolder = file.mimeType?.includes('folder');
    const iconName = isFolder ? 'fi-sr-folder' : file.mimeType?.includes('google-apps') ? GoogleAppsToIcon[file.mimeType] || 'fi-sr-file' : FileExtensionToIcon[file.fileExtension || ''] || 'fi-sr-file';
    const backgroundColor = isFolder ? 'bg-black-72' : 'border-2 border-darkgrey-100';
    const shared_users = use(getFileSharedUsers(file.id || '', supabase));

    return (
        <div className={`flex justify-between rounded-xl py-2 px-4 items-center ${backgroundColor}`} onDoubleClick={() => isFolder && onDoubleClick && onDoubleClick(file.id || '')}>
            <div className="flex gap-4 items-center">
                <i className={iconName + ' text-white-72'}></i>
                <div className="flex flex-col gap-[2px]">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs mr-2 text-white-48">modifié le {dayjs(file.modifiedTime).format('DD/MM/YY')}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs mr-2">{file.size && !isFolder && !Number.isNaN(file.size) && prettyBytes(Number.parseInt(file.size))}</span>
                <div className='h-6'>
                    <ProfilePictureList ids={shared_users}></ProfilePictureList>
                </div>
                <i className="fi fi-sr-menu-dots h-5 "></i>
            </div>
        </div>
    );
};

export const FileItemSkeleton = () => {
    return <div className='flex justify-between rounded-xl py-2 px-4 items-center border-2 border-darkgrey-100'>
        <div className="flex gap-4 items-center">
            <Skeleton width={24} height={24} className="rounded-full"></Skeleton>
            <div className="flex flex-col gap-[2px]">
                <Skeleton width={100} height={16}></Skeleton>
                <Skeleton width={50} height={16}></Skeleton>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <Skeleton width={50} height={16}></Skeleton>
            <i className="fi fi-sr-menu-dots h-5 "></i>
        </div>
    </div>;
};
