import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-googlebutton',
  templateUrl: './googlebutton.component.html',
  styleUrls: ['./googlebutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GooglebuttonComponent {
  @Output() buttonClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.buttonClicked.emit(event);
  }
}

