import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  usuariosConMensajes: any[] = [];  // Almacenar usuarios con sus mensajes
  expandedUserId: string = '';     // Almacenar el ID del usuario actualmente expandido

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.getMensajesAgrupados();
  }

  // Método para obtener los mensajes agrupados por usuario
  getMensajesAgrupados() {
    const path = 'Mensajes';
    this.firestore.getCollection(path).pipe(
      map(mensajes => this.agruparPorUsuario(mensajes))
    ).subscribe(usuariosConMensajes => {
      this.usuariosConMensajes = usuariosConMensajes;
    });
  }

  // Agrupar los mensajes por el campo 'uid'
  agruparPorUsuario(mensajes: any[]) {
    const usuariosMap = new Map();
    
    mensajes.forEach(mensaje => {
      if (!usuariosMap.has(mensaje.uid)) {
        usuariosMap.set(mensaje.uid, {
          uid: mensaje.uid,
          nombre_usu: mensaje.nombre_usu,
          apellido_usu: mensaje.apellido_usu,
          correo_usu: mensaje.correo_usu,
          mensajes: []
        });
      }
      usuariosMap.get(mensaje.uid).mensajes.push(mensaje);
    });

    return Array.from(usuariosMap.values());
  }

  // Método para expandir o contraer los detalles de un usuario
  toggleExpand(uid: string) {
    this.expandedUserId = this.expandedUserId === uid ? '' : uid;
  }

  // Método para eliminar un mensaje basado en id_mensaje
  eliminarMensaje(uid: string, id_mensaje: string) {
    const usuario = this.usuariosConMensajes.find(u => u.uid === uid);
    if (usuario) {
      const path = `Mensajes/${id_mensaje}`; // Usar id_mensaje para eliminar
      this.firestore.deleteDoc(path).then(() => {
        console.log('Mensaje eliminado de la base de datos');
        // Eliminar el mensaje de la lista del usuario
        usuario.mensajes = usuario.mensajes.filter(m => m.id_mensaje !== id_mensaje);
        // Si ya no tiene mensajes, quitar el usuario de la lista
        if (usuario.mensajes.length === 0) {
          this.usuariosConMensajes = this.usuariosConMensajes.filter(u => u.uid !== uid);
        }
      }).catch(error => {
        console.error('Error al eliminar el mensaje:', error);
      });
    }
  }
}

