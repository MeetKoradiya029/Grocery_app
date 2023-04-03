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
export class NavbarComponent implements OnInit,DoCheck {
  cartProducts: any = [];
  user: any;
  userDetails: any;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private cookieService: CookieService,
    private router:Router
  ) {}
  ngDoCheck() {
    this.user = this.cookieService.get('userLoginToken')
    if(this.user){
      return this.user
    }
  }
  

  ngOnInit() {

    this.cartProducts = this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart items', res);
      }
      this.cartProducts = res;
    });
    this.subtotal();
    this.getUserDetail();
  }

  subtotal() {
    let subtotal = 0;

    for (let i = 0; i < this.cartProducts.length; i++) {
      subtotal += this.cartProducts[i].price * this.cartProducts[i].quantity;
    }
    return subtotal;
  }
  // navItems:string[]=["Home","Categories","Cart"];

  getUserDetail() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res) {
        console.log('user details response ', res);
        this.userDetails = res;
      }
    });

    return this.userDetails;
  }
}
