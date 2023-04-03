import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfilePageComponent } from '../users/profilePage/profile-page/profile-page.component';

const routes: Routes = [
  // {path:"products",component:ProductListComponent},
  {path:'categories',component:CategoryComponent},
  {path:'products/:category', component:ProductListComponent},
  {path:'product_details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'profile',component:ProfilePageComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
