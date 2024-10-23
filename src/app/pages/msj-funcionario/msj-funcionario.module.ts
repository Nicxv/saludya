import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsjFuncionarioPageRoutingModule } from './msj-funcionario-routing.module';

import { MsjFuncionarioPage } from './msj-funcionario.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MsjFuncionarioPageRoutingModule
  ],
  declarations: [MsjFuncionarioPage]
})
export class MsjFuncionarioPageModule {}
