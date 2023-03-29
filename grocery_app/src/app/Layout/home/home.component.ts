import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Shared/Services/cart.service';
import { ProductService } from '../../Shared/Services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  category: any;
  selectedCategory: any;
  durationInSeconds = 5;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.route.paramMap.subscribe((param) => {
      let category = param.get('category');
      if (category) {
        this.products = this.products.filter(
          (product) => product.category === category
        );
        this.category = category;
      }
    });
  }

  cartProducts: any;
  quantityObj = {
    quantity: 1,
  };
  id: any;
  addToCart(id: any) {
    this.cartProducts = Object.assign(this.products[id - 1], this.quantityObj);
    console.log('cartProduct', this.cartProducts);

    this.cartService.addToCart(this.cartProducts).subscribe((response) => {
      if (response) {
        console.log('response', response);
      }
    });
    this.openSnackBar("Item Added in cart","ok");
  }


}
