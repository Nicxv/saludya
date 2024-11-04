import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Redirigir a la página 'home' después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000); // Cambia 3000 por el tiempo en milisegundos que desees
  }
}
