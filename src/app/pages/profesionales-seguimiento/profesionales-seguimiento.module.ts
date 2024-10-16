import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalesSeguimientoPageRoutingModule } from './profesionales-seguimiento-routing.module';

import { ProfesionalesSeguimientoPage } from './profesionales-seguimiento.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalesSeguimientoPageRoutingModule
  ],
  declarations: [ProfesionalesSeguimientoPage]
})
export class ProfesionalesSeguimientoPageModule {}
