import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfilePageComponent } from '../users/profilePage/profile-page/profile-page.component';
import { ErrorpageComponent } from 'src/app/Shared/Components/errorpage/errorpage.component';
import { AllcategoryComponent } from './category/allcategory/allcategory.component';

const routes: Routes = [
  // {path:"products",component:ProductListComponent},
  {path:'categories',component:CategoryComponent},
  {path:"allcategory",component:AllcategoryComponent},
  {path:'products-list/:id', component:ProductListComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'profile',component:ProfilePageComponent},
  {path:'**',component:ErrorpageComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
