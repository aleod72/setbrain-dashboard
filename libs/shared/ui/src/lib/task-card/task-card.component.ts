import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BannerProfile, Profile, ProfileService, UsersService} from "@setbrain-dashboard/shared/data-access/users";
import {Task} from '@setbrain-dashboard/shared/data-access/tasks';

@Component({
  selector: 'setbrain-dashboard-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskCardComponent implements OnInit{
  @Input() task!: Task;
  assignedUsers: BannerProfile[] | undefined;
  connectedUser!: Profile;

  constructor(public profileService: ProfileService, private usersService: UsersService) {}

  async ngOnInit() {
    this.usersService.getBannerOfUsers( this.task.assigned_users as string[]).then(profiles => {
      this.assignedUsers = profiles;
    });
    this.profileService.getprofile().then(profile => this.connectedUser = profile);
  }
}
