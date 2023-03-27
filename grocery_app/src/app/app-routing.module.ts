import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Layout/navbar/about/about.component';
import { ContactusComponent } from './Layout/navbar/contactus/contactus.component';
import { HomeComponent } from './Layout/home/home.component';
import { CategoryProductsComponent } from './Modules/front/catalog/category-products/category-products.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"catalog",loadChildren:()=>import('./Modules/front/catalog/catalog.module').then((c)=>c.CatalogModule)},
  {path:"allcategory",component:CategoryProductsComponent},
  {path:"users",loadChildren:()=>import('./Modules/front/users/users.module').then((m)=>m.UsersModule)},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
