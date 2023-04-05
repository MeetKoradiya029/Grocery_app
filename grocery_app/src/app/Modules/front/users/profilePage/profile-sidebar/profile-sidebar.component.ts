import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  user:any

  constructor(private router:Router,private cookieService:CookieService){}
  ngOnInit() {
    this.user  = this.cookieService.get("userLoginToken");
  }
  


  logout(){
    console.log("login token:",this.cookieService.get('userLoginToken'));

    if(this.user){
      console.log("user token in logout fn:",this.user);
      this.cookieService.delete('userLoginToken');
      this.router.navigate([''])
    }
    
      
  }
}
