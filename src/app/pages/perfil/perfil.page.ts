import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  

  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  constructor(private auth: AuthService, private interaction: InteractionService, private router: Router, private firestore: FirestoreService) {
  // me suscribo para obtener el estado del usuario, logeado o no logeado
  this.auth.stateUser().subscribe(res =>{
    if(res) {
      console.log('Esta logeado');
      this.login = true;
      this.getDatosUser(res.uid)
    }else {
      console.log('No está logeado');
      this.login = false;
    }
  })
}
//metodo logout
  logout() {
    this.auth.logout();
    this.interaction.presentToast('Has cerrado sesión');
    this.router.navigate(['/login'])
  }
//permisos roles de usuario
  getDatosUser(uid:string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe( res => {
      console.log('datos -> ', res);
      if(res) {
        this.rol = res.rol
      }
    })
  }


//obtener la id del usuario para mostrar los datos del perfil
uid: string = null;
info: registroUsuario = null;
  async ngOnInit() { 
    console.log('estoy en perfil');
    this.auth.stateUser().subscribe( res => {
      console.log('en perfil - estado autenticación')
      this.getUid();
    });
    this.getUid(); 
  }
  //obtener la id
    async getUid() {
       const uid = await this.auth.getUid();
       if (uid) {
         this.uid = uid;
         console.log('uid ->', this.uid);
         this.getInfoUser();
       }else {
         console.log('no existe uid');
    }
  }
//obtener datos de la base de datos para mostrarlos en el html
  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe( res => {
      if (res) {
        this.info = res;
      }
      console.log('datos son -> ', res);
    })

  }

}
