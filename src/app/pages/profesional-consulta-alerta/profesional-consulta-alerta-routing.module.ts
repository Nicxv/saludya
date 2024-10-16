import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalConsultaAlertaPage } from './profesional-consulta-alerta.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalConsultaAlertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalConsultaAlertaPageRoutingModule {}
