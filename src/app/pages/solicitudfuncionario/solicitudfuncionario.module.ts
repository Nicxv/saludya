import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudfuncionarioPageRoutingModule } from './solicitudfuncionario-routing.module';

import { SolicitudfuncionarioPage } from './solicitudfuncionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudfuncionarioPageRoutingModule
  ],
  declarations: [SolicitudfuncionarioPage]
})
export class SolicitudfuncionarioPageModule {}
