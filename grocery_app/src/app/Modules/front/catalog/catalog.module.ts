import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { CartModule } from './cart/cart.module';
import { LoaderComponent } from './loader_for_products/loader/loader.component';
import { CartModule } from './cart/cart.module';
import { MatSelectModule } from '@angular/material/select';
import { CategoryFilterPipe } from './category/category-filter.pipe';
import { AllcategoryComponent } from './category/allcategory/allcategory.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    LoaderComponent,
    CategoryFilterPipe,
    AllcategoryComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
    IvyCarouselModule,
    RouterModule,
    CartModule,
    MatSelectModule 
  ],

  exports: [ProductListComponent],
})
export class CatalogModule {}
