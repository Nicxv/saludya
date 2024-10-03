import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu estructura
import { inject } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { InteractionService } from '../services/interaction.service'; // Importar tu servicio de interacción
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectar el servicio de autenticación
  const router = inject(Router); // Inyectar el router
  const interactionService = inject(InteractionService); // Inyectar el servicio de interacción

  return authService.getUserRole().pipe(
    map(rol => {
      if (rol === 'admin') {
        interactionService.presentToast('Bienvenido administrador'); // Mostrar mensaje para admin
        return true; // Permitir acceso si es admin
      } else {
        interactionService.presentToast('No tienes permisos para acceder a esta página'); // Mostrar mensaje para no-admin
        router.navigate(['/p-principal']); // Redirigir a la página de inicio si no es admin
        return false; // Denegar acceso si no es admin
      }
    })
  );
};
