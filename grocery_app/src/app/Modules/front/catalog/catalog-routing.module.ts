import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  // {path:"products",component:ProductListComponent},
  {path:'categories',component:CategoryComponent},
  {path:'products/:category', component:ProductListComponent},
  {path:'product_details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
