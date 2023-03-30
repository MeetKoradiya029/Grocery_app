import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartProducts:any=[];

  constructor(private cartService:CartService){

  }

  ngOnInit() {
      this.cartProducts=this.cartService.getCartProducts().subscribe((res)=>{
        if(res){
          console.log("cart items",res);

        }
        this.cartProducts=res;
      })
  }

  
  // navItems:string[]=["Home","Categories","Cart"];
}
