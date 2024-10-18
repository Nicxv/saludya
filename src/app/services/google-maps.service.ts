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

  initMap(mapElement: HTMLElement, center: { lat: number, lng: number }, apiKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!window['google']) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => this.initializeMap(mapElement, center, resolve);
        script.onerror = (error: any) => reject(error);
      } else {
        this.initializeMap(mapElement, center, resolve);
      }
    });
  }

  private initializeMap(mapElement: HTMLElement, center: { lat: number, lng: number }, resolve: (value?: unknown) => void) {
    this.map = new window['google'].maps.Map(mapElement, {
      center,
      zoom: 14
    });
    this.directionsService = new window['google'].maps.DirectionsService();
    this.directionsRenderer = new window['google'].maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    resolve(this.map);
  }

  getRoute(origin: string, destination: string) {
    return new Promise((resolve, reject) => {
      const request = {
        origin,
        destination,
        travelMode: window['google'].maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result: any, status: any) => {
        if (status === window['google'].maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result);
          resolve(result);
        } else {
          reject('Error al trazar la ruta: ' + status);
        }
      });
    });
  }

  // Método para iniciar la animación del autito
  startCarAnimation(route: any) {
    const steps = route.routes[0].legs[0].steps;
    const carIcon = {
      url: 'assets/images/auto-icon.png', // Ruta a la imagen del autito
      scaledSize: new window['google'].maps.Size(40, 40)
    };

    if (!this.carMarker) {
      this.carMarker = new window['google'].maps.Marker({
        map: this.map,
        icon: carIcon,
        position: steps[0].start_location
      });
    }

    let stepIndex = 0;
    const moveCar = () => {
      if (stepIndex < steps.length) {
        this.carMarker.setPosition(steps[stepIndex].start_location);
        stepIndex++;
        setTimeout(moveCar, 1000); // Controla la velocidad del movimiento
      }
    };
    moveCar();
  }
}
