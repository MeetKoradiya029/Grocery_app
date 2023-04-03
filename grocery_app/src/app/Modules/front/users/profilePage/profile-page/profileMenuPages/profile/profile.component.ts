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
  userDataForm: FormGroup | any ;
  constructor(private fb :FormBuilder,private userService:UserService){
    this._initForm()
  }
  ngOnInit() {
  }
  
  // this methos is initilized the form
  _initForm() {
    this.userDataForm = new FormGroup({
      firstName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
   
    })
  }
  //this method is get the user stored data from the local storage
  
  // this method is updating data in server and also in localstorage
  
  FormData:any
    formHandler(){

      let FormData = this.userDataForm.value;
      console.log("form:",FormData);
      

      const body = {
        first_name:FormData.firstName,
        last_name:FormData.lastName,
        password:FormData.password,
        date_of_birth:FormData.dob,
        secondary_mobile_number:FormData.mobileNo,
        secondary_email:FormData.email,
      }
      this.userService.updateUser(body).subscribe((res:any) => {
        if (res) {
          
          console.log("resonse of update data :",res);
          
        }
      }, (error:any) => {
        alert("something went wrong please try again")
      })
      this.userDataForm.reset();
    }
    // this is called api for the updating the data in the server 
   
   
}

