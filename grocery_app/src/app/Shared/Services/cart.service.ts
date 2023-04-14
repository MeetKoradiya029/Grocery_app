import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  //#region
  baseUrl = environment.baseUrl;
  addTocartUrl = environment.addTocart;
  getCartUrl = environment.getCart;

  cartItems: any = [];
  shipping!: number;
  GST!: number;
  Total: any;
  cartData: any;
  cartTotal: any;
  cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  subtotalSource = new BehaviorSubject<number>(0);
  currentSubtotal = this.subtotalSource.asObservable();

  cartLengthSubject = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLengthSubject.asObservable();

  // userService: any;
  userDetails: any;
  Find_Customer_Cart: any;
  Customer_Cart: any;
  //#endregion

  //#region
  constructor(private http: HttpClient,private userService:UserService) {
    // this.getUserDetails();
  }
  ngOnInit() {}
  //#endregion

  //##################################-Cart Using LocalStorage-####################################
  
  //#region

  _addCart(userId: any) {
    let Cart_Obj: any;
    if (localStorage.getItem('cart')) {
      let _cart = JSON.parse(localStorage.getItem('cart') || '');
      Cart_Obj = _cart.find((user: any) => user.user_id == userId);
      console.log('Cart Object : ', Cart_Obj);
      let set_cartObj = {
        user_id: userId,
        items: [],
      };

      if (!Cart_Obj) {
        console.log('UserID:-', userId);
        console.log('Empty Cart Object  ', set_cartObj);

        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', JSON.stringify([]));
        }

        let EmptyCartArr = JSON.parse(localStorage.getItem('cart') || '');
        EmptyCartArr.push(set_cartObj);
        console.log('Empty Cart:', EmptyCartArr);
        localStorage.setItem('cart', JSON.stringify(EmptyCartArr));
      }
    } else {
      let cartObj = {
        user_id: userId,
        items: [],
      };
      if (!Cart_Obj) {
        console.log('UserID:-', userId);
        console.log('Empty Cart Object  ', cartObj);

        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', JSON.stringify([]));
        }

        let EmptyCartArr = JSON.parse(localStorage.getItem('cart') || '');
        EmptyCartArr.push(cartObj);
        console.log('Empty Cart:', EmptyCartArr);
        localStorage.setItem('cart', JSON.stringify(EmptyCartArr));
      }
    }
  }

  _addToCart_User_Wise(userId: any, data: any, ProductId: any) {
    // let Product_Quantity={
    //   qunatity:quantity
    // }
    let Guest_cart = JSON.parse(localStorage.getItem('guestUserCart'));
    if (!Guest_cart || '') {
      let CartArr = JSON.parse(localStorage.getItem('cart') || '');
      let cart = CartArr.find((user: any) => user.user_id == userId);
      let existing_product = cart.items.find(
        (existing_product: any) => existing_product.id == ProductId
      );
      if (!existing_product) {
        cart.items.push(data);
        console.log('Cart in Service==>>', cart);
        console.log('CartArr', CartArr);
        localStorage.setItem('cart', JSON.stringify(CartArr));
        //  this.toastr.success('Added to cart', data.title);
      } else {
        // existing_product.quantity=existing_product.quantity+1
        console.log('CartArr', CartArr);
        // this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('cart', JSON.stringify(CartArr));
      }
    } else {
      let CartArr = JSON.parse(localStorage.getItem('cart') || '');
      let cart = CartArr.find((user: any) => user.user_id == userId);
      let existing_product = cart.items.find(
        (existing_product: any) => existing_product.id == ProductId
      );
      if (!existing_product) {
        cart.items.push(data);
        cart.items.push(Guest_cart);
        if (localStorage.getItem('guestUserCart')) {
          let CartArr = JSON.parse(localStorage.getItem('guestUserCart') || '');
          if (CartArr) {
            localStorage.removeItem('guestUsercart');
          }
        }
        console.log('Cart in Service==>>', cart);
        console.log('CartArr', CartArr);
        localStorage.setItem('cart', JSON.stringify(CartArr));
        // this.toastr.success('Added to cart', data.title);
      } else {
        // existing_product.quantity=existing_product.quantity+1
        console.log('CartArr', CartArr);
        //  this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('cart', JSON.stringify(CartArr));
      }
    }
  }

  _addToCart_User_Wise_Quantity(userId: any, data: any, id: any) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    let cart = CartArr.find((user: any) => user.user_id == userId);
    let existing_product = cart.items.find(
      (existing_product: any) => existing_product.id == id
    );
    if (!existing_product) {
      cart.items.push(data);
      console.log('Cart in Service==>>', cart);
      console.log('CartArr', CartArr);
      localStorage.setItem('cart', JSON.stringify(CartArr));
      //  this.toastr.success('Added to cart', data.title);
    } else {
      existing_product.quantity = existing_product.quantity + 1;
      console.log('CartArr', CartArr);
      // this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('cart', JSON.stringify(CartArr));
    }
  }
  _quantity_increment(userId: any, data: any) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    let cart = CartArr.find((user: any) => user.user_id == userId);
    let existing_product = cart.items.find(
      (existing_product: any) => existing_product.id == data.id
    );

    existing_product.quantity = existing_product.quantity + 1;
    console.log('CartArr', CartArr);
    // this.toastr.info('Already Added Please Go to Cart', data.title);
    localStorage.setItem('cart', JSON.stringify(CartArr));
  }
  _quantity_decrement(userId: any, data: any) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    let cart = CartArr.find((user: any) => user.user_id == userId);
    let existing_product = cart.items.find(
      (existing_product: any) => existing_product.id == data.id
    );
    if (existing_product.quantity > 0) {
      existing_product.quantity = existing_product.quantity - 1;
      console.log('CartArr', CartArr);
      // this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('cart', JSON.stringify(CartArr));
    }
  }
  _deleteCart_localStorage(userId: any, data: any) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    let cart = CartArr.find((user: any) => user.user_id == userId);
    let existing_product = cart.items.find(
      (existing_product: any) => existing_product.id == data.id
    );
    let Index = cart.items.indexOf(existing_product);
    console.log('cart indexOf', cart.items.indexOf(existing_product));
    // console.log('cart.items.splice(Index,1)', cart.items.splice(Index, 1));
    cart.items.splice(Index, 1);
    localStorage.setItem('cart', JSON.stringify(CartArr));
  }
  _delete_UserCart_LocalStorage(userId: any) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    let cart = CartArr.find((user: any) => user.user_id == userId);
    cart.items = [];
    console.log('cart.items', cart.items);
    console.log('CartArr', CartArr);
    localStorage.setItem('cart', JSON.stringify(CartArr));
    // this.getItemCount()
    //   this.Subtotal()
  }

  setCartTotal(total: number) {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    
    return this.cartTotal$.next(total);
  }

   getItemCount() {
    // debugger
    let cart = JSON.parse(localStorage.getItem('cart'));
    let userDetails = JSON.parse(sessionStorage.getItem("User_Details"));
    // await this.getUserDetails();
    if (userDetails) {
      if (userDetails) {
        
        this.Find_Customer_Cart = cart.find(
          (user: any) => user.user_id == userDetails.id
        );
        // console.log("cartc",this.cartc.length)
        // this.cartcount.next(this.cartc.length);
        // console.log("cartcount",this.cartcount)
        // console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        if (this.Find_Customer_Cart) {
          this.Customer_Cart = this.Find_Customer_Cart.items;
          // console.log("Customer_Cart",this.Customer_Cart)
          const cartLength = this.Customer_Cart.length;

          this.cartLengthSubject.next(cartLength);
        }
      }
    } else {
      let Guest_Cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Guest_Cart) {
        const cartLength = Guest_Cart[0].items.length;
        this.cartLengthSubject.next(cartLength);
      } else {
        const cartLength = 0;
        this.cartLengthSubject.next(cartLength);
      }
    }
  }

  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getUserDetail().subscribe({
        next: (res: any) => {
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

 async Subtotal() {
  //  await this.getUserDetails();
    let userData = JSON.parse(sessionStorage.getItem("User_Details"))
    
    if (userData) {
      
      
      let cart = JSON.parse(localStorage.getItem('cart'));
      console.log(userData.id);
      
      this.Find_Customer_Cart = cart.find(
        (user: any) => user.user_id == userData.id
      );
console.log(this.Find_Customer_Cart);

      if (this.Find_Customer_Cart) {
        // console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        this.Customer_Cart = this.Find_Customer_Cart.items;
        // console.log("Customer_Cart",this.Customer_Cart)
        // this.subtotalSource.next
        let cartsubtotal: number = 0;
        for (let i = 0; i < this.Customer_Cart.length; i++) {
          if (this.Customer_Cart[i].quantity && this.Customer_Cart[i].amount) {
            cartsubtotal +=
              this.Customer_Cart[i].quantity * this.Customer_Cart[i].amount;
            // console.log("this.cartsubtotal",this.cartc[i].quantity*this.cartc[i].amount)
            // console.log("this.cartsubtotal",this.cartc[i].amount)
            // console.log("this.cartsubtotal",this.cartc[i].quantity)
            // console.log("this.cartcartsubtotalsubtotal",this.cartc[i])
            // console.log("this.cartsubtotal",this.cartc)
            // console.log("this.cartsubtotal",cartsubtotal)
          }
        }
        this.subtotalSource.next(cartsubtotal);
      }
    } else {
      let Guest_Cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Guest_Cart) {
        let cartsubtotal: number = 0;
        // console.log("Guest_Cart[0].items[0]",Guest_Cart[0].items[0])
        if (Guest_Cart[0].items[0]) {
          let cartsubtotal = Guest_Cart[0].items[0].amount;
          this.subtotalSource.next(cartsubtotal);
        } else {
          let cartsubtotal: number = 0;
          this.subtotalSource.next(cartsubtotal);
        }
      }
    }
  }

  //#endregion
}
