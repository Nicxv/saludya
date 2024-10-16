import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalesBusquedaPage } from './profesionales-busqueda.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalesBusquedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalesBusquedaPageRoutingModule {}
