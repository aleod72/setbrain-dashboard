import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {BannerProfile, Profile} from "./interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private supabaseService: SupabaseService) {}

  async getUserProfile(userId: string) {
    const {data, error} = await this.supabaseService.supabase.from('profiles')
      .select('*')
      .eq('id', userId);
    if(error) throw error;
    return data[0] as Profile;
  }

  async getBannerOfUsers(userIds: string[]) {
    const {data, error} = await this.supabaseService.supabase.from('profiles')
      .select('id, firstname, lastname, avatar_url')
      .in('id', userIds);
    if(error) throw error;
    return data as unknown as BannerProfile[];
  }
}
