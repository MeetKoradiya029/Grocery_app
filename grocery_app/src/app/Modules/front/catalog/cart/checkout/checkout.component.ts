import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  //#region
  userAddresses: any;
  addressId: any;
  grandTotal: any;
  billing_addressId:any;
  delivery_addressId:any;
  payment_status:any;
  order_status:any;
  //#endregion
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private encryptionService: EncryptionService
  ) {}
  ngOnInit() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res) {
        console.log('user Data', res);
        console.log('User Addresses', res.data.addresses);

        this.userAddresses = res.data.addresses;
      }
    });
    this.cartService.cartTotal$.subscribe((res) => {
      if (res) {
        this.grandTotal = res;
        console.log('grand Total', this.grandTotal);
      }
    });
  }

  getAddressId(addressId: any) {
    console.log('Address ID :', addressId, typeof addressId);
    this.addressId = addressId;
    this.encryption(this.addressId,this.addressId,2,2)
    return this.addressId;
  }

  encryption(
    billing_addressId: any,
    delivery_addressId: any,
    payment_status: any,
    order_status: any
  ) {
    this.encryptionService.encryptId(billing_addressId.toString()).subscribe({
      next: (res) => {
        if (res) {
          console.log('encryption, for billing_address:', res.data);
          this.billing_addressId=res.data;
        }
      },
      error: (error) => {
        if (error) {
          console.log('billing address error:', error);
        
        }
      },
    });
    this.encryptionService.encryptId(delivery_addressId.toString()).subscribe({
      next: (res) => {
        if (res) {
          console.log('encryption, for delivery_address:', res.data);
          this.delivery_addressId=res.data;
        }
      },
      error: (error) => {
        if (error) {
          console.log('delivery address error:', error);
        }
      },
    });
    this.encryptionService
      .encryptId(payment_status.toString())
      .subscribe({ next: (res) => {
        if(res){
          console.log("encryption, for payment_status:",res.data);
          this.payment_status=res.data;
          
        }
      }, error: (error) => {
        if(error){
          console.log("payment status error:",error);
          
        }
      } });
      this.encryptionService
      .encryptId(order_status.toString())
      .subscribe({ next: (res) => {
        if(res){
          console.log("encryption, for order_status:",res.data);
          this.order_status=res.data;
          
        }
      }, error: (error) => {
        if(error){
          console.log("order_status error:",error);
          
        }
      } });
  }

  checkout() {}
}
