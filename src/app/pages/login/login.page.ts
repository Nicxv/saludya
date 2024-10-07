import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResetPasswordModalComponent } from 'src/app/componentes/reset-password-modal/reset-password-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correo: null,
    password: null

  }

  constructor(private auth: AuthService, private interaction: InteractionService, private router: Router, private modalController: ModalController) { }


  async login() {
    await this.interaction.presentLoading('Ingresando...');
    // Crear un nuevo objeto que no contenga la contraseña
    const { password, ...credencialesSinPassword } = this.credenciales;
    // Ahora logueamos las credenciales sin la contraseña
    console.log('credenciales -> ', credencialesSinPassword);

    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error => {
      console.log('error consola Usuario o contraseña incorrectos');
      this.interaction.dismissLoading();
      this.interaction.presentToast('Usuario o contraseña incorrectos');
    });

    if (res) {
      this.interaction.dismissLoading();
      console.log('res -> ', res);
      this.interaction.presentToast('Has iniciado sesión con éxito');
      this.router.navigate(['/p-principal']);
    }
  }
  async openResetPasswordModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordModalComponent,
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}