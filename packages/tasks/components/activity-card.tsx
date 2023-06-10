import {
    ProfilePictureList,
    ProfilePictureListSkeleton,
} from 'auth/components/profile-picture-list';
import dayjs from 'dayjs';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Activity } from 'types/database';
import { SoftwaresIcons } from 'types/softwares';
import { Button } from 'ui/components/button/Button';
import { getActivityById } from 'utils/activities';

interface ActivityCardProps {
    activityId: number;
}

const isActivity = (activity: any): activity is Activity => {
    return (
        activity &&
        activity.id &&
        activity.title &&
        activity.software &&
        activity.created_at &&
        activity.users_id
    );
};

export const ActivityCard = ({ activityId }: ActivityCardProps) => {
    const [activity, setActivity] = React.useState<Activity | undefined>(
        undefined
    );
    const [duration, setDuration] = React.useState<number>(0);

    React.useEffect(() => {
        const fetchActivity = async () => {
            const { data } = await getActivityById(activityId);

            if (!isActivity(data)) return null;
            setActivity(data);
            setDuration(
                Math.round(
                    dayjs().diff(dayjs(data.created_at).locale('fr'), 'minutes')
                )
            );
        };

        fetchActivity();
    }, [activityId]);

    if (!activity) return <ActivityCardSkeleton />;

    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <span
                    className="w-9 h-9 block rounded-lg bg-center bg-contain"
                    style={{
                        backgroundImage:
                            'url(' +
                            SoftwaresIcons[
                                activity.software as keyof typeof SoftwaresIcons
                            ] +
                            ')',
                    }}
                ></span>
                <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                        <span className="text-body-s truncate w-fit max-w-[45px] overflow-hidden">
                            {activity.title}
                        </span>
                        <span className="text-body-vs text-white-48">
                            depuis{' '}
                            {duration > 60
                                ? Math.round(duration / 60) + 'h'
                                : duration + 'min'}
                        </span>
                    </div>
                    <span className="h-4 w-9 ml-3">
                        <ProfilePictureList
                            ids={activity.users_id ?? []}
                        ></ProfilePictureList>
                    </span>
                </div>
            </div>

            <Button small={true}>Ouvrir</Button>
        </div>
    );
};

export const ActivityCardSkeleton = () => {
    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <span className="w-9 h-9 block">
                    <Skeleton
                        width={'100%'}
                        height={'100%'}
                        baseColor="#5b5b5b"
                        highlightColor="#6a6a6a"
                        borderRadius={12}
                    ></Skeleton>
                </span>
                <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                        <span className="w-full">
                            <Skeleton baseColor="#5b5b5b" highlightColor="#6a6a6a" width={100}></Skeleton>
                        </span>
                    </div>
                    <span className="h-4 w-full ml-3">
                        <ProfilePictureListSkeleton></ProfilePictureListSkeleton>
                    </span>
                </div>
            </div>

            <Skeleton width={50} height={'80%'} borderRadius={12} baseColor="#5b5b5b" highlightColor="#6a6a6a"></Skeleton>
        </div>
    );
};
