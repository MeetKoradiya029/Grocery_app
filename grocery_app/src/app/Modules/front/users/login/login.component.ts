import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
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
    
    const user = localStorage.getItem('userToken');
    if(!user){
      this.userService.loginUser(this.body).subscribe((res)=>{
        if(res){
          console.log("login response:",res);
          this.token = res.data;
          console.log("token",this.token);
                    
          localStorage.setItem("userToken",JSON.stringify(this.token))
          this.router.navigate(['/home']);        
        }
      })
    }else{
      console.log("local token",user);
      
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

