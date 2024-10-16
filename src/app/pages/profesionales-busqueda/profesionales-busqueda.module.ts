import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalesBusquedaPageRoutingModule } from './profesionales-busqueda-routing.module';

import { ProfesionalesBusquedaPage } from './profesionales-busqueda.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalesBusquedaPageRoutingModule
  ],
  declarations: [ProfesionalesBusquedaPage]
})
export class ProfesionalesBusquedaPageModule {}
