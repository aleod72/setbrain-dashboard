import React from 'react';
import { TaskEditor } from 'tasks/components/task-editor';

interface TaskEditorPageProps {
    params: {
        taskId: string;
    };
}

export default function Page({ params: { taskId } }: TaskEditorPageProps) {
    return <TaskEditor taskId={taskId} />;
}
