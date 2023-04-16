'use client';

import React, { useContext } from "react";
import { projectContext } from 'projects/providers/project-provider';
import { profileContext } from 'auth/providers/profile-provider';
import { getTasksByProjectIdAndUserId } from 'utils/tasks';
import { Task } from 'types/database';
import { TaskCard } from "./task-card";
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { TaskCardSkeleton } from "./task-card";

function isTaskList(arg: any): arg is Task[]{
    return arg !== undefined;
}

export const TaskCarousel = () => {
    const [tasks, setTasks] = React.useState<Task[] | undefined>(undefined);
    const project = useContext(projectContext)
    const user = useContext(profileContext)
    
    React.useEffect(() => {
        if (!user || !project) return;
        getTasksByProjectIdAndUserId(project.id, user.id).then(res => {
            if(isTaskList(res.data)) setTasks(res.data);
        })
    }, [project, user])

    if(!tasks) return <TaskCarouselSkeleton></TaskCarouselSkeleton>

    return <div className="flex flex-col gap-1">
        <div className="flex justify-between">
            <h1 className="font-bold text-subtitle-sb text-white-100">Vos dernières tâches</h1>
            <Link href="tasks" className="text-body-b text-white-100 font-bold">Voir plus</Link>
        </div>
        <div className="flex w-full gap-6">
            {tasks.map(task => {
                return <TaskCard task={task} key={'task-' + task.id}></TaskCard>
            })}
        </div>
    </div>
    
}

export const TaskCarouselSkeleton = () => {
    return <div className="flex flex-col gap-1">
        <div className="flex justify-between">
            <h1 className="font-bold text-subtitle-sb text-white-100">Vos dernières tâches</h1>
            <Link href="tasks" className="text-body-b text-white-100 font-bold">Voir plus</Link>
        </div>
        <div className="flex w-full gap-6">
            <TaskCardSkeleton></TaskCardSkeleton>
            <TaskCardSkeleton></TaskCardSkeleton>
            <TaskCardSkeleton></TaskCardSkeleton>
        </div>
    </div>
}