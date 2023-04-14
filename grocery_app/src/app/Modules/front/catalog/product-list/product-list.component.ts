import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../Shared/Services/product.service';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Ngxalert } from 'ngx-dialogs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: ['.custom-alert{color:red;}'],
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
  cartProducts: any = [];
  cartObj: any = {};
  userId: any;
  dialogTitle: any;

  user: any;
  alertWithustomCssClass: any = new Ngxalert();
  confirmAlert: any = new Ngxalert();
  alertWithBtnObj: any = new Ngxalert();
  username: any;
  quantityObj = {
    quantity: 1,
  };
  ProductWithQuantity: any;
  //#endregion

  //#region
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private encryptionService: EncryptionService,
    private cartService: CartService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.checkUser();
    this.getUserDetails();
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

  getCartItems() {
    let CartArr = JSON.parse(localStorage.getItem('cart')||"")
    if(CartArr){
      this.cartProducts=CartArr
    }
    return this.cartProducts;
  }

  getUserDetails(){
    return new Promise((resolve,reject)=>{
      this.userService.getUserDetail().subscribe({
        next: (res) => {
          if (res) {
            console.log('User Data:----', res);
  
            this.userId = res.data.id;
            this.username = res.data.username;
            console.log('User ID ::--', this.userId);
            resolve(res);
            return this.userId
          }
        },
        error: (error) => {
          console.log("User Details error:",error);
          reject(error)
          
        },
      })
      
    })
  }

  checkUser() {
    this.user = this.cookieService.get('userLoginToken');
    console.log('user exist', this.user);

    return this.user;
  }
  

  AddToCart(productObj: any) {
   
    this.getCartItems();
    if (this.user) {
      
      let existingCart = this.cartProducts.find(
        (item: any) =>
          (item.user_id == this.userId)
      );
      let existing_product = existingCart.items.find((p:any)=>p.id==productObj.id);
      console.log("existing cart items array -----",existing_product);
      
      console.log('Existing product :',existing_product);
  
      if (existingCart) {

        if(existing_product){
          this.openConfirmDialog(
            `Hello ${this.username}`,
            `Item already Exist in your cart`
          );
        }else{
          this.ProductWithQuantity = Object.assign(productObj, this.quantityObj);
          this.cartService
          ._addToCart_User_Wise(this.userId, this.ProductWithQuantity,productObj.id);
        }
       
      } 
    } else {
      let guestItem = localStorage.getItem('guestUserCart');
      if (guestItem) {
        this.openConfirmDialog(
          'Attention!',
          'You can add ony one item per user!'
        );
      } else {
        localStorage.setItem('guestUserCart', JSON.stringify(this.ProductWithQuantity));
      }
    }
  }
  

  openConfirmDialog(dialogTitle: any, message: any) {
    this.alertWithBtnObj.create({
      title: dialogTitle,
      message: message,
    });
  }

  goToCart(){
    
  }

  //#endregion
}
