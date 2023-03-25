import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './Layout/home/home.component';
// import { CategoriesComponent } from './navbar/categories/categories.component';
import { AboutComponent } from './navbar/about/about.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { CatalogModule } from './Modules/front/catalog/catalog.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule  } from 'ngx-owl-carousel-o';
import { MatCarouselModule } from '@thouet/material-carousel';
import { CategoryComponent } from './Modules/front/catalog/category/category.component';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from './Modules/front/catalog/category-products/category-products.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './Modules/front/catalog/cart/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactusComponent,
    FooterComponent,
    CategoryComponent,
    CategoryProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatCarouselModule,
    CommonModule,
    IvyCarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
