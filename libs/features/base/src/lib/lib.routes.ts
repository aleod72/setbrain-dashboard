import { Route } from '@angular/router';
import {BaseComponent} from "./base/base.component";
import {AuthGuard} from "@setbrain-dashboard/features/guards";
import {HomeComponent} from "./home/home.component";

export const featuresBaseRoutes: Route[] = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard]},
  {path: ':id', component: BaseComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'tasks', component: HomeComponent},
      {path: 'admin', component: HomeComponent},
      {path: 'stats', component: HomeComponent},
      {path: 'files', component: HomeComponent}
    ]},
];
