import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaPacientesPage } from './historia-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaPacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaPacientesPageRoutingModule {}
