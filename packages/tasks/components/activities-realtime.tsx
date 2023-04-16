'use client';

import React from 'react';
import { ActivityCard } from './activity-card';
import { useSupabase } from '../../auth/providers/supabase-provider';

interface ActivitiesRealtimeProps {
    ids: number[];
}

export const ActivitiesRealtime = ({ids}: ActivitiesRealtimeProps) => {
    const [activities, setActivities] = React.useState<number[]>(ids);
    const supabase = useSupabase().supabase;

    React.useEffect(() => {
        const channel = supabase
            .channel('realtime activities')
            .on('postgres_changes', {
                schema: 'public',
                table: 'activities',
                event: 'INSERT'
            }, (payload) => {
                setActivities([...activities, payload.new.id]);
            })
            .on('postgres_changes', {
                schema: 'public',
                table: 'activities',
                event: 'DELETE'
            }, (payload) => {
                setActivities(activities.filter((id) => id !== payload.old.id));
            })
            .on('postgres_changes', {
                schema: 'public',
                table: 'activities',
                event: 'UPDATE'
            }, (payload) => {
                setActivities(activities.map((id) => id === payload.old.id ? payload.new.id : id));
            })
            .subscribe();
        return () => {
           supabase.removeChannel(channel);
        }
    }, [supabase, activities, setActivities]);

    return <div className='grid grid-flow-col grid-rows-4 grid-cols-3 gap-2 bg-darkgrey-100 border-2 border-grey-72 rounded-3xl py-6 px-5 w-[676px]'>
        {
            activities.map((activity, index) => {
                return <ActivityCard key={'activity-' + index} activityId={activity}></ActivityCard>
            })
        }
        {true && <span className='col-start-3 col-end-3 row-start-2 text-body-s text-white-48 translate-y-5'>
            Il n’y a pas d’autres travaux en cours pour le moment    
        </span>}
    </div>
};