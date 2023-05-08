import { createClient } from './supabase-browser';
import { cache } from 'react';

const supabase = createClient();

export const getTasksByProjectIdAndUserId = cache(async (
    projectId: string,
    userId: string
) => {
    return await supabase
        .from('tasks')
        .select('*')
        .eq('project', projectId)
        .contains('assigned_users', '{' + userId + '}');
});

export const getAllTasksIds = cache(async () => {
    return await supabase.from('tasks').select('id');
});

export const getColorByUrgency =(
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
