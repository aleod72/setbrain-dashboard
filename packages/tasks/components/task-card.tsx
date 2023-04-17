import React from 'react';
import { Task } from 'types/database';
import { ProgressBar } from 'ui';
import { getColorByUrgency } from 'utils/tasks';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import { ProfilePictureList, ProfilePictureListSkeleton } from '../../auth/components/profile-picture-list';

interface TaskCardProps {
    task: Task;
}

export const TaskCard = ({task}: TaskCardProps) => {
    return <div className="flex flex-col justify-between border-2 rounded-2xl border-darkgrey-48 bg-darkgrey-100 py-3 px-4 w-full min-w-[300px] max-w-[345px] h-[13.5rem] cursor-pointer hover:border-darkgrey-86">
        <div className="flex justify-between items-end">
            <div className="px-1 py-0.5 bg-white-72 rounded-md w-fit text-pretitle font-medium text-black-100">{task.type && task.type.toUpperCase()}</div>
            <span className='h-6'>
                <ProfilePictureList ids={task.assigned_users ?? []}></ProfilePictureList>
            </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-1 flex-col">
                <h1 className="font-bold text-body-lb text-white-100 w-52">{task.title}</h1>
                <span className="text-body-s text-white-48">Pour le {dayjs(task.end_at).format('DD/MM/YY')}</span>
            </div>
            <ProgressBar progress={task.progress*100} max={100} intent={getColorByUrgency(task.end_at ?? '', task.progress)}></ProgressBar>
        </div>
        <div className="flex justify-between mt-3">
            <div className="flex gap-3">
                <span className="text-pretitle flex items-center gap-1"><i className="fi fi-rr-comment-alt text-white-100 text-body-l"></i> {task.comments?.length ?? 0}</span>
                <span className="text-pretitle flex items-center gap-1"><i className="fi fi-rr-clip text-white-100 text-body-l"></i> {task.joined_files?.length ?? 0}</span>
            </div>
            <a className="font-bold text-white-100 text-body-b">Voir plus</a>
        </div>
    </div>;
}

export const TaskCardSkeleton = () => {
    return <div className="flex flex-col justify-between border-2 rounded-2xl border-darkgrey-48 bg-darkgrey-100 py-3 px-4 w-full min-w-[300px] max-w-[345px] h-[13.5rem] cursor-pointer hover:border-darkgrey-86">
        <div className="flex justify-between items-end w-full">
            <Skeleton height={25} width={50}></Skeleton>
            <ProfilePictureListSkeleton />
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex gap-1 flex-col">
                <Skeleton height={25} width={250}></Skeleton>
                <Skeleton height={25} width={150}></Skeleton>
                <Skeleton height={10} width={100}></Skeleton>
            </div>
            <Skeleton height={40} width={'100%'}></Skeleton>
        </div>
    </div>;
}
