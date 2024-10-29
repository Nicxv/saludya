import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
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

  getCollectionWithId<T>(path: string): Observable<T[]> {
    return this.firestore.collection(path).snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as T;
          const id_chat = a.payload.doc.id;
          return { id_chat, ...data };
        })
      )
    );
  }

  deleteDocTwo(path: string, id: string): Promise<void> {
    return this.firestore.collection(path).doc(id).delete();
  }
  getDocAsPromise<tipo>(path: string, id: string): Promise<tipo> {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).ref.get().then(doc => doc.exists ? doc.data() as tipo : null);
  }
  getAllDocs<tipo>(path: string): Promise<tipo[]> {
    return this.firestore.collection<tipo>(path).get().toPromise().then(snapshot => {
      return snapshot.docs.map(doc => doc.data() as tipo);
    });
  }
  
  

}
