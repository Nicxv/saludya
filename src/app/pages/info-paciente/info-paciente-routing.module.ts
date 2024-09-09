import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPacientePage } from './info-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPacientePageRoutingModule {}
