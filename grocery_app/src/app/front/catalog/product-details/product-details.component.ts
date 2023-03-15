import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: any[] = [];
  category:any;
  constructor(private productService: ProductServiceService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    
      this.route.paramMap.subscribe(params => {
        // Read category parameter from URL
        const category = params.get('category');
        if (category) {
          // Filter products array based on category
          this.products = this.products.filter(product => product.category === category);
          this.category=category
        }
      });
  
  


  }

  carouselOptions: OwlOptions = {
    loop: true,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1200: {},
    },
  };
}
