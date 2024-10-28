import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPacientePageRoutingModule } from './map-paciente-routing.module';

import { MapPacientePage } from './map-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPacientePageRoutingModule
  ],
  declarations: [MapPacientePage]
})
export class MapPacientePageModule {}
