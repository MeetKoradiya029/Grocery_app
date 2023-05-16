import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Shared/Services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryFilterPipe } from './category-filter.pipe';
import { ProductService } from 'src/app/Shared/Services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  //#region
  categoriesFormDB: any = [];
  categoryId: any;
  isLoading: boolean;
  selectedValue: any;
  filteredcategoryProducts: any = [];
  products: any;
  //#endregion
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    window.scroll(0, 0);
    // this.isLoading = true;
    this.spinner.show();
  }
  ngOnInit() {
    this.getAllCategory();
    setTimeout(() => {
      // this.isLoading = false;
      this.spinner.hide();
    }, 2000);

    console.log('selected category', this.selectedValue);
  }

  getAllCategory() {
    this.categoriesFormDB = this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        if (res) {
          console.log('categories from database ', res.data);
          this.categoriesFormDB = res.data;

          console.log('category id:', this.categoryId);
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });
  }

  filterCategory(selectedValue) {
    debugger;

    if (selectedValue) {
      this.filteredcategoryProducts = this.products.filter(
        (item: any) => item.title === selectedValue
      );
      console.log('filtered category', this.filteredcategoryProducts);
    }

    return this.filteredcategoryProducts;
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      if (res) {
        console.log('all products response:---', res);

        this.products = res.data;
        console.log('All Products --->>>', this.products);
      }
    });
  }
  food: any;

  // Peach(){
  //   this.router.navigate(['/front/catalogue/product-list'])
  // }
}
