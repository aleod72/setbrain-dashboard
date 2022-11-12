import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Profile} from '@setbrain-dashboard/shared/data-access/users';

@Component({
  selector: 'setbrain-dashboard-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @Input() users: Profile[] | undefined;
  @Input() connectedUser: Profile | undefined;
  @Input() connectedUserColor = 'blue-100';

  ngOnInit() {
    if (this.connectedUser && this.users) {
      this.users.splice(this.users?.findIndex(element => this.connectedUser?.id === element.id), 1);
    }
  }
}
