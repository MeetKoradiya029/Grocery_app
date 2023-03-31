import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  cartItems: any[] = [];
  GST: any;
  Total: any;
  shipping: any;
  subtotal: any = 0;
  counter = 1;
  groupedProducts: any = [];

  constructor(private cartService: CartService) {}
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
  }

  getCartItems() {
    this.cartService.getCartProducts().subscribe((response: any[]) => {
      if (response) {
        console.log('cart items :', response);
        this.cartItems = response;
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
    });
    console.log('Cart Items : ', this.cartItems);

    return this.cartItems;
  }
  productId: any;
  removeItem(id: any, index: any, productIndex: any) {
    //  id =  parseInt(id)
    this.productId = id;
    console.log('id :', typeof id);

    this.cartService.removeCartProducts(id).subscribe((response) => {
      if (response) {
        console.log('delted : ', id, response);
        console.log('cart Items', this.cartItems);
        this.delete(id, index, productIndex);
      }
    });
  }
  delete(id: any, index: any, productIndex: any) {
    let deleted = this.groupedProducts[index].cart.filter(
      (product: any) => product.id != this.groupedProducts[index].id
    );
    console.log('deleted items:', deleted);
    this.groupedProducts[index].cart = deleted;
    console.log(this.cartItems);

    return this.groupedProducts[index].cart.splice(productIndex, 1);
  }
  // counter:number;

  incrementQuantity(index: any, productIndex: any) {
    
    this.groupedProducts[index].cart[productIndex].quantity += 1;
  }
  decrementQuantity(index: any, productIndex: any) {
   
    if (this.groupedProducts[index].cart[productIndex].quantity > 1) {
      this.groupedProducts[index].cart[productIndex].quantity -= 1;
    }
  }

  Subtotal() {
    // console.log('cart:', this.cartItems);
    let subtotal = 0;
    for (let i = 0; i < this.groupedProducts.length; i++) {
      for (let j = 0; j < this.groupedProducts[i].cart.length; j++) {
        subtotal +=
          this.groupedProducts[i].cart[j].price *
          this.groupedProducts[i].cart[j].quantity;
          console.log("subtotal:> ",subtotal);
          
      }
    
    }

    this.shipping = 40;
    this.GST = subtotal * 0.18;
    this.Total = subtotal + this.GST + this.shipping;
    return subtotal;
  }
}
