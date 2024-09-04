import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaPruebaPage } from './pagina-prueba.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaPruebaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaPruebaPageRoutingModule {}
