import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerperfilPageRoutingModule } from './verperfil-routing.module';

import { VerperfilPage } from './verperfil.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerperfilPageRoutingModule
  ],
  declarations: [VerperfilPage]
})
export class VerperfilPageModule {}
