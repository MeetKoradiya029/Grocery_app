import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';
import { MatCard } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { AddressModel } from 'src/app/Models/address-model';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css'],
})
export class ManageAddressComponent implements OnInit {
  address!: FormGroup;
  body: AddressModel = {
    address_line_1: '',
    address_line_2: '',
    area: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    landmark: '',
    tag: '',
  };
  updateBody: any = {};

  snackHorizontal: MatSnackBarHorizontalPosition = 'start';
  snackVertical: MatSnackBarVerticalPosition = 'bottom';

  addressArr: any = [];
  addressId: any;
  encryptionData: any;
  showUpdateBtn: any;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getUserAddress();
  }

  initForm() {
    this.address = new FormGroup({
      address_line_1: new FormControl('', Validators.required),
      address_line_2: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
    });
  }

  addAddress() {
    let flag = true;
    const {
      address_line_1,
      address_line_2,
      area,
      country,
      state,
      city,
      postal_code,
      landmark,
      tag,
    } = this.address.getRawValue();
    console.log('Address 1', address_line_1);

    this.body = {
      address_line_1: address_line_1,
      address_line_2: address_line_2,
      area: area,
      city: city,
      state: state,
      country: country,
      postal_code: postal_code,
      landmark: landmark,
      tag: tag,
    };
    console.log('body', this.body);

    if (
      !address_line_1 ||
      !address_line_2 ||
      !area ||
      !city ||
      !state ||
      !country ||
      !postal_code ||
      !landmark ||
      !tag
    ) {
      this.userService.openSnackBar('Form Is Empty', 'OK', 'center', 'bottom');
      flag = false;
      return flag;
    }
    if (flag == true) {
      this.userService.addAddress(this.body).subscribe((res) => {
        if (res) {
          console.log('address response :', res);
          this.userService.openSnackBar(
            'Address Saved successfully !',
            'OK',
            'end',
            'bottom'
          );
          this.address.reset();
          this.getUserAddress();
        } else {
        }
      });
    }

    return flag;
  }

  async getUserAddress() {
    (this.userService.getUserDetail()).subscribe({
      next: (address) => {
        if (address) {
          console.log('Address response', address.data.addresses);
          this.addressArr = address.data.addresses;
        }
      },
      error: (addressError) => {
        console.log('Address Error:', addressError);
      },
    });
  }

  editAddress(address: any) {
    this.showUpdateBtn = true;
    console.log('Address Id ==>>', typeof address.id);
    this.addressId = address.id;

    this.address.setValue({
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      area: address.area,
      country: address.country,
      state: address.state,
      city: address.city,
      postal_code: address.postal_code,
      landmark: address.landmark,
      tag: address.tag,
    });

    this.encryption(address.id);
  }

  encryption(addressId: any) {
    this.encryptionService.encryptId(addressId.toString()).subscribe({
      next: (encrypt: any) => {
        if (encrypt) {
          console.log('Enncryption Response::---', encrypt);
          console.log('Encryption Data', encrypt.data);
          this.encryptionData = encrypt.data;
        }
      },
      error: (encryptError: any) => {
        if (encryptError) {
          console.log('Encryption Error:', encryptError);
        }
      },
    });
  }

  UpdateAddress(address: any) {
    // this.updateAddress( address,this.encryptionData);
    this.userService.updateAddress(address, this.encryptionData).subscribe({
      next: (update) => {
        if (update) {
          console.log('Update Response:', update);
          this.address.reset();
          this.getUserAddress();
        }
      },
      error: (updateError) => {
        if (updateError) {
          console.log('Update error :', updateError);
        }
      },
    });
    this.showUpdateBtn = false;
  }

   Ondelete(addressId: any){
    
    this.encryptionService.encryptId(addressId.toString()).subscribe((encryption)=>{
      if(encryption){
        console.log("Encryption for delete :::",encryption.data);
        this.encryptionData=encryption.data;
        this.deleteAddress(addressId);
      }
    })

    
      
    

    
  }

  deleteAddress(addressId:any){

    this.userService.deleteAddress(this.encryptionData).subscribe({
      next: (deleteRes) => {
        if(deleteRes){
          console.log("delete Response:-=-=--",deleteRes);
          this.getUserAddress()
          console.log("addresId",addressId);
          
          
          // this.addressArr.splice(addressId,1);
        }
      },
      error: (deleteError) => {
        if (deleteError) {
          console.log('Delete Error:', deleteError);
        }
      },
    });
  }
}
