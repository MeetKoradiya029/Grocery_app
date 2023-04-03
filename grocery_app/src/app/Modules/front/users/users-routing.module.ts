import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profilePage/profile-page/profile-page.component';
import { ChangePasswordComponent } from './profilePage/profile-page/profileMenuPages/change-password/change-password.component';
import { ManageAddressComponent } from './profilePage/profile-page/profileMenuPages/manage-address/manage-address.component';
import { ProfileComponent } from './profilePage/profile-page/profileMenuPages/profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from 'src/app/Shared/Guards/auth.guard';
import { OrderConfirmComponent } from '../catalog/cart/order-confirm/order-confirm.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: '',
    component: ProfileComponent,
    canActivateChild: [AuthGuard],
    children: [
      {path:'',component:ProfileComponent},
      {
        path: 'profile/home',
        component: ProfileComponent,
      },
      {
        path: 'profile/manageaddress',
        component: ManageAddressComponent,
      },
      {
        path: 'profile/changepass',
        component: ChangePasswordComponent, 
      },
      {
        path:'orderconfirm',
        component:OrderConfirmComponent
      }
    ],
  },


 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
