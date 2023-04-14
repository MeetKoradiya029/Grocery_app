import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region
  baseURL = environment.baseURL;
  addOrderUrl = environment.postOrder;
  getOrderByIdUrl = environment.getOrderById
  //#endregion

  constructor(private http: HttpClient) {}

  addOrder(
    billing_addressId: any,
    delivery_addressId: any,
    payment_status: any,
    order_status: any,
    data: any
  ) {
    try {
      return this.http.post<any>(this.baseURL + this.addOrderUrl, data, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          delivery_address_id: delivery_addressId,
          billing_address_id: billing_addressId,
          payment_status: payment_status,
          order_status: order_status,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getOrderById(encryption:any){
    try {
      return this.http.get<any>(this.baseURL+this.getOrderByIdUrl,{
        headers:new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'order_id':encryption
        })
      })
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }
}
