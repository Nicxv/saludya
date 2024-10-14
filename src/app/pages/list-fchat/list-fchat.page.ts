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
    const mensajesGuardados = localStorage.getItem('mensajes');
    if (mensajesGuardados) {
      this.mensajes = JSON.parse(mensajesGuardados);
    } else {
      this.getUid(); // Cargar mensajes si no están en local storage
    }
  }
  
  async getUid() {
    this.uid = await this.authService.getUid();
    if (this.uid) {
      this.cargarMensajes();
    }
  }

  cargarMensajes() {
    if (this.uid) {
      this.firestoreService.getCollection<Chat>('Chat').subscribe(chatMessages => {
        this.mensajes = chatMessages
          .filter(chat => chat.destinatario === this.uid)
          .map(chat => ({
            ...chat,
            timestamp: this.convertTimestampToDate(chat.timestamp)
          }));
        localStorage.setItem('mensajes', JSON.stringify(this.mensajes)); // Guarda los mensajes en local storage
      });
    }
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.seconds !== undefined) {
      return new Date(timestamp.seconds * 1000);
    }
    return new Date();
  }

}