import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Consultamedica, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-desc-medica',
  templateUrl: './desc-medica.page.html',
  styleUrls: ['./desc-medica.page.scss'],
})
export class DescMedicaPage implements OnInit {
  login: boolean = false;
  funcionarios: registroUsuario[] = [];
  consulta: Consultamedica = {
    id_consulta: '',
    nombreFuncionario: '',
    descripcion: '',
    sintomas: '',
    subtotal: 50000,
    iva: 0, // Se calculará dinámicamente
    costoConsulta: 0, // Se calculará dinámicamente
    fecha_pago: new Date(),
    rutUsuario: '', // Inicializar el nuevo campo
    nombreUsuario: '', // Inicializar el nuevo campo
    direccionUsuario: '', // Inicializar el nuevo campo
  };
  archivoSeleccionado: File | null = null;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private storage: AngularFireStorage
  ) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.obtenerFuncionarios();
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit() {
    this.calcularCostoConsulta(); // Calcular el costo al cargar la página
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<registroUsuario>(path, uid).subscribe(res => {
      if (res) {
        // Asignar los datos del usuario logueado a la consulta
        this.consulta.rutUsuario = res.rut || '';
        this.consulta.nombreUsuario = res.nombre || '';
        this.consulta.direccionUsuario = res.direccion || '';
      }
    });
  }

  obtenerFuncionarios() {
    this.firestore.getCollection<registroUsuario>('Usuarios').subscribe(res => {
      this.funcionarios = res.filter(usuario => usuario.rol === 'funcionario');
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0] || null;
  }

  calcularCostoConsulta() {
    const ivaPorcentaje = 0.19;
    this.consulta.iva = this.consulta.subtotal * ivaPorcentaje;
    this.consulta.costoConsulta = this.consulta.subtotal + this.consulta.iva;
  }

  async guardarConsulta() {
    const id = this.firestore.getId();
    this.consulta.id_consulta = id;
    this.consulta.fecha_pago = new Date();

    if (this.archivoSeleccionado) {
      try {
        this.consulta.ordenMedicaURL = await this.subirArchivo();
      } catch (error) {
        console.error('Error al subir el archivo: ', error);
      }
    }

    this.calcularCostoConsulta(); // Recalcular el costo antes de guardar

    this.firestore.createDoc(this.consulta, 'ConsultasMedicas', id)
      .then(() => {
        console.log('Consulta médica guardada correctamente');
      })
      .catch(error => {
        console.error('Error al guardar la consulta médica: ', error);
      });
  }

  subirArchivo(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.archivoSeleccionado) {
        const filePath = `ordenesMedicas/${new Date().getTime()}_${this.archivoSeleccionado.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.archivoSeleccionado);

        task.snapshotChanges()
          .pipe(finalize(() => {
            fileRef.getDownloadURL().subscribe(url => resolve(url), err => reject(err));
          }))
          .subscribe();
      } else {
        resolve(''); // Si no se selecciona un archivo, retornar un string vacío
      }
    });
  }
}
