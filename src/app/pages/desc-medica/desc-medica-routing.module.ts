import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescMedicaPage } from './desc-medica.page';

const routes: Routes = [
  {
    path: '',
    component: DescMedicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescMedicaPageRoutingModule {}
