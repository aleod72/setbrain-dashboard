import { Database, Task } from 'types/database';
import { createClient } from './supabase-browser';
import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { getFiles } from './files';
import { drive_v3 } from 'types/drive';

const supabase = createClient();

export const getTasksByProjectIdAndUserId = cache(
    async (projectId: string, userId: string) => {
        return await supabase
            .from('tasks')
            .select('*')
            .eq('project', projectId)
            .contains('assigned_users', '{' + userId + '}');
    }
);

export const getTaskById = cache(async (taskId: string) => {
    return await supabase.from('tasks').select('*').eq('id', taskId).single();
});

export const getAllTasksIds = cache(async () => {
    return await supabase.from('tasks').select('id');
});

export const getColorByUrgency = (
    dueDate: string,
    progress: number
): 'blue' | 'red' | 'yellow' | 'green' => {
    const todayTimestamp = new Date().getTime();
    const dueDateTimestamp = new Date(dueDate).getTime();

    const daysRemaining = Math.ceil(
        (dueDateTimestamp - todayTimestamp) / (1000 * 3600 * 24)
    );

    const percentageComplete = progress * 100;

    if (daysRemaining < 1 && percentageComplete < 100) {
        return 'red';
    } else if (daysRemaining < 3 && percentageComplete < 50) {
        return 'yellow';
    } else if (percentageComplete >= 100) {
        return 'blue';
    } else {
        return 'green';
    }
};

export function isTaskList(arg: any): arg is Task[] {
    return arg !== undefined;
}

export const getJoinedFiles = cache(async (taskId: string, supabase: SupabaseClient<Database>) => {
    const {data} = await supabase.from('tasks').select('joined_files').eq('id', taskId).limit(1);
    const defaultReturn = [];

    if (!data || !data[0].joined_files || data[0].joined_files?.length < 1) return defaultReturn;

    const fileIds = await supabase.from('files').select('drive_id').in('id', data[0].joined_files);

    if (fileIds.error) throw new Error(fileIds.error.message);
    if (!fileIds.data) return defaultReturn;

    const formattedFileIds = fileIds.data.map((file, index) => {
        if (!data[0].joined_files) return {};
        return {driveFileId: file.drive_id, fileId: data[0].joined_files[index]};
    });

    return formattedFileIds;
});

export const setSubTaskCompleted = cache(async (taskId, title, state) => {
    const {data} = await supabase.from('tasks').select('sub_tasks').eq('id', taskId).limit(1);

    if (!data || !data[0].sub_tasks) return;

    const subTasks = data[0].sub_tasks;


    if (!subTasks) return;

    const modifedSubTasks = subTasks.map((subTask) => {
        if (subTask['title'] == title && subTask) {
            subTask['finished'] = state;
        }
        return subTask;
    });

    await supabase.from('tasks').update({sub_tasks: modifedSubTasks}).eq('id', taskId);

    await supabase.from('tasks').update({progress: calculateProgress(modifedSubTasks)}).eq('id', taskId);
});

export const calculateProgress = (subTasks: any) => {
    if (!subTasks) return 0;

    const finishedTasks = subTasks.filter((task) => task['finished'] == true);

    return finishedTasks.length / subTasks.length;
};
