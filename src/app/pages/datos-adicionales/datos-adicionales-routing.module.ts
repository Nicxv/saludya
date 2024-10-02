import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosAdicionalesPage } from './datos-adicionales.page';

const routes: Routes = [
  {
    path: '',
    component: DatosAdicionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosAdicionalesPageRoutingModule {}
