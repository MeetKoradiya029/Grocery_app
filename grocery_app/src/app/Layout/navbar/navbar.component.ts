import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //#region
  cartProducts: any = [];
  user: any;
  userName: any;
  userDetails: any;
  cartItemCount: any;
  subtotal: number;
  user_name:any;
  usr: any;
  //#endregion

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {

    this.router.events.subscribe((res: any) => {
      this.userName = this.cookieService.get('userLoginToken');
      if (res.url) {
        // debugger;
        if (this.userName) {
          let userDetail = JSON.parse(localStorage.getItem("userData"));
          // console.log("res.url",res.url);
            if(userDetail){
              
              this.user_name= userDetail.username;
              this.usr=!this.user_name?"Guest":this.user_name
              
            }
          this.user = this.cookieService.get('userLoginToken');
          // console.log("User====>",this.user)

          this.cartService.getItemCount();
          this.cartService.Subtotal();
        }
      }
    });
  }
  // ngDoCheck() {
  //   this.user = this.cookieService.get('userLoginToken');

  //   if (this.user) {
  //     return this.user;
  //   }
  // }

  async ngOnInit() {
    await this.getUserDetails();
    this.cartService.Subtotal();

    this.cartService.currentSubtotal.subscribe((res) => {
      if (res) {
        console.log('subtotal', res);

        this.subtotal = res;
      }
    });

    this.cartItemCount = this.cartService.getItemCount();
    this.cartService.cartLength$.subscribe((length) => {
      this.cartItemCount = length;
    });
  }

  // subtotal() {
  //   let subtotal = 0;

  //   for (let i = 0; i < this.cartProducts.length; i++) {
  //     subtotal += this.cartProducts[i].price * this.cartProducts[i].quantity;
  //   }
  //   return subtotal;
  // }
  // navItems:string[]=["Home","Categories","Cart"];

  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getUserDetail().subscribe({
        next: (res) => {
          if (res) {
            console.log('User Data:----', res);

            // this.customerId = res.data.id;
            if (res.data) {
              this.userDetails = res.data;
            }
            // console.log('User ID ::--', this.customerId);

            resolve(res);

            return this.userDetails;
          }
        },
        error: (error) => {
          console.log('User Details error:', error);
          reject(error);
        },
      });
    });
  }

  logout() {
    
    //   console.log("login token:",this.cookieService.get('userLoginToken'));
    debugger
    let user = this.cookieService.get('userLoginToken');
    if (user) {
      console.log('user token in logout fn:', user);
      this.cookieService.delete('userLoginToken');
      localStorage.removeItem("userToken");
      
      setTimeout(()=>{

        if(user){
          this.cookieService.delete('userLoginToken');
          this.userService.openSnackBar("Logged Out succcessfully!","Ok","end","top");
          this.router.navigate(['']);
        }
      },1000)
      if(!user){
        this.user = user;
      }
    }
  }
}
