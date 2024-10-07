import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading:any;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private firestore: FirestoreService, private alertController: AlertController) { }

  async presentToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para mostrar un Loading
  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent', // Puedes cambiar el tipo de spinner
      
    });
    await this.loading.present();
    
  }

  // Método para cerrar el Loading
  async dismissLoading() {
    await this.loading.dismiss();
  }

  async presentAlert(header: string, message: string, buttonText: string = 'Aceptar') {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [buttonText],
    });
    await alert.present();
  }

}

