import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaUsuariosAdminPageRoutingModule } from './lista-usuarios-admin-routing.module';

import { ListaUsuariosAdminPage } from './lista-usuarios-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaUsuariosAdminPageRoutingModule
  ],
  declarations: [ListaUsuariosAdminPage]
})
export class ListaUsuariosAdminPageModule {}
