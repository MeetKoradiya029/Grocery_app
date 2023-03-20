import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formInitialize();
  }
  formInitialize() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
      ]),
      mobile: new FormControl('', [Validators.required]),
      country: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  formHandler() {
    let flag = true;
    let {
      firstname,
      lastname,
      email,
      password,
      country,
      address,
      city,
      state,
      zipcode,
      mobile,
    } = this.registerForm.getRawValue();

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !country ||
      !address ||
      !city ||
      !state ||
      !zipcode ||
      !mobile
    ) {
      alert('Complete form !!');
      return (flag = false);
    }

    if (flag == true) {

      console.log('firstname', this.registerForm.getRawValue());
    }
    return flag;
  }
}
