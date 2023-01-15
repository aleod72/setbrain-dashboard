import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Profile, ProfileService} from "@setbrain-dashboard/shared/data-access/users";

interface Task {
  id: string;
  created_at: Date;
  end_at: Date;
  title: string;
  assigned_users: Profile[];
  assigned_check: Profile[];
  description: object;
  sub_tasks: {
    id: string,
    title: string,
    finished: boolean
  };
  type: string;
  comments: string[];
  joined_files: string[];
  progess: number;
}

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
