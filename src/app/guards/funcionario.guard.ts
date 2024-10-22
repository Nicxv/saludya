import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';
import { map } from 'rxjs';

export const funcionarioGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectar el servicio de autenticación
  const router = inject(Router); // Inyectar el router
  const interactionService = inject(InteractionService); // Inyectar el servicio de interacción

  const requiresFuncionario = route.data?.['funcionario'] === true; // Verificar si la ruta requiere funcionario

  return authService.getUserRole().pipe(
    map(rol => {
      console.log('Rol obtenido del usuario:', rol); // Debug: Verificar el rol obtenido en la consola
      if (rol) {
        if (requiresFuncionario && rol !== 'funcionario') {
          // La ruta requiere funcionario, pero el usuario no es funcionario
          interactionService.presentToast('No tienes permisos para acceder a esta página');
          router.navigate(['/p-principal']); // Redirigir si no es funcionario
          return false;
        }
        if (rol === 'paciente') {
          // El usuario es un paciente, no debería tener acceso
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
