'use client';

import React, { useContext, useEffect, use } from 'react';
import { googleDriveContext } from '../providers/google-drive-provider';
import { getFileId, getFileParrent, getFilesIn } from 'utils/files';
import { File } from 'types/database';
import { FileItem, FileItemSkeleton } from './file-item';

interface FileExplorerProps {
    full?: boolean;
    forSelection?: boolean;
    onSelection?: (fileId: string) => void;
}

export const FileExplorer = ({
    full = false,
    forSelection = false,
    onSelection,
}: FileExplorerProps) => {
    const token = useContext(googleDriveContext);
    const [currentParent, setCurrentParent] = React.useState<string>('');
    const [currentFolder, setCurrentFolder] = React.useState<string>('root');
    const [files, setFiles] = React.useState<File[]>([]);
    const rootFolder = use(getFileId('root', token || ''));

    const navigationHandler = (fileId: string, isFolder: boolean) => {
        if (forSelection && !isFolder) {
            onSelection && onSelection(fileId);
        } else {
            setCurrentFolder(fileId);
            setFiles([]);
        }
    };

    useEffect(() => {
        if (!token) return;

        getFilesIn(currentFolder, token).then((res) =>
            setFiles([...files, ...res.files])
        );

        if (currentFolder == rootFolder || currentFolder == 'root') {
            setCurrentParent('');
        } else {
            getFileParrent(currentFolder, token).then((res) => {
                setCurrentParent(res ? res[0] : '');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, currentFolder]);

    return (
        <div className="flex flex-col gap-2">
            {currentParent !== '' && (
                <div
                    className={`flex justify-between border-2 border-darkgrey-100 rounded-xl py-2 px-4 items-center bg-black-72`}
                    onDoubleClick={() => navigationHandler(currentParent, true)}
                >
                    <span className="text-sm">...</span>
                </div>
            )}
            {files
                .sort((a, b) => {
                    if (
                        a.mimeType?.includes('folder') &&
                        !b.mimeType?.includes('folder')
                    )
                        return -1;
                    if (
                        !a.mimeType?.includes('folder') &&
                        b.mimeType?.includes('folder')
                    )
                        return 1;
                    return 0;
                })
                .slice(0, full ? files.length : 5)
                .map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onDoubleClick={(fileId, isFolder) =>
                            navigationHandler(fileId, isFolder)
                        }
                    ></FileItem>
                ))}
            {files.length == 0 && <FileExplorerSkeleton />}
        </div>
    );
};

export const FileExplorerSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <FileItemSkeleton></FileItemSkeleton>
            <FileItemSkeleton></FileItemSkeleton>
            <FileItemSkeleton></FileItemSkeleton>
            <FileItemSkeleton></FileItemSkeleton>
            <FileItemSkeleton></FileItemSkeleton>
        </div>
    );
};
