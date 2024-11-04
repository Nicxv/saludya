import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCertificadosPageRoutingModule } from './mis-certificados-routing.module';

import { MisCertificadosPage } from './mis-certificados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisCertificadosPageRoutingModule
  ],
  declarations: [MisCertificadosPage]
})
export class MisCertificadosPageModule {}
