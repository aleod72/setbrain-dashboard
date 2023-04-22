export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            activities: {
                Row: {
                    created_at: string;
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
                    email?: string | null;
                    firstname?: string | null;
                    id: string;
                    lastname?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    email?: string | null;
                    firstname?: string | null;
                    id?: string;
                    lastname?: string | null;
                    updated_at?: string | null;
                };
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
            };
            tasks: {
                Row: {
                    assigned_check: string[] | null;
                    assigned_users: string[] | null;
                    comments: string[] | null;
                    created_at: string | null;
                    description: Json | null;
                    end_at: string | null;
                    id: string;
                    joined_files: string[] | null;
                    progress: number;
                    project: string;
                    sub_tasks: Json | null;
                    title: string;
                    type: string | null;
                };
                Insert: {
                    assigned_check?: string[] | null;
                    assigned_users?: string[] | null;
                    comments?: string[] | null;
                    created_at?: string | null;
                    description?: Json | null;
                    end_at?: string | null;
                    id?: string;
                    joined_files?: string[] | null;
                    progress: number;
                    project: string;
                    sub_tasks?: Json | null;
                    title: string;
                    type?: string | null;
                };
                Update: {
                    assigned_check?: string[] | null;
                    assigned_users?: string[] | null;
                    comments?: string[] | null;
                    created_at?: string | null;
                    description?: Json | null;
                    end_at?: string | null;
                    id?: string;
                    joined_files?: string[] | null;
                    progress?: number;
                    project?: string;
                    sub_tasks?: Json | null;
                    title?: string;
                    type?: string | null;
                };
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
            get_claims: {
                Args: {
                    uid: string;
                };
                Returns: Json;
            };
            is_claims_admin: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
            set_claim: {
                Args: {
                    uid: string;
                    claim: string;
                    value: Json;
                };
                Returns: string;
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
    description: Json | null;
    end_at: string | null;
    id: string;
    joined_files: string[] | null;
    progress: number;
    project: string;
    sub_tasks: {
        name: string;
        finished: boolean;
    };
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
