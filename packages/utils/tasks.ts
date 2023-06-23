import { Task } from 'types/database';
import { createClient } from './supabase-browser';
import { cache } from 'react';

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

export const getJoinedFiles = cache(async (taskId: string) => {
    const {data} = await supabase.from('tasks').select('joined_files').eq('id', taskId).limit(1);

    if (!data) return [];
    if (!data[0].joined_files?.length) return [];
    if(data[0].joined_files?.length < 1) return [];

    console.log(await supabase.auth.getUser());

    const files = await supabase.from('files').select('*').in('id', data[0].joined_files);

    console.log(files);

    return files.data;
});