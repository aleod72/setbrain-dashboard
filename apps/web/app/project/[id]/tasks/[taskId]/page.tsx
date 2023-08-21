import { TaskView } from 'tasks/components/task-view';
import { TaskFilesView } from 'tasks/components/task-files-view';
import { BackHead } from '../../back-head';

interface TaskPageProps {
    params: {
        taskId: string;
    };
}

export default function TaskPage({ params: { taskId } }: TaskPageProps) {
    return (
        <div className="flex flex-col gap-6 p-8 md:p-0">
            <BackHead />
            <div className="flex flex-col md:flex-row gap-12">
                <TaskView taskId={taskId} />
                <TaskFilesView taskId={taskId} />
            </div>
        </div>
    );
}
