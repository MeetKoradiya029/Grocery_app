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
  userDataForm!: FormGroup ;
  constructor(private fb :FormBuilder,private userService:UserService){}
  ngOnInit() {
   this._getUserDataFromLocalStorage()
  }
  
  // this methos is initilized the form
  _initForm() {
    this.userDataForm = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.min(2)]),
      lastName: new FormControl('', [Validators.required, Validators.min(2)]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required]),
   
    })
  }
  //this method is get the user stored data from the local storage
  _getUserDataFromLocalStorage() {
    // code need to update used service for storing data in local storage 
    const data = localStorage.getItem('userData')
    if (data) {
      this.userData = JSON.parse(data);
      console.log(this.userData);
      this._initForm()
      this.userDataForm.setValue({
        firstName: this.userData[0].firstname||"",
        lastName:this.userData[0].lastname||"" ,
        dob:this.userData[0].DateOfBirth||"",
        email:this.userData[0].email||"",
        mobileNo: this.userData[0].mobileNo||"",
      })
    }
  }
  // this method is updating data in server and also in localstorage
  _updateUserData() {
    
  
    const userData = this.userDataForm.getRawValue();
    const body = {
 
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      DateOfBirth: userData.dob || Date,
      gender: this.userData[0].gender || "",
      address: this.userData[0].address||"",
      pincode: this.userData[0].pincode||"",
      city: this.userData[0].pincode||"",
      email: userData.email||"",
      mobileNo: userData.mobileNo||"",
      password:this.userData[0].password||"",
    }

 // data updating in local storage code here ...//
    
    this.userService._setLoggedInUserData(body);


    // this is called api for the updating the data in the server 
    this.userService.updateUser(this.userData[0].id, body).subscribe((res:any) => {
      if (res) {
        alert("data updated successfuly")
      }
    }, (error:any) => {
      alert("something went wrong please try again")
    })
   
  }

}
