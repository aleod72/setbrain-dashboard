import { ProfilePictureList } from 'auth/components/profile-picture-list';
import React from 'react';
import { getColorByUrgency, getTaskById } from 'utils/tasks';
import { ProfileTag } from 'auth/components/profile-tag';
import { TaskSubItem } from './task-sub-item';
import { SubTask } from 'types/database';
import parser from 'html-react-parser';
import dayjs from 'dayjs';
import { ProgressBar } from 'ui/components/progress-bar/ProgressBar';
import { Button } from 'ui/components/button/Button';
import Link from 'next/link';

interface TaskViewProps {
    taskId: string;
}

export const TaskView = (async ({ taskId }: TaskViewProps) => {
    const { data, error } = await getTaskById(taskId);

    if (error) return <div>Error loading task</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-2 w-full md:max-w-2xl">
            <div className="px-1 py-0.5 bg-white-72 rounded-md w-fit text-pretitle font-medium text-black-100">
                {data.type && data.type.toUpperCase()}
            </div>
            <h1 className="text-title-h3 w-full font-bold font-body">
                {data.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="h-10 pl-0 md:pl-3">
                    <ProfilePictureList ids={data.assigned_users || []} />
                </div>
                {data.assigned_users && (
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-[1px] bg-white-100 hidden md:visible"></div>
                        <span className="text-body-lm text-white-48">
                            {' '}
                            Vérification :
                        </span>
                        <ProfileTag id={data.assigned_users[0]} />
                    </div>
                )}
            </div>
            <span className="text-body-m text-white-48 mt-3 md:mt-0">
                Pour le {dayjs(data.end_at).format('DD/MM/YY')}
            </span>
            <div>
                {data.description != ''
                    ? parser(data.description)
                    : 'Aucune description'}
            </div>
            <div className="flex flex-col gap-2 mt-4">
                {data.sub_tasks &&
                    data.sub_tasks.map((subTask, index) => {
                        const parsedTask = subTask as unknown as SubTask;

                        return (
                            <TaskSubItem
                                key={index}
                                taskId={taskId}
                                subTask={parsedTask}
                            />
                        );
                    })}
            </div>
            <div className="flex justify-between items-center mt-6">
                <div className="w-full md:w-72">
                    <ProgressBar
                        progress={data.progress * 100}
                        max={100}
                        intent={getColorByUrgency(
                            data.end_at || '',
                            data.progress
                        )}
                    />
                </div>
                <Link href={taskId + '/edit'} className="hidden md:visible">
                    <Button iconLeft="pencil">Modifier</Button>
                </Link>
            </div>
        </div>
    );
    // eslint-disable-next-line no-unused-vars
}) as unknown as (props: TaskViewProps) => JSX.Element;
