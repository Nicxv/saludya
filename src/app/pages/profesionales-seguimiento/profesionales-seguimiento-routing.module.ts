import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalesSeguimientoPage } from './profesionales-seguimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalesSeguimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalesSeguimientoPageRoutingModule {}
