import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../front/catalog/cart.service';
import { ProductServiceService } from '../front/catalog/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnChanges  {
  products: any[] = [];
  category: any;
  selectedCategory: any;

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private cartService:CartService
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.route.paramMap.subscribe((param) => {
      let category = param.get('category');
      if (category) {
        this.products = this.products.filter(
          (product) => product.category === category
        );
        this.category = category;
      }
    });
  }

  ngOnChanges(){
    this.addToCart(this.id);
  }
  cartProducts:any;
  quantityObj={
    quantity:1
  }
  id:any
  addToCart(id:any){
    this.cartProducts = Object.assign(this.products[id-1],this.quantityObj)
      this.cartService.addToCart(this.cartProducts).subscribe((response)=>{
        if(response){
          console.log("response",response);
        }
      })
  }

  

}
