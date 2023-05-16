import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profilePage/profile-page/profileMenuPages/change-password/change-password.component';
import { ManageAddressComponent } from './profilePage/profile-page/profileMenuPages/manage-address/manage-address.component';
import { ProfileComponent } from './profilePage/profile-page/profileMenuPages/profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from 'src/app/Shared/Guards/auth.guard';
import { OrderConfirmComponent } from '../catalog/cart/order-confirm/order-confirm.component';
import { OrdersComponent } from './profilePage/profile-page/profileMenuPages/orders/orders.component';
import { ErrorpageComponent } from 'src/app/Shared/Components/errorpage/errorpage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'profile/home',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile/changepass',
    component:ChangePasswordComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile/manageaddress',
    component:ManageAddressComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'orderconfirm',
    component:OrderConfirmComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile/orders',
    component:OrdersComponent,
    canActivate:[AuthGuard]
  },
  {path:"**",component:ErrorpageComponent}



 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
