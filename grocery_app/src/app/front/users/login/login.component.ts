import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    let formData = this.loginForm.getRawValue();

    let email = formData.email;
    let emailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    let password = formData.password;
    let flag = true;

    if (!email || !email.match(emailRegex)) {
      alert('invalid email or password');
      return (flag = false);
    } else if (password.length < 8) {
      alert('invalid email or password');
      return (flag = false);
    }

    if (flag == true) {
      console.log('FormData : ', formData);
    }

    return flag;
  }
}
