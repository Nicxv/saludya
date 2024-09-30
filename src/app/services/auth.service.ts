import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { registroUsuario } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private authfirebase: AngularFireAuth) { }


  login(correo: string, password: string) {
    return this.authfirebase.signInWithEmailAndPassword(correo, password)
    
  }
  logout() {
    this.authfirebase.signOut
  }
  registrarUser(datos: registroUsuario) {
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
    
  }
}
