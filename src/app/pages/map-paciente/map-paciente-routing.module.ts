import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapPacientePage } from './map-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: MapPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPacientePageRoutingModule {}
