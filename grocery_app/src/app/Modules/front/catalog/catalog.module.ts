import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
    IvyCarouselModule,
  ],

  exports: [ProductListComponent],
})
export class CatalogModule {}
