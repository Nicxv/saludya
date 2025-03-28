import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Geolocation } from '@capacitor/geolocation'; // Asegúrate de importar Geolocation


@Component({
  selector: 'app-profesional-consulta-alerta',
  templateUrl: './profesional-consulta-alerta.page.html',
  styleUrls: ['./profesional-consulta-alerta.page.scss'],
})
export class ProfesionalConsultaAlertaPage implements OnInit {
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  usuario: registroUsuario = null;
  numeroConsultas: number = 0;
  consulta: Consultamedica;
  latitudUsuario: number;
  longitudUsuario: number;
  direccionDestino: string; // Aquí almacenamos la dirección del usuario destino
  ofertaAceptada: boolean = false; // Nueva variable para controlar la visibilidad
  /* private googleMapsApiKey = 'AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8'; */

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
    this.direccionDestino = this.consulta?.direccionUsuario; // Asegúrate de tener esto disponible
  }
  async aceptarOferta() {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'granted') {
        const position = await Geolocation.getCurrentPosition();
        this.latitudUsuario = position.coords.latitude;
        this.longitudUsuario = position.coords.longitude;

        const direccionFuncionario = `${this.latitudUsuario}, ${this.longitudUsuario}`; // Reemplaza esto con la dirección si tienes el servicio
        this.ofertaAceptada = true; 

        await this.firestore.updateDoc(
          { direccionFuncionario, estado: 'aceptada' },
          'ConsultasMedicas',
          this.consulta.id_consulta
        );
        
        const mapElement = document.getElementById('map');
        if (mapElement) {
          this.googleMapsService.initMap(mapElement, this.latitudUsuario, this.longitudUsuario);
          this.googleMapsService.trazarRuta(this.latitudUsuario, this.longitudUsuario, this.consulta.direccionUsuario);
        }
      } else {
        console.error('Permisos de ubicación no concedidos');
      }
    } catch (error) {
      console.error('Error al aceptar la oferta: ', error);
    }
  }

  async cancelarRuta() {
    this.googleMapsService.clearRoute();
    this.ofertaAceptada = false;

    await this.firestore.updateDoc(
      { estado: 'en espera' },
      'ConsultasMedicas',
      this.consulta.id_consulta
    );
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
}