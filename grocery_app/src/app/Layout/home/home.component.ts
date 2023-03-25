import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Shared/Services/cart.service';
import { ProductService } from '../../Shared/Services/product.service';

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
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartService,
    private router:Router
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
    this.id=id-1
    this.cartProducts = Object.assign(this.products[id-1],this.quantityObj)
      this.cartService.addToCart(this.cartProducts).subscribe((response)=>{
        if(response){
          console.log("response",response);
        }
      })
  }

  gotoProductDetail(){
    this.router.navigate(['/everything/product_details',this.id])
  }

  

}
