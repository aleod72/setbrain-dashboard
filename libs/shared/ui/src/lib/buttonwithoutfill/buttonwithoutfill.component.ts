import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-buttonwithoutfill',
  templateUrl: './buttonwithoutfill.component.html',
  styleUrls: ['./buttonwithoutfill.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonwithoutfillComponent {
  @Output() buttonClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.buttonClicked.emit(event);
  }
}
