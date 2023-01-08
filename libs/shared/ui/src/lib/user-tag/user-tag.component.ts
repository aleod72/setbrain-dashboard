import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Profile } from '@setbrain-dashboard/shared/data-access/users';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: 'setbrain-dashboard-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTagComponent implements OnInit{
  @Input() profile: Profile | undefined;
  backgroundImg: SafeStyle | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.profile) return;
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.profile.avatar_url + ')');
  }
}
