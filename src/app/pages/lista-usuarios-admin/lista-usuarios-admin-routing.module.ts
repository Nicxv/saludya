import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaUsuariosAdminPage } from './lista-usuarios-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaUsuariosAdminPageRoutingModule {}
