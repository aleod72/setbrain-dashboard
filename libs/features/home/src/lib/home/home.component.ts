import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Project, ProjectsService} from "@setbrain-dashboard/shared/data-access/projects";
import {JobService, Profile, ProfileService} from "@setbrain-dashboard/shared/data-access/users";

@Component({
  selector: 'setbrain-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit {
  projects: Project[] | null = null;
  connectedUser: Profile | undefined;
  connectedUSerJobs: string[] | undefined;
  activeProject: string | undefined;
  isAdmin = false;


  constructor(
    private projectsService: ProjectsService,
    public profileService: ProfileService,
    public jobService: JobService
  ) {}

  ngOnInit() {
    this.profileService.getprofile().then(profile => this.connectedUser = profile);
    this.projectsService.getAllProjects().then(projects => {
      this.projects = projects as Project[];
      this.activeProject = this.projects[0].id;
    });
    this.jobService.authentifiedUserJobs().then(jobs => this.connectedUSerJobs = jobs);
    this.jobService.isAdmin().then(isAdmin => this.isAdmin = isAdmin);
  }
}
