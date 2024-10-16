import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';



@NgModule({
  declarations: [TabComponent,ResetPasswordModalComponent, UsuarioModalComponent, PaymentModalComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [
    TabComponent, ResetPasswordModalComponent, UsuarioModalComponent, PaymentModalComponent,
  ]
})
export class ComponentesModule { }
