'use client';

import React, { use } from 'react';
import { FileCard } from 'files/components/file-card';
import { getJoinedFiles } from 'utils/tasks';
import { useSupabase } from 'auth/providers/supabase-provider';
import { Button } from 'ui/components/button/Button';
import { FileSourceChoiceDialog } from 'files/components/file-source-choice-dialog';
import { UploadFromDriveDialog } from 'files/components/upload-from-drive-dialog';
import { FileUploadDialog } from 'files/components/file-upload-dialog';
import { uploadFile } from 'utils/files';
import { profileContext } from 'auth/providers/profile-provider';
import { googleDriveContext } from 'files/providers/google-drive-provider';

interface TaskFileEditProps {
    taskId: string;
    sharedUsers: string[];
}

export const TaskFileEdit = ({ taskId, sharedUsers }: TaskFileEditProps) => {
    const supabase = useSupabase().supabase;
    const driveToken = React.useContext(googleDriveContext) || '';
    const fileIds = use(getJoinedFiles(taskId, supabase));
    const [currentFiles, setCurrentFiles] = React.useState<
        {
            driveFileId: string;
            fileId: string;
        }[]
    >(fileIds);
    const profile = React.useContext(profileContext);
    const [currentUploadFileId, setCurrentUploadFileId] = React.useState<
        string | undefined
    >(undefined);
    const driveFileUploadDialogButtonRef =
        React.useRef<HTMLButtonElement>(null);
    const fileUploadDialogButtonRef = React.useRef<HTMLButtonElement>(null);
    const handleDelete = async (fileId: string) => {
        setCurrentFiles((prev) =>
            prev.filter((file) => file.fileId !== fileId)
        );

        const currentFilesId = currentFiles
            .filter((file) => file.fileId !== fileId)
            .map((f) => f.fileId);

        await supabase
            .from('tasks')
            .update({ joined_files: currentFilesId })
            .match({
                id: taskId,
            });
    };

    const handleUpload = async (
        driveFileId: string,
        updatedSharedUsers: string[]
    ) => {
        if (!profile?.id) return;

        const file = await uploadFile(
            driveFileId,
            supabase,
            profile.id,
            updatedSharedUsers,
            driveToken,
            taskId
        );

        if (!file) return;
        if (file.error) throw file.error;
        if (!file.data || !file.data.id) return;

        await setCurrentFiles((prev) => [
            ...prev,
            {
                driveFileId: driveFileId,
                fileId: file.data.id,
            },
        ]);
        await supabase
            .from('tasks')
            .update({
                joined_files: [
                    ...currentFiles,
                    {
                        driveFileId: driveFileId,
                        fileId: file.data.id,
                    },
                ].map((file) => file.fileId),
            })
            .match({ id: taskId });
    };

    const handleSourceChoice = (source: string) => {
        if (source === 'drive') {
            driveFileUploadDialogButtonRef.current?.click();
        }
    };

    const handleFileSelect = (fileDriveId: string) => {
        setCurrentUploadFileId(fileDriveId);
        fileUploadDialogButtonRef.current?.click();
    };

    const fileCardMenu = (driveFileId: string) => (
        <div>
            <button className="px-6 py-1 hover:bg-lightgrey-86 flex items-center gap-2 outline-0">
                <i className="fi fi-rr-trash text-red-100 h-4 w-4 relative before:absolute before:top-0 before:left-0"></i>
                <span
                    className="text-red-100 text-sm"
                    onClick={() => handleDelete(driveFileId)}
                >
                    Supprimer
                </span>
            </button>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-subtitle-sb font-body font-bold text-white-100">
                Pièces jointes{' '}
                <span className="text-body-r text-white-48 font-display">
                    ({fileIds.length})
                </span>
            </h1>
            <div className="flex flex-col gap-5">
                {currentFiles.map((file, index) => (
                    <FileCard
                        driveFileId={file.driveFileId}
                        key={file.driveFileId + index}
                        menu={fileCardMenu(file.fileId)}
                    ></FileCard>
                ))}

                {currentFiles.length === 0 && (
                    <p>Il n&apos;y a pas de pièce jointe pour le moment</p>
                )}
            </div>
            <FileSourceChoiceDialog onClose={handleSourceChoice}>
                <Button fullWidth={true}>Uploader un fichier</Button>
            </FileSourceChoiceDialog>
            <UploadFromDriveDialog onSubmit={handleFileSelect}>
                <button ref={driveFileUploadDialogButtonRef}></button>
            </UploadFromDriveDialog>
            <FileUploadDialog
                onSubmit={handleUpload}
                driveFileId={currentUploadFileId || ''}
                defaultSharedUsers={sharedUsers}
            >
                <button ref={fileUploadDialogButtonRef}></button>
            </FileUploadDialog>
        </div>
    );
};
