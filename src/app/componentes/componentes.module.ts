import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TabComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    TabComponent
  ]
})
export class ComponentesModule { }
