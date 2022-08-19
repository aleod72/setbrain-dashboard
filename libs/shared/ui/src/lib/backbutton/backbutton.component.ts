import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-backbutton',
  templateUrl: './backbutton.component.html',
  styleUrls: ['./backbutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BackbuttonComponent {
  @Output() buttonClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.buttonClicked.emit(event);
  }
}
