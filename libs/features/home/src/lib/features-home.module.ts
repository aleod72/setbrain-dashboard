import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { featuresHomeRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';
import {SharedUiModule} from "@setbrain-dashboard/shared/ui";

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(featuresHomeRoutes), SharedUiModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class FeaturesHomeModule {}
