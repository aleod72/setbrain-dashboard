import { TaskView } from 'tasks/components/task-view';
import { TaskFilesView } from 'tasks/components/task-files-view';

interface TaskPageProps {
    params: {
        taskId: string;
    };
}

export default function TaskPage({ params: { taskId } }: TaskPageProps) {
    return (
        <div className="flex gap-12">
            <TaskView taskId={taskId} />
            <TaskFilesView taskId={taskId} />
        </div>
    );
}
