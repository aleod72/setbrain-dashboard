import { Route } from '@angular/router';
import {BaseComponent} from "./base/base.component";
import {AuthGuard} from "@setbrain-dashboard/features/guards";

export const featuresBaseRoutes: Route[] = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard]},
  {path: ':id', component: BaseComponent}
];
