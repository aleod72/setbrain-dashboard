import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ButtonIconComponent],
  exports: [ButtonComponent, ButtonIconComponent],
})
export class SharedUiModule {}
