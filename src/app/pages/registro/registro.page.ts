import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: registroUsuario = {
    uid: null,
    nombre: null,
    apellido: null,
    fechaNacimiento: null,
    correo: null,
    password: null,
    rol: 'paciente',
   
  }

  constructor(private auth: AuthService, private firestore:FirestoreService, private interaction: InteractionService, private router: Router) { }

  async registrar() {
    this.interaction.presentLoading('Registrando...')
    console.log('datos -> ', this.datos);
    const res = await this.auth.registrarUser(this.datos).catch( error => {
      this.interaction.dismissLoading();
      this.interaction.presentToast('Falló el registro')
      console.log('error');
  })
  if (res) {
    console.log('éxito al crear el usuario');
    const path = 'Usuarios';
    const id = res.user.uid;
    this.datos.uid = id;
    this.datos.password = null
    await this.firestore.createDoc(this.datos, path, id)
    this.interaction.dismissLoading();
    this.interaction.presentToast('Te has registrado con éxito');
    this.router.navigate(['/p-principal'])
  }

  }
  ngOnInit() {
  }

}
