import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { registroUsuario } from '../models/models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private authfirebase: AngularFireAuth, private firestore: AngularFirestore) { }

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
  async correoExiste(correo: string): Promise<boolean> {
    const usersCollection = this.firestore.collection('Usuarios', ref => ref.where('correo', '==', correo));
    const users = await usersCollection.get().toPromise();
    return !users.empty; // Retorna true si hay usuarios con ese correo
  }

  getUserRole(): Observable<string | null> {
    return this.authfirebase.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('Usuarios').doc(user.uid).valueChanges().pipe(
            map((userData: any) => userData ? userData.rol : null)
          );
        } else {
          return of(null); // Si no hay usuario autenticado, devolver null
        }
      })
    );
  }
}
