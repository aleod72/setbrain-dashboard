import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { StrokebuttonComponent } from './strokebutton/strokebutton.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ButtonIconComponent, StrokebuttonComponent],
  exports: [ButtonComponent, ButtonIconComponent, StrokebuttonComponent],
})
export class SharedUiModule {}
