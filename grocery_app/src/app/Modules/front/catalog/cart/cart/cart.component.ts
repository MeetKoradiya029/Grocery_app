import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  //#region 
  cartItems: any[] = [];
  GST: any;
  Total: any;
  shipping: any;
  subtotal: any = 0;
  counter = 1;
  groupedProducts: any = [];
  data:any;
  product:any=[]
  dateFormat: any;
  //#endregion
  //#region 
  constructor(private cartService: CartService,private router:Router) {}
  ngAfterViewInit() {
    this.groupedProducts = this.cartItems.reduce((acc, product) => {
      const existingCategory = acc.find((group: any) => {
        console.log('category', group.category);
        console.log('category product:', product.category);

        return group.category === product.category;
      });

      if (existingCategory) {
        existingCategory.cart.push(product);
        // this.groupedProducts=this.cartlength
      } else {
        acc.push({ category: product.category, cart: [product] });
      }
      return acc;
    }, []);
    console.log(this.groupedProducts, 'CartLength');
  }

  ngOnInit() {
    this.getCartItems();
    let date = new Date()
    let getYear = date.toLocaleString("default", { year: "numeric" });
    let getMonth = date.toLocaleString("default", { month: "2-digit" });
    let getDay = date.toLocaleString("default", { day: "2-digit" });
    this.dateFormat = getYear + "-" + getMonth + "-" + getDay;
  }
  //#endregion

  

  // getCartItems() {
  //   this.cartService.getCartProducts().subscribe((response: any[]) => {
  //     if (response) {
  //       console.log('cart items :', response);
  //       this.cartItems = response;
  //       this.groupedProducts = this.cartItems.reduce((acc, product) => {
  //         const existingCategory = acc.find((group: any) => {
  //           console.log('category', group.category);
  //           console.log('category product:', product.category);

  //           return group.category === product.category;
  //         });

  //         if (existingCategory) {
  //           existingCategory.cart.push(product);
  //           // this.groupedProducts=this.cartlength
  //         } else {
  //           acc.push({ category: product.category, cart: [product] });
  //         }
  //         return acc;
  //       }, []);
  //       console.log(this.groupedProducts, 'CartLength');
  //     }
  //   });
  //   console.log('Cart Items : ', this.cartItems);

  //   return this.cartItems;
  // }


  getCartItems(){
    this.cartService.getCartProducts().subscribe((res)=>{
      if(res){
        this.cartItems=res;
        console.log("Cart Items :----",this.cartItems);
      }
    })
  }

  productId: any;
  removeItem(id:any,i:any) {
    //  id =  parseInt(id)
    this.productId = id;
    console.log('id :', typeof id);

    this.cartService.removeCartProducts(id).subscribe((response) => {
      if (response) {
        console.log('delted : ', id, response);
        console.log('cart Items', this.cartItems);
        this.cartItems.splice(i,1)
      }
      // this.delete(id);
    });
  }
  delete(id: any) {
    let deleted = this.cartItems.filter((product)=>product.id!=id);
    console.log('deleted items:',deleted);
    return deleted;
  }
  // counter:number;

  incrementQuantity(index:any) {
    
    this.cartItems[index].quantity += 1;
  }
  decrementQuantity(index: any) {
   
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
  }

  Subtotal() {
    // console.log('cart:', this.cartItems);
    let subtotal = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      
        subtotal +=
          this.cartItems[i].amount *
          this.cartItems[i].quantity;
          console.log("subtotal:> ",subtotal);

    }

    this.shipping = 40;
    this.GST = subtotal * 0.18;
    this.Total = subtotal + this.GST + this.shipping;
    return subtotal;
  }

  
  get_cart_data(){
for(let i=0;i<this.cartItems.length;i++){

 
  this.product=[{
    "product_id":  this.cartItems[0].id,
    "product_name": this.cartItems[0].title,
    "qty": this.cartItems[0].quantity,
    "product_amount": this.cartItems[0].amount,
    "discount_type": 1,
    "discount_amount": 0
}]
}
console.log("product",this.product)
return this.product
  }

  goToCheckout(){
    this.getCartItems();
    this.data={
      "order_date": this.dateFormat,
      "special_note": "its special",
      "estimate_delivery_date": "2023-03-15",
      "sub_total": this.Subtotal(),
      "tax_amount": this.GST,
      "discount_amount": 0,
      "total_amount": this.Total,
      "paid_amount": this.Total,
      "payment_type": 2,
      "order_products":this.get_cart_data(),
    }
    console.log("Cart For checkout:--",this.cartItems);
    this.cartService.cartData=this.data;
    this.cartService.setCartTotal(this.Total);
    console.log("Cart Data ----",this.cartService.cartData);
    this.router.navigate(['/catalog/checkout']);
    
  }
}
