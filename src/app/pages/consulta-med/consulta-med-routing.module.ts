import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaMedPage } from './consulta-med.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaMedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaMedPageRoutingModule {}
