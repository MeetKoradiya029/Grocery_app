import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Shared/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{
  products: any[] = [];
  category: any;
  productId: any;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

    
  

  ngOnInit() {
    this.products = this.productService.getProducts();

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
product:any
  cardProduct() {
    this.product = this.products.filter(
      (product) => product.id == this.productId
    );
    console.log('product', this.product);
    console.log('product', this.productId);
    
    return this.product;
  }
  counter:number=1

  addItem(){
    if(this.counter>=1){
      this.counter++;
    }
    this.quantity(this.counter)
    return this.counter
  }
  removeItem(){
    if(this.counter>1){
      this.counter--;
    }
    this.quantity(this.counter)
  }
total=0
  quantity(counter:number){
    console.log(this.product.price);
    
    this.total = counter*this.product.price
    return this.total
  }

  addToCart(){
    
  }
}
