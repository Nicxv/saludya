import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent  implements OnInit {
  correo: string; // Para almacenar el correo del usuario

  constructor(private modalController: ModalController, private authService: AuthService, private interaction:InteractionService) { }

  close() {
    this.modalController.dismiss();
  }
  async enviarCorreoRecuperacion() {
    try {
      await this.authService.recuperarContrasena(this.correo);
      this.close();
      this.interaction.presentAlert('Éxito', 'Se ha enviado un correo de recuperación a ' + this.correo);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      this.interaction.presentAlert('Error', 'No se pudo enviar el correo de recuperación. Intenta nuevamente más tarde.');
    }
  }
  

  ngOnInit() {}

}
