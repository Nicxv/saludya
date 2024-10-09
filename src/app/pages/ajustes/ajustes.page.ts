import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  mensajesCount: number = 0;  // Contador de mensajes

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.getMensajesCount();
  }

  // Método para obtener la cantidad de mensajes
  getMensajesCount() {
    const path = 'Mensajes';
    this.firestore.getCollection(path).subscribe(mensajes => {
      this.mensajesCount = mensajes.length;  // Contar el número de mensajes
    });
  }

}
