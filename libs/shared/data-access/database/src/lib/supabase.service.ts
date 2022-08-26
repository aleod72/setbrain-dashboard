import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseAuthClient} from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";
import { environment } from "../../../../environments/src";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  public auth: SupabaseAuthClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.auth = this.supabase.auth;
  }
}
