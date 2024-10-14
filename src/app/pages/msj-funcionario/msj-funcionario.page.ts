import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-msj-funcionario',
  templateUrl: './msj-funcionario.page.html',
  styleUrls: ['./msj-funcionario.page.scss'],
})
export class MsjFuncionarioPage implements OnInit {
  uid: string = null; // UID del usuario logeado
  uidFuncionario: string = null; // UID del funcionario a contactar
  info: registroUsuario = null; 
  asunto: string = '';
  mensaje: string = '';

  constructor(private auth: AuthService, private firestore: FirestoreService, private router: Router) { }

  async ngOnInit() {
    console.log('Estoy en msj-funcionario');
    this.auth.stateUser().subscribe(res => {
      this.getUid();
    });

    // Obtener el uid del funcionario desde el estado pasado
    const state = history.state;
    if (state && state.uidFuncionario) {
      this.uidFuncionario = state.uidFuncionario;
      console.log('UID del funcionario:', this.uidFuncionario);
    }
  }

  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {
      console.log('No existe UID');
    }
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
      }
      console.log('Datos son -> ', res);
    });
  }

  enviarMensaje() {
    if (!this.asunto || !this.mensaje) {
      console.log('Asunto o mensaje vacío');
      return;
    }

    const chatId = this.firestore.getId(); // Generar un ID para el mensaje
    const data = {
      id_chat: chatId,
      asunto: this.asunto,
      mensaje: this.mensaje,
      remitente: this.uid,
      destinatario: this.uidFuncionario,
      timestamp: new Date()
    };

    this.firestore.createDoc(data, 'Chat', chatId).then(() => {
      console.log('Mensaje enviado con éxito');
      // Limpiar los campos del formulario
      this.asunto = '';
      this.mensaje = '';
      // Redirigir o mostrar un mensaje de éxito
    }).catch(err => {
      console.log('Error al enviar el mensaje:', err);
    });
  }

}
