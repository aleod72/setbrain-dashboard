import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() label: string | undefined;
  @Input() full? = false;
  @Output() buttonClicked = new EventEmitter();

  onClick(clickEvent: MouseEvent) {
    this.buttonClicked.emit(clickEvent);
  }
}
