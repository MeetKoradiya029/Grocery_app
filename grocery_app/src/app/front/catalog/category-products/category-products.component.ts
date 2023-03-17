import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit{
  products: any[] = [];
  category: any;
  filterProductsArray: any[] = [];
  selectedCategory:string='';
  filteredProducts: any[];
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.route.paramMap.subscribe((params) => {
      // Read category parameter from URL
      const category = params.get('category');
      if (category) {
        // Filter products array based on category
        this.products = this.products.filter(
          (product) => product.category === category
        );
        this.category = category;
      }
    });

    this.filterProducts();
  }

  

  handleChange(selectedCategory) {
    let filteredProducts = this.products.filter(products=>products.category===selectedCategory)
    console.log(filteredProducts);
    console.log(this.filterProductsArray);
    return this.filterProductsArray;
  }

  filterProducts() {


    if (!this.selectedCategory || this.selectedCategory=='all') {
      this.filteredProducts = this.products;
      return this.filteredProducts;
    }

    // for(let i=0;i<this.products.length;i++){
    //   if(this.products[i].category===this.selectedCategory){
    //     this.filteredProducts.push(this.products[i]);
    //   }
    // }

    this.filteredProducts = this.products.filter(products=>products.category===this.selectedCategory)
    console.log(this.filteredProducts);
    return this.filteredProducts;
    
  }

}
