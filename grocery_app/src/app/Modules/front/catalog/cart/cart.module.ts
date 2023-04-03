import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CheckoutComponent,
    OrderConfirmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CartModule { }
