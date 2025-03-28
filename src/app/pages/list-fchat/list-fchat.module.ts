import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFchatPageRoutingModule } from './list-fchat-routing.module';

import { ListFchatPage } from './list-fchat.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListFchatPageRoutingModule
  ],
  declarations: [ListFchatPage]
})
export class ListFchatPageModule {}
