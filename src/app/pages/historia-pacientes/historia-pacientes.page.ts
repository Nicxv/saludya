import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historia-pacientes',
  templateUrl: './historia-pacientes.page.html',
  styleUrls: ['./historia-pacientes.page.scss'],
})
export class HistoriaPacientesPage implements OnInit {
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  usuario: registroUsuario = null;
  consultasMedicas: Consultamedica[] = []; // Lista de consultas médicas filtradas

  constructor(private auth: AuthService, private firestore: FirestoreService, private navCtrl: NavController) { 
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit() {
  }
  toggleNotificaciones() {
    // Implementa la lógica para mostrar u ocultar las notificaciones
    const consultasElement = document.querySelector('ion-content');
    if (consultasElement) {
      consultasElement.scrollToPoint(0, consultasElement.scrollHeight, 500); // Scroll suave hacia abajo
    }
  }
  

  // Obtener los datos del usuario logueado
  getDatosUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<registroUsuario>(path, uid).subscribe(res => {
      if (res) {
        this.usuario = res;
        this.rol = res.rol;
        if (this.rol === 'funcionario') {
          this.getConsultasMedicas(); // Obtener consultas médicas si es funcionario
        }
      }
    });
  }

  getConsultasMedicas() {
    const path = 'ConsultasMedicas';
    this.firestore.getCollection<Consultamedica>(path).pipe(
      map(consultas => consultas.filter(consulta => consulta.uidFuncionario === this.usuario.uid)),
      map(filteredConsultas => 
        filteredConsultas.map(consulta => {
          // Convertir Timestamp a Date
          consulta.fecha_pago = (consulta.fecha_pago as any).toDate();
          return consulta;
        })
      )
    ).subscribe(filteredConsultas => {
      this.consultasMedicas = filteredConsultas;
    });
  }
  // Navegar a la página de profesional-consulta-alerta con los datos de la consulta seleccionada
  revisarDetalles(consulta: Consultamedica) {
    this.navCtrl.navigateForward(['/profesional-consulta-alerta', { consulta: JSON.stringify(consulta) }]);
  }
  
}