import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css'],
})
export class ProfileSidebarComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        console.log('res.url', res.url);

        this.user = this.cookieService.get('userLoginToken');
        console.log('User====>', this.user);
      }
    });
  }
  // token:any
  // checkUser(){
  //   this.user = this.cookieService.get('userLoginToken');

  //   if(this.user){
  //     return true
  //   }else{
  //     this.router.navigate(['/users/login'])
  //     return false
  //   }
  // }

  logout() {
    
    //   console.log("login token:",this.cookieService.get('userLoginToken'));

    this.user = this.cookieService.get('userLoginToken');
    if (this.user) {
      console.log('user token in logout fn:', this.user);
      this.cookieService.delete('userLoginToken');
      this.userService.openSnackBar("Logged Out succcessfully!","Ok","end","top");
      setTimeout(()=>{
        this.router.navigate(['']);
      },1000)
      
    }
  }
}
