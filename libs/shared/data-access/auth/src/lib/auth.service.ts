import { Injectable } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  get session() {
    return this.supabase.auth.session();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signInWithEmail(email: string, password: string) {
    return this.supabase.auth.signIn({ email, password });
  }

  signInWithGoogle() {
    return this.supabase.auth.signIn({
      provider: 'google'
    });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({email, password});
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
