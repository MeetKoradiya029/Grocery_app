import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Shared/Services/cart.service';
import { ProductService } from '../../Shared/Services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Shared/Services/user.service';
import { Ngxalert } from 'ngx-dialogs';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //#region 
  products: any = [];
  category: any;
  selectedCategory: any;
  durationInSeconds = 5;
  user: any;
  username: any;
  userId: any;
  alertWithBtnObj: any = new Ngxalert();
  ProductWithQuantity: any;
  //#endregion

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private _snackBar:MatSnackBar,
    private userService:UserService,
    private cookieService:CookieService,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private toastService:ToastEvokeService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {  

    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },2000)
    this.user = this.cookieService.get("userLoginToken");
    this.getUserDetails();
    this.getAllProducts();
    this.getCartItems();

    this.route.paramMap.subscribe((param) => {
      let category = param.get('category');
      
    });
  }

  cartProducts: any;
  quantityObj = {
    quantity: 1,
  };
  id: any;
  addToCart(product:any) {
    if (this.user) {
      
      let CartArr = JSON.parse(localStorage.getItem('cart'))
      
      let existingCart = CartArr.find(
        (item: any) =>
          (item.user_id == this.userId)
      );
      let existing_product = existingCart.items.find((p:any)=>p.id==product.id);
      console.log("existing cart items array -----",existing_product);
      
      console.log('Existing product :',existing_product);
  
      if (existingCart) {

        if(existing_product){
          // this.toastService.warning('', 'Item already exists in cart').subscribe();
          const confirmBox = new ConfirmBoxInitializer();
          confirmBox.setTitle('Item already exists');
          confirmBox.setMessage('Do you want to open your cart?');
          confirmBox.setButtonLabels('YES', 'NO');
        
          // Choose layout color type
          confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
          });

          confirmBox.openConfirmBox$().subscribe((res)=>{
            if(res.success){
                console.log("response",res);
                this.router.navigate(['/catalog/cart'])
            }
          })

          // setTimeout(()=>{
            
          // },1500)
        }else{
          this.ProductWithQuantity = Object.assign(product, this.quantityObj);
          this.cartService
          ._addToCart_User_Wise(this.userId,this.ProductWithQuantity,product.id);
          this.toastService.success('', 'Item Added In Cart!').subscribe();

        }
       
      } 
    } else {
      let guestItem = localStorage.getItem('guestUser');
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
  gotoCart() {
    return this.router.navigate(['/catalog/cart']);
  }

  openConfirmDialog(dialogTitle: any, message: any) {
    this.alertWithBtnObj.create({
      title: dialogTitle,
      message: message,

    });
  }
  getCartItems() {
    let cartArr = JSON.parse(localStorage.getItem("cart")||"");
    this.cartProducts = cartArr;
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

  getAllProducts(){
      this.productService.getAllProducts().subscribe((res)=>{
        if(res){
          console.log("all products response:---",res);
          
          this.products=res.data
          console.log("All Products --->>>",this.products);
          
        }
      })
  }

}
