import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosAdicionalesPageRoutingModule } from './datos-adicionales-routing.module';

import { DatosAdicionalesPage } from './datos-adicionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosAdicionalesPageRoutingModule
  ],
  declarations: [DatosAdicionalesPage]
})
export class DatosAdicionalesPageModule {}
