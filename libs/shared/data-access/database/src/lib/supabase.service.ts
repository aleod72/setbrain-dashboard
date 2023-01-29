import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseAuthClient} from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly SUPABASE_URL = 'https://outwhdwouqompbssysbb.supabase.co';
  private readonly SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dHdoZHdvdXFvbXBic3N5c2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE0MjY4ODEsImV4cCI6MTk3NzAwMjg4MX0.2ZgcfuNQJR4leb9KBhRzg3OEnSnX3Tu81xtmHPz_lcw';
  public supabase: SupabaseClient;
  public auth: SupabaseAuthClient;

  constructor() {
    this.supabase = createClient(
      this.SUPABASE_URL,
      this.SUPABASE_KEY,
      {
        realtime: {
          params: {
            eventsPerSecond: 10,
          }
        }
      }
    );

    this.auth = this.supabase.auth;
  }
}
