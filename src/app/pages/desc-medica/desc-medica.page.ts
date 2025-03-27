import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { loadStripe } from '@stripe/stripe-js';
import { finalize } from 'rxjs';
import { PaymentModalComponent } from 'src/app/componentes/payment-modal/payment-modal.component';
import { Consultamedica, registroUsuario, Especialidad } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-desc-medica',
  templateUrl: './desc-medica.page.html',
  styleUrls: ['./desc-medica.page.scss'],
})
export class DescMedicaPage implements OnInit, AfterViewInit {
  mostrarModal = false;
  login: boolean = false;
  funcionarios: registroUsuario[] = [];
  especialidades: Especialidad[] = [];
  consulta: Consultamedica = {
    id_consulta: '',
    nombreFuncionario: '',
    descripcion: '',
    sintomas: '',
    subtotal: 50000,
    iva: 0,
    costoConsulta: 0,
    fecha_pago: new Date(),
    rutUsuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    direccionUsuario: '',
    uidFuncionario: '',// Nueva propiedad para almacenar la UID del funcionario
    fotoUsuario: '', 
  };
  archivoSeleccionado: File | null = null;
  stripe: any;
  card: any;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private storage: AngularFireStorage,
    private paymentService: PaymentService,
    private modalController: ModalController
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
    this.calcularCostoConsulta();
    this.obtenerEspecialidades();
  }

  ngAfterViewInit() {
    this.initializeStripe(); // Inicializa Stripe al cargar el componente
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51QAZP0Fm8vIFI2nfBfipUaYZkh8BgXJsecl5dx0Da335OSx6Q7X2XnIUiGu2E90CKBI5Hjep5eLbNGqgDQd87KGL006bKX1Z6V');

    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element'); // Monta el elemento de tarjeta en el DOM
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<registroUsuario>(path, uid).subscribe(res => {
      if (res) {
        this.consulta.rutUsuario = res.rut || '';
        this.consulta.nombreUsuario = res.nombre || '';
        this.consulta.apellidoUsuario = res.apellido || '';
        this.consulta.direccionUsuario = res.direccion || '';
        this.consulta.fotoUsuario = res.photoURL || '';
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
  onSelectChange(event: any) {
    const funcionarioSeleccionado = event.detail.value;
    this.consulta.nombreFuncionario = funcionarioSeleccionado.nombre;
    this.consulta.uidFuncionario = funcionarioSeleccionado.uid;
  
    // Buscar la especialidad del funcionario
    const especialidadFuncionario = funcionarioSeleccionado.especialidad; 
  
    // Obtener el costo de la especialidad
    const especialidadEncontrada = this.especialidades.find(e => e.nombre === especialidadFuncionario);
    if (especialidadEncontrada) {
      this.consulta.subtotal = especialidadEncontrada.valor;
    } else {
      this.consulta.subtotal = 50000; // Valor por defecto si no se encuentra
    }
  
    this.calcularCostoConsulta(); // Recalcular costo con el nuevo subtotal
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

  async abrirModalPago() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: {
        consulta: this.consulta, // Pasa los datos de la consulta al modal
      }
    });
    return await modal.present();
  }
  obtenerEspecialidades() {
    this.firestore.getCollection<Especialidad>('Especialidades').subscribe(res => {
      this.especialidades = res;
      console.log(this.especialidades); // Verifica que se obtuvieron los datos
    });
  }
}
