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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    const jsonReq = request.clone({
      headers:request.headers.set("Content-Type","application/json")
    })
    console.log("interseptor",jsonReq);
    

    return next.handle(jsonReq);
  }
}
