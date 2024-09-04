import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescMedicaPageRoutingModule } from './desc-medica-routing.module';

import { DescMedicaPage } from './desc-medica.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DescMedicaPageRoutingModule
  ],
  declarations: [DescMedicaPage]
})
export class DescMedicaPageModule {}
