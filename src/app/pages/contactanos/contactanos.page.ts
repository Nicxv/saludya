import { Component, OnInit } from '@angular/core';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {
  uid: string = null;
  constructor(private auth: AuthService, private firestore: FirestoreService) {}



    
  async ngOnInit() {
    this.auth.stateUser().subscribe( res => {
      console.log('en contactanos - estado autenticación')
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
      }else {
          console.log('no existe uid');
    }
  }

}
