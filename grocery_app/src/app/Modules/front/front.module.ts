import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './catalog/cart/cart.module';
// import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CartModule,
    FrontRoutingModule,
    UsersModule
  ]
})
export class FrontModule { }
