import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private autocompleteService: any;
  private directionsService: any;
  private directionsRenderer: any;
  private map: any; // Guardar la referencia del mapa
  private carMarker: any; // Marcador del vehículo
  private currentPositionMarker: any;

  constructor(private router: Router) { }

  // Inicializar los servicios de Google Maps (autocompletar)
  initAutocomplete(input: HTMLInputElement, onSelect: (place: any) => void) {
    // Asegurarse de que el servicio de autocompletado no se haya creado previamente
    if (!this.autocompleteService) {
      this.autocompleteService = new window['google'].maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'CL' }, // Restringir a Chile
      });

      // Añadir listener para el autocompletado
      this.autocompleteService.addListener('place_changed', () => {
        const place = this.autocompleteService.getPlace();
        if (place && place.geometry) {
          onSelect(place);
        }
      });
    }
  }

  // Cargar el script de Google Maps dinámicamente
  loadGoogleMaps(apiKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Verificar si el objeto google ya está cargado
      if (window['google']) {
        resolve(true); // Google Maps ya está cargado
        return;
      }

      // Crear el script de Google Maps
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Resolver la promesa cuando el script haya cargado
      script.onload = () => resolve(true);
      script.onerror = (error: any) => reject(error);
    });
  }

  initMap(mapElement: HTMLElement, lat: number, lng: number) {
    this.map = new window['google'].maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 14,
    });
  
    this.directionsService = new window['google'].maps.DirectionsService();
    this.directionsRenderer = new window['google'].maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    
    // Marcador para la ubicación del usuario
    this.currentPositionMarker = new window['google'].maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: "Tu ubicación",
    });
  }
  

  addCustomMarker(lat: number, lng: number, photoURL: string, nombre: string, uid: string) {
    const image = {
      url: photoURL,
      scaledSize: new window['google'].maps.Size(50, 50), // Tamaño de la imagen
      origin: new window['google'].maps.Point(0, 0),
    };
  
    const marker = new window['google'].maps.Marker({
      position: { lat, lng },
      map: this.map,
      icon: image,
      title: nombre,
    });
  
    // Crear un botón emergente
    const infoWindow = new window['google'].maps.InfoWindow({
      content: `<button id="contactar-${uid}" style="background-color: #0074BD; color: white; border: none; padding: 10px; border-radius: 5px;">Contactar funcionario</button>`,
    });
  
    // Evento para abrir el InfoWindow al hacer clic en el marcador
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
  
      // Agregar un evento para el botón "Contactar funcionario"
      setTimeout(() => {
        const contactButton = document.getElementById(`contactar-${uid}`);
        if (contactButton) {
          contactButton.addEventListener('click', () => {
            // Navegar a la página de mensajes del funcionario con la uid usando Angular Router
            this.router.navigate(['/msj-funcionario'], { state: { uidFuncionario: uid } });
          });
        }
      }, 0);
    });
  }
  

clearMarkers() {
  if (this.map) {
    this.map.markers.forEach(marker => marker.setMap(null));
    this.map.markers = [];
  }
}

trazarRuta(latOrigen: number, lngOrigen: number, direccionDestino: string) {
  const request = {
    origin: new window['google'].maps.LatLng(latOrigen, lngOrigen),
    destination: direccionDestino,
    travelMode: window['google'].maps.TravelMode.DRIVING,
  };

  this.directionsService.route(request, (result, status) => {
    if (status === window['google'].maps.DirectionsStatus.OK) {
      this.directionsRenderer.setDirections(result);
    } else {
      console.error('Error al trazar la ruta: ' + status);
    }
  });
}


// En tu archivo GoogleMapsService.ts
updateCurrentPosition(lat: number, lng: number) {
  if (this.currentPositionMarker) {
    // Actualiza la posición del marcador existente
    this.currentPositionMarker.setPosition({ lat, lng });
    // También puedes centrar el mapa en la nueva posición
    this.map.setCenter({ lat, lng });
  } else {
    // Si no hay un marcador, puedes crear uno nuevo
    this.currentPositionMarker = new window['google'].maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: "Tu ubicación",
    });
    this.map.setCenter({ lat, lng });
  }
}

  
  
  
}
