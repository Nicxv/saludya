import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

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

  constructor(private auth: AuthService, private firestore: FirestoreService, private navCtrl: NavController, private route: ActivatedRoute) { 
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
}
