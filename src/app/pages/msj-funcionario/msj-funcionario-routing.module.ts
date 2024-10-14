import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsjFuncionarioPage } from './msj-funcionario.page';

const routes: Routes = [
  {
    path: '',
    component: MsjFuncionarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsjFuncionarioPageRoutingModule {}
