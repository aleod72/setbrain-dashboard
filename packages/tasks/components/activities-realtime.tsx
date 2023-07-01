'use client';

import React from 'react';

import { useSupabase } from 'auth/providers/supabase-provider';
import { ActivityCard, ActivityCardSkeleton } from './activity-card';
import { Button } from 'ui/components/button/Button';

interface ActivitiesRealtimeProps {
    ids: number[];
    vertical?: boolean;
}

export const ActivitiesRealtime = ({
    ids,
    vertical = false,
}: ActivitiesRealtimeProps) => {
    const [activities, setActivities] = React.useState<number[]>(ids);
    const supabase = useSupabase().supabase;

    React.useEffect(() => {
        const channel = supabase
            .channel('realtime activities')
            .on(
                'postgres_changes',
                {
                    schema: 'public',
                    table: 'activities',
                    event: 'INSERT',
                },
                (payload) => {
                    setActivities([...activities, payload.new.id]);
                }
            )
            .on(
                'postgres_changes',
                {
                    schema: 'public',
                    table: 'activities',
                    event: 'DELETE',
                },
                (payload) => {
                    setActivities(
                        activities.filter((id) => id !== payload.old.id)
                    );
                }
            )
            .on(
                'postgres_changes',
                {
                    schema: 'public',
                    table: 'activities',
                    event: 'UPDATE',
                },
                (payload) => {
                    setActivities(
                        activities.map((id) =>
                            id === payload.old.id ? payload.new.id : id
                        )
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, activities, setActivities, ids]);

    return (
        <div
            className={`flex flex-col w-full relative ${
                vertical
                    ? 'max-w-[336px] h-full min-h-[300px]'
                    : 'md:grid md:grid-flow-col md:grid-rows-4 md:grid-cols-3  md:max-w-[646px]'
            } gap-2 bg-darkgrey-100 border-2 border-grey-72 rounded-3xl py-6 px-5`}
        >
            {activities.slice(0, 9).map((activity, index) => {
                return (
                    <ActivityCard
                        key={'activity-' + index}
                        activityId={activity}
                    ></ActivityCard>
                );
            })}
            {activities.length <= 6 && (
                <span className="col-start-3 col-end-3 row-start-2 text-body-s text-white-48 text-center translate-y-5 p-5 md:p-0">
                    Il n’y a pas d’autres travaux en cours pour le moment
                </span>
            )}
            {vertical && (
                <div className="w-full flex justify-center absolute bottom-0 left-0 py-6 px-5">
                    <Button iconLeft="plus" width="fit">
                        Partager mon travail
                    </Button>
                </div>
            )}
        </div>
    );
};

export const ActivitiesRealtimeSkeleton = ({
    vertical,
}: {
    vertical: boolean;
}) => {
    return (
        <div
            className={`flex flex-col w-full relative ${
                vertical
                    ? 'max-w-[336px] h-full min-h-[300px]'
                    : 'md:grid md:grid-flow-col md:grid-rows-4 md:grid-cols-3  md:max-w-[646px]'
            } gap-2 bg-darkgrey-100 border-2 border-grey-72 rounded-3xl py-6 px-5`}
        >
            <ActivityCardSkeleton />
            <ActivityCardSkeleton />
            <ActivityCardSkeleton />
            <ActivityCardSkeleton />
        </div>
    );
};
