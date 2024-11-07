import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario, Reporte, Valoracion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfiles-docs',
  templateUrl: './perfiles-docs.page.html', 
  styleUrls: ['./perfiles-docs.page.scss'],
})
export class PerfilesDocsPage implements OnInit {
  usuario: registroUsuario;
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  valoracionSeleccionada: number = 0;
  valoracionRealizada: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  promedioValoracion: number = 0;
  mostrarSelectReporte = false;
  tipoReporteSeleccionado: string;
  reporteRealizado: boolean = false; // Nueva propiedad para verificar si el usuario ya reportó


  constructor(private router: Router, private auth: AuthService, private firestore: FirestoreService) {}

  ngOnInit() {
    this.usuario = history.state.usuario;
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.calcularPromedioValoracion();
        this.checkReporteRealizado(); // Verifica si ya existe un reporte al iniciar
      } else {
        this.login = false;
      }
    });
    this.checkValoracionRealizada();
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.rol;
      }
    });
  }

  async calcularPromedioValoracion() {
    const valoraciones = await this.firestore.getAllDocs<Valoracion>('Valoraciones');
    const valoracionesFuncionario = valoraciones.filter(v => v.uidFuncionario === this.usuario.uid);
    const totalValoraciones = valoracionesFuncionario.length;
    const sumaValoraciones = valoracionesFuncionario.reduce((sum, v) => sum + v.valor, 0);
    
    this.promedioValoracion = totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
  }

  // Método para redondear el promedio de valoración
  getPromedioValoracionRedondeado(): number {
    return Math.round(this.promedioValoracion);
  }

  contactarFuncionario() {
    this.router.navigate(['/msj-funcionario'], { state: { uidFuncionario: this.usuario.uid } });
  }

  seleccionarValoracion(valor: number) {
    this.valoracionSeleccionada = valor;
  }

  async checkValoracionRealizada() {
    const uidUsuario = await this.auth.getUid();
    if (!uidUsuario) return;

    const idValoracion = `${uidUsuario}_${this.usuario.uid}`;
    this.firestore.getDoc<Valoracion>('Valoraciones', idValoracion).subscribe((valoracionExistente) => {
      if (valoracionExistente) {
        this.valoracionRealizada = true;
        this.valoracionSeleccionada = valoracionExistente.valor; 
      }
    });
  }

  async enviarValoracion() {
    if (!this.valoracionSeleccionada || this.valoracionRealizada) {
      console.log("Ya has valorado a este funcionario.");
      return;
    }

    const uidUsuario = await this.auth.getUid();
    if (!uidUsuario) {
      console.error("UID de usuario no disponible");
      return;
    }

    const idValoracion = `${uidUsuario}_${this.usuario.uid}`;
    const valoracion: Valoracion = {
      id_valoricacion: idValoracion,
      uidUsuario: uidUsuario,
      uidFuncionario: this.usuario.uid,
      valor: this.valoracionSeleccionada,
    };

    this.firestore.createDoc(valoracion, 'Valoraciones', idValoracion)
      .then(() => {
        this.valoracionRealizada = true;
        console.log("Valoración enviada con éxito.");
        this.calcularPromedioValoracion();
      })
      .catch((error) => {
        console.error("Error al enviar la valoración: ", error);
      });
  }

  mostrarOpcionesReporte() {
    if (!this.reporteRealizado) { // Solo muestra el selector si no se ha hecho un reporte
      this.mostrarSelectReporte = !this.mostrarSelectReporte;
    } else {
      console.log("Ya has reportado a este funcionario.");
    }
  }

  async checkReporteRealizado() {
    const uidUsuario = await this.auth.getUid();
    if (!uidUsuario) return;

    const idReporte = `${uidUsuario}_${this.usuario.uid}`;
    this.firestore.getDoc<Reporte>('Reportes', idReporte).subscribe((reporteExistente) => {
      if (reporteExistente) {
        this.reporteRealizado = true; // Marca que ya existe un reporte
      }
    });
  }

  async enviarReporte() {
    if (!this.tipoReporteSeleccionado) return;

    const uidUsuario = await this.auth.getUid();
    if (!uidUsuario) {
      console.error("UID de usuario no disponible");
      return;
    }

    const idReporte = `${uidUsuario}_${this.usuario.uid}`;

    // Verifica si ya existe un reporte antes de guardarlo
    if (this.reporteRealizado) {
      console.log("Ya has reportado a este funcionario.");
      return;
    }

    const reporte: Reporte = {
      id_reporte: idReporte,
      nombreFuncionario: this.usuario.nombre,
      apellidoFuncionario: this.usuario.apellido,
      rutFuncionario: this.usuario.rut || '',
      uidReportador: uidUsuario,
      tipoReporte: this.tipoReporteSeleccionado,
      fechaReporte: new Date(),
    };

    // Guarda el reporte en Firestore
    this.firestore.createDoc(reporte, 'Reportes', idReporte)
      .then(() => {
        console.log("Reporte guardado con éxito.");
        this.reporteRealizado = true; // Marca como realizado
        this.mostrarSelectReporte = false; // Oculta el select
        this.tipoReporteSeleccionado = ''; // Limpia la selección
      })
      .catch((error) => {
        console.error("Error al guardar el reporte: ", error);
      });
  }

}
 