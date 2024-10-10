import { Component, OnInit } from '@angular/core';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {
  uid: string = null;
  nombre_usu: string = '';
  apellido_usu: string = '';
  correo_usu: string = '';
  asunto: string = '';
  mensaje: string = '';

  constructor(private auth: AuthService, private firestore: FirestoreService, private interaction: InteractionService) {}

  async ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      console.log('en contactanos - estado autenticación');
      this.getUid();
    });
  }

  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      // Obtener el usuario desde Firestore
      this.getUsuario(this.uid); // Llama a obtener el usuario
    } else {
      console.log('no existe uid');
    }
  }
  
  // Método para obtener el usuario logueado
  async getUsuario(uid: string) {
    this.firestore.getDoc<registroUsuario>('Usuarios', uid).subscribe(usuarioDoc => {
      if (usuarioDoc) {
        this.nombre_usu = usuarioDoc.nombre; // Asignar nombre a la variable
        this.apellido_usu = usuarioDoc.apellido; 
        this.correo_usu = usuarioDoc.correo;// Asignar apellido a la variable
        console.log('Nombre:', this.nombre_usu, 'Apellido:', this.apellido_usu, 'Correo:', this.correo_usu); // Verificar
      }
    });
  }

  async enviarMensaje() {
    if (this.asunto.trim() && this.mensaje.trim()) {
      const path = `Mensajes`;
      const id_mensaje = this.firestore.getId();  // Crear un ID único para el mensaje
      const data = {
        id_mensaje: id_mensaje,  // Cambiamos a id_mensaje para mejor identificación
        nombre_usu: this.nombre_usu, // Agregar nombre del usuario
        apellido_usu: this.apellido_usu, 
        correo_usu: this.correo_usu,// Agregar apellido del usuario
        asunto: this.asunto,
        mensaje: this.mensaje,
        fecha: new Date(),
        uid: this.uid
      };
  
      // Mostramos el loading mientras se envía el mensaje
      await this.interaction.presentLoading('Enviando mensaje...');
  
      this.firestore.createDoc(data, path, id_mensaje).then(() => {
        // Ocultamos el loading y mostramos un mensaje de éxito
        this.interaction.dismissLoading();
        this.interaction.presentToast('Mensaje enviado correctamente', 'success');
  
        // Limpiar los campos del formulario
        this.asunto = '';
        this.mensaje = '';
      }).catch(error => {
        // Ocultamos el loading y mostramos un mensaje de error
        this.interaction.dismissLoading();
        this.interaction.presentToast('Error al enviar el mensaje', 'danger');
        console.error('Error al enviar el mensaje', error);
      });
    } else {
      // Si los campos están vacíos, mostramos un mensaje de error
      this.interaction.presentToast('Asunto o mensaje vacío', 'warning');
    }
  }
}