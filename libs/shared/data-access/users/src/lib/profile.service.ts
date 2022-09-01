import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import { Profile } from './interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private supabaseService: SupabaseService) {}

  get user() {
    return this.supabaseService.auth.user();
  }

  get profile() {
    return this.supabaseService.supabase
      .from('profiles')
      .select(`lastname, firstname, email, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };

    return this.supabaseService.supabase.from('profiles').insert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabaseService.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseService.supabase.storage.from('avatars').upload(filePath, file);
  }

  async updateAuth() {
    const {data, error} = await this.supabaseService.auth.update({});
    return {data, error};
  }
}
