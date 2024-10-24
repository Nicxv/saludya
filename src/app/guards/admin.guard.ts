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

  const requiresAdmin = route.data?.['admin'] === true; // Verificar si la ruta requiere admin

  return authService.getUserRole().pipe(
    map(rol => {
      console.log('Rol obtenido del usuario:', rol); // Debug: Verificar el rol obtenido en la consola
      if (rol) {
        if (requiresAdmin && rol !== 'admin') {
          // La ruta requiere admin, pero el usuario no es admin
          interactionService.presentToast('No tienes permisos para acceder a esta página');
          router.navigate(['/p-principal']); // Redirigir si no es admin
          return false;
        }
        if (rol === 'paciente') {
          // El usuario es un paciente, no debería tener acceso a la página de admin
          interactionService.presentToast('No tienes permisos para acceder a esta página');
          router.navigate(['/p-principal']); // Redirigir si es un paciente
          return false;
        }
        if (rol === 'funcionario') {
          // El usuario es un funcionario, no debería tener acceso a la página de admin
          interactionService.presentToast('No tienes permisos para acceder a esta página');
          router.navigate(['/p-principal']); // Redirigir si es un paciente
          return false;
        }
        return true; // El usuario está autenticado y tiene el rol requerido
      } else {
        interactionService.presentToast('Debes iniciar sesión primero');
        router.navigate(['/login']); // Redirigir a login si no está autenticado
        return false;
      }
    })
  );
};
