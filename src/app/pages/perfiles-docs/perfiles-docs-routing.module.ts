import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilesDocsPage } from './perfiles-docs.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilesDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilesDocsPageRoutingModule {}
