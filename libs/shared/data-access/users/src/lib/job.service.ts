import { Injectable } from '@angular/core';
import { SupabaseService } from '@setbrain-dashboard/shared/data-access/database';
import { ProfileService } from './profile.service';
import { assertTruthy } from '@setbrain-dashboard/shared/utils';
import { Claim } from './interfaces/claim.interface';
import {PostgrestResponse} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private supabaseService: SupabaseService, private profileService: ProfileService) {}

  async isAdmin() {
    return await this.supabaseService.supabase.rpc('is_claims_admin');
  }

  async authentifiedUserJobs() {
    const { session } = (await this.profileService.getSession()).data;
    assertTruthy(session);
    await this.profileService.updateAuth();
    const { jobs } = session.user.app_metadata as Claim;
    return jobs;
  }

  async userJobs(id: string) {
    const {error, data} = await this.supabaseService.supabase.rpc('get_claims', {uid: id}) as PostgrestResponse<Claim>;
    if(error) return new Error(error.message);
    return (data as unknown as Claim).jobs;
  }

  async addJobToUser(id: string, job: string) {
    const userJobs = await this.userJobs(id);
    if(userJobs instanceof Error) return userJobs.message;
    return this.supabaseService.supabase.rpc('set_claim', {uid: id, claim: 'jobs', value: [...userJobs, job]});
  }

  async removeJobToUser(id: string ,jobName: string) {
    const userJobs = await this.userJobs(id);
    if(!(userJobs instanceof Array)) return userJobs;
    const newJobs = userJobs.filter((job) => {
      return job != jobName;
    });
    return this.supabaseService.supabase.rpc('set_claim', {uid: id, claim: 'jobs', value: newJobs});
  }
}
