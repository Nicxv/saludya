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
      // Verifica si el usuario ya está en el mapa
      if (!usuariosMap.has(mensaje.uid)) {
        usuariosMap.set(mensaje.uid, {
          uid: mensaje.uid,
          nombre_usu: mensaje.nombre_usu,  // Agregar nombre
          apellido_usu: mensaje.apellido_usu, // Agregar apellido
          mensajes: []
        });
      }
      // Agregar el mensaje al usuario correspondiente
      usuariosMap.get(mensaje.uid).mensajes.push(mensaje);
    });

    return Array.from(usuariosMap.values());
  }

  // Método para expandir o contraer los detalles de un usuario
  toggleExpand(uid: string) {
    this.expandedUserId = this.expandedUserId === uid ? '' : uid;
  }
}
