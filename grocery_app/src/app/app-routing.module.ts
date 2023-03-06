import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogModule } from './front/catalog/catalog.module';
import { CategoryComponent } from './front/catalog/category/category.component';
import { ProductListComponent } from './front/catalog/product-list/product-list.component';
import { LoginComponent } from './front/users/login/login.component';
import { AboutComponent } from './navbar/about/about.component';
import { CartComponent } from './navbar/cart/cart.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { HomeComponent } from './navbar/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"everything",loadChildren:()=>import('./front/catalog/catalog.module').then((c)=>c.CatalogModule)},
  {path:"cart",component:CartComponent},
  {path:"users",loadChildren:()=>import('./front/users/users.module').then((m)=>m.UsersModule)},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
