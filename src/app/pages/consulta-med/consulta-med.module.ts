import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaMedPageRoutingModule } from './consulta-med-routing.module';

import { ConsultaMedPage } from './consulta-med.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaMedPageRoutingModule
  ],
  declarations: [ConsultaMedPage]
})
export class ConsultaMedPageModule {}
