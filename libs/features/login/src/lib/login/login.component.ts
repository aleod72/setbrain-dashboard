import { Component, ViewEncapsulation } from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";

@Component({
  selector: 'setbrain-dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(private supabaseService: SupabaseService) {}

  signInWithGoogle() {
    this.supabaseService.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  signIn() {

    console.log(this.email, this.password);
    if(!this.email) throw new Error('please enter your email');
    if(!this.password) throw new Error('please enter your password');

    this.supabaseService.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });
  }

  updateEmail(email: string) {
    this.email = email;
  }

  updatePassword(password: string) {
    this.password = password;
  }
}
