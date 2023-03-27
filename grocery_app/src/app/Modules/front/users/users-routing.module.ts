import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profilePage/profile-page/profile-page.component';
import { ChangePasswordComponent } from './profilePage/profile-page/profileMenuPages/change-password/change-password.component';
import { ManageAddressComponent } from './profilePage/profile-page/profileMenuPages/manage-address/manage-address.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"profile",component:ProfilePageComponent},
  {path:"profile/manageaddress",component:ManageAddressComponent},
  {path:"profile/changepass",component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
