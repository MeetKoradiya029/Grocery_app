import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RouterModule } from '@angular/router';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { CartComponent } from './cart/cart.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderConfirmComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[CartComponent]
})
export class CartModule { }
