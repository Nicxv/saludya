import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalConsultaAlertaPageRoutingModule } from './profesional-consulta-alerta-routing.module';

import { ProfesionalConsultaAlertaPage } from './profesional-consulta-alerta.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalConsultaAlertaPageRoutingModule
  ],
  declarations: [ProfesionalConsultaAlertaPage]
})
export class ProfesionalConsultaAlertaPageModule {}
