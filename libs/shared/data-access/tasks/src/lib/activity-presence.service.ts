import {EventEmitter, Injectable, Output} from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {
  RealtimeChannel,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload
} from "@supabase/supabase-js";
import {Activity} from "./interfaces/activity.interface";

@Injectable({
  providedIn: 'root'
})
export class ActivityPresenceService {
  channels: RealtimeChannel[] = [];
  ativities: Activity[]= [];
  @Output() activitiesChanges = new EventEmitter<Activity[]>();

  constructor(private supabaseService: SupabaseService) { }

  openChannel(projectId: string) {
    const channel = this.supabaseService.supabase.channel(projectId);
    channel.on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'activities',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => this.onUpdateActivity(
        (payload as RealtimePostgresUpdatePayload<Activity>).old?.id,
        (payload as RealtimePostgresUpdatePayload<Activity>).new)

    ).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'activities',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => this.onAddActivity((payload as RealtimePostgresInsertPayload<Activity>).new)
    ).on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'activities',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => this.onDeleteActivity((payload as RealtimePostgresDeletePayload<Activity>)?.old.id)
    );
    channel.subscribe(async (status) => {
      if (status == 'SUBSCRIBED') {
        this.getAllActivities();
      }
    });
    this.channels.push(channel);
    return channel;
  }

  async shareAtivity(activity: Activity) {
    this.supabaseService.supabase.from('activities').insert(activity);
  }

  async updateActivity(activitytId: string, newActivity: Activity){
    const { data, error } = await this.supabaseService.supabase.from('activities')
      .update(newActivity)
      .eq('id', activitytId);
    if(error) throw error;
    return data;
  }

  async deleteActivity(activitytId: string){
    const { data, error } = await this.supabaseService.supabase.from('activities')
      .delete()
      .eq('id', activitytId);
    if(error) throw error;
    return data;
  }

  async closeChannel(channel: RealtimeChannel) {
    await this.supabaseService.supabase.removeChannel(channel);
  }

  async getAllActivities() {
    const { data, error } = await this.supabaseService.supabase.from('activities').select('*');
    if(error) throw error;
    this.ativities = data;
    return this.ativities;
  }

  onUpdateActivity(activityId: number | undefined, newActivity: Activity) {
    if(!activityId) return;
    const oldActivity = this.ativities.find(activity => activity.id === activityId);
    if(!oldActivity) return;
    const activityIndex = this.ativities.indexOf(oldActivity);
    if(!activityIndex) return;
    this.ativities[activityIndex] = newActivity;
    this.emitChanges();
  }

  onAddActivity(activity: Activity | undefined) {
    if(!activity) return;
    this.ativities.push(activity);
    this.emitChanges();
  }

  onDeleteActivity(activityId: number | undefined) {
    if(!activityId) return;
    const activity = this.ativities.find(activity => activity.id === activityId);
    if(!activity) return;
    const activityIndex = this.ativities.indexOf(activity);
    this.ativities.splice(activityIndex, 1);
    this.emitChanges();
  }

  private emitChanges () {
    this.activitiesChanges.emit(this.ativities);
  }
}
