import React from "react";
import { getJoinedFiles } from "utils/tasks";
import { FileCard } from "files/components/file-card";

interface TaskFilesViewProps {
    taskId: string;
}

export const TaskFilesView = (async ({taskId}: TaskFilesViewProps) => {
    const files = await getJoinedFiles(taskId);

    console.log(files);

    return <div className='flex flex-col'>
        {
            files?.map((file, index) => {
                return <FileCard key={index} fileId={file.id} />;
            })
        }
    </div>;
}) as unknown as (props: TaskFilesViewProps) => JSX.Element;