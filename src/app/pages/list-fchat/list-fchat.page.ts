import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-list-fchat',
  templateUrl: './list-fchat.page.html',
  styleUrls: ['./list-fchat.page.scss'],
})
export class ListFchatPage implements OnInit {
  mensajes: Chat[] = [];
  uid: string | null = null;

  constructor(private firestoreService: FirestoreService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUid().then(uid => {
      this.uid = uid;
      this.cargarMensajes();
    });
  }

  cargarMensajes() {
    if (this.uid) {
      this.firestoreService.getCollection<Chat>('Chat').subscribe(chatMessages => {
        console.log('Mensajes obtenidos:', chatMessages); // Verifica los mensajes
        this.mensajes = chatMessages
          .filter(chat => chat.destinatario === this.uid)
          .map(chat => ({
            ...chat,
            timestamp: this.convertTimestampToDate(chat.timestamp) // Conversión alternativa
          }));
      }, error => {
        console.error('Error al cargar mensajes:', error);
      });
    } else {
      console.warn('UID no está definido, no se pueden cargar los mensajes.');
    }
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.seconds !== undefined) {
      return new Date(timestamp.seconds * 1000); // Convertir a milisegundos
    }
    return new Date(); // Devuelve la fecha actual si no es válido
  }
}