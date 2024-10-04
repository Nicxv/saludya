import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.page.html',
  styleUrls: ['./verperfil.page.scss'],
})
export class VerperfilPage implements OnInit {
  uid: string = null;
  info: registroUsuario = null;
  activeField: string | null = null; // Inicialmente no hay campo activo


  constructor(private auth:AuthService, private interaction: InteractionService, private router: Router, private firestore: FirestoreService) { }

  async ngOnInit() { 
    console.log('ver perfil');
    this.auth.stateUser().subscribe( res => {
      console.log('ver perfil - estado autenticación')
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
