import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'setbrain-dashboard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(private supabaseService: SupabaseService, @Inject(DOCUMENT) private document: any) {}

  signInWithGoogle() {
    this.supabaseService.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: this.getURL()
      }
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

  private getURL() {
    let url = this.document.location.origin;
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  }
}
