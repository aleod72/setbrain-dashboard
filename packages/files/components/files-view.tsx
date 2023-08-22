import React from 'react';
import { getFilesOfProject } from 'utils/files';
import { createClient } from 'utils/supabase-server';
import { FileCard } from './file-card';

interface FilesViewProps {
    projectId: string;
}

export const FilesView = (async ({ projectId }: FilesViewProps) => {
    const supabase = createClient();
    const files = await getFilesOfProject(projectId, supabase);

    return (
        <div className="flex h-full flex-wrap gap-5 px-5">
            {files?.map((file, index) => (
                <FileCard key={index} driveFileId={file} />
            ))}
        </div>
    );
}) as unknown as React.FC<FilesViewProps>;
