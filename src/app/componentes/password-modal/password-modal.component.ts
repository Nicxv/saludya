import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
})
export class PasswordModalComponent  implements OnInit {
  password: string;

  constructor(private modalController: ModalController) { }

  // Función para cerrar el modal y pasar la contraseña
  confirm() {
    this.modalController.dismiss({ password: this.password });
  }

  // Función para cerrar el modal sin pasar datos
  close() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
