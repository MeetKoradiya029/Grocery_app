import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../Shared/Services/product.service';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  category_productArr:any=[];
  category: any;
  id: any;
  categoryId: any;
  encryptedId:any;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private encryptionService:EncryptionService,
  
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    // this.route.paramMap.subscribe((params) => {
    //   // Read category parameter from URL
    //   const category = params.get('category');
    //   const id = params.get('id');
    //   if (category) {
    //     // Filter products array based on category
    //     this.products = this.products.filter(
    //       (product) => product.category === category
    //     );
    //     this.category = category;
    //   }
    //   if (id) {
    //     console.log('product-id:', id);
    //     this.products = this.products.filter((product) => product.id === id);
    //     this.id = id;
    //   }
    // });

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      console.log(" this.categoryId:", this.categoryId)
    });
    this.encryption(this.categoryId);
  }
  
  encryption(id:any){
    this.encryptionService.encryptId(id).subscribe({next:(encryptionResponse)=>{
        console.log("encryption response::",encryptionResponse);
        this.encryptedId = encryptionResponse.data;
        console.log("Encryption data:",this.encryptedId);
        this.productService.getProductByCategoryId(this.encryptedId).subscribe({next:(category_products:any)=>{
          if(category_products){
            console.log("Category Wise Products-response:",category_products);
            this.category_productArr = category_products.data;
            console.log("category wise products:arr=>>>",this.category_productArr);
            
          }
        },error:()=>{}})
        
                
    },error:(encryptionError:any)=>{
      console.log("Encryption Error:",encryptionError);
      
    }})
  }


}
