import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  registerForm:FormGroup;

  constructor(){
  }

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstname:new FormControl('',Validators.required),
      lastname:new FormControl("",Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      country:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      zipcode:new FormControl('',[Validators.required,Validators.minLength(6)]),
      
    })
  }
  formHandler(){
    console.log("FormData"+this.registerForm.value);
  }
}
