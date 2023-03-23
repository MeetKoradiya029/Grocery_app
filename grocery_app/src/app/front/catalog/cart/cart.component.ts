import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartProducts().subscribe((response: any[]) => {
      if (response) {
        console.log('cart items :', response);
        this.cartItems = response;
      }
    });
  }
  productId: any;
  removeItem(id: any) {
    //  id =  parseInt(id)
    this.productId = id;
    console.log('id :', typeof id);

    this.cartService.removeCartProducts(id).subscribe((response) => {
      if (response) {
        console.log('delted : ', id, response);
        console.log('cart Items', this.cartItems);
        this.delete(id);
      }
    });
  }
  delete(id: any) {
    let deleted = this.cartItems.filter((product) => product.id !== id);
    console.log('deleted items:', deleted);
    this.cartItems = deleted;
    console.log(this.cartItems);

    return this.cartItems;
  }
  // counter:number;

  incrementQuantity(product: any) {
    // console.log("full object:",product);
    // console.log("updated:",product.quantity);
    let updateQuantity = product.quantity;
    if (updateQuantity >= 1) {
      product.quantity++;
      this.cartService.updateCartProduct(product).subscribe((response)=>{
        if(response){
          console.log("updated quantity",response);
        }
      })
    } else {
      alert('you can not remove');
    }
  }
  decrementQuantity(product:any){
    let updateQuantity = product.quantity;
    if(updateQuantity>1){
      product.quantity--;
      this.cartService.updateCartProduct(product).subscribe((response)=>{
        if(response){
          console.log("updated quantity",response);
        }
      })
    }

  }

  GST:any
Total:any
Subtotal() {
  let subtotal:any = 0;
  for (let i = 0; i < this.cartItems.length; i++) {
    subtotal += this.cartItems[i].quantity * this.cartItems[i].price;
  }
  this.GST=subtotal*0.18;
  this.Total=subtotal+this.GST
  return subtotal;

}
}
