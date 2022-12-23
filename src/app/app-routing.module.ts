import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
  {
    path:'ManageCategory',
    component:ManageCategoryComponent
  },
  {
    path:'ManageProduct',
    component:ManageProductComponent
  },
  {
    path:'practice',
    component:PracticeComponent
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
