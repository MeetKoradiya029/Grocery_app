import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
// import { CategoriesComponent } from './navbar/categories/categories.component';
import { CartComponent } from './navbar/cart/cart.component';
import { AboutComponent } from './navbar/about/about.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { ProductListComponent } from './front/catalog/product-list/product-list.component';
import { CatalogModule } from './front/catalog/catalog.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    AboutComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CatalogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
