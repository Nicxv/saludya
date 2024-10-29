import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.stateUser().subscribe(user => {
      // Esta lógica solo se ejecutará al inicio
      if (user) {
        // Usuario autenticado
        this.router.navigateByUrl('/p-principal');
      } else {
        // Usuario no autenticado
        this.router.navigateByUrl('/home');
      }
    });
  }
}
