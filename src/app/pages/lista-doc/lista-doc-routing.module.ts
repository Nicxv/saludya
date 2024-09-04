import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDocPage } from './lista-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDocPageRoutingModule {}
