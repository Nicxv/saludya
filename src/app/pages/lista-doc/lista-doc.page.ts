import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { registroUsuario } from 'src/app/models/models';

@Component({
  selector: 'app-lista-doc',
  templateUrl: './lista-doc.page.html',
  styleUrls: ['./lista-doc.page.scss'],
})
export class ListaDocPage implements OnInit {
  UsuariosFiltrados: registroUsuario[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  // Load users and filter only those with 'Funcionario' role
  cargarUsuarios() {
    this.firestoreService.getUsuarios().subscribe(data => {
      this.UsuariosFiltrados = data.filter(usuario => usuario.rol === 'funcionario');
    });
  }
}
