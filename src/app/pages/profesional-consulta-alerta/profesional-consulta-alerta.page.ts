import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-profesional-consulta-alerta',
  templateUrl: './profesional-consulta-alerta.page.html',
  styleUrls: ['./profesional-consulta-alerta.page.scss'],
})
export class ProfesionalConsultaAlertaPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  usuario: registroUsuario = null;
  numeroConsultas: number = 0;
  consulta: Consultamedica;
  private watchId: number; // Variable para almacenar el ID del seguimiento de geolocalización
  private googleMapsApiKey = 'AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8';
  ofertaAceptada: boolean = false;


  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private googleMapsService: GoogleMapsService
  ) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.verificarConsultas(res.uid);
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit() {
    const consultaData = this.route.snapshot.paramMap.get('consulta');
    if (consultaData) {
      this.consulta = JSON.parse(consultaData);
    }
  }
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    const mapElement = document.getElementById('map');
    this.googleMapsService
      .loadGoogleMaps(this.googleMapsApiKey)
      .then(() => {
        this.googleMapsService.initMap(mapElement, -33.447487, -70.673676);
      })
      .catch(error => {
        console.error('Error cargando el mapa:', error);
      });
  }

  goToHistoriaPacientes() {
    this.navCtrl.navigateForward('/historia-pacientes');
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<registroUsuario>(path, uid).subscribe(res => {
      if (res) {
        this.usuario = res;
        this.rol = res.rol;
      }
    });
  }

  verificarConsultas(uidFuncionario: string) {
    const path = 'ConsultasMedicas';
    this.firestore.getCollection<Consultamedica>(path).subscribe(consultas => {
      if (consultas) {
        this.numeroConsultas = consultas.filter(
          consulta => consulta.uidFuncionario === uidFuncionario
        ).length;
      } else {
        this.numeroConsultas = 0;
      }
    });
  }


  aceptarOferta() {
    if (this.consulta && this.consulta.direccionUsuario) {
      this.ofertaAceptada = true; // La oferta ha sido aceptada
      this.startRealTimeTracking(); // Iniciar el seguimiento en tiempo real
    }
  }

  startRealTimeTracking() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.googleMapsService.updateCurrentPosition(lat, lng);
  
          // Trazar la ruta desde la ubicación actual hasta el destino
          const origen = { lat, lng };
          const destino = this.consulta.direccionUsuario;
          this.googleMapsService.showRoute(origen, destino);
        },
        error => {
          console.error('Error obteniendo la geolocalización:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  }
  
  cancelarRuta() {
    
    if (navigator.geolocation && this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = undefined;
      console.log('Seguimiento en tiempo real detenido');
      this.googleMapsService.clearRoute(); // Método para limpiar la ruta del mapa
      this.ofertaAceptada = false; // Restablecer el estado de la oferta
      console.log('Ruta cancelada');
    }
    
    
  }
  
}