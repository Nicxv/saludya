import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-lista-reportes',
  templateUrl: './lista-reportes.page.html',
  styleUrls: ['./lista-reportes.page.scss'],
})
export class ListaReportesPage implements OnInit {

  reportes: Reporte[] = [];

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    this.obtenerReportes();
  }

  obtenerReportes() {
    this.firestore.getCollection<any>('Reportes').subscribe((data) => {
      this.reportes = data.map((doc: any) => {
        return {
          ...doc,
          fechaReporte: doc.fechaReporte instanceof Timestamp? doc.fechaReporte.toDate() : doc.fechaReporte,
        } as Reporte;
      });
    });
  }

}
