import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PPrincipalPageRoutingModule } from './p-principal-routing.module';

import { PPrincipalPage } from './p-principal.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PPrincipalPageRoutingModule
  ],
  declarations: [PPrincipalPage]
})
export class PPrincipalPageModule {}
