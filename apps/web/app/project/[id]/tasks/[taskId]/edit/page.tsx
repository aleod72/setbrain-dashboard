import React from 'react';
import { TaskEditor } from 'tasks/components/task-editor';
import { BackHead } from '../../../back-head';

interface TaskEditorPageProps {
    params: {
        taskId: string;
    };
}

export default function Page({ params: { taskId } }: TaskEditorPageProps) {
    return (
        <div className="flex flex-col gap-6 p-8 md:p-0">
            <BackHead />
            <TaskEditor taskId={taskId} />
        </div>
    );
}
