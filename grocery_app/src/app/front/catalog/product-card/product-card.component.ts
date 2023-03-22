import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  prodObg!:any

  constructor(private productService:ProductServiceService,private route:ActivatedRoute){}
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.prodObg=this.productService.getSingleProduct(id);
    console.log("product object:",this.prodObg);
    
  }
  


}
