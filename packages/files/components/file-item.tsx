import React from 'react';
import { drive_v3 } from 'types/drive';
import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import { Skeleton } from 'ui/components/skeleton/Skeleton';

interface FileItemProps {
    file: drive_v3.Schema$File;
    onDoubleClick?: (fileId: string) => void;
}

const FileExtensionToIcon = {
    'docx': 'fi-sr-file-word',
    'doc': 'fi-sr-poll-h',
    'xlsx': 'fi-sr-file-excel',
    'xls': 'fi-sr-file-excel',
    'pptx': 'fi-sr-file-powerpoint',
    'ppt': 'fi-sr-file-powerpoint',
    'pdf': 'fi-sr-file-pdf',
    'zip': 'fi-sr-file-zip',
    'rar': 'fi-sr-file-zip',
    '7z': 'fi-sr-file-zip',
    'mp3': 'fi-sr-file-audio',
    'mp4': 'fi-sr-file-video',
    'png': 'fi-sr-picture',
    'jpg': 'fi-sr-picture',
    'jpeg': 'fi-sr-picture',
    'gif': 'fi-sr-gif',
    'svg': 'fi-sr-svg',
    'txt': 'fi-sr-document',
    '': 'fi-sr-file'
};

const GoogleAppsToIcon = {
    'application/vnd.google-apps.document': 'fi-sr-poll-h',
    'application/vnd.google-apps.spreadsheet': 'fi-sr-file-spreadsheet',
    'application/vnd.google-apps.presentation': 'fi-sr-file-powerpoint',
    'application/vnd.google-apps.form': 'fi-sr-file-form',
    'application/vnd.google-apps.script': 'fi-sr-file-script',
    '': 'fi-sr-file'
};

export const FileItem = ({ file, onDoubleClick }: FileItemProps) => {
    const isFolder = file.mimeType?.includes('folder');
    const iconName = isFolder ? 'fi-sr-folder' : file.mimeType?.includes('google-apps') ? GoogleAppsToIcon[file.mimeType] || 'fi-sr-file' : FileExtensionToIcon[file.fileExtension || ''] || 'fi-sr-file';
    const backgroundColor = isFolder ? 'bg-black-72' : 'border-2 border-darkgrey-100';

    return (
        <div className={`flex justify-between rounded-xl py-2 px-4 items-center ${backgroundColor}`} onDoubleClick={() => isFolder && onDoubleClick && onDoubleClick(file.id || '')}>
            <div className="flex gap-4 items-center">
                <i className={iconName}></i>
                <div className="flex flex-col gap-[2px]">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs mr-2 text-white-48">modifié le {dayjs(file.modifiedTime).format('DD/MM/YY')}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs mr-2">{file.size && !isFolder && !Number.isNaN(file.size) && prettyBytes(Number.parseInt(file.size))}</span>
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