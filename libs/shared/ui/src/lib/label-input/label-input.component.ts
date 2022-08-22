import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {assertTruthy} from "@setbrain-dashboard/shared/utils";

@Component({
  selector: 'setbrain-dashboard-abel-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelInputComponent implements OnInit{
  @Input()  label!: string;
  @Input()  placeholder!: string;
  @Input()  text?: string | undefined;
  @Input()  filename?: string | undefined;
  @Output() textChange = new EventEmitter<string>();

  ngOnInit() {
    if (this.filename) {
      this.text = (this.filename as string).replace('.' + this.getFileExtension(), '');
    }
  }

  change(e: Event) {
    const textValue = (e.target as HTMLElement).innerHTML;
    this.textChange.emit(textValue);
    this.text = textValue;
  }
  getFileExtension() {
    assertTruthy(this.filename);
    const patternFileExtension = /.([0-9a-z]+)(?:[?#]|$)/i;
    const extension = (this.filename as string).match(patternFileExtension);
    if(extension) {
      return extension[1];
    }
    return '';
  }
}
