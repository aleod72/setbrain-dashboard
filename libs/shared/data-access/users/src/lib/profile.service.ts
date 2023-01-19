import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import { Profile } from './interfaces/profile.interface';
import {AuthSession, Session} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  _session: AuthSession | null = null;

  constructor(private supabaseService: SupabaseService) {}

  get session() {
    this.supabaseService.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  get profile() {
    const { user } = this._session as Session;
    return this.supabaseService.supabase
      .from('profiles')
      .select(`lastname, firstname, email, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  updateProfile(profile: Profile) {
    const { user } = this._session as Session;
    const update = {
      ...profile,
      id: user?.id,
      updated_at: new Date(),
    };

    return this.supabaseService.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabaseService.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseService.supabase.storage.from('avatars').upload(filePath, file);
  }

  async updateAuth() {
    const {data, error} = await this.supabaseService.auth.refreshSession();
    return {data, error};
  }
}
