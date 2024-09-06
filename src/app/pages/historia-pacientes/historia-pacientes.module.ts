import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriaPacientesPageRoutingModule } from './historia-pacientes-routing.module';

import { HistoriaPacientesPage } from './historia-pacientes.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriaPacientesPageRoutingModule
  ],
  declarations: [HistoriaPacientesPage]
})
export class HistoriaPacientesPageModule {}
