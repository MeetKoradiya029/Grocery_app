import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Shared/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';

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
  productWithQuantity:any;
  //#region 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartProducts = this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart products:', res);
        this.cartProducts = res;
      }
    });

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
        // console.log('product-id:', id);

        this.productId = id;
        // console.log(this.products);
      }
    });
    this.cardProduct();
  }

  showProduct(id: any) {
    this.router.navigate(['products', id]);
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
  counter: number = 1;

  addItem() {
    if (this.counter >= 1) {
      this.counter++;
    }
    this.quantity(this.counter);
    return this.counter;
  }
  removeItem() {
    if (this.counter > 1) {
      this.counter--;
    }
    this.quantity(this.counter);
  }
  total = 0;
  quantity(counter: number) {
    console.log(this.product.price);

    this.total = counter * this.product.price;
    return this.total;
  }

  quantityObj = {
    quantity: 1,
  };

  addToCart() {
    // console.log('product::', this.product[0]);

    let existingIncart = this.cartProducts.find(
      (product: any) => product.id == this.product[0].id
    );
    if(!existingIncart){
      this.productWithQuantity = Object.assign(this.product[0],this.quantityObj);
      console.log("Product with Quantity:",this.productWithQuantity);
      this.cartService.addToCart(this.productWithQuantity).subscribe((res)=>{
        if(res){
          console.log("item added in cart",res);
          
        }
      })
    }else{
      console.log("id:",this.productId);
      
      console.log("existing item :",this.cartProducts[this.productId]);
      
      this.cartProducts[this.productId]
    }
    // console.log('existing product', existingIncart);
  }
}
