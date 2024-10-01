import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: registroUsuario = {
    uid: null,
    nombre: null,
    apellido: null,
    fechaNacimiento: null,
    correo: null,
    password: null,
    rol: 'paciente',
   
  }

  repetirPassword: string = '';
  showPassword: boolean = false;
  showRepetirPassword: boolean = false; // Para mostrar/ocultar la contraseña

  // Variable para manejar los errores en el formulario
  // Variable para manejar los errores en el formulario
  errores = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    correo: '',
    password: '',
    repetirPassword: '',
    coinciden: ''
  };

  constructor(private auth: AuthService, private firestore:FirestoreService, private interaction: InteractionService, private router: Router) { }


  // Método para mostrar/ocultar la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepetirPasswordVisibility() {
    this.showRepetirPassword = !this.showRepetirPassword;
  }
   // Método para validar el formulario de forma dinámica
  async validarCampo(campo: string) {
    switch (campo) {
      case 'nombre':
        this.errores.nombre = this.datos.nombre ? '' : '*El nombre es requerido';
        break;
      case 'apellido':
        this.errores.apellido = this.datos.apellido ? '' : '*El apellido es requerido';
        break;
      case 'fechaNacimiento':
        this.errores.fechaNacimiento = this.datos.fechaNacimiento ? '' : '*La fecha de nacimiento es requerida';
        break;
      case 'correo':
        this.errores.correo = this.datos.correo && this.validarCorreo(this.datos.correo) ? '' : '*El correo es requerido o inválido';
        // Validar si el correo ya existe
        if (this.errores.correo === '') {
          const existe = await this.auth.correoExiste(this.datos.correo);
          this.errores.correo = existe ? '*El correo ya existe' : '';
        }
        break;
      case 'password':
        this.errores.password = this.validarPassword(this.datos.password);
        break;
      case 'repetirPassword':
        this.errores.coinciden = this.datos.password === this.repetirPassword ? '' : '*Las contraseñas no coinciden';
        break;
    }
  }

  validarCorreo(correo: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }

  // Validaciones para la contraseña
  validarPassword(password: string): string {
    if (!password) {
      return '*La contraseña es requerida';
    }
    if (password.length < 6) {
      return '*La contraseña debe tener al menos 6 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
      return '*La contraseña debe tener al menos una letra mayúscula';
    }
    if (!/[0-9]/.test(password) && !/[!@#\$%\^&\*\(\)\[\]\{\}\.\,\;]/.test(password)) {
      return '*La contraseña debe tener al menos un número o un carácter especial';
    }
    return '';
  }

  async validarFormulario() {
    // Validamos todos los campos para asegurar que no hay errores
    await Promise.all([
      this.validarCampo('nombre'),
      this.validarCampo('apellido'),
      this.validarCampo('fechaNacimiento'),
      this.validarCampo('correo'),
      this.validarCampo('password'),
      this.validarCampo('repetirPassword'),
    ]);

    // Verificamos si hay algún error
    if (Object.values(this.errores).every(error => error === '')) {
      this.registrar();
    } else {
      this.interaction.presentToast('*Por favor, corrige los errores antes de continuar');
    }
  }



  async registrar() {
    this.interaction.presentLoading('Registrando...')
    console.log('datos -> ', this.datos);
    const res = await this.auth.registrarUser(this.datos).catch( error => {
      this.interaction.dismissLoading();
      this.interaction.presentToast('Falló el registro')
      console.log('error');
  })
  if (res) {
    console.log('éxito al crear el usuario');
    const path = 'Usuarios';
    const id = res.user.uid;
    this.datos.uid = id;
    this.datos.password = null
    await this.firestore.createDoc(this.datos, path, id)
    this.interaction.dismissLoading();
    this.interaction.presentToast('Te has registrado con éxito');
    this.router.navigate(['/p-principal'])
  }

  }
  ngOnInit() {
  }

}
