import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-doc',
  templateUrl: './lista-doc.page.html',
  styleUrls: ['./lista-doc.page.scss'],
})
export class ListaDocPage implements OnInit {

  especialidades = [
    { id: 1, name: 'Psiquiatra' },
    { id: 2, name: 'Psicólogo' },
    { id: 3, name: 'Gastroenterólogo' },
    { id: 4, name: 'Otorrino' },
  ];

  UsuariosFiltrados: registroUsuario[] = [];
  userRole: string | null = null;

  constructor(private firestoreService: FirestoreService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.getUserRole();
  }

  cargarUsuarios() {
    this.firestoreService.getUsuarios().subscribe(data => {
      this.UsuariosFiltrados = data.filter(usuario => usuario.rol === 'funcionario');
      this.UsuariosFiltrados.forEach(usuario => {
        usuario.isEditing = false; // Para controlar la edición
      });
    });
  }

  getUserRole() {
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  enableEdit(usuario: registroUsuario) {
    usuario.isEditing = true;
  }

  saveChanges(usuario: registroUsuario) {
    const path = `Usuarios/${usuario.uid}`;
    const data = {
      descripcion: usuario.descripcion,
      especialidad: usuario.especialidad
    };
    this.firestoreService.updateDoc(data, 'Usuarios', usuario.uid).then(() => {
      usuario.isEditing = false; // Salir del modo edición
    });
  }

  cancelEdit(usuario: registroUsuario) {
    usuario.isEditing = false; // Cancelar la edición
  }
}
