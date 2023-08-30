import { drive_v3 } from './drive';

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            activities: {
                Row: {
                    created_at: string | null;
                    id: number;
                    project_id: string | null;
                    share_links: string[] | null;
                    software: string | null;
                    task: string | null;
                    title: string | null;
                    users_id: string[] | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    project_id?: string | null;
                    share_links?: string[] | null;
                    software?: string | null;
                    task?: string | null;
                    title?: string | null;
                    users_id?: string[] | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    project_id?: string | null;
                    share_links?: string[] | null;
                    software?: string | null;
                    task?: string | null;
                    title?: string | null;
                    users_id?: string[] | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'activities_task_fkey';
                        columns: ['task'];
                        referencedRelation: 'tasks';
                        referencedColumns: ['id'];
                    },
                ];
            };
            articles: {
                Row: {
                    content: string | null;
                    created_at: string;
                    edited_at: string | null;
                    id: string;
                    project_id: string | null;
                    published: boolean | null;
                    title: string;
                };
                Insert: {
                    content?: string | null;
                    created_at?: string;
                    edited_at?: string | null;
                    id?: string;
                    project_id?: string | null;
                    published?: boolean | null;
                    title?: string;
                };
                Update: {
                    content?: string | null;
                    created_at?: string;
                    edited_at?: string | null;
                    id?: string;
                    project_id?: string | null;
                    published?: boolean | null;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'articles_project_id_fkey';
                        columns: ['project_id'];
                        referencedRelation: 'projects';
                        referencedColumns: ['id'];
                    },
                ];
            };
            'chat-messages': {
                Row: {
                    created_at: string | null;
                    id: number;
                    message: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    message?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    message?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'chat-messages_user_id_fkey';
                        columns: ['user_id'];
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
            };
            files: {
                Row: {
                    creator: string;
                    drive_id: string;
                    id: string;
                    shared_users: string[];
                };
                Insert: {
                    creator: string;
                    drive_id?: string;
                    id?: string;
                    shared_users: string[];
                };
                Update: {
                    creator?: string;
                    drive_id?: string;
                    id?: string;
                    shared_users?: string[];
                };
                Relationships: [
                    {
                        foreignKeyName: 'files_creator_fkey';
                        columns: ['creator'];
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
            };
            jobs: {
                Row: {
                    created_at: string | null;
                    display_name: string;
                    id: number;
                    name: string;
                    permissions: string[] | null;
                };
                Insert: {
                    created_at?: string | null;
                    display_name?: string;
                    id?: number;
                    name: string;
                    permissions?: string[] | null;
                };
                Update: {
                    created_at?: string | null;
                    display_name?: string;
                    id?: number;
                    name?: string;
                    permissions?: string[] | null;
                };
                Relationships: [];
            };
            profiles: {
                Row: {
                    avatar_url: string | null;
                    email: string;
                    firstname: string;
                    id: string;
                    lastname: string;
                    updated_at: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    email: string;
                    firstname: string;
                    id: string;
                    lastname: string;
                    updated_at?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    email?: string;
                    firstname?: string;
                    id?: string;
                    lastname?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'profiles_id_fkey';
                        columns: ['id'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            projects: {
                Row: {
                    created_at: string | null;
                    end_date: string | null;
                    id: string;
                    name: string;
                    project_icon_url: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    end_date?: string | null;
                    id?: string;
                    name: string;
                    project_icon_url?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    end_date?: string | null;
                    id?: string;
                    name?: string;
                    project_icon_url?: string | null;
                };
                Relationships: [];
            };
            'support-messages': {
                Row: {
                    content: string;
                    created_at: string | null;
                    id: string;
                    parent_id: string | null;
                    subject: string;
                };
                Insert: {
                    content?: string;
                    created_at?: string | null;
                    id?: string;
                    parent_id?: string | null;
                    subject?: string;
                };
                Update: {
                    content?: string;
                    created_at?: string | null;
                    id?: string;
                    parent_id?: string | null;
                    subject?: string;
                };
                Relationships: [];
            };
            'task-comments': {
                Row: {
                    childrens: string[] | null;
                    content: string;
                    created_at: string;
                    id: string;
                    task_id: string;
                    user_id: string;
                };
                Insert: {
                    childrens?: string[] | null;
                    content?: string;
                    created_at?: string;
                    id?: string;
                    task_id: string;
                    user_id: string;
                };
                Update: {
                    childrens?: string[] | null;
                    content?: string;
                    created_at?: string;
                    id?: string;
                    task_id?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'task-comments_task_id_fkey';
                        columns: ['task_id'];
                        referencedRelation: 'tasks';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'task-comments_user_id_fkey';
                        columns: ['user_id'];
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
            };
            tasks: {
                Row: {
                    assigned_check: string[] | null;
                    assigned_users: string[] | null;
                    comments: string[] | null;
                    created_at: string | null;
                    description: string;
                    end_at: string | null;
                    id: string;
                    joined_files: string[] | null;
                    progress: number;
                    project: string;
                    sub_tasks: Json[];
                    title: string;
                    type: string | null;
                };
                Insert: {
                    assigned_check?: string[] | null;
                    assigned_users?: string[] | null;
                    comments?: string[] | null;
                    created_at?: string | null;
                    description?: string;
                    end_at?: string | null;
                    id?: string;
                    joined_files?: string[] | null;
                    progress: number;
                    project: string;
                    sub_tasks?: Json[];
                    title?: string;
                    type?: string | null;
                };
                Update: {
                    assigned_check?: string[] | null;
                    assigned_users?: string[] | null;
                    comments?: string[] | null;
                    created_at?: string | null;
                    description?: string;
                    end_at?: string | null;
                    id?: string;
                    joined_files?: string[] | null;
                    progress?: number;
                    project?: string;
                    sub_tasks?: Json[];
                    title?: string;
                    type?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'tasks_project_fkey';
                        columns: ['project'];
                        referencedRelation: 'projects';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            delete_claim: {
                Args: {
                    uid: string;
                    claim: string;
                };
                Returns: string;
            };
            get_claim: {
                Args: {
                    uid: string;
                    claim: string;
                };
                Returns: Json;
            };
            get_claims: {
                Args: {
                    uid: string;
                };
                Returns: Json;
            };
            get_my_claim: {
                Args: {
                    claim: string;
                };
                Returns: Json;
            };
            get_my_claims: {
                Args: Record<PropertyKey, never>;
                Returns: Json;
            };
            getuserjobs: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
            is_claims_admin: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
            jsonb_array_to_text_array: {
                Args: {
                    _js: Json;
                };
                Returns: unknown;
            };
            set_claim: {
                Args: {
                    uid: string;
                    claim: string;
                    value: Json;
                };
                Returns: string;
            };
            test: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
            test_deux: {
                Args: Record<PropertyKey, never>;
                Returns: unknown;
            };
            test_quatre: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
            test_trois: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
            text_quatre: {
                Args: Record<PropertyKey, never>;
                Returns: unknown;
            };
            verifyrights: {
                Args: {
                    jobs_names: string;
                    right_id: string;
                };
                Returns: boolean;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export interface Project {
    created_at: string | null;
    end_date: string | null;
    id: string;
    name: string;
    project_icon_url: string | null;
}

export interface Profile {
    avatar_url: string | null;
    email: string;
    firstname: string;
    id: string;
    lastname: string;
    updated_at: string | null;
}

export interface Task {
    assigned_check: string[] | null;
    assigned_users: string[] | null;
    comments: string[] | null;
    created_at: string | null;
    description: string;
    end_at: string | null;
    id: string;
    joined_files: string[] | null;
    progress: number;
    project: string;
    sub_tasks: Json[];
    title: string;
    type: string | null;
}

export interface Activity {
    created_at: string;
    id: number;
    project_id: string | null;
    share_links: string[] | null;
    software: string | null;
    task: string;
    title: string;
    users_id: string[];
}

export interface File extends drive_v3.Schema$File {
    shared_users: string[];
}

export interface ChatMessage {
    id?: number;
    created_at?: string | null;
    message: string;
    user_id: string;
}

export interface SupportMessage {
    content: string;
    created_at: string | null;
    id: string;
    parent_id: string | null;
    subject: string;
}

export interface SubTask {
    title: string;
    finished: boolean;
    linkedDocuments: string[];
}

export interface Article {
    id: string;
    created_at: string;
    edited_at: string | null;
    title: string;
    content: string | null;
    project_id: string | null;
    published: boolean | null;
}
