import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  mensajes: any[] = [];  // Almacenará los mensajes

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.getMensajes();
  }

  // Método para obtener los mensajes de la base de datos
  getMensajes() {
    const path = 'Mensajes';
    this.firestore.getCollection(path).subscribe(mensajes => {
      this.mensajes = mensajes;  // Guardar los mensajes en la variable
    });
  }

}
