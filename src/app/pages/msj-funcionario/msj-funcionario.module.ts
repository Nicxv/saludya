import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsjFuncionarioPageRoutingModule } from './msj-funcionario-routing.module';

import { MsjFuncionarioPage } from './msj-funcionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsjFuncionarioPageRoutingModule
  ],
  declarations: [MsjFuncionarioPage]
})
export class MsjFuncionarioPageModule {}
