import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPacientePageRoutingModule } from './info-paciente-routing.module';

import { InfoPacientePage } from './info-paciente.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPacientePageRoutingModule
  ],
  declarations: [InfoPacientePage]
})
export class InfoPacientePageModule {}
