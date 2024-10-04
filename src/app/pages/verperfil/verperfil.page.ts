import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.page.html',
  styleUrls: ['./verperfil.page.scss'],
})
export class VerperfilPage implements OnInit {
  uid: string = null;
  info: registroUsuario = {
    uid: null,
    nombre: null,
    apellido: null,
    fechaNacimiento: null,
    correo: null,
    password: null,
    rol: 'paciente',
    rut: null,
    edad: null,
    genero: null,
    altura: null,
    peso: null,
    direccion: null,
    numeroTelefonico: null,
    antecedentesQuirurgicos: null,
    alergias: null,
    medicamentos: null,
    photoURL: null
  };
  activeField: string | null = null; // Inicialmente no hay campo activo
  isEditing: { [key: string]: boolean } = {}; // Objeto para gestionar la edición de cada campo


  constructor(private auth:AuthService, private interaction: InteractionService, private router: Router, private firestore: FirestoreService) { }

  async ngOnInit() { 
    console.log('ver perfil');
    this.auth.stateUser().subscribe( res => {
      console.log('ver perfil - estado autenticación')
      this.getUid();
    });
    this.getUid(); 
  }

  //obtener la id
  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    }else {
      console.log('no existe uid');
 }
}
//obtener datos de la base de datos para mostrarlos en el html
getInfoUser(){
  const path = 'Usuarios';
  const id = this.uid;
  this.firestore.getDoc<registroUsuario>(path, id).subscribe( res => {
    if (res) {
      this.info = res;
    }
    console.log('datos son -> ', res);
  })

}

// Activar el modo de edición
editField(field: string) {
  this.activeField = field;
  this.isEditing[field] = true; // Habilitar edición para el campo específico
}

// Confirmar los cambios
async confirmEdit(field: string) {
  const path = 'Usuarios';
  const id = this.uid;

  // Actualiza el campo correspondiente en Firestore
  const updatedData = { [field]: this.info[field] }; // Crea un objeto con el campo actualizado
  await this.firestore.updateDoc(updatedData, path, id);

  this.isEditing[field] = false; // Desactivar edición
  this.activeField = null; // Reiniciar el campo activo
}

// Cancelar la edición
cancelEdit(field: string) {
  this.isEditing[field] = false; // Desactivar edición
  this.activeField = null; // Reiniciar el campo activo
  this.getInfoUser(); // Vuelve a cargar la información original
}

}
