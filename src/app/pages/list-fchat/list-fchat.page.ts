import { Component, OnInit } from '@angular/core';
import { Chat, registroUsuario } from 'src/app/models/models';
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
        this.mensajes = chatMessages
          .filter(chat => chat.destinatario === this.uid)
          .map(chat => ({
            ...chat,
            timestamp: this.convertTimestampToDate(chat.timestamp) // Conversión alternativa
          }));
      });
    }
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.seconds !== undefined) {
      // Asegúrate de que el timestamp sea un objeto con la propiedad seconds
      return new Date(timestamp.seconds * 1000); // Convertir a milisegundos
    }
    return new Date(); // Devuelve la fecha actual si no es válido
  }
}