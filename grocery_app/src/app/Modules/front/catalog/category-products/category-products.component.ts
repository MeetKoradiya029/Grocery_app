import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../Shared/Services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  //#region properties

  products: any[] = [];
  category: any;
  filterProductsArray: any[] = [];
  selectedCategory: string = '';
  filteredProducts: any[] = [];
  //#endregion

  //#region initialization
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.filterProducts();
    
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.getCategory();
  }
  //#endregion

  //#region methods
  getCategory() {
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
  }

  handleChange(selectedCategory: any) {
    let filteredProducts = this.products.filter(
      (products) => products.category === selectedCategory
    );
    console.log(filteredProducts);
    console.log(this.filterProductsArray);
    return this.filterProductsArray;
  }

  filterProducts() {
    if (!this.selectedCategory || this.selectedCategory == 'all') {
      this.filteredProducts = this.products;
      return this.filteredProducts;
    }

    this.filteredProducts = this.products.filter(
      (products) => products.category === this.selectedCategory
    );
    console.log(this.filteredProducts);
    return this.filteredProducts;
  }
  //#endregion
}
