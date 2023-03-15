import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent {

  products: any[] = [];
  category:any;
  filterProductsArray:any[]=[]
  selectedCategory:any;
  constructor(private productService: ProductServiceService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

  
      this.route.paramMap.subscribe(params => {
        // Read category parameter from URL
        const category = params.get('category');
        if (category) {
          // Filter products array based on category
          this.products = this.products.filter(product => product.category === category);
          this.category=category
        }
      });
  
  


  }

  onHandleChange(selectedCategory){
    let filteredProducts = this.products.forEach((products)=> { return products.category===selectedCategory})
    console.log(filteredProducts)
    this.filterProductsArray.push(filteredProducts);
    console.log(this.filterProductsArray)
    return this.filterProductsArray;
  }

  

}
