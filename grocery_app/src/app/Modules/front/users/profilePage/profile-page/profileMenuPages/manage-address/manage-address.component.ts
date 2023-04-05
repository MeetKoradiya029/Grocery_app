import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar,MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css'],
})
export class ManageAddressComponent implements OnInit {
  
  address!: FormGroup;
  body:any = {}

  snackHorizontal:MatSnackBarHorizontalPosition='start';
  snackVertical:MatSnackBarVerticalPosition = 'bottom';

  constructor(private userService:UserService, private  snackbar:MatSnackBar){}

  ngOnInit() {
    this.initForm();
  }

  

  initForm() {
    this.address = new FormGroup({
      address_1: new FormControl('', Validators.required),
      address_2: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
    });
  }

  addAddress() {
   let flag=true;
    const {
      address_1,
      address_2,
      area,
      country,
      state,
      city,
      zip,
      landmark,
      tag,
    } = this.address.getRawValue();
    console.log('Address 1', address_1);


    this.body = {
      address_line_1:address_1,
      address_line_2:address_2,
      area:area,
      city:city,
      state:state,
      country:country,
      postal_code:zip,
      landmark:landmark,
      tag:tag
    }
    console.log("body",this.body);
    
    if(!address_1||!address_2||!area||!city||!state||!country||!zip||!landmark||!tag){
      this.userService.openSnackBar('Form Is Empty',"OK","center","bottom")
      flag = false;
      return flag;
    }
    if(flag==true){

      this.userService.addAddress(this.body).subscribe((res)=>{
        if(res){
          console.log("address response :",res);
          this.userService.openSnackBar("Address Saved successfully !","OK","end","bottom");
          this.address.reset()
        }else{
            
        }
      })

    }
    return flag

  }

  
}
