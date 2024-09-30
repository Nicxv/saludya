import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private interaction: InteractionService, private router: Router) { }


  async login() {
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch( error => {
      console.log('error');
      this.interaction.dismissLoading();
      this.interaction.presentToast('Usuario o contraseña incorrectos')
    })
    if(res) {
      this.interaction.dismissLoading();
      console.log('res -> ', res);
      this.interaction.presentToast('Has iniciado sesión con éxito');
      this.router.navigate(['/p-principal'])
    }
  }

  ngOnInit() {
  }

}
