import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';
import { registroUsuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  getId() {
    return this.firestore.createId();
  }

  // Actualiza un documento en lugar de sobrescribirlo completamente
  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data); // Se usa update para solo actualizar los campos específicos
  }


  // Método para cargar un archivo en Firebase Storage
  uploadFile(filePath: string, file: any) {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        return fileRef.getDownloadURL().toPromise();
      })
    );
  }

  getUsuarios(): Observable<registroUsuario[]> {
    return this.firestore.collection<registroUsuario>('Usuarios').valueChanges();
  }

  // Método para obtener una colección de Firestore
  getCollection<tipo>(path: string): Observable<tipo[]> {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();  // Devuelve un Observable de los datos
  }

  deleteDoc(path: string) {
    return this.firestore.doc(path).delete();  // Eliminar documento
  }

}
