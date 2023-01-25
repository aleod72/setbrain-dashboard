import { Route } from '@angular/router';
import {BaseComponent} from "./base/base.component";
import {AuthGuard} from "@setbrain-dashboard/features/guards";

export const featuresBaseRoutes: Route[] = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard]},
  {path: ':id', component: BaseComponent, children: [
      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'tasks', component: BaseComponent},
      {path: 'admin', component: BaseComponent},
      {path: 'stats', component: BaseComponent},
      {path: 'files', component: BaseComponent}
    ]},
];
