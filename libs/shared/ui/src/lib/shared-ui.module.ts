import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { ButtonwithoutfillComponent } from './buttonwithoutfill/buttonwithoutfill.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
  ],
  exports: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
  ],
})
export class SharedUiModule {}
