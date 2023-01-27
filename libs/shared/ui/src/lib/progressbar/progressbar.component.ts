import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'setbrain-dashboard-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProgressbarComponent {

  @Input() endDate = new Date();
  @Input() progress = 0;

  getProgressColor() {
    const remainingDays = this.calcRemainingDays();

    if (this.progress == 1) { return {main: '#5C80FF', background: '#633D4E'}; }
    else if (remainingDays <= 1) { return {main: '#F94969', background: '#3D4A72'}; }
    else if (remainingDays <= 2) { return {main: '#FFCF75', background: '#645D51'}; }

    else { return { main: '#67E1AF', background: '#40615F' }; }
  }

  calcRemainingDays() {
    return (new Date(this.endDate).getTime() - new Date().getTime()) / (1000*3600*24);
  }
}
