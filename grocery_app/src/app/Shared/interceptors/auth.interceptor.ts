import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}
  tokenCookie:any

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.tokenCookie = this.cookieService.get('userLoginToken');

    // JSON.parse(this.token);
    
if(this.tokenCookie){
   request = request.clone({
    setHeaders:{
      token:this.tokenCookie
    }
  })

}
    
    // console.log("interseptor",request);
    

    return next.handle(request);
  }
}
