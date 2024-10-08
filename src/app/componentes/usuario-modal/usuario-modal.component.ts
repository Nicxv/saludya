import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { registroUsuario } from 'src/app/models/models';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss'],
})
export class UsuarioModalComponent  implements OnInit {
  @Input() usuario!: registroUsuario;
  roles = ['paciente', 'funcionario', 'admin']; // Opciones de rol


  constructor(private modalController: ModalController) { }

  close() {
    this.modalController.dismiss();
  }
  

  ngOnInit() {}

}
