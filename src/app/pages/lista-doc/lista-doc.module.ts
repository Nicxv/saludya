import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDocPageRoutingModule } from './lista-doc-routing.module';

import { ListaDocPage } from './lista-doc.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDocPageRoutingModule
  ],
  declarations: [ListaDocPage]
})
export class ListaDocPageModule {}
