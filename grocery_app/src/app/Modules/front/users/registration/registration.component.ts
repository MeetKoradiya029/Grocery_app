import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
      primary_mobile_number: new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.required),
    });
  }

  formHandler() {
    let flag = true;
    let {
      firstname,
      lastname,
      email,
      username,
      password,
      primary_mobile_number,
    } = this.registerForm.getRawValue();

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !primary_mobile_number ||
      !username
    ) {
      alert('Complete form !!');
      return (flag = false);
    }

    if (flag == true) {
      console.log('firstname', this.registerForm.getRawValue());
    }

    const body = {
      first_name: firstname,
      last_name: lastname,
      primary_email: email,
      password: password,
      primary_mobile_number: primary_mobile_number,
      username: username,
    };
    // console.log('body', body);

    this.userService.registerUser(body).subscribe((res) => {
      if (res) {
        console.log('response', res);

        this.router.navigate(['/home']);
      }
    });

    return flag;
  }
}
