import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent {

  constructor(private router:Router,private cookieService:CookieService){}

  logout(){
    console.log("login token:",this.cookieService.get('userLoginToken'));
    
      this.cookieService.delete('userLoginToken');
      this.router.navigate([''])
  }
}
