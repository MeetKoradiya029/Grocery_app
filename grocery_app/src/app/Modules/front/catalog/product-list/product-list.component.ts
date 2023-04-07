import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../Shared/Services/product.service';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  //#region
  products: any[] = [];
  category_productArr: any = [];
  category: any;
  id: any;
  categoryId: any;
  encryptedId: any;
  cartProducts:any=[]
  cartObj:any={}
  userId:any
  //#endregion

  //#region 
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private encryptionService: EncryptionService,
    private cartService:CartService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.getUserDetials();
    this.getCartItems();


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
      console.log(' this.categoryId:', this.categoryId);
    });
    this.encryption(this.categoryId);
  }
  //#endregion

  //#region 
  encryption(id: any) {
    this.encryptionService.encryptId(id).subscribe({
      next: (encryptionResponse) => {
        console.log('encryption response::', encryptionResponse);
        this.encryptedId = encryptionResponse.data;
        console.log('Encryption data:', this.encryptedId);
        this.productService.getProductByCategoryId(this.encryptedId).subscribe({
          next: (category_products: any) => {
            if (category_products) {
              console.log(
                'Category Wise Products-response:',
                category_products
              );
              this.category_productArr = category_products.data;
              console.log(
                'category wise products:arr=>>>',
                this.category_productArr
              );
            }
          },
          error: () => {},
        });
      },
      error: (encryptionError: any) => {
        console.log('Encryption Error:', encryptionError);
      },
    });
  }

  getCartItems(){
    this.cartService.getCartProducts().subscribe((res)=>{
      if(res){
        this.cartProducts=res;
        console.log("Cart Products ><<><><",this.cartProducts);
        
      }
    })
  }

  getUserDetials(){
    this.userService.getUserDetail().subscribe({next:(res)=>{
      if(res){
        console.log("User Data:----",res);

        this.userId=res.data.id;
        console.log("User ID ::--",this.userId);
        
      }
    },error:()=>{}})
  }

  AddToCart(productObj:any) {
     this.cartObj={
         user_id:this.userId,
         items:[productObj]
     }

     this.cartService.addToCart(this.cartObj).subscribe((res)=>{
      if(res){
        console.log("cart response",res);
        this.getCartItems();
      }
     })
  }
  //#endregion
}
