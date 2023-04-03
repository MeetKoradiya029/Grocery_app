import { Injectable, OnInit } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild,OnInit {

  token:any;

  constructor(
    
    private router: Router,
    private cookieService:CookieService,
  
  ) { }
  ngOnInit(){
    this.router.events.subscribe((res:any)=>{
        if(res.url){
          console.log("res.url",res.url);
          
            this.checkUser();
        }
    })
  }

  checkUser(){
    this.token = this.cookieService.get('userLoginToken');

    if(this.token){
      return true
    }else{
      this.router.navigate(['/users/login'])
      return false
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.checkUser()){
        return true
      }else{
        return false
      }
  }

}
