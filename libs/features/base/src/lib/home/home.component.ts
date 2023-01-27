import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Project, ProjectsService} from "@setbrain-dashboard/shared/data-access/projects";
import {ProfileService} from "@setbrain-dashboard/shared/data-access/users";
import {Task, TasksService} from "@setbrain-dashboard/shared/data-access/tasks";

@Component({
  selector: 'setbrain-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit {
  project: Project | undefined;
  assignedTasks: Task[] | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private tasksService: TasksService,
    public profileService: ProfileService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const id = (params as {id: string}).id;
      this.project = (await this.projectService.getProjectById(id))[0];
      const profile = await this.profileService.getprofile();
      if(profile.id && this.project.id) {
        const tasks = await this.tasksService.getAssignedTasks(profile.id, this.project.id);
        tasks.sort((a:Task, b: Task) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        this.assignedTasks = tasks.slice(0, 3);
      }
    });
  }
}
