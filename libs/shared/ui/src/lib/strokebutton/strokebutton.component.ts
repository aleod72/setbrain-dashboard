import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-strokebutton',
  templateUrl: './strokebutton.component.html',
  styleUrls: ['./strokebutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StrokebuttonComponent {
  @Input() label: string | undefined;
  @Output() buttonClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.buttonClicked.emit(event);
  }
}
