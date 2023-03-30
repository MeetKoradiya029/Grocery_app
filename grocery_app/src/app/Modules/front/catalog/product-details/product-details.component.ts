import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Shared/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { LoginComponent } from '../../users/login/login.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  //#region Initializaion
  products: any[] = [];
  category: any;
  productId: any;
  cartProducts: any;
  ProductWithQuantity: any
  totalQuantity: any;

  existingInCart: any;
  existing_Product: any;
  QuantityErrMsg: string | undefined;
  //#region

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log('all product:', this.products);
    this.ShowCart();

    this.route.paramMap.subscribe((params) => {
      // Read category parameter from URL
      const category = params.get('category');
      const id = params.get('id');
      if (category) {
        // Filter products array based on category
        this.products = this.products.filter(
          (product) => product.category === category
        );
        this.category = category;
      }
      if (id) {
        console.log('product-id:', id);

        this.productId = id;
        console.log(this.productId);
      }
    });
    this.cardProduct();
  }

  product: any;
  cardProduct() {
    this.product = this.products.filter(
      (product) => product.id == this.productId
    );
    console.log('product', this.product);
    console.log('product', this.productId);

    return this.product;
  }
  fromInput=1

  // addToCart(item:any) {
  //   let quantityObj = {
  //     quantity:this.fromInput,
  //   };
  //   // console.log('product::', this.product[0]);
  //   console.log("quantity from input:",quantityObj.quantity);

  //   this.existingInCart = this.cartProducts.find(
  //     (product: any) => product.id == this.product[0].id
  //   );
  //   if(!this.existingInCart){
  //     this.productWithQuantity = Object.assign(this.product[0],quantityObj);
  //     console.log("Product with Quantity:",this.productWithQuantity);
  //     this.cartService.addToCart(this.productWithQuantity).subscribe((res)=>{
  //       if(res){
  //         console.log("item added in cart",res);

  //       }
  //     })
  //     if(this.fromInput){
  //      this.checkInputQuantity(this.fromInput);
  //     }

  //   }else{
  //     console.log("id:",this.productId);

  //     console.log("existing item :",this.cartProducts);
  //     console.log("item :-",item);

  //       this.cartService.updateCartProduct(item).subscribe((res)=>{
  //         console.log(
  //           res
  //         )
  //       })

  //       this.checkInputQuantity(this.fromInput);

  //   }
  // console.log('existing product', existingIncart);

  quantityObj = {
    quantity: this.fromInput,
  };
Product_Obj:any={}
  ADDCart(product: any) {
    console.log('ShowCartArr', this.cartProducts);
    console.log('Product', product);
    this.existing_Product = this.cartProducts.find((Item: any) => {
      return Item.name.toLowerCase() === product.name.toLowerCase();
    });
    console.log('Existing Product', this.existing_Product);
    if (this.quantityObj.quantity > 0 && !this.existing_Product) {
      console.log('Show Cart Arr', this.cartProducts);
      this.ProductWithQuantity = Object.assign(
        this.product[0],
        this.quantityObj
      );
      this.Product_Obj= JSON.parse(this.ProductWithQuantity)
      console.log("product with added quantity :",this.ProductWithQuantity.quantity);
      

      this.cartService.addToCart(this.ProductWithQuantity).subscribe((res) => {
        console.log(res);
      });

      // this._cartservice.addItemToCart();
      // this.Product_Count_Obj.push(this.ProductAddobj)
      // localStorage.setItem('Products_Count',JSON.stringify(this.Product_Count_Obj))

      // this._cartservice.cartmsg=this.filteredItems[0].name;
      // this.route.navigate(['/front/cart'])
      // console.log("Filtered Item",this.filteredItems)
      // this._cartservice.cart.push(this.filteredItems);
      // console.log("filteredItems.name",this.filteredItems[0].name)

      // emit updated cart data to subscribers
      // this._cartservice.cartSubject.next(this._cartservice.cart);
      // this._cartservice.cartMsg.next(this._cartservice.cartmsg);

      // this._cartservice.addToCart(this.ProductAddobj);
    } else if (this.existing_Product) {
      this.QuantityErrMsg = 'Product Is Existing';

      this.existing_Product.quantity = this.existing_Product.quantity + 1;
      this.fromInput=this.existing_Product.quantity
      console.log("existing_Product.quantity",this.existing_Product.quantity)
      console.log("productWithQuantity",this.Product_Obj)
      // this.ProductWithQuantity.quantity = this.existing_Product.quantity;
      this.cartService
        .updateCartProduct(this.existing_Product)
        .subscribe((cart) => {
          console.log('Edit Card Product', cart);
        });
    } else {
      this.QuantityErrMsg = 'Please Enter Valid Quantity';
    }
    this.ShowCart();
  }

  ShowCart() {
    this.cartProducts = this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart products:', res);
        this.cartProducts = res;
      }
    });
  }

  checkInputQuantity(quantityFromInput: any) {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].id == this.product[0].id) {
        this.totalQuantity = this.cartProducts[i].quantity + quantityFromInput;
        console.log('total quantity:', this.totalQuantity);
        quantityFromInput = '';
      }

      return this.totalQuantity;
    }
  }
}
