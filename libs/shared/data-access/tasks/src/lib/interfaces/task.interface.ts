import { Profile } from "@setbrain-dashboard/shared/data-access/users";

export interface Task {
  id?: string;
  created_at: Date;
  end_at: Date;
  title: string;
  assigned_users: Profile[] | string[];
  assigned_check: Profile[] | string[];
  description: object;
  sub_tasks: {
    id?: string,
    title: string,
    finished: boolean
  };
  type: string;
  comments: string[];
  joined_files: string[];
  progress: number;
  project: string
}
