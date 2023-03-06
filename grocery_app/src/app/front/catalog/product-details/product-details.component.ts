import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  products:any[]=[];

  constructor(private productService:ProductServiceService){

  }

  ngOnInit(){
    this.products = this.productService.getProducts()
  }
}
