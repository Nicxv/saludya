import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.firestoreService.getUsuarios().subscribe(data => {
      this.Usuarios = data;
    });
  }

  async verUsuario(usuario: registroUsuario) {
    const modal = await this.modalController.create({
      component: UsuarioModalComponent,
      componentProps: { usuario: usuario }
    });
    return await modal.present();
  }
}
