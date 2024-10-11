import { Component, OnInit } from '@angular/core';
import { registroUsuario, SolicitudFuncionario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-solicitudfuncionario',
  templateUrl: './solicitudfuncionario.page.html',
  styleUrls: ['./solicitudfuncionario.page.scss'],
})
export class SolicitudfuncionarioPage implements OnInit {
  solicitud: SolicitudFuncionario = {
    id_solicitud: '',
    uid: '',
    fnombre: '',
    frut: '',
    certificado: '',
    especialidad: '',
    experiencia: '',
    descripcion: '',
    fechaSolicitud: new Date(),
  };

  constructor(private auth: AuthService, private firestore: FirestoreService) {}

  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getUid();
      }
    });
  }

  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.solicitud.uid = uid;
      this.getUsuario(uid); // Obtiene información del usuario
    }
  }

  async getUsuario(uid: string) {
    this.firestore.getDoc<registroUsuario>('Usuarios', uid).subscribe(usuarioDoc => {
      if (usuarioDoc) {
        this.solicitud.fnombre = usuarioDoc.nombre; // Asigna el nombre
        this.solicitud.frut = usuarioDoc.rut; // Asigna el RUT
      }
    });
  }

  async enviarSolicitud() {
  // Genera un ID único para la solicitud
  this.solicitud.id_solicitud = this.firestore.getId();
  // Agrega la fecha de la solicitud
  this.solicitud.fechaSolicitud = new Date();

  console.log('Solicitud a enviar:', this.solicitud); // Verifica que los datos sean correctos

  try {
    await this.firestore.createDoc<id_solicitud>(
      this.solicitud,
      'Solicitudes',
      this.solicitud.id_solicitud
    );
    console.log('Solicitud enviada con éxito');
    // Aquí podrías agregar una notificación o redirigir al usuario
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    alert('Error: ' + JSON.stringify(error)); // Muestra el error completo
  }
}

}