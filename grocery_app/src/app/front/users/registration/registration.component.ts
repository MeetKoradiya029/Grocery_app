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
import { UserService } from 'src/app/user.service';

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
    private fb:FormBuilder
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
      mobile: new FormControl('', [Validators.required]),
      country: new FormControl('', Validators.required),
      addresses: this.fb.array([this.createAddress()]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

    });
  }

  createAddress():FormGroup{
    return this.fb.group({
      address:new FormControl("")
    })
  }
  get addresses():FormArray{
    return this.registerForm.controls['addresses'] as FormArray
  }

  addAddress(){
    this.addresses.push(this.createAddress())
  }
  removeAddress(index:number){
    this.addresses.removeAt(index)
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

    const body = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      country: country,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      mobile: mobile,
    };

    this.userService.RegisterUser(body).subscribe((res) => {
      if (res) {
        console.log('response', res);

        this.router.navigate(['/home']);
      }
    });

    return flag;
  }
}
