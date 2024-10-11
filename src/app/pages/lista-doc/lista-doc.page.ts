import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-doc',
  templateUrl: './lista-doc.page.html',
  styleUrls: ['./lista-doc.page.scss'],
})
export class ListaDocPage implements OnInit {
  UsuariosFiltrados: registroUsuario[] = [];
  filteredUsuarios: registroUsuario[] = []; // Almacenar los usuarios filtrados
  searchTerm: string = ''; // Almacenar el término de búsqueda
  userRole: string | null = null;

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.getUserRole();
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.filteredUsuarios = this.UsuariosFiltrados; // Mostrar todos los usuarios cuando se borra el término de búsqueda
  }
  

  cargarUsuarios() {
    this.firestoreService.getUsuarios().subscribe(data => {
      this.UsuariosFiltrados = data.filter(usuario => usuario.rol === 'funcionario');
      this.filteredUsuarios = this.UsuariosFiltrados; // Inicializar la lista filtrada
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

  filterUsuarios() {
    const searchLower = this.searchTerm.toLowerCase();
  
    this.filteredUsuarios = this.UsuariosFiltrados.filter(usuario => {
      // Asegurarse de que `usuario.especialidad` esté definido antes de llamar a `toLowerCase`
      return usuario.especialidad && usuario.especialidad.toLowerCase().includes(searchLower);
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

