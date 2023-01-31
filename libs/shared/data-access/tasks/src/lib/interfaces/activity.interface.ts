import {Task} from "./task.interface";

export interface Activity {
  id?: number;
  title: string;
  users_id: string[];
  project_id: string;
  software: string;
  created_at: string;
  share_links: string[];
  task: Task;
}
