import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeaturesLoginModule, LoginComponent} from '@setbrain-dashboard/features/login';
import {FeaturesBaseModule} from '@setbrain-dashboard/features/base';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => FeaturesBaseModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesLoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
