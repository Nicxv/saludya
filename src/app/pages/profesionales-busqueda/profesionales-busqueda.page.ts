import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-profesionales-busqueda',
  templateUrl: './profesionales-busqueda.page.html',
  styleUrls: ['./profesionales-busqueda.page.scss'],
})
export class ProfesionalesBusquedaPage implements OnInit {
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  usuariosFuncionarios: registroUsuario[] = [];
  mapLoaded: boolean = false;
  filtroNombreProfesional: string = '';
  filteredUsuarios: registroUsuario[] = []; // Lista para mostrar resultados filtrados


  constructor(private auth: AuthService, private firestore:FirestoreService, private googleMapsService: GoogleMapsService) { 
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

  getUsuariosFuncionarios() {
    const path = 'Usuarios';
    this.firestore.getCollection<registroUsuario>(path).subscribe(usuarios => {
      this.usuariosFuncionarios = usuarios.filter(user => user.rol === 'funcionario');
      this.filteredUsuarios = this.usuariosFuncionarios; // Inicializar la lista filtrada
      if (this.mapLoaded) {
        this.addMarkersToMap();
      }
    });
  }


  // Método para inicializar el mapa
  ionViewDidEnter() {
    this.googleMapsService.loadGoogleMaps('AIzaSyAjeDGC_iyfAVa3Q4v4DQkLsKMPIAi9dW8').then(() => {
      this.googleMapsService.initMap(this.mapElement.nativeElement, -33.5587, -70.5885);
      this.mapLoaded = true;
      this.addMarkersToMap();
    });
  }

  addMarkersToMap() {
    this.usuariosFuncionarios.forEach(usuario => {
      if (usuario.direccion && usuario.photoURL) {
        this.convertirDireccionACoordenadas(usuario.direccion).then(latLng => {
          if (latLng) {
            const randomLatLng = this.generarPosicionAleatoria(latLng.lat, latLng.lng, 1000);
            // Llamar al método con la `uid`
            this.googleMapsService.addCustomMarker(randomLatLng.lat, randomLatLng.lng, usuario.photoURL, usuario.nombre, usuario.uid);
          }
        });
      }
    });
  }
  
// Función para generar una posición aleatoria en un radio especificado (en metros)
generarPosicionAleatoria(lat: number, lng: number, radio: number) {
  const r = radio / 111320; // Convertir metros a grados (aproximado)
  const y0 = lat;
  const x0 = lng;
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  const newLat = y + y0;
  const newLng = x + x0;
  return { lat: newLat, lng: newLng };
}

// Método para convertir la dirección a coordenadas usando un servicio de geocodificación
convertirDireccionACoordenadas(direccion: string): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    const geocoder = new window['google'].maps.Geocoder();
    geocoder.geocode({ address: direccion }, (results, status) => {
      if (status === window['google'].maps.GeocoderStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error('Geocodificación fallida: ', status);
        reject(null);
      }
    });
  });
}

// Método para buscar por dirección
buscarPorDireccion(event: any) {
  const direccion = event.target.value;
  if (direccion && direccion.length > 3) { // Buscar si el texto es suficientemente largo
    this.convertirDireccionACoordenadas(direccion).then(coordenadas => {
      if (coordenadas) {
        this.googleMapsService.updateCurrentPosition(coordenadas.lat, coordenadas.lng);
      }
    }).catch(error => console.error('No se encontró la dirección: ', error));
  }
}


filtrarProfesionales(event: any) {
  this.filtroNombreProfesional = event.target.value.toLowerCase();
  this.filtrarMarcadores();
}

// Método para filtrar los marcadores
filtrarMarcadores() {
  if (this.mapLoaded && this.usuariosFuncionarios.length > 0) {
    this.googleMapsService.clearMarkers(); // Limpiar todos los marcadores

    // Filtrar los usuarios por el nombre ingresado en el filtro
    this.filteredUsuarios = this.usuariosFuncionarios.filter(usuario => 
      usuario.nombre.toLowerCase().includes(this.filtroNombreProfesional)
    );

    // Agregar los marcadores filtrados en el mapa
    this.filteredUsuarios.forEach(usuario => {
      this.convertirDireccionACoordenadas(usuario.direccion).then(latLng => {
        if (latLng) {
          this.googleMapsService.updateCurrentPosition(latLng.lat, latLng.lng); // Centrar el mapa
          this.googleMapsService.addCustomMarker(latLng.lat, latLng.lng, usuario.photoURL, usuario.nombre, usuario.uid); // Agregar marcador
        }
      });
    });
  }
}

  ngOnInit() {
    this.getUsuariosFuncionarios();
  }

}
