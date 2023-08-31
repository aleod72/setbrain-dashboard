'use client';

import React from 'react';
import { SubTask } from 'types/database';
import { Checkbox } from 'ui/components/checkbox/Checkbox';
import { setSubTaskCompleted } from 'utils/tasks';

interface TaskSubItemProps {
    subTask: SubTask;
    taskId: string;
}

export const TaskSubItem = ({ subTask, taskId }: TaskSubItemProps) => {
    const [checked, setChecked] = React.useState(subTask.finished);

    React.useEffect(() => {
        if (checked === subTask.finished) {
            return
        }
        setSubTaskCompleted(taskId, subTask.title, checked);
    }, [checked, subTask, taskId]);

    return (
        <div className="bg-black-72 px-4 py-3 rounded-xl w-full flex justify-between items-center">
            <span>{subTask.title}</span>
            <div className="flex">
                {subTask.linkedDocuments && <a>{subTask.linkedDocuments[0]}</a>}
                <Checkbox
                    checked={checked}
                    onCheckedChange={() => setChecked(!checked)}
                />
            </div>
        </div>
    );
};
