import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-map-paciente',
  templateUrl: './map-paciente.page.html',
  styleUrls: ['./map-paciente.page.scss'],
})
export class MapPacientePage implements OnInit {
  login: boolean = false;
  userPhotoURL: string;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  rut: string;
  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private googleMapsService: GoogleMapsService
  ) {
    // Verificar el estado del usuario
    this.auth.stateUser().subscribe((res) => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    // Cargar Google Maps cuando la vista esté cargada
    this.loadMap();
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe((res) => {
      if (res) {
        this.rol = res.rol;
        this.rut = res.rut;
        this.userPhotoURL = res.photoURL; // Obtener la URL de la foto
      }
    });
  }

  async loadMap() {
    try {
      await this.googleMapsService.loadGoogleMaps('AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8'); // Reemplaza 'TU_API_KEY' por tu clave de la API de Google Maps
      const mapElement = this.mapElement.nativeElement;
      this.googleMapsService.initMap(mapElement, -33.4489, -70.6693); // Ubicación inicial en Santiago, Chile
    } catch (error) {
      console.error('Error al cargar el mapa', error);
    }
  }
}