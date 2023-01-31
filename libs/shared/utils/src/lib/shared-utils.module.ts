import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateAgoPipe} from "./pipes/date-ago.pipe";

export {assertTruthy} from './typeUtils';
@NgModule({
  imports: [CommonModule],
  exports: [
    DateAgoPipe
  ],
  declarations: [DateAgoPipe]
})
export class SharedUtilsModule {}
