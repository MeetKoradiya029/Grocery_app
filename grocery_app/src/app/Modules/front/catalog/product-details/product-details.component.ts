import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Shared/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { LoginComponent } from '../../users/login/login.component';
import { EncryptionService } from 'src/app/Shared/Services/encryption.service';
import { UserService } from 'src/app/Shared/Services/user.service';

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
  ProductWithQuantity: any
  totalQuantity: any;

  existingInCart: any;
  existing_Product: any;
  QuantityErrMsg: string | undefined;
  isLoading=false;

  Id:any;
  productSlug:any;
  filteredItem:any=[];
  encryptedId:any;
  //#region

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private encryptionService:EncryptionService,
    private userService:UserService
  ) {
    window.scroll(0, 0)
    this.isLoading=true;
    this.route.paramMap.subscribe((params)=>{
      this.Id=params.get('id');
      this.productSlug=params.get('slug');
      console.log("Product Id:-"+this.Id+" Slug:--"+this.productSlug);
      
    })
  }

  ngOnInit() {
    

    setTimeout(()=>{
      this.isLoading=false
    },2000)

    this.encryption(this.Id)
    console.log("filterd Item :::::::",this.filteredItem);
    
   
    this.products = this.productService.getProducts();
    console.log('all product:', this.products);
    this.ShowCart();

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

  
  
  fromInput=1

 

  quantityObj = {
    quantity: this.fromInput,
  };
Product_Obj:any={}
  ADDCart(product: any) {
    console.log('ShowCartArr', this.cartProducts);
    console.log('Product', product);
    this.existing_Product = this.cartProducts.find((Item: any) => {
      return Item.title.toLowerCase() === product.title.toLowerCase();
    });
    console.log('Existing Product', this.existing_Product);
    if (this.quantityObj.quantity > 0 && !this.existing_Product) {
      console.log('Show Cart Arr', this.cartProducts);
      this.ProductWithQuantity = Object.assign(
        this.filteredItem[0],
        this.quantityObj
      );
      console.log("Product with Quantity : ----------",this.ProductWithQuantity);
      
      // this.Product_Obj= JSON.parse(this.ProductWithQuantity)
      console.log("product with added quantity :",this.ProductWithQuantity.quantity);
      

      this.cartService.addToCart(this.ProductWithQuantity).subscribe((res) => {
        console.log(res);
      });

      
    } else if (this.existing_Product) {
      this.QuantityErrMsg = 'Product Is Existing';

      this.existing_Product.quantity = this.existing_Product.quantity + 1;
      this.fromInput=this.existing_Product.quantity
      console.log("existing_Product.quantity",this.existing_Product.quantity)
      console.log("productWithQuantity",this.Product_Obj)
      // this.ProductWithQuantity.quantity = this.existing_Product.quantity;
      this.cartService
        .updateCartProduct(this.existing_Product)
        .subscribe((cart) => {
          console.log('Edit Card Product', cart);
        });
    } else {
      this.QuantityErrMsg = 'Please Enter Valid Quantity';
    }
    this.userService.openSnackBar("Item Added In Cart!!","Ok","end","bottom");
    this.ShowCart();
  }

  ShowCart() {
    this.cartProducts = this.cartService.getCartProducts().subscribe((res) => {
      if (res) {
        console.log('cart products:', res);
        this.cartProducts = res;
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

  getProductById(encryption:any){
    this.productService.getProductById(encryption).subscribe({next:(res)=>{
      if(res){
        console.log("Product By id response :: ",res);
        this.filteredItem.push(res.data)
        console.log("Filtered Product ::: ",this.filteredItem);
        
      }
    },error:()=>{}})
  }

  encryption(id:any){
    this.encryptionService.encryptId(id).subscribe({next:(response)=>{
        if(response){
          console.log("encryption response::::",response);
          this.encryptedId = response.data;
          console.log("Encrypted ID: ",this.encryptedId);
          this.getProductById(this.encryptedId);
        }
    },error:()=>{}})
  }
}
