import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: any = [];
  validUser: any = [];
  body:any={}
  token:any
  date:any
  expireTime:any;
  cookie:any;

  constructor(private userService: UserService, private router: Router,private cookieService:CookieService) {}

  ngOnInit() {
    this.initializeForm();
    
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    let formData = this.loginForm.getRawValue();

    let username = formData.username
    let password = formData.password;
    let flag = true;

    if (!username) {
      alert('invalid email or password');
      return (flag = false);
    } else if (!password || password.length < 8) {
      alert('invalid email or password');
      return (flag = false);
    }

    if (flag == true) {
      console.log('FormData : ', formData);
    }


    this.body = {
        username:username,
        password:password
    }
    
    const user = this.cookieService.get('userLoginToken');
    if(!user){
      this.userService.loginUser(this.body).subscribe((res)=>{
        if(res){
          console.log("login response:",res);
          this.token = res.data.token;
          console.log("token",this.token);
          
          this.date = new Date();
          this.expireTime = new Date(this.date.getTime()+ 3600*24*1000)
         this.cookieService.set('userLoginToken',this.token,{expires:1,sameSite:'Lax'});
         this.cookie = this.cookieService.get('userLoginToken');
          console.log('cookie:',this.cookie);
          
          localStorage.setItem("userToken",JSON.stringify(this.token))
          this.router.navigate(['/home']);        
        }
      })
    }else{
      this.router.navigate([''])
      
    }
    
    
    console.log('User Token',user);




  
    if (this.users.length > 0) {


      

      console.log(this.users[0].email);
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].email === email && this.users[i].password) {
      //     console.log('login', email);
      //     let data={
      //       firstName:this.users[i].firstname,
      //       lastName:this.users[i].lastname,
      //       email:this.users[i].email
      //     }
      //     this.userService._setLoggedInUserData(data);
      //     this.router.navigate(['home']);
      //   }


      }

      return flag;
      

    }

   
  }

