import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { CloseButtonComponent } from './close-button/close-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ButtonIconComponent, CloseButtonComponent],
  exports: [ButtonComponent, ButtonIconComponent, CloseButtonComponent],
})
export class SharedUiModule {}
