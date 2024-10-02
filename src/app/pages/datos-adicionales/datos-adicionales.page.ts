import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
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
    edad: '',
    genero: '',
    altura: '',
    peso: '',
    direccion: '',
    numeroTelefonico: '',
    antecedentesQuirurgicos: '',
    alergias: '',
    medicamentos: ''
  };

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private interaction:InteractionService, private router: Router) { }

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


  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('UID del usuario logueado:', this.uid);
    } else {
      console.log('No se pudo obtener el UID del usuario.');
    }
  }

  async guardarDatos() {
    // Mostrar el indicador de carga
    this.interaction.presentLoading('Guardando datos...');
  
    if (this.uid) {
      // Vincular los datos adicionales con el UID del usuario y actualizarlos en Firestore sin sobrescribir
      try {
        await this.firestoreService.updateDoc(this.datosAdicionales, 'Usuarios', this.uid);
        
        // Cerrar el indicador de carga y mostrar mensaje de éxito
        this.interaction.dismissLoading();
        this.interaction.presentToast('Datos adicionales guardados correctamente.');
        
        // Redireccionar si es necesario o realizar otras acciones
        this.router.navigate(['/p-principal']);  // Ajusta la ruta según tu lógica
          
        
      } catch (error) {
        // Cerrar el indicador de carga y mostrar mensaje de error
        this.interaction.dismissLoading();
        this.interaction.presentToast('Error al guardar los datos adicionales.');
        console.error('Error al actualizar los datos adicionales:', error);
      }
    } else {
      // Cerrar el indicador de carga y mostrar mensaje de error
      this.interaction.dismissLoading();
      this.interaction.presentToast('No se encontró el UID del usuario.');
      console.log('No se puede guardar los datos. No se encontró el UID del usuario.');
    }
  }
}
