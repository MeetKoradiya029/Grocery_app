import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { OrderService } from 'src/app/Shared/Services/order.service';
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
  billing_addressId: any;
  delivery_addressId: any;
  payment_status: any;
  order_status: any;
  user: any;
  cart: any;
  userId: any;
  OrderId: any;
  OrderIdEncrypted: any;
  //#endregion
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private encryptionService: EncryptionService,
    private orderService: OrderService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getUserAddresses();
    this.cartService.cartTotal$.subscribe((res) => {
      if (res) {
        this.grandTotal = res;
        console.log('grand Total', this.grandTotal);
      }
    });
    this.cart = this.cartService.cartData;
    console.log('Cart data to  send order ', this.cart);
  }
  async getUserAddresses() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res) {
        console.log('user Data', res);
        console.log('User Addresses', res.data.addresses);
        this.userId = res.data.id;
        this.userAddresses = res.data.addresses;
      }
    });
  }

  getAddressId(addressId: any) {
    console.log('Address ID :', addressId, typeof addressId);
    this.addressId = addressId;
    this.encryption(
      this.addressId,
      this.addressId,
      '3',
      '4'
    );
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
          this.billing_addressId = res.data;
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
          this.delivery_addressId = res.data;
        }
      },
      error: (error) => {
        if (error) {
          console.log('delivery address error:', error);
        }
      },
    });
    console.log('Cart Data---', this.cart);
    console.log(this.billing_addressId);
    console.log(this.delivery_addressId);
    this.encryptionService.encryptId(payment_status.toString()).subscribe({
      next: (res) => {
        if (res) {
          console.log('encryption, for payment_status:', res.data);
          this.payment_status = res.data;
        }
      },
      error: (error) => {
        if (error) {
          console.log('payment status error:', error);
        }
      },
    });
    this.encryptionService.encryptId(order_status.toString()).subscribe({
      next: (res) => {
        if (res) {
          console.log('encryption, for order_status:', res.data);
          this.order_status = res.data;
        }
      },
      error: (error) => {
        if (error) {
          console.log('order_status error:', error);
        }
      },
    });
  }


//   PaymentStatus(){
//     // selected=true
//     this.encryptionService.encryptId("3").subscribe({
//       next: (encryption_res) => {
//         if (encryption_res) {
//           console.log('encryption_res', encryption_res.data);
//           this.payment_status = encryption_res.data;
//           // return this.Encyption_Data
//           console.log('payment_status', this.payment_status);
//         }
//       },
//       error: (encryption_error) => {
//         console.log('encryption_error', encryption_error);
//       },
//     });
//     // this.delivery_address_id=this.encryption(addressSelect)
  

// }
// OrderStatus(){
//     // selected=true
//     this.encryptionService.encryptId("4").subscribe({
//       next: (encryption_res) => {
//         if (encryption_res) {
//           console.log('encryption_res', encryption_res.data);
//           this.order_status = encryption_res.data;
//           // return this.Encyption_Data
//           console.log('order_status', this.order_status);
//         }
//       },
//       error: (encryption_error) => {
//         console.log('encryption_error', encryption_error);
//       },
//     });
//     // this.delivery_address_id=this.encryption(addressSelect)
  

// }


  checkout() {
    // ;
    this.user = this.cookieService.get('userLoginToken');

    console.log('Cart Data---', this.cart);
    console.log(this.billing_addressId);
    console.log(this.delivery_addressId);
    console.log(this.payment_status);
    console.log(this.order_status);

    if (this.user) {
      this.orderService
        .addOrder(
          this.billing_addressId,
          this.delivery_addressId,
          this.payment_status,
          this.order_status,
          this.cart
        )
        .subscribe({
          next: (res) => {
            if (res) {
              console.log('Add order api calll response:', res);
              if (res.data.id) {
                this.OrderId = res.data.id;
                console.log('this.OrderId = res.data.id', this.OrderId);
              }
              this.encryptionService
                .encryptId(this.OrderId.toString())
                .subscribe({
                  next: (res) => {
                    if (res) {
                      console.log('response', res);
                      this.OrderIdEncrypted = res.data;
                      this.orderService
                        .getOrderById(this.OrderIdEncrypted)
                        .subscribe({ next: (res) => {
                          if(res){
                            console.log("get order By id response",res);
                            this.cartService._delete_UserCart_LocalStorage(this.userId);
                          }
                        },error:(error:any)=>{
                          console.log("error in get order",error);
                          
                        } });
                    }
                  },
                  error: (error) => {
                    console.log('encryption response:', error);
                  },
                });
              this.getUserAddresses();
              // this.cartService.deleteCartUserWise(this.userId).subscribe((res)=>{
              //   if(res){
              //     console.log("Delete cart Response!");

              //   }
              // })
            }
          },
          error: (error) => {
            if (error) {
              console.log('Add order error :', error);
            }
          },
        });
    }
  }
}
