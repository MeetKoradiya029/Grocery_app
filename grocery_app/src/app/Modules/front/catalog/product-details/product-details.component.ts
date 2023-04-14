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
  cartProducts: any = [];
  ProductWithQuantity: any;
  totalQuantity: any;

  existingInCart: any;
  existing_Product: any;
  QuantityErrMsg: string | undefined;
  isLoading = false;

  Id: any;
  customerId: any;
  productSlug: any;
  filteredItem: any = [];
  encryptedId: any;
  user: any;

  cart: any = [];
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
    this.getUserDetails();
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
  existing_cart: any;
  existing_product: any;
  ADDCart(product: any) {
    console.log('current product:-->', product);

    this.user = this.cookieService.get('userLoginToken');
    this.ShowCart();
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    if (this.user) {
      
      this.existing_cart = CartArr.find(
        (user: any) => user.user_id == this.customerId
      );
      console.log('Existing cart:', typeof this.existing_cart);

      this.existing_product = this.existing_cart.items.find(
        (p: any) => p.id == product.id
      );
      console.log('existing cart items array -----', this.existing_product);

      console.log('Existing product :', this.existing_product);
      if (this.existing_cart) {
        if (!this.existing_product) {
          ;
          this.ProductWithQuantity = Object.assign(product, this.quantityObj);

          this.cartService._addToCart_User_Wise(
            this.customerId,
            this.ProductWithQuantity,
            product.id
          );

          console.log('Item Added in cart -----', this.cartProducts);
        } else if (this.existing_product) {
          
          this.existing_product.quantity = this.existing_product.quantity + 1;
          this.fromInput = this.existing_product.quantity;
          localStorage.setItem('cart', JSON.stringify(CartArr));
          console.log('existing_cart', this.existing_cart);
          this.ShowCart();
        }
      }
    } else {
      localStorage.setItem('guestUserCart', JSON.stringify(product));
    }
  }

  ShowCart() {
    let CartArr = JSON.parse(localStorage.getItem('cart') || '');
    if (CartArr) {
      this.cartProducts = CartArr;
    }
    return this.cartProducts;
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
  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getUserDetail().subscribe({
        next: (res) => {
          if (res) {
            console.log('User Data:----', res);

            this.customerId = res.data.id;
            console.log('User ID ::--', this.customerId);
            resolve(res);
            return this.customerId;
          }
        },
        error: (error) => {
          console.log('User Details error:', error);
          reject(error);
        },
      });
    });
  }
}
