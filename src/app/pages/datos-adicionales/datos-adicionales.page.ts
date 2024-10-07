import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.page.html',
  styleUrls: ['./datos-adicionales.page.scss'],
})
export class DatosAdicionalesPage implements OnInit {
 
  uid: string | null = null;

  // Aquí se almacenarán los datos del formulario
  datosAdicionales = {
    rut: '',
    genero: '',
    altura: '',
    peso: '',
    direccion: '',
    numeroTelefonico: '',
    antecedentesQuirurgicos: '',
    alergias: '',
    medicamentos: ''
  };

   // Objeto para almacenar los errores
   errores: any = {
    rut: '',
    genero: '',
    altura: '',
    peso: '',
    direccion: '',
    numeroTelefonico: '',
    antecedentesQuirurgicos: '',
    alergias: '',
    medicamentos: ''
  };
  @ViewChild('direccionInput', { static: false }) direccionInput!: IonInput; // Referencia al ion-input

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private interaction:InteractionService, private router: Router, private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    // Verificar el estado del usuario al iniciar la página
    this.authService.stateUser().subscribe(res => {
      if (res) {
        this.getUid();
      } else {
        console.log('El usuario no está logueado');
      }
    });
  }

  ngAfterViewInit() {
    this.cargarGoogleMaps();
  }

  async cargarGoogleMaps() {
    const apiKey = 'AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8'; // Asegúrate de usar tu API Key correcta

    try {
      await this.googleMapsService.loadGoogleMaps(apiKey);

      // Asegúrate de que el input está disponible
      const inputElement = this.direccionInput.getInputElement(); // Obtener el elemento de entrada

      if (inputElement) {
        // Inicializar autocompletado en el campo de dirección
        this.googleMapsService.initAutocomplete(await inputElement, (place) => {
          this.datosAdicionales.direccion = place.formatted_address; // Guardar la dirección seleccionada
          console.log('Dirección seleccionada:', place);
        });
      } else {
        console.error('El elemento de entrada no se encontró en el DOM');
      }
    } catch (error) {
      console.error('Error al cargar Google Maps:', error);
    }
  }

  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('UID del usuario logueado:', this.uid);
    } else {
      console.log('No se pudo obtener el UID del usuario.');
    }
  }

   // Validar RUT chileno
   validarRut() {
    const rutRegex = /^[0-9]+-[0-9Kk]$/;
    if (!rutRegex.test(this.datosAdicionales.rut)) {
      this.errores.rut = 'El RUT no es válido. Debe estar en el formato 12345678-9';
    } else {
      this.errores.rut = '';
    }
  }

  // Validar número telefónico chileno
  validarTelefono() {
    const telefonoRegex = /^(\+56|56)?9\d{8}$/;
    if (!telefonoRegex.test(this.datosAdicionales.numeroTelefonico)) {
      this.errores.numeroTelefonico = 'El número debe estar en formato chileno, por ejemplo: +56912345678';
    } else {
      this.errores.numeroTelefonico = '';
    }
  }

  // Función para limpiar errores al corregir el campo
  // Actualizar la función limpiarError para que también funcione con ion-select
limpiarError(campo: string) {
  if (this.datosAdicionales[campo] !== '' && this.datosAdicionales[campo] !== null && this.datosAdicionales[campo] !== undefined) {
    this.errores[campo] = '';
  }
}

// Agregar validación de campos requeridos en validarYGuardarDatos
async validarYGuardarDatos() {
  let camposValidos = true;

  // Validar campos obligatorios
  if (!this.datosAdicionales.rut) {
    this.errores.rut = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.genero) {
    this.errores.genero = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.altura) {
    this.errores.altura = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.peso) {
    this.errores.peso = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.direccion) {
    this.errores.direccion = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.numeroTelefonico) {
    this.errores.numeroTelefonico = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.antecedentesQuirurgicos) {
    this.errores.antecedentesQuirurgicos = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.alergias) {
    this.errores.alergias = 'El campo es obligatorio';
    camposValidos = false;
  }
  if (!this.datosAdicionales.medicamentos) {
    this.errores.medicamentos = 'El campo es obligatorio';
    camposValidos = false;
  }

  // Si hay errores, no continuar
  if (!camposValidos) {
    this.interaction.presentToast('Por favor, completa todos los campos.');
    return;
  }

  // Si todo es válido, guardar los datos
  this.guardarDatos();
}

  // Guardar datos en la base de datos
  async guardarDatos() {
    try {
      // Mostrar el loading
      await this.interaction.presentLoading('Guardando datos...');
      
      if (this.uid) {
        // Actualizar datos en Firestore
        await this.firestoreService.updateDoc(this.datosAdicionales, 'Usuarios', this.uid);

        // Cerrar el loading y mostrar mensaje de éxito
        await this.interaction.dismissLoading();
        this.interaction.presentToast('Datos guardados correctamente.');

        // Redireccionar a la página principal
        this.router.navigate(['/p-principal']);
      }
    } catch (error) {
      console.error('Error al guardar los datos adicionales:', error);

      // Cerrar el loading si hay un error
      await this.interaction.dismissLoading();
      this.interaction.presentToast('Error al guardar los datos. Inténtalo de nuevo.');
    }
  }
}
