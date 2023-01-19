import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeaturesLoginModule, LoginComponent} from "@setbrain-dashboard/features/login";

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesLoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
