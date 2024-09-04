import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaPruebaPageRoutingModule } from './pagina-prueba-routing.module';

import { PaginaPruebaPage } from './pagina-prueba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaPruebaPageRoutingModule
  ],
  declarations: [PaginaPruebaPage]
})
export class PaginaPruebaPageModule {}
