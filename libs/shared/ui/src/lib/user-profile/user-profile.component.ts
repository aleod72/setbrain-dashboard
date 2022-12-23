import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Profile } from '@setbrain-dashboard/shared/data-access/users';

@Component({
  selector: 'setbrain-dashboard-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent {
  @Input() profile: Profile | undefined;
  @Input() jobs: string[] | undefined;
}
