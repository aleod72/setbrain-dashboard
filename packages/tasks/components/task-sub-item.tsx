import React from "react";
import { SubTask } from "types/database";
import { Checkbox } from "ui/components/checkbox/Checkbox";

interface TaskSubItemProps {
    subTask: SubTask;
}

export const TaskSubItem = ({subTask}: TaskSubItemProps) => {
    return <div className='bg-black-72 px-4 py-3 rounded-xl w-full flex justify-between items-center'>
        <span>{subTask.title}</span>
        <div className='flex'>
            {subTask.linkedDocuments && <a>{subTask.linkedDocuments[0]}</a>}
            <Checkbox />
        </div>
    </div>;
};