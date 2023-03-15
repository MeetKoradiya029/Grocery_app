import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  // {path:"products",component:ProductListComponent},
  {path:'categories',component:CategoryComponent},
  {path:'products/:category', component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
