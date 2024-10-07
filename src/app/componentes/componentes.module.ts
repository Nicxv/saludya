import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';



@NgModule({
  declarations: [TabComponent,ResetPasswordModalComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [
    TabComponent, ResetPasswordModalComponent,
  ]
})
export class ComponentesModule { }
