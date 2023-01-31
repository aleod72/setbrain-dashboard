import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Activity, sofwares} from "@setbrain-dashboard/shared/data-access/tasks";
import {BannerProfile, Profile, UsersService} from "@setbrain-dashboard/shared/data-access/users";

@Component({
  selector: 'setbrain-dashboard-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActivityComponent  implements OnInit{
  @Input() activity: Activity | undefined;
  @Input() share = false;
  users: BannerProfile[] = [];
  taskUsers: BannerProfile[] | Profile[] | undefined;
  softwares = sofwares;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    if(this.activity){
      this.usersService.getBannerOfUsers(this.activity?.users_id).then(response => {
        this.users = response;
      });
      this.taskUsers = this.activity.task.assigned_users as BannerProfile[] | Profile[];
    }
  }
}
