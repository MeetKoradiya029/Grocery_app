import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Shared/Services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  //#endregion
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private spinner:NgxSpinnerService
  ) {
    window.scroll(0, 0);
    // this.isLoading = true;
    this.spinner.show();
  }
  ngOnInit() {
    setTimeout(() => {
      // this.isLoading = false;
      this.spinner.hide();
    }, 2000);

    this.categoriesFormDB = this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        if (res) {
          console.log('categories from database ', res.data);
          this.categoriesFormDB = res.data;

          console.log('category id:', this.categoryId);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      },
      () => {
        console.log('Request complete.');
      }
    );
  }

  food: any;

  // Peach(){
  //   this.router.navigate(['/front/catalogue/product-list'])
  // }
  
}
