import { createClient } from './supabase-browser';

const supabase = createClient();

export async function getJobNames(names: string[]): Promise<string[]> {
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
}
