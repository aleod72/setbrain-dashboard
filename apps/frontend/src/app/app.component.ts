import {Component } from '@angular/core';
import { ProjectsService } from '@setbrain-dashboard/shared/data-access/projects';
import {SupabaseService} from "@setbrain-dashboard/shared/data-access/database";
import {ProfileService} from "@setbrain-dashboard/shared/data-access/users";

@Component({
  selector: 'setbrain-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  constructor(private supabase: SupabaseService,  private profile: ProfileService, private projectsService: ProjectsService) {

    this.projectsService.getAllProjects().then(projects => {
      console.log(projects);
    });

    // this.projectsService.updateProject('1', {name: 'Wiclass'}).then(r => console.log(r));
    // this.projectsService.createProject({name: 'Devsnews', created_at: new Date(), end_date: new Date(), project_icon_url: ''});
    // this.projectsService.deleteProject('6');
  }
}


