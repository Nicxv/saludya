import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//-------Firebase imports-------//

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
//--sistema de autenticacion 
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//--para que funcione la base de datos
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';






@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  bootstrap: [AppComponent],
})
export class AppModule {}

