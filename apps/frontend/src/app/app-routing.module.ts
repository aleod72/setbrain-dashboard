import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeaturesLoginModule, LoginComponent} from "@setbrain-dashboard/features/login";
import {AppComponent} from "./app.component";
import {AuthGuard} from "@setbrain-dashboard/features/guards";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: AppComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesLoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
