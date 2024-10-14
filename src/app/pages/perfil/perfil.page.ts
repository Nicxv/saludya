import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Chat, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  notificacionCount: number = 0; // Contador de notificaciones
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
   
  constructor(private auth: AuthService, private interaction: InteractionService, private router: Router, private firestore: FirestoreService, private storage: AngularFireStorage) {
  // me suscribo para obtener el estado del usuario, logeado o no logeado
  this.auth.stateUser().subscribe(res =>{
    if(res) {
      console.log('Esta logeado');
      this.login = true;
      this.getDatosUser(res.uid);
    }else {
      console.log('No está logeado');
      this.login = false;
    }
  })
}
//metodo logout
  logout() {
    this.auth.logout();
    this.interaction.presentToast('Has cerrado sesión');
    this.router.navigate(['/login'])
  }
//permisos roles de usuario
  getDatosUser(uid:string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe( res => {
      console.log('datos -> ', res);
      if(res) {
        this.rol = res.rol
      }
    })
  }


//obtener la id del usuario para mostrar los datos del perfil
uid: string = null;
info: registroUsuario = null; 
  async ngOnInit() { 
    console.log('estoy en perfil');
    this.auth.stateUser().subscribe( res => {
      console.log('en perfil - estado autenticación')
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
         this.getNotificaciones(uid); // Llamar a la función para obtener notificaciones
       }else {
         console.log('no existe uid');
    }
  }
  getNotificaciones(uid: string) {
    const path = 'Chat';
    this.firestore.getCollection<Chat>(path).subscribe(chats => {
      // Filtramos los mensajes donde el destinatario sea el UID del funcionario
      const mensajesParaFuncionario = chats.filter(chat => chat.destinatario === uid);
      this.notificacionCount = mensajesParaFuncionario.length; // Contamos los mensajes
    });
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

  selectImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  
    fileInput.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files[0];
      if (file) {
        // Subir archivo a Firebase Storage usando el método de FirestoreService
        const filePath = `perfil/${this.uid}/foto-perfil`;
        
        this.firestore.uploadFile(filePath, file).subscribe({
          next: async (snapshot) => {
            // La subida ha finalizado, obtenemos la URL
            const downloadURL = await snapshot.ref.getDownloadURL();
  
            // Actualizar la URL de la foto de perfil en Firestore
            const path = 'Usuarios';
            const id = this.uid;
            await this.firestore.updateDoc({ photoURL: downloadURL }, path, id);
            
            // Actualizar la información del usuario localmente
            this.getInfoUser();
          },
          error: (error) => {
            console.error('Error al subir la imagen', error);
          }
        });
      }
    };
  
    fileInput.click();
  }

}
