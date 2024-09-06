import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilesDocsPageRoutingModule } from './perfiles-docs-routing.module';

import { PerfilesDocsPage } from './perfiles-docs.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilesDocsPageRoutingModule
  ],
  declarations: [PerfilesDocsPage]
})
export class PerfilesDocsPageModule {}
