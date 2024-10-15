import { Component, OnInit } from '@angular/core';
import { Chat, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-list-fchat',
  templateUrl: './list-fchat.page.html',
  styleUrls: ['./list-fchat.page.scss'],
})
export class ListFchatPage implements OnInit {
  mensajes: Chat[] = [];
  uid: string | null = null;
  private auth = getAuth(); // Initialize Firebase Auth

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService ) {}

  ngOnInit() {
    // Use onAuthStateChanged to ensure we detect the user state correctly
    onAuthStateChanged(this.auth, (user) => {
      console.log('User state changed:', user);
      if (user) {
        this.uid = user.uid;
        this.cargarMensajes(); // Load messages once user is authenticated
      } else {
        console.warn('No user is authenticated.');
        // Optionally redirect to login or show an error message
      }
    });
  }

  cargarMensajes() {
    if (this.uid) {
      this.firestoreService.getCollection<Chat>('Chat').subscribe((chatMessages) => {
        console.log('Fetched Messages:', chatMessages);
        this.mensajes = chatMessages
          .filter((chat) => chat.destinatario === this.uid)
          .map((chat) => ({
            ...chat,
            expanded: false,
            timestamp: this.convertTimestampToDate(chat.timestamp),
          }));
      });
    }
  }

  convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.seconds !== undefined) {
      return new Date(timestamp.seconds * 1000); // Convert to milliseconds
    }
    return new Date(); // Default to current date if invalid timestamp
  }
}


