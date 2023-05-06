import { createClient } from './supabase-browser';
import { cache } from 'react';

const supabase = createClient();

export const getJobNames = cache(async (names: string[]): Promise<string[]> => {
    const { data } = await supabase
        .from('jobs')
        .select('display_name')
        .in('name', names);

    if (data) {
        return data.map((job) => {
            return job.display_name;
        });
    }

    return [];
});
