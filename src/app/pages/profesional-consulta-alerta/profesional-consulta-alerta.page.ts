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
  private googleMapsApiKey = 'AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8';


  constructor(private auth: AuthService, private firestore: FirestoreService, private navCtrl: NavController, private route: ActivatedRoute, private googleMapsService: GoogleMapsService) { 
    // Suscribirse para obtener el estado del usuario (logueado o no)
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
    // Obtener los datos de la consulta desde la URL
    const consultaData = this.route.snapshot.paramMap.get('consulta');
    if (consultaData) {
      this.consulta = JSON.parse(consultaData);
    }
    
  }

  goToHistoriaPacientes() {
    this.navCtrl.navigateForward('/historia-pacientes');
  }

  // Obtener los datos del usuario logueado
  getDatosUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<registroUsuario>(path, uid).subscribe(res => {
      if (res) {
        this.usuario = res;
        this.rol = res.rol;
      }
    });
  }

  // Verificar si hay consultas asociadas al usuario logueado
  verificarConsultas(uidFuncionario: string) {
    const path = 'ConsultasMedicas';
    this.firestore.getCollection<Consultamedica>(path).subscribe(consultas => {
      if (consultas) {
        this.numeroConsultas = consultas.filter(consulta => consulta.uidFuncionario === uidFuncionario).length;
      } else {
        this.numeroConsultas = 0;
      }
    });
  }

  ionViewDidEnter() {
    // Iniciar el mapa con una ubicación por defecto
    this.googleMapsService.initMap(this.mapElement.nativeElement, { lat: -33.5587, lng: -70.5885 }, this.googleMapsApiKey);
  }

  aceptarOferta() {
    if (this.consulta?.direccionUsuario && this.usuario?.direccion) {
      this.googleMapsService.getRoute(this.usuario.direccion, this.consulta.direccionUsuario)
        .then((result: any) => {
          console.log('Ruta trazada correctamente');
          // Iniciar la animación del autito en la ruta
          this.googleMapsService.startCarAnimation(result);
        })
        .catch((error) => {
          console.error('Error al obtener la ruta:', error);
        });
    } else {
      console.warn('No se encontraron direcciones para trazar la ruta.');
    }
  }
  
}
