import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, mergeMap, throwError } from 'rxjs';
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
  cartData: any;
  cartTotal: any;
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
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getCartProducts() {
    try {
      return this.http.get<any>(this.baseUrl + this.getCartUrl);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  AddCartUserWise(customerId: number, data: any) {
    try {
      return this.http
        .get(this.baseUrl + this.addTocartUrl + '/' + customerId)
        .pipe(
          mergeMap((user: any) => {
            const currentItemArray = user.items;
            currentItemArray.push(data);

            return this.http.patch(
              this.baseUrl + this.addTocartUrl + '/' + customerId,
              {
                items: currentItemArray,
              }
            );
          })
        );

      // this.url= `${this.baseurl}${customerId}/items`;
      // return this.http.patch(`this.baseurl${customerId}`,{
      //   items: [...data]
      // })
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  UpdateCartUserWise(customerId: number, data: any) {
    try {
      return this.http
        .get(this.baseUrl + this.addTocartUrl + '/' + customerId)
        .pipe(
          mergeMap((user: any) => {
            let currentItemArray = user.items;

            for(let i=0;i<currentItemArray.length;i++){
              if(currentItemArray[i].id==data.id){
                currentItemArray[i].quantity=data.quantity
              }
              return currentItemArray;
            }
            console.log("current Item Array :",currentItemArray);
            

            return this.http.patch(
              this.baseUrl + this.addTocartUrl + '/' + customerId,
              {
                items: currentItemArray,
              }
            );
          })
        );

      // this.url= `${this.baseurl}${customerId}/items`;
      // return this.http.patch(`this.baseurl${customerId}`,{
      //   items: [...data]
      // })
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  EditCart(customer_id:any,data:any){
    try {
      return this.http.put(this.baseUrl + this.addTocartUrl+'/'+customer_id,data)
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }

  updateCartProduct( customerId: any,product:any){
    try {
      return this.http.put<any>(
        this.baseUrl + this.getCartUrl + '/' + customerId,
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
      subtotal += this.cartItems[i].amount * this.cartItems[i].quantity;
      console.log('subtotal:> ', subtotal);
    }

    this.shipping = 40;
    this.GST = subtotal * 0.18;
    this.Total = subtotal + this.GST + this.shipping;
    return subtotal;
  }
  //#endregion
}
