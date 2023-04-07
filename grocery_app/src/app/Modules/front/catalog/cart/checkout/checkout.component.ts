import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  //#region 
  userAddresses:any;
  addressId:any;
  grandTotal:any
  //#endregion
    constructor(private userService:UserService,private cartService:CartService){}
  ngOnInit(){

      this.userService.getUserDetail().subscribe((res)=>{
        if(res){
          console.log("user Data",res);
          console.log("User Addresses",res.data.addresses);
          
          this.userAddresses=res.data.addresses;
        }
      })
  this.cartService.cartTotal$.subscribe((res)=>{
      if(res){
        this.grandTotal = res
        console.log("grand Total",this.grandTotal);
        
      }
    })
      
  }


  getAddressId(addressId:any){
      console.log("Address ID :" , addressId,typeof(addressId));
      this.addressId=addressId;
      return this.addressId;
  }

  checkout(){

  }

}
