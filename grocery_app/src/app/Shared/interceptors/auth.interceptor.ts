import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  token:any

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = localStorage.getItem('userToken');

    // JSON.parse(this.token);
    
if(this.token){
   request = request.clone({
    setHeaders:{
      token:JSON.parse(this.token)
    }
  })

}
    
    console.log("interseptor",request);
    

    return next.handle(request);
  }
}
