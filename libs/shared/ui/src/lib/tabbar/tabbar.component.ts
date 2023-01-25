import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Profile} from "@setbrain-dashboard/shared/data-access/users";
import {Project} from "@setbrain-dashboard/shared/data-access/projects";

@Component({
  selector: 'setbrain-dashboard-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabbarComponent {
  @Input() connectedUser: Profile | undefined;
  @Input() connectedUserJobs: string[] | undefined;
  @Input() projects: Project[] | null = null;
  @Input() pageLinks: Array<{name: string, link: string, icon: string}> | undefined;
  @Input() activeProject: string | undefined;
  @Input() isAdmin= false;
}
