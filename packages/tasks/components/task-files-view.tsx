'use client';

import React, { use } from 'react';
import { getJoinedFiles } from 'utils/tasks';
import { FileCard } from 'files/components/file-card';
import { useSupabase } from 'auth/providers/supabase-provider';

interface TaskFilesViewProps {
    taskId: string;
}

export const TaskFilesView = ({ taskId }: TaskFilesViewProps) => {
    const supabase = useSupabase().supabase;
    const fileIds = use(getJoinedFiles(taskId, supabase));

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-subtitle-sb font-body font-bold text-white-100">
                Pièces jointes{' '}
                <span className="text-body-r text-white-48 font-display">
                    ({fileIds.length})
                </span>
            </h1>
            <div className="flex flex-col gap-5">
                {fileIds &&
                    fileIds.length > 0 &&
                    fileIds.map((ids, index) => {
                        return (
                            <FileCard
                                key={index}
                                driveFileId={ids.driveFileId}
                            />
                        );
                    })}
                {fileIds.length === 0 && (
                    <div className="text-body-lm text-white-48">
                        Aucune pièce jointe
                    </div>
                )}
            </div>
        </div>
    );
};
