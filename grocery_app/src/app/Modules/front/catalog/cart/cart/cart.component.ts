import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  //#region
  cartItems: any[] = [];
  GST: any;
  Total: any;
  shipping: any;
  subtotal: any = 0;
  counter = 1;
  groupedProducts: any = [];
  data: any;
  product: any = [];
  dateFormat: any;
  existing_cart: any;
  userId: any;
  productArray: any = [];
  cartProductsFor: any;
  GuestUserCart: any;
  existing_product: any;
  cart: any;
  //#endregion
  //#region
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    this.getCartItems();
  }
  ngAfterViewInit() {
    this.groupedProducts = this.cartItems.reduce((acc, product) => {
      const existingCategory = acc.find((group: any) => {
        console.log('category', group.category);
        console.log('category product:', product.category);

        return group.category === product.category;
      });

      if (existingCategory) {
        existingCategory.cart.push(product);
        // this.groupedProducts=this.cartlength
      } else {
        acc.push({ category: product.category, cart: [product] });
      }
      return acc;
    }, []);
    console.log(this.groupedProducts, 'CartLength');
  }

  ngOnInit() {
    this.getUserId();

    let date = new Date();
    let getYear = date.toLocaleString('default', { year: 'numeric' });
    let getMonth = date.toLocaleString('default', { month: '2-digit' });
    let getDay = date.toLocaleString('default', { day: '2-digit' });
    this.dateFormat = getYear + '-' + getMonth + '-' + getDay;
  }
  //#endregion

  // getCartItems() {
  //   this.cartService.getCartProducts().subscribe((response: any[]) => {
  //     if (response) {
  //       console.log('cart items :', response);
  //       this.cartItems = response;
  //       this.groupedProducts = this.cartItems.reduce((acc, product) => {
  //         const existingCategory = acc.find((group: any) => {
  //           console.log('category', group.category);
  //           console.log('category product:', product.category);

  //           return group.category === product.category;
  //         });

  //         if (existingCategory) {
  //           existingCategory.cart.push(product);
  //           // this.groupedProducts=this.cartlength
  //         } else {
  //           acc.push({ category: product.category, cart: [product] });
  //         }
  //         return acc;
  //       }, []);
  //       console.log(this.groupedProducts, 'CartLength');
  //     }
  //   });
  //   console.log('Cart Items : ', this.cartItems);

  //   return this.cartItems;
  // }

  getCartItems() {
    let cartArr = JSON.parse(localStorage.getItem('cart') || '');
    this.cartItems = cartArr;
    this.existing_cart = this.cartItems.find(
      (user: any) => user.user_id == this.userId
    );
    this.cart = this.existing_cart?.items;
    let guestUser = JSON.parse(localStorage.getItem('guestUserCart'));
    this.GuestUserCart = guestUser;
  }

  async getUserId() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res) {
        this.userId = res.data.id;
        console.log('user id :', this.userId);
        this.getCartItems();
      }
    });
    return this.userId;
  }

  productId: any;
  removeItem(productObj: any) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Do you want to Delete?');
    confirmBox.setButtonLabels('DELETE', 'NO');

    // Choose layout color type
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    confirmBox.openConfirmBox$().subscribe((resp: any) => {
      // IConfirmBoxPublicResponse
      console.log('Clicked button response: ', resp);

      if (resp.success) {
        //  id =  parseInt(id)
        this.existing_product = this.existing_cart.items.find(
          (product: any) => product.id == productObj.id
        );
        if (this.existing_product) {
          this.cartService._deleteCart_localStorage(this.userId, productObj);
          let index = this.existing_cart.items.indexOf(this.existing_product);
          this.existing_cart.items.splice(index, 1);
          this.getCartItems();
        }
      }
    });
  }
  delete(id: any) {
    let deleted = this.cartItems.filter((product) => product.id != id);
    console.log('deleted items:', deleted);
    return deleted;
  }
  // counter:number;

  incrementQuantity(productObj: any, index: any) {
    this.cartService._quantity_increment(this.userId, productObj);
    this.existing_product = this.existing_cart.items.find(
      (product) => product.id == productObj.id
    );
    if (this.existing_product.quantity > 0) {
      this.existing_product.quantity = this.existing_product.quantity + 1;
    }
  }
  decrementQuantity(productObj: any, index: any) {
    this.cartService._quantity_decrement(this.userId, productObj);
    this.existing_product = this.existing_cart.items.find(
      (product) => product.id == productObj.id
    );
    if (this.existing_product > 1) {
      this.existing_product.quantity = this.existing_product.quantity - 1;
    }
  }

  Subtotal() {
    // console.log('cart:', this.cartItems);
    let subtotal = 0;

    for (let i = 0; i < this.existing_cart.items.length; i++) {
      subtotal +=
        this.existing_cart.items[i].amount *
        this.existing_cart.items[i].quantity;
      // console.log("subtotal:> ",subtotal);
    }

    this.shipping = 40;
    this.GST = subtotal * 0.18;
    this.Total = subtotal + this.GST + this.shipping;
    return subtotal;
  }

  get_cart_data() {
    for (let i = 0; i < this.existing_cart.items.length; i++) {
      this.product = {
        product_id: this.existing_cart.items[i].id,
        product_name: this.existing_cart.items[i].title,
        qty: this.existing_cart.items[i].quantity,
        product_amount: this.existing_cart.items[i].amount,
        discount_type: 1,
        discount_amount: 12,
      };
      this.productArray.push(this.product);
    }
    console.log('product', this.product);

    console.log('Product Array:', this.productArray);

    return this.productArray;
  }

  goToCheckout() {
    this.getCartItems();
    this.data = {
      order_date: this.dateFormat,
      special_note: 'its special',
      estimate_delivery_date: '2023-03-15',
      sub_total: this.Subtotal(),
      tax_amount: this.GST,
      discount_amount: 10,
      total_amount: this.Total,
      paid_amount: this.Total,
      payment_type: 2,
      order_products: this.get_cart_data(),
    };
    console.log('Cart For checkout:--', this.cartItems);
    this.cartService.cartData = this.data;
    this.cartService.setCartTotal(this.Total);
    console.log('Cart Data ----', this.cartService.cartData);
    this.router.navigate(['/catalog/checkout']);
  }
}
