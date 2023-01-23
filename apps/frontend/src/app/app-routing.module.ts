import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeaturesLoginModule, LoginComponent} from "@setbrain-dashboard/features/login";
import {FeaturesHomeModule} from "@setbrain-dashboard/features/home";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => FeaturesHomeModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesLoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
