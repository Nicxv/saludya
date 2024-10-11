import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';

@Component({
  selector: 'app-perfiles-docs',
  templateUrl: './perfiles-docs.page.html',
  styleUrls: ['./perfiles-docs.page.scss'],
})
export class PerfilesDocsPage implements OnInit {
  usuario: registroUsuario; // Definimos la variable para el usuario

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener el estado pasado a la ruta
    this.usuario = history.state.usuario; // Esto obtiene el usuario que pasamos
  }
}
