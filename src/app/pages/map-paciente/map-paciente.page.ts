import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
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
  showRouteButton: boolean = false;
  notificationCount: number = 0;
  consultaMedica: Consultamedica; // Variable para almacenar la consulta médica aceptada

  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private googleMapsService: GoogleMapsService
  ) {
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
    this.loadMap();
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe((res) => {
      if (res) {
        this.rol = res.rol;
        this.rut = res.rut;
        this.userPhotoURL = res.photoURL;
        this.checkConsultasMedicas(); // Llama a esta función después de obtener el rut
      }
    });
  }

  checkConsultasMedicas() {
    const consultasPath = 'ConsultasMedicas';
    this.firestore.getCollection<Consultamedica>(consultasPath).subscribe((consultas) => {
      // Verificar si existe una consulta aceptada que coincida con el rut del usuario logueado
      const consultaAceptada = consultas.find(
        (consulta) => consulta.estado === 'aceptada' && consulta.rutUsuario === this.rut
      );

      if (consultaAceptada) {
        this.showRouteButton = true;
        this.notificationCount = 1;
        this.consultaMedica = consultaAceptada; // Almacenar la consulta para usar en el trazo de la ruta
      }
    });
  }

  async loadMap() {
    try {
      await this.googleMapsService.loadGoogleMaps('AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8');
      const mapElement = this.mapElement.nativeElement;
      this.googleMapsService.initMap(mapElement, -33.4489, -70.6693);
    } catch (error) {
      console.error('Error al cargar el mapa', error);
    }
  }
  mostrarRuta() {
    if (this.consultaMedica) {
      const { direccionFuncionario, direccionUsuario } = this.consultaMedica;
  
      if (direccionFuncionario && direccionUsuario) {
        // Usa la nueva función trazarRutaMixta que acepta tanto coordenadas como direcciones en texto
        this.googleMapsService.trazarRutaMixta(direccionFuncionario, direccionUsuario);
        this.notificationCount = 0; // Reiniciar el contador de notificaciones al presionar el botón
      } else {
        console.warn("Falta la dirección de usuario o de funcionario.");
      }
    }
  }
  

}