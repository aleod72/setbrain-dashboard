import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree} from '@angular/router';
import {from, map, Observable} from 'rxjs';
import {ProfileService} from "@setbrain-dashboard/shared/data-access/users";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly profileService: ProfileService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.profileService.getSession()).pipe(map(
      response => {
        const { session } = response.data;
        if(session) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }
    ));
  }

}
