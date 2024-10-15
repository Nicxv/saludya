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

  const requiresAdmin = route.data?.['admin'] === true; // Check if route requires admin

  return authService.getUserRole().pipe(
    map(rol => {
      if (rol) {
        if (requiresAdmin && rol !== 'admin') {
          // Admin route but user isn't an admin
          interactionService.presentToast('No tienes permisos para acceder a esta página');
          router.navigate(['/p-principal']); // Redirect if not admin
          return false;
        }
        return true; // User is authenticated and has the required role
      } else {
        interactionService.presentToast('Debes iniciar sesión primero');
        router.navigate(['/login']); // Redirect to login if not authenticated
        return false;
      }
    })
  );
};
