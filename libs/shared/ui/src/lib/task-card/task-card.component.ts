import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Profile, ProfileService} from "@setbrain-dashboard/shared/data-access/users";
import {Task} from '@setbrain-dashboard/shared/data-access/tasks';

@Component({
  selector: 'setbrain-dashboard-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskCardComponent implements OnInit{
  @Input() task!: Task;
  connectedUser!: Profile;

  constructor(public profileService: ProfileService) {}

  async ngOnInit() {
    this.profileService.profile.then(profile => this.connectedUser = profile as unknown as Profile);
  }
}
