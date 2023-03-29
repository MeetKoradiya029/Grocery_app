import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Shared/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categoriesFormDB:any=[];
  constructor(private router:Router , private categoryService:CategoryService){
    window.scroll(0,0);
  }
  ngOnInit(){
    this.categoriesFormDB=this.categoryService.getAllCategories().subscribe((res)=>{
      if(res){
        console.log("categories from database ",res);
        this.categoriesFormDB=res;
      }
    });
    

    
  }




  food: any;
  

  

  // Peach(){
  //   this.router.navigate(['/front/catalogue/product-list'])
  // }
  categories: any[] = [
    {
      name: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
      quantity: 32
    },
    {
      name: 'Vagetables',
      image: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6',
      quantity: 15
    },
    {
      name: 'Bakery',
      image: 'https://blogtricity.com/wp-content/uploads/2021/05/Top-10-Best-Bakery-in-Chandigarh-for-your-sweet-tooth-1-1.jpg',
      quantity: 23
    },
    {
      name: 'Bakery',
      image: 'https://blogtricity.com/wp-content/uploads/2021/05/Top-10-Best-Bakery-in-Chandigarh-for-your-sweet-tooth-1-1.jpg',
      quantity: 23
    },
    {
      name: 'Bakery',
      image: 'https://blogtricity.com/wp-content/uploads/2021/05/Top-10-Best-Bakery-in-Chandigarh-for-your-sweet-tooth-1-1.jpg',
      quantity: 23
    },
    {
      name: 'Bakery',
      image: 'https://blogtricity.com/wp-content/uploads/2021/05/Top-10-Best-Bakery-in-Chandigarh-for-your-sweet-tooth-1-1.jpg',
      quantity: 23
    },
    {
      name: 'Bakery',
      image: 'https://blogtricity.com/wp-content/uploads/2021/05/Top-10-Best-Bakery-in-Chandigarh-for-your-sweet-tooth-1-1.jpg',
      quantity: 23
    }
  ];
}
