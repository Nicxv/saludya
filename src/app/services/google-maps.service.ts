import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private autocompleteService: any;

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
}
