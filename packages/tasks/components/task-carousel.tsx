'use client';

import { profileContext } from 'auth/providers/profile-provider';
import Link from 'next/link';
import { projectContext } from 'projects/providers/project-provider';
import React, { useContext, use } from 'react';
import { Task } from 'types/database';
import { getTasksByProjectIdAndUserId } from 'utils/tasks';

import { TaskCard, TaskCardSkeleton } from './task-card';

function isTaskList(arg: any): arg is Task[] {
    return arg !== undefined;
}

export const TaskCarousel = () => {
    const project = useContext(projectContext);
    const user = useContext(profileContext);

    if (!user || !project) return <TaskCarouselSkeleton></TaskCarouselSkeleton>;

    const tasks = use(getTasksByProjectIdAndUserId(project.id, user.id)).data;

    if (!tasks) return <TaskCarouselSkeleton></TaskCarouselSkeleton>;

    return isTaskList(tasks) ? (<div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center px-5 md:px-0">
                <h1 className="font-bold text-subtitle-sb text-white-100">
                    Vos dernières tâches
                </h1>
                <Link
                    href="tasks"
                    className="text-body-b text-white-100 font-bold"
                >
                    Voir plus
                </Link>
            </div>
            <div className="flex w-full flex-wrap gap-6 overflow-x-scroll px-5 md:px-0 md:overflow-x-visible">
                {tasks.length > 0 ? (
                    tasks.map((task) => {
                        return (
                            <TaskCard
                                task={task}
                                key={'task-' + task.id}
                            ></TaskCard>
                        );
                    })
                ) : (
                    <span className="grid w-full place-items-center text-body-s text-white-48 h-52">
                        Vous n&apos;avez pas de tâches pour le moment
                    </span>
                )}
            </div>
        </div>
    ) : <TaskCarouselSkeleton></TaskCarouselSkeleton>;
};

export const TaskCarouselSkeleton = () => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center px-5 md:px-0">
                <h1 className="font-bold text-subtitle-sb text-white-100">
                    Vos dernières tâches
                </h1>
                <Link
                    href="tasks"
                    className="text-body-b text-white-100 font-bold"
                >
                    Voir plus
                </Link>
            </div>
            <div className="flex w-full gap-6 px-5 md:px-0 md:overflow-x-visible">
                <TaskCardSkeleton></TaskCardSkeleton>
                <TaskCardSkeleton></TaskCardSkeleton>
                <TaskCardSkeleton></TaskCardSkeleton>
            </div>
        </div>
    );
};
