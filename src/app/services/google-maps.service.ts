import { Injectable } from '@angular/core';

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

  constructor() { }

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
  }

  showRoute(origin: { lat: number; lng: number }, destination: any) {
    const request = {
      origin: new window['google'].maps.LatLng(origin.lat, origin.lng),
      destination,
      travelMode: window['google'].maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === window['google'].maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error mostrando la ruta:', status);
      }
    });
  }

  updateCurrentPosition(lat: number, lng: number) {
    const position = new window['google'].maps.LatLng(lat, lng);

    if (!this.currentPositionMarker) {
      this.currentPositionMarker = new window['google'].maps.Marker({
        position,
        map: this.map,
        icon: {
          url: 'assets/images/auto-icon.png',
          scaledSize: new window['google'].maps.Size(40, 40),
        },
      });
    } else {
      this.currentPositionMarker.setPosition(position);
    }

    this.map.setCenter(position);
  }
  clearRoute() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setDirections({ routes: [] }); // Limpiar la ruta en el mapa
    }
    if (this.currentPositionMarker) {
      this.currentPositionMarker.setMap(null); // Remover el marcador de posición actual
      this.currentPositionMarker = null;
    }
  }

  addCustomMarker(lat: number, lng: number, photoURL: string, nombre: string) {
  const image = {
    url: photoURL,
    scaledSize: new window['google'].maps.Size(50, 50), // Tamaño de la imagen
    origin: new window['google'].maps.Point(0, 0), // Origen de la imagen
    anchor: new window['google'].maps.Point(25, 25), // Punto de anclaje
  };

  const marker = new window['google'].maps.Marker({
    position: new window['google'].maps.LatLng(lat, lng),
    map: this.map,
    icon: image,
  });

  // Crear un infowindow para mostrar el nombre del usuario
  const infoWindow = new window['google'].maps.InfoWindow({
    content: `<div><strong>${nombre}</strong></div>`
  });

  // Mostrar el infowindow al hacer clic en el marcador
  marker.addListener('click', () => {
    infoWindow.open(this.map, marker);
  });

  // Guardar el marcador para futuras referencias o limpieza
  if (!this.map.markers) {
    this.map.markers = [];
  }
  this.map.markers.push(marker);
}

clearMarkers() {
  if (this.map) {
    this.map.markers.forEach(marker => marker.setMap(null));
    this.map.markers = [];
  }
}

  
  
  
}
