import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { StrokebuttonComponent } from './strokebutton/strokebutton.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { ButtonwithoutfillComponent } from './buttonwithoutfill/buttonwithoutfill.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    StrokebuttonComponent
  ],
  exports: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    StrokebuttonComponent
  ],
})
export class SharedUiModule {}
