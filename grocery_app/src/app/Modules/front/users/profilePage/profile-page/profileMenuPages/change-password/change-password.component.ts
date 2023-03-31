import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassowrd!: FormGroup;
  formData:any

  constructor(private userService: UserService, private fb: FormBuilder) {}
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
      this.formData = this.changePassowrd.getRawValue();
  }
}
