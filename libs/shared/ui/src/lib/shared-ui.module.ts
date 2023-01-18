import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { StrokebuttonComponent } from './strokebutton/strokebutton.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { ButtonwithoutfillComponent } from './buttonwithoutfill/buttonwithoutfill.component';
import { BackbuttonComponent } from './backbutton/backbutton.component';
import { GooglebuttonComponent } from './googlebutton/googlebutton.component';
import { LabelInputComponent } from './label-input/label-input.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTagComponent } from './user-tag/user-tag.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    BackbuttonComponent,
    GooglebuttonComponent,
    StrokebuttonComponent,
    LabelInputComponent,
    ProgressbarComponent,
    TabsComponent,
    UsersListComponent,
    UserProfileComponent,
    UserTagComponent,
    ProjectCardComponent,
    TaskCardComponent,
    TagComponent,
  ],
  exports: [
    ButtonComponent,
    ButtonIconComponent,
    CloseButtonComponent,
    ButtonwithoutfillComponent,
    BackbuttonComponent,
    GooglebuttonComponent,
    StrokebuttonComponent,
    LabelInputComponent,
    ProgressbarComponent,
    TabsComponent,
    UsersListComponent,
    UserProfileComponent,
    UserTagComponent,
    ProjectCardComponent,
    TaskCardComponent,
    TagComponent,
  ],
})
export class SharedUiModule {}
