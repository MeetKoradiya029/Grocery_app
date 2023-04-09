import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Shared/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { LoginComponent } from '../../users/login/login.component';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  //#region Initializaion
  products: any[] = [];
  category: any;
  productId: any;
  cartProducts: any;
  ProductWithQuantity: any;
  totalQuantity: any;

  existingInCart: any;
  existing_Product: any;
  QuantityErrMsg: string | undefined;
  isLoading = false;

  Id: any;
  productSlug: any;
  filteredItem: any = [];
  encryptedId: any;
  customerId: any;
  user: any;
  userId: any;
  cart: any=[];
  //#region

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private encryptionService: EncryptionService,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    window.scroll(0, 0);
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.Id = params.get('id');
      this.productSlug = params.get('slug');
      console.log('Product Id:-' + this.Id + ' Slug:--' + this.productSlug);
    });
  }

  ngOnInit() {
    this.ShowCart();
    this.getUserId();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.encryption(this.Id);
    console.log('filterd Item :::::::', this.filteredItem);

    this.products = this.productService.getProducts();
    console.log('all product:', this.products);

    this.route.paramMap.subscribe((params) => {
      // Read category parameter from URL
      const category = params.get('category');
      const id = params.get('id');
      if (category) {
        // Filter products array based on category
        this.products = this.products.filter(
          (product) => product.category === category
        );
        this.category = category;
      }
      if (id) {
        console.log('product-id:', id);

        this.productId = id;
        console.log(this.productId);
      }
    });
  }

  fromInput = 1;

  quantityObj = {
    quantity: this.fromInput,
  };
  existing_cart:any
  existing_product:any
  ADDCart(product: any) {
    console.log('current product:-->', product);

    this.user = this.cookieService.get('userLoginToken');
    if (this.user) {
      this.existing_cart = this.cart.find((user: any) => user.id == this.userId);
      console.log('Existing cart:', typeof(this.existing_cart));

      this.existing_product = this.existing_cart.items.find((p:any)=>p.id==product.id);
      console.log("existing cart items array -----",this.existing_product);
      
      console.log('Existing product :', this.existing_product);
      if (this.existing_cart) {

        if (!this.existing_product) {
          debugger;
          this.ProductWithQuantity = Object.assign(product, this.quantityObj);

          this.cartService
            .AddCartUserWise(this.userId, this.ProductWithQuantity)
            .subscribe((res) => {
              console.log('Product with no-existing response:', res);
              this.ShowCart();
            });
        } else if (this.existing_product) {
          // debugger;
          // existing_product.quantity = existing_product.quantity + 1;
          // this.fromInput = existing_product.quantity;
          // this.cartService
          //   .UpdateCartUserWise(this.userId,existing_product).subscribe((res)=>{
          //     console.log("existing_ product response",res);
              
          //   });

          for(let i=0;i<this.existing_cart.items.length;i++){
            this.existing_cart.items[i]
            if(this.existing_cart.items[i]==product){
              this.existing_cart.items[i].quantity=this.existing_cart.items[i].quantity+1
              this.quantityObj.quantity=this.existing_cart.items[i].quantity
          
              console.log("this.existing_cart.items[i]",product)
              console.log("this.existing_cart.items[i].quantity",this.existing_cart.items[i].quantity)
              console.log("this.quantityObj.quantity",this.quantityObj.quantity)
            }
          }    
          console.log("existing_cart",this.existing_cart)
          
              this.existing_product.quantity=this.existing_product.quantity+1;
              this.quantityObj.quantity=this.existing_product.quantity
              this.fromInput=this.existing_product.quantity
          
                this.cartService.EditCart(this.userId,this.existing_cart).subscribe((cart)=>{
                  // console.log("cart in Service",cart)
                  // console.log("Product Index",productindex)
                  console.log("cart",cart)
                })
             
              }
        }
      
    } else {
      localStorage.setItem('guestUserCart', JSON.stringify(product));
    }
  }

  ShowCart() {
    this.cartProducts = this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart products:', res);
        this.cart = res;
        
        console.log('cart all ', this.cart);
      }
    });
  }

  getUserId() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res) {
        console.log('user Id:', res.data.id);
        this.userId = res.data.id;
      }
    });
  }

  checkInputQuantity(quantityFromInput: any) {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].id == this.filteredItem[0].id) {
        this.totalQuantity = this.cartProducts[i].quantity + quantityFromInput;
        console.log('total quantity:', this.totalQuantity);
        quantityFromInput = '';
      }

      return this.totalQuantity;
    }
  }

  getProductById(encryption: any) {
    this.productService.getProductById(encryption).subscribe({
      next: (res) => {
        if (res) {
          console.log('Product By id response :: ', res);
          this.filteredItem.push(res.data);
          console.log('Filtered Product ::: ', this.filteredItem);
        }
      },
      error: () => {},
    });
  }

  encryption(id: any) {
    this.encryptionService.encryptId(id).subscribe({
      next: (response) => {
        if (response) {
          console.log('encryption response::::', response);
          this.encryptedId = response.data;
          console.log('Encrypted ID: ', this.encryptedId);
          this.getProductById(this.encryptedId);
        }
      },
      error: () => {},
    });
  }
  getCustomerId() {
    this.userService.getUserDetail().subscribe({
      next: (res) => {
        if (res) {
          this.customerId = res.data.id;
        }
      },
      error: (error) => {
        console.log('Get user details error::', error);
      },
    });
  }
}
