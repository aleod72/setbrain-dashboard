import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Project, ProjectsService} from "@setbrain-dashboard/shared/data-access/projects";
import {JobService, Profile, ProfileService} from "@setbrain-dashboard/shared/data-access/users";
import {ActivatedRoute, Router} from "@angular/router";

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
  pageLinks: Array<{name: string, link: string, icon: string}> | undefined;


  constructor(
    private projectsService: ProjectsService,
    public profileService: ProfileService,
    public jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.getprofile().then(profile => this.connectedUser = profile);
    this.projectsService.getAllProjects().then(projects => {
      this.projects = projects as Project[];
      if (this.activeProject === undefined) {
        this.router.navigate([projects[0].id]);
      }
    });
    this.jobService.isAdmin().then(isAdmin => this.isAdmin = isAdmin);
    this.activatedRoute.params.subscribe(params => this.activeProject = (params as {id: string}).id);
    this.jobService.authentifiedUserJobs().then(jobs => {
      this.jobService.getJobNames(jobs).then(data => this.connectedUserJobs = data);
    });
    this.pageLinks =  [
      {name: 'Général', link: 'home', icon: 'apps'},
      {name: 'Tâches', link: 'tasks', icon: 'list-check'},
      {name: 'Administration', link: 'admin', icon: 'edit'},
      {name: 'Statistiques', link: 'stats', icon: 'stats'},
      {name: 'Fichiers', link: 'files', icon: 'folder'},
    ];
  }
}
