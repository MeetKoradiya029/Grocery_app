import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './navbar/about/about.component';
import { CartComponent } from './navbar/cart/cart.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { CategoryProductsComponent } from './front/catalog/category-products/category-products.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"everything",loadChildren:()=>import('./front/catalog/catalog.module').then((c)=>c.CatalogModule)},
  {path:"cart",component:CartComponent},
  {path:"allcategory",component:CategoryProductsComponent},
  {path:"users",loadChildren:()=>import('./front/users/users.module').then((m)=>m.UsersModule)},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
