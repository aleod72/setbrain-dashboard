import React from 'react';
import { getActiviyById } from 'utils/activities';
import { SoftwaresIcons } from 'types/softwares';
import dayjs from 'dayjs';
import { ProfilePictureList } from 'auth/components/profile-picture-list';
import { Button } from 'ui';

interface ActivityCardProps {
    activityId: number;
}

export const ActivityCard = ({activityId}: ActivityCardProps) => {
    const [activity, setActivity] = React.useState<any>(null);
    const [duration, setDuration] = React.useState<number>(0);

    React.useEffect(() => {
        const fetchActivity = async () => {
            const {data} = await getActiviyById(activityId);
            if(!data) return null;
            setActivity(data);
            setDuration(Math.round(dayjs().diff(dayjs(activity.created_at).locale('fr'), 'minutes')));
        }
        fetchActivity();
    }, [activity, setActivity, activityId, setDuration]);
    
    if(!activity) return null;
    
    return <div className='flex justify-between'>      
        <div className='flex gap-2'>
            <span className='w-9 h-9 block rounded-lg' style={{backgroundImage: 'url(' + SoftwaresIcons[activity.software as keyof typeof SoftwaresIcons] + ')'}}></span>
            <div className='flex flex-col'>
                <div className='flex gap-1 items-center'>
                    <span className='text-body-s truncate w-fit max-w-[45px] overflow-hidden'>{activity.title}</span> 
                    <span className='text-body-vs text-white-48'>depuis {duration > 60 ? Math.round(duration / 60) + 'h': duration + 'min'}</span>
                </div>
                <span className='h-4 w-9 ml-3'>
                    <ProfilePictureList ids={activity.users_id  ?? []}></ProfilePictureList>
                </span>
            </div>
        </div>
        
        <Button small={true}>Ouvrir</Button>
    </div>
};