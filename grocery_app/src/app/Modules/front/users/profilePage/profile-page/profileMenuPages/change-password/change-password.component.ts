import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassowrd!: FormGroup;
  formData:any
  body: any;
  snackbarPH:MatSnackBarHorizontalPosition='end';
  snackbarPV:MatSnackBarVerticalPosition = 'top'

  constructor(private userService: UserService, private fb: FormBuilder, private snackbar:MatSnackBar) {}
  ngOnInit() {
    this.initializeForm();
    console.log('user form :', this.changePassowrd.getRawValue());
  }

  initializeForm() {
    this.changePassowrd = this.fb.group({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
  }
      
  submit(){
     let flag=true;
      this.formData = this.changePassowrd.getRawValue();
      console.log("change Password",this.formData);
      let {oldpassword,newpassword,confirmpassword}=this.changePassowrd.getRawValue()
       this.body = {
        oldPassword:oldpassword,
        newPassword:newpassword,
       }
       if(!oldpassword||!newpassword||!confirmpassword){
          // alert("form is empty!");
          this.userService.openSnackBar("Form is Empty!","OK","end","top")
          flag = false;
          return flag;
       }
       if(flag=true){
        this.userService.changePassword(this.body).subscribe({next:(res)=>{
          if(res){
            console.log("change pass res",res);
            this.userService.openSnackBar("Password Changed!","OK","end","top")
            this.changePassowrd.reset();
          }
        },error:(error)=>{
          this.userService.openSnackBar(error.error.message,"Ok","end","top")
        }});
        
       }
       
       return flag
  }

  openSnackBar(){
    const config = new MatSnackBarConfig();
    config.duration=3000
    config.panelClass=['newpassError']
    config.horizontalPosition=this.snackbarPH;
    config.verticalPosition=this.snackbarPV
      this.snackbar.open("Form is empty!","",{
        panelClass:['newpassError'],
        horizontalPosition:this.snackbarPH,
        verticalPosition:this.snackbarPV,
        duration:3000
      })
  }
}
