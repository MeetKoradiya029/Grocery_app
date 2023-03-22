import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.baseUrl;
  addTocartUrl = environment.addTocart;
  getCartUrl = environment.getCart;
  

  cartItems:any=[];
  // cartItems$ = new Subject<any>()

  constructor(private http:HttpClient) { }

  addToCart(prodcutData:any){
    return this.http.post<any>(this.baseUrl+this.addTocartUrl,prodcutData);
  }
}
