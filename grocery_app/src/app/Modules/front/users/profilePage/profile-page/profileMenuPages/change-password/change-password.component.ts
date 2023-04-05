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
      
       this.body = {
        oldPassword:this.formData.oldpassword,
        newPassword:this.formData.newPassword,
       }

       if(!this.formData.oldPassword||!this.formData.newPassword||!this.formData.confirmpassword){
        this.openSnackBar();
        flag=false;
        return flag;
       }

       this.userService.changePassword(this.body).subscribe((res)=>{
        if(res){
          console.log("change pass res",res);
          
        }
       })
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
