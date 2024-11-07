import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCertificadosfPageRoutingModule } from './mis-certificadosf-routing.module';

import { MisCertificadosfPage } from './mis-certificadosf.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MisCertificadosfPageRoutingModule
  ],
  declarations: [MisCertificadosfPage]
})
export class MisCertificadosfPageModule {}
