import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TagComponent {
  @Input() tagType = 'FEAT.';
}
