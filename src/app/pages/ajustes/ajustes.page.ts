import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  mensajesCount: number = 0;  // Contador de mensajes
  reportesCount: number = 0;  // Contador de reportes

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.getMensajesCount();
    this.getReportesCount();
  }

  // Método para obtener la cantidad de mensajes
  getMensajesCount() {
    const path = 'Mensajes';
    this.firestore.getCollection(path).subscribe(mensajes => {
      this.mensajesCount = mensajes.length;
    });
  }

  // Método para obtener la cantidad de reportes
  getReportesCount() {
    const path = 'Reportes';
    this.firestore.getCollection(path).subscribe(reportes => {
      this.reportesCount = reportes.length;
    });
  }
}
