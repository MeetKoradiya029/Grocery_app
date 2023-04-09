import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  productArray: any=[];
  cartProductsFor: any;
  //#endregion
  //#region
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {}
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
    this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        this.cartItems = res;
        // console.log("UserID",this.userId)
        // console.log("RES=>>>>",res)
        console.log('Cart Items :----', this.cartItems);
        this.existing_cart = this.cartItems.find(
          (item) => item.id === this.userId
        );
        console.log('Existing cart:', this.existing_cart);
        // this.cartProductsFor = this.existing_cart.items;
      }
    });
  }

  getUserId() {
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
  removeItem(id: any, i: any) {
    //  id =  parseInt(id)
    this.productId = id;
    console.log('id :', typeof id);

    this.cartService.removeCartProducts(id).subscribe((response) => {
      if (response) {
        console.log('delted : ', id, response);
        console.log('cart Items', this.cartItems);
        this.cartItems.splice(i, 1);
      }
      // this.delete(id);
    });
  }
  delete(id: any) {
    let deleted = this.cartItems.filter((product) => product.id != id);
    console.log('deleted items:', deleted);
    return deleted;
  }
  // counter:number;

  incrementQuantity(index: any) {
    this.existing_cart.items[index].quantity += 1;
    this.cartService.EditCart(this.userId,this.existing_cart).subscribe((res)=>{
      if(res){
        console.log("quantity edited in cart :",res);
        
      }
    });
  }
  decrementQuantity(index: any) {
    if (this.existing_cart.items[index].quantity > 1) {
      this.existing_cart.items[index].quantity -= 1;
      this.cartService.EditCart(this.userId,this.existing_cart).subscribe((res)=>{
        console.log("quantity decrement:--",res);
        
      })
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
   
    console.log("Product Array:",this.productArray);
    
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
      discount_amount: 0,
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
