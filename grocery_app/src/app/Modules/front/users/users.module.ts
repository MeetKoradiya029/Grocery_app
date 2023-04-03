import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfilePageComponent } from '../users/profilePage/profile-page/profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSidebarComponent } from './profilePage/profile-sidebar/profile-sidebar.component';
import { ManageAddressComponent } from './profilePage/profile-page/profileMenuPages/manage-address/manage-address.component';
import { ChangePasswordComponent } from './profilePage/profile-page/profileMenuPages/change-password/change-password.component';
import { ProfileComponent } from './profilePage/profile-page/profileMenuPages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/Shared/Guards/auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ProfileSidebarComponent,
    ProfilePageComponent,
    ManageAddressComponent,
    ChangePasswordComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers:[AuthGuard],
  exports:[ProfileSidebarComponent]
})
export class UsersModule { }
