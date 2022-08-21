import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {assertTruthy} from "@setbrain-dashboard/shared/utils";

@Component({
  selector: 'setbrain-dashboard-abel-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelInputComponent {
  @Input()  text!: string;
  @Input()  label!: string | undefined;
  @Input()  placeholder!: string | undefined;
  @Output() textChange = new EventEmitter<string>();

  change(e: Event) {
    console.log(this.text);
    const textValue = (e.target as HTMLElement).innerHTML;
    this.textChange.emit(textValue);
    this.text = textValue;
  }
  getFileExtension() {
    const text = this.text;
    assertTruthy(text);
    const patternFileExtension = /.([0-9a-z]+)(?:[?#]|$)/i;
    const extension = this.text.match(patternFileExtension);
    if(extension) {
      return extension[0];
    }
    return '';
  }
}
