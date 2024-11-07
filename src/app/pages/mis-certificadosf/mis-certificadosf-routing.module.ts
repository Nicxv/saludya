import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisCertificadosfPage } from './mis-certificadosf.page';

const routes: Routes = [
  {
    path: '',
    component: MisCertificadosfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisCertificadosfPageRoutingModule {}
