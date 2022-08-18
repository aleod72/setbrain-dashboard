import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { ButtonwithoutfillComponent } from './buttonwithoutfill/buttonwithoutfill.component';
import { GooglebuttonComponent } from './googlebutton/googlebutton.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    GooglebuttonComponent,
  ],
  exports: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    GooglebuttonComponent,
  ],
})
export class SharedUiModule {}
