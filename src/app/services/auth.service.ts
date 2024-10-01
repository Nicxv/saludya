import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { registroUsuario } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private authfirebase: AngularFireAuth) { }

//login
  login(correo: string, password: string) {
    return this.authfirebase.signInWithEmailAndPassword(correo, password)
    
  }
  //log-out
  logout() {
    this.authfirebase.signOut();
  }
  //registrar un usuario
  registrarUser(datos: registroUsuario) {
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
    
  }
  //Ver el estado de un usuario
  stateUser() {
    return this.authfirebase.authState
  }
  //obtener id del usuario
  async getUid() {
    const user = await this.authfirebase.currentUser;
    if (user) {
      return user.uid;
    }else{
      return null;
    }
  }
}
