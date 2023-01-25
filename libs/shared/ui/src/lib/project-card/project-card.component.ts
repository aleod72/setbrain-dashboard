import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Project } from "@setbrain-dashboard/shared/data-access/projects";
@Component({
  selector: 'setbrain-dashboard-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() projectNotifications: number | undefined;
  @Input() pageLinks: Array<{name: string, link: string, icon: string, id: string}> | undefined;
  @Input() active: boolean | undefined;
  @Input() isAdmin= false;
}
