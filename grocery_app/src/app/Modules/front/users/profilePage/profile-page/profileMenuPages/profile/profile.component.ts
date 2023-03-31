import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData!: any
  formData:any
  userDataForm!: FormGroup ;
  constructor(private fb :FormBuilder,private userService:UserService){}
  ngOnInit() {
  }
  
  // this methos is initilized the form
  _initForm() {
    this.userDataForm = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.min(2)]),
      lastName: new FormControl('', [Validators.required, Validators.min(2)]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
   
    })
  }
  //this method is get the user stored data from the local storage
  
  // this method is updating data in server and also in localstorage
  

    formHandler(){

      this.formData = this.userDataForm.getRawValue();

      const body = {
        first_name:this.formData.firstname,
        last_name:this.formData.lastname,
        password:this.userData.password,
        date_of_birth:this.formData.dob,
        secondary_mobile_number:this.formData.mobileNo,
        secondary_email:this.formData.email,
      }
      this.userService.updateUser(body).subscribe((res:any) => {
        if (res) {
          console.log("resonse of update data :",res);
          
        }
      }, (error:any) => {
        alert("something went wrong please try again")
      })
    }
    // this is called api for the updating the data in the server 
   
   
}

