import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {Project} from "./interfaces/project.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private supabaseService: SupabaseService) {}

  async getAllProjects() {
    const {error, data} = await this.supabaseService.supabase.from('projects').select('*');
    if(error) throw error;
    return data as Project[];
  }

  async getProjectById(id: string) {
    const { data, error } = await this.supabaseService.supabase.from('projects').select('*').eq('id', id);
    if(error) throw error;
    return data as unknown as Project[];
  }

  async updateProject(projectId: string, values: object) {
    const {error} = await this.supabaseService.supabase
      .from('projects')
      .update(values)
      .eq('id', projectId);
    if(error) throw error;
  }

  async createProject(project: Project) {
    const { data, error } = await this.supabaseService.supabase
      .from('projects')
      .insert([project]);
    if(error) throw error;
    return data;
  }

  async deleteProject(projectID: string) {
    const { error } = await this.supabaseService.supabase
      .from('projects')
      .delete()
      .eq('id', projectID);
    if(error) throw error;
  }
}
