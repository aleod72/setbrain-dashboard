import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import { Task } from "./interfaces/task.interface";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private supabaseService: SupabaseService) {}

  async getAllTasks() {
    const {error, data} = await this.supabaseService.supabase.from('tasks').select('*');
    if(error) throw error;
    return data as Task[];
  }

  async getAssignedTasks(udserId: string, projetId: string) {
    const { error, data } = await this.supabaseService.supabase.from('tasks')
      .select('*')
      .eq('project', projetId)
      .contains('assigned_users', '{' + udserId + '}');
    if (error) throw error;
    return data;
  }

  async updateTask(projectId: string, values: object) {
    const {error} = await this.supabaseService.supabase
      .from('tasks')
      .update(values)
      .eq('id', projectId);
    if(error) throw error;
  }

  async createTask(task: Task) {
    const { data, error } = await this.supabaseService.supabase
      .from('tasks')
      .insert([task]);
    if(error) throw error;
    return data;
  }

  async deleteTask(taskID: string) {
    const { error } = await this.supabaseService.supabase
      .from('tasks')
      .delete()
      .eq('id', taskID);
    if(error) throw error;
  }
}
