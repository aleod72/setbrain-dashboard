import { Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "@setbrain-dashboard/features/guards";

export const featuresHomeRoutes: Route[] = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]}
];
