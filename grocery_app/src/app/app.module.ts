import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
// import { CategoriesComponent } from './navbar/categories/categories.component';
import { CartComponent } from './navbar/cart/cart.component';
import { AboutComponent } from './navbar/about/about.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { ProductListComponent } from './front/catalog/product-list/product-list.component';
import { CatalogModule } from './front/catalog/catalog.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule  } from 'ngx-owl-carousel-o';
import { MatCarouselModule } from '@thouet/material-carousel';
import { CategoryComponent } from './front/catalog/category/category.component';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from './front/catalog/category-products/category-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    AboutComponent,
    ContactusComponent,
    FooterComponent,
    CategoryComponent,
    CategoryProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CatalogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatCarouselModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
