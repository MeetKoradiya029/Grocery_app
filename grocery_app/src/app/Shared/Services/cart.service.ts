import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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
  cartData:any;
  cartTotal:any
  cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //#endregion

  //#region
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.cartProducts();
  }

  //#endregion

  //#region 
  addToCart(prodcutData: any) {
    
    return this.http.post<any>(this.baseUrl + this.addTocartUrl, prodcutData);
  }
  setCartTotal(total: number) {
    try {
      return this.cartTotal$.next(total);
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }

  getCartProducts() {
    try {
      return this.http.get<any>(this.baseUrl + this.getCartUrl);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  updateCartProduct(product: any) {
    try {
      return this.http.put<any>(
        this.baseUrl + this.getCartUrl + '/' + product.id,
        product
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  removeCartProducts(id: any) {
    try {
      return this.http.delete<any>(this.baseUrl + this.getCartUrl + '/' + id);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  cartProducts() {
    this.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart response ->>>', res);
        this.cartItems = res;
      }
    });
  }


  Subtotal() {
    // console.log('cart:', this.cartItems);
    let subtotal = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      
        subtotal +=
          this.cartItems[i].amount *
          this.cartItems[i].quantity;
          console.log("subtotal:> ",subtotal);

    }

    this.shipping = 40;
    this.GST = subtotal * 0.18;
    this.Total = subtotal + this.GST + this.shipping;
    return subtotal;
  }
  //#endregion
}
