import { Database, SubTask, Task } from 'types/database';
import { createClient } from './supabase-browser';
import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

const supabase = createClient();

export const getTasksByProjectIdAndUserId = cache(
    async (projectId: string, userId: string) => {
        return supabase
            .from('tasks')
            .select('*')
            .eq('project', projectId)
            .contains('assigned_users', '{' + userId + '}');
    }
);

export const getTaskById = cache(async (taskId: string) => {
    return supabase.from('tasks').select('*').eq('id', taskId).single();
});

export const getAllTasksIds = cache(async () => {
    return supabase.from('tasks').select('id');
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

export const getJoinedFiles = cache(
    async (taskId: string, supabase: SupabaseClient<Database>) => {
        const { data } = await supabase
            .from('tasks')
            .select('joined_files')
            .eq('id', taskId)
            .limit(1);
        const defaultReturn: Array<any> = [];

        if (!data || !data[0].joined_files || data[0].joined_files?.length < 1)
            return defaultReturn;

        const fileIds = await supabase
            .from('files')
            .select('drive_id')
            .in('id', data[0].joined_files);

        if (fileIds.error) throw new Error(fileIds.error.message);
        if (!fileIds.data) return defaultReturn;

        const formattedFileIds = fileIds.data.map((file, index) => {
            if (!data[0].joined_files) return {};
            return {
                driveFileId: file.drive_id,
                fileId: data[0].joined_files[index],
            };
        });

        return formattedFileIds;
    }
);

export const isSubTaskList = (arg: any): arg is SubTask[] => {
    return arg !== undefined;
};

export const setSubTaskCompleted = cache(
    async (taskId: string, title: string, state: boolean) => {
        const { data } = await supabase
            .from('tasks')
            .select('sub_tasks')
            .eq('id', taskId)
            .limit(1);

        if (!data || !data[0].sub_tasks) return;

        const subTasks = data[0].sub_tasks;

        if (!subTasks) return;

        const modifedSubTasks = subTasks.map((subTask) => {
            const parsedSubTask = JSON.parse(
                JSON.stringify(subTask)
            ) as SubTask;

            if (parsedSubTask['title'] == title && subTask) {
                parsedSubTask['finished'] = state;
            }
            return subTask;
        });

        if (!isSubTaskList(modifedSubTasks)) return;

        await supabase
            .from('tasks')
            .update({ sub_tasks: modifedSubTasks })
            .eq('id', taskId);

        await supabase
            .from('tasks')
            .update({ progress: calculateProgress(modifedSubTasks) })
            .eq('id', taskId);
    }
);

export const calculateProgress = (subTasks: SubTask[]) => {
    if (!subTasks) return 0;

    const finishedTasks = subTasks.filter(
        (subTask) => subTask['finished'] == true
    );

    return finishedTasks.length / subTasks.length;
};

export const createTask = async (
    project: string,
    user: string
): Promise<Task> => {
    const { data, error } = await supabase
        .from('tasks')
        .insert({ project, progress: 0, assigned_users: [user] })
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
};
