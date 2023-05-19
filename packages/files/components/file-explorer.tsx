'use client';

import React, { useContext, useEffect, use } from "react";
import { googleDriveContext } from "../providers/google-drive-provider";
import { getFileId, getFileParrent, getFilesIn } from 'utils/files';
import { File } from "types/database";
import { FileItem, FileItemSkeleton } from "./file-item";

export const FileExplorer = () => {
    const token = useContext(googleDriveContext);
    const [currentParent, setCurrentParent] = React.useState<string>('');
    const [currentFolder, setCurrentFolder] = React.useState<string>('root');
    const [files, setFiles] = React.useState<File[]>([]);
    const rootFolder = use(getFileId('root', token || ''));


    const navigationHandler = (fileId: string) => {
        setCurrentFolder(fileId);
        setFiles([]);
    };

    useEffect(() => {
        if(!token) return;

        getFilesIn(currentFolder, token).then(res => setFiles([...files, ...res.files]));

        if(currentFolder == rootFolder || currentFolder == 'root') {
            setCurrentParent('');
        }else {
            getFileParrent(currentFolder, token).then(res => {
                setCurrentParent(res ? res[0] : '');
            });
        }
    }, [token, currentFolder]);

    return <div className='flex flex-col gap-2'>
        {currentParent !== '' && <div className={`flex justify-between border-2 border-darkgrey-100 rounded-xl py-2 px-4 items-center bg-black-72`} onDoubleClick={() => navigationHandler(currentParent)}>
            <span className="text-sm">...</span>
        </div>}
        {files.sort((a, b) => {
                if(a.mimeType?.includes('folder') && !b.mimeType?.includes('folder')) return -1;
                if(!a.mimeType?.includes('folder') && b.mimeType?.includes('folder')) return 1;
                return 0;
        }).slice(0, 5).map(file => <FileItem key={file.id} file={file} onDoubleClick={navigationHandler}></FileItem>)}
        {files.length == 0 && <FileExplorerSkeleton />}
    </div>;
};

export const FileExplorerSkeleton = () => {
    return <div className='flex flex-col gap-2'>
        <FileItemSkeleton></FileItemSkeleton>
        <FileItemSkeleton></FileItemSkeleton>
        <FileItemSkeleton></FileItemSkeleton>
        <FileItemSkeleton></FileItemSkeleton>
        <FileItemSkeleton></FileItemSkeleton>
    </div>;
};