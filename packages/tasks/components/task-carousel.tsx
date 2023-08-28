'use client';

import React, { use, useContext } from 'react';
import { projectContext } from 'projects/providers/project-provider';
import { profileContext } from 'auth/providers/profile-provider';
import {
    createTask,
    getTasksByProjectIdAndUserId,
    isTaskList,
} from 'utils/tasks';
import { TaskCard, TaskCardSkeleton } from './task-card';
import { Button } from 'ui/components/button/Button';
import { useRouter } from 'next/navigation';

export const TaskCarousel = () => {
    const project = useContext(projectContext);
    const user = useContext(profileContext);
    const router = useRouter();

    if (!user || !project) return <TaskCarouselSkeleton />;

    const tasks = use(getTasksByProjectIdAndUserId(project.id, user.id)).data;
    const handleCreateNewTask = async () => {
        const newTask = await createTask(project.id, user.id);

        router.push(`/project/${project.id}/tasks/${newTask.id}/edit`);
    };

    if (!tasks) return <TaskCarouselSkeleton />;

    return isTaskList(tasks) ? (
        <div className="flex flex-col gap-3 w-full md:w-fit">
            <div className="flex justify-between items-center px-5 md:px-0">
                <h1 className="font-bold text-subtitle-sb text-white-100">
                    Vos tâches
                </h1>
                <Button
                    iconLeft="plus"
                    small={true}
                    bold={true}
                    intent={'primary'}
                    onClick={handleCreateNewTask}
                >
                    Ajouter
                </Button>
            </div>
            <div className="md:grid md:grid-cols-2 md:w-fit flex flex-col w-full gap-4 overflow-x-scroll px-5 md:px-0">
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
    ) : (
        <TaskCarouselSkeleton />
    );
};

export const TaskCarouselSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 w-full md:w-fit">
            <div className="flex justify-between items-center px-5 md:px-0">
                <h1 className="font-bold text-subtitle-sb text-white-100">
                    Vos tâches
                </h1>
            </div>
            <div className="md:grid md:grid-cols-2 md:w-fit flex flex-col w-full gap-4 overflow-x-scroll px-5 md:px-0">
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
            </div>
        </div>
    );
};
