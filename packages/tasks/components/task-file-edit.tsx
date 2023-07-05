'use client';

import React, { use } from 'react';
import { FileCard } from 'files/components/file-card';
import { getJoinedFiles } from 'utils/tasks';
import { useSupabase } from 'auth/providers/supabase-provider';
import { Button } from 'ui/components/button/Button';
import { FileSourceChoiceDialog } from 'files/components/file-source-choice-dialog';

interface TaskFileEditProps {
    taskId: string;
}

export const TaskFileEdit = ({ taskId }: TaskFileEditProps) => {
    const supabase = useSupabase().supabase;
    const fileIds = use(getJoinedFiles(taskId, supabase));
    const [currentFiles, setCurrentFiles] = React.useState<
        {
            driveFileId: string;
            fileId: string;
        }[]
    >(fileIds);
    const handleDelete = async (fileId: string) => {
        setCurrentFiles((prev) =>
            prev.filter((file) => file.fileId !== fileId)
        );
        await supabase.from('files').delete().match({ id: fileId });
    };
    const fileCardMenu = (fileId: string) => (
        <div>
            <button className="px-6 py-1 hover:bg-lightgrey-86 flex items-center gap-2 outline-0">
                <i className="fi fi-rr-trash text-red-100 h-4 w-4 relative before:absolute before:top-0 before:left-0"></i>
                <span
                    className="text-red-100 text-sm"
                    onClick={() => handleDelete(fileId)}
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
            </div>
            <FileSourceChoiceDialog
                onClose={() => {}}
                trigger={<Button fullWidth={true}>Uploader un fichier</Button>}
            />
        </div>
    );
};
