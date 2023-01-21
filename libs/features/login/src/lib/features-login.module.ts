import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedUiModule} from "@setbrain-dashboard/shared/ui";

@NgModule({
  imports: [CommonModule, SharedUiModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class FeaturesLoginModule {}
