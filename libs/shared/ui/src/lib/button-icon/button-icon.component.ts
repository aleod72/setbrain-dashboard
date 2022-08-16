import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonIconComponent {
  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() disabled: boolean | undefined;
  @Output() buttonClicked = new EventEmitter();

  onClick(clickEvent: MouseEvent) {
    this.buttonClicked.emit(clickEvent);
  }
}
