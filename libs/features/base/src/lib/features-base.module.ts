import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { featuresBaseRoutes } from './lib.routes';
import { BaseComponent } from './base/base.component';
import {SharedUiModule} from "@setbrain-dashboard/shared/ui";

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(featuresBaseRoutes), SharedUiModule],
  declarations: [BaseComponent],
  exports: [BaseComponent],
})
export class FeaturesBaseModule {}
