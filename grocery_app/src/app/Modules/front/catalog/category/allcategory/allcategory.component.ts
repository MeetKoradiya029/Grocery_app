import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Shared/Services/category.service';

@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrls: ['./allcategory.component.css']
})
export class AllcategoryComponent implements OnInit {
  
  //#region 
  categoriesFormDB: any=[];
  
  //#endregion

  constructor(private categoryService:CategoryService){}

  ngOnInit() {
    this.getAllCategory()
  }



  getAllCategory() {
    this.categoriesFormDB = this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        if (res) {
          console.log('categories from database ', res.data);
          this.categoriesFormDB = res.data;

        
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
    });
  }
}
