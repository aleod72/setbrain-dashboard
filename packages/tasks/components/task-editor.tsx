import React from 'react';
import { getTaskById } from 'utils/tasks';
import { TaskEditableTitle } from './task-editable-title';
import { TagSelector } from './tag-selector';
import { TaskDatePicker } from './task-date-piker';
import { TaskUserSharing } from './task-user-sharing';
import { TaskUserAssignement } from './task-user-assignement';
import { TaskDescriptionEditor } from './task-description-editor';
import { TaskFileEdit } from './task-file-edit';

interface TaskEditorProps {
    taskId: string;
}

export const TaskEditor = (async ({ taskId }: TaskEditorProps) => {
    const { data, error } = await getTaskById(taskId);

    if (error) return <div>Error loading task</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex gap-12">
            <div className="flex-col flex w-[592px]">
                <div className="flex gap-3">
                    <TagSelector taskId={taskId} defaultTag={data.type || ''} />
                    <TaskDatePicker
                        taskId={taskId}
                        defaultDate={new Date(data.end_at || '')}
                    />
                </div>
                <TaskEditableTitle taskId={taskId} defaultTile={data.title} />
                <div className="flex items-center gap-3">
                    <TaskUserSharing
                        taskId={taskId}
                        profileIds={data.assigned_users || []}
                    ></TaskUserSharing>
                    <div className="h-5 w-[1px] bg-white-72"></div>
                    <span className="text-body-lm text-white-48">
                        {' '}
                        Vérification :
                    </span>
                    <TaskUserAssignement
                        taskId={taskId}
                        assignedProfile={data.assigned_check?.[0] || ''}
                    ></TaskUserAssignement>
                </div>
                <TaskDescriptionEditor
                    desription={data.description}
                    taskId={taskId}
                />
            </div>
            <TaskFileEdit
                taskId={taskId}
                sharedUsers={data.assigned_users || []}
            />
        </div>
    );
}) as unknown as React.FC<TaskEditorProps>;
