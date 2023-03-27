import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { ProfileSidebarComponent } from './users/profilePage/profile-sidebar/profile-sidebar.component';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    UsersModule
  ]
})
export class FrontModule { }
