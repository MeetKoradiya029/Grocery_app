import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryProductsComponent } from './category-products/category-products.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,

  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    
    

  ],

  exports:[ProductListComponent]
})
export class CatalogModule { }
