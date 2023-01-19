import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {JobService} from "@setbrain-dashboard/shared/data-access/users";
import { Project } from "@setbrain-dashboard/shared/data-access/projects";
@Component({
  selector: 'setbrain-dashboard-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() projectNotifications: number | undefined;
  @Input() active = false;
  @Input() pageLinks: Array<{name: string, link: string, icon: string, id: number}> | undefined;
  @Input() activePage = 1;
  isAdmin= false;

  constructor(public job: JobService) {}

  ngOnInit() {
    this.job.isAdmin().then(admin => this.isAdmin = admin as unknown as boolean);
  }
}
