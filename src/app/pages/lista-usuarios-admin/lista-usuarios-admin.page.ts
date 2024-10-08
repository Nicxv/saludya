import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioModalComponent } from 'src/app/componentes/usuario-modal/usuario-modal.component';
import { registroUsuario } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista-usuarios-admin',
  templateUrl: './lista-usuarios-admin.page.html',
  styleUrls: ['./lista-usuarios-admin.page.scss'],
})
export class ListaUsuariosAdminPage implements OnInit {
  Usuarios: registroUsuario[] = [];
  UsuariosFiltrados: registroUsuario[] = [];  // Nueva lista de usuarios filtrados
  nombreFiltro: string = '';
  rutFiltro: string = '';
  rolFiltro: string = '';

  constructor(private firestoreService: FirestoreService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.firestoreService.getUsuarios().subscribe(data => {
      this.Usuarios = data;
      this.UsuariosFiltrados = data;  // Inicializar la lista filtrada con todos los usuarios
    });
  }

  // Filtrar usuarios por nombre, rut o rol
  filtrarUsuarios() {
    this.UsuariosFiltrados = this.Usuarios.filter(usuario => {
      const coincideNombre = this.nombreFiltro ? usuario.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()) : true;
      const coincideRut = this.rutFiltro ? usuario.rut.toLowerCase().includes(this.rutFiltro.toLowerCase()) : true;
      const coincideRol = this.rolFiltro ? usuario.rol === this.rolFiltro : true;

      return coincideNombre && coincideRut && coincideRol;
    });
  }

  // Ver detalles del usuario en el modal
  async verUsuario(usuario: registroUsuario) {
    const modal = await this.modalController.create({
      component: UsuarioModalComponent,
      componentProps: { usuario: usuario }
    });
    return await modal.present();
  }

  // Mostrar alerta de confirmación al cambiar el rol
  async confirmarCambioRol(usuario: registroUsuario) {
    const alert = await this.alertController.create({
      header: 'Confirmar cambio de rol',
      message: `¿Estás seguro que deseas cambiar el rol del usuario "${usuario.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cambio de rol cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.cambiarRol(usuario); // Llamar a la función para cambiar el rol solo si confirma
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para cambiar el rol del usuario
  cambiarRol(usuario: registroUsuario) {
    const path = `Usuarios/${usuario.uid}`;
    console.log("Verificando uid:", usuario.uid);
    const data = { rol: usuario.rol };

    this.firestoreService.updateDoc(data, 'Usuarios', usuario.uid)
      .then(() => {
        console.log(`Rol actualizado para ${usuario.nombre}`);
      })
      .catch(err => {
        console.error('Error actualizando el rol: ', err);
      });
  }
}