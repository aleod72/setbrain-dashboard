import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Project, ProjectsService} from "@setbrain-dashboard/shared/data-access/projects";
import {JobService, Profile, ProfileService} from "@setbrain-dashboard/shared/data-access/users";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'setbrain-dashboard-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BaseComponent implements OnInit {
  projects: Project[] | null = null;
  connectedUser: Profile | undefined;
  connectedUserJobs: string[] | undefined;
  activeProject: string | undefined;
  isAdmin = false;


  constructor(
    private projectsService: ProjectsService,
    public profileService: ProfileService,
    public jobService: JobService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profileService.getprofile().then(profile => this.connectedUser = profile);
    this.projectsService.getAllProjects().then(projects => {
      this.projects = projects as Project[];
      this.activeProject = this.projects[0].id;
    });
    this.jobService.isAdmin().then(isAdmin => this.isAdmin = isAdmin);
    this.activatedRoute.params.subscribe(params => this.activeProject = (params as {id: string}).id);
    this.jobService.authentifiedUserJobs().then(jobs => {
      this.jobService.getJobNames(jobs).then(data => this.connectedUserJobs = data);
    });
  }
}
