import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CloseButtonComponent {
  @Output() buttonClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.buttonClicked.emit(event);
  }
}
